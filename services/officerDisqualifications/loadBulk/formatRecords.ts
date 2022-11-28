// combines multiple records for the same person, and formats it like an API response
import {DisqualifiedOfficersRecordType} from "./disqualifiedOfficersFile.js";
import {randomUUID} from "crypto";
import * as assert from "assert";
import {titleCase} from "title-case";

/*
Stream records from the bulk file in, and API response formatted records will be yielded out. Ready to insert in mongo.
Accumulates records relating to a person, such as the exemptions, disqualifications and variations that follow a person record.
 */
export async function* formatRecords(source, {signal}) {
  let currentPerson, currentDisquals = [] as any[], currentExemptions = [] as any[], currentVariations = [] as any[]
  const counters = {
    [DisqualifiedOfficersRecordType.Person]: 0,
    [DisqualifiedOfficersRecordType.Disqualification]: 0,
    [DisqualifiedOfficersRecordType.Exemption]: 0,
    [DisqualifiedOfficersRecordType.Variation]: 0
  }
  for await (const chunk of source) {
    try {
      if (chunk.recordType in counters) counters[chunk.recordType]++
      switch (chunk.recordType as DisqualifiedOfficersRecordType) {
        case DisqualifiedOfficersRecordType.Header:
          console.time('from parsing header to trailer record')
          const {runNumber, productionDate} = chunk
          console.log('Processing bulk file number', runNumber, 'produced on', convertDate(productionDate))
          break;
        case DisqualifiedOfficersRecordType.Person:
          if (currentPerson) {
            const finishedPerson = constructApiResponse(currentPerson, currentDisquals, currentExemptions, currentVariations)
            yield finishedPerson
          }
          currentPerson = chunk
          currentDisquals = [] as any[]
          currentExemptions = [] as any[]
          currentVariations = [] as any[]
          break;
        case DisqualifiedOfficersRecordType.Disqualification:
          assert.equal(chunk.personNumber.slice(0,8), currentPerson?.personNumber.slice(0,8), 'Person numbers don\'t match for disqualification')
          currentDisquals.push(chunk)
          break;
        case DisqualifiedOfficersRecordType.Exemption:
          assert.equal(chunk.personNumber.slice(0,8), currentPerson?.personNumber.slice(0,8), 'Person numbers don\'t match for exemption')
          currentExemptions.push(chunk)
          break;
        case DisqualifiedOfficersRecordType.Variation:
          assert.equal(chunk.personNumber.slice(0,8), currentPerson?.personNumber.slice(0,8), 'Person numbers don\'t match for variation')
          currentVariations.push(chunk)
          break;
        case DisqualifiedOfficersRecordType.Trailer:
          // verify that the counts of records in the file match the expected counts in the trailer record. will throw if not.
          const actualTotalCount = Object.values(counters).reduce((prev, curr) => prev + curr, 0)
          console.log('Finished scanning file. Expected', chunk.totalRecordCountExcludingHeaderTrailer, 'records in total. Actually processed', actualTotalCount)
          console.log('Expected', chunk.type1RecordCount, 'person records. Actually processed', counters[DisqualifiedOfficersRecordType.Person])
          console.log('Expected', chunk.type2RecordCount, 'disqual records. Actually processed', counters[DisqualifiedOfficersRecordType.Disqualification])
          console.log('Expected', chunk.type3RecordCount, 'exemption records. Actually processed', counters[DisqualifiedOfficersRecordType.Exemption])
          console.log('Expected', chunk.type4RecordCount, 'variation records. Actually processed', counters[DisqualifiedOfficersRecordType.Variation])
          assert.equal(counters[DisqualifiedOfficersRecordType.Person], chunk.type1RecordCount, 'person record count doesn\'t match expected count')
          assert.equal(counters[DisqualifiedOfficersRecordType.Disqualification], chunk.type2RecordCount, 'disqual record count doesn\'t match expected count')
          assert.equal(counters[DisqualifiedOfficersRecordType.Exemption], chunk.type3RecordCount, 'exemption record count doesn\'t match expected count')
          assert.equal(counters[DisqualifiedOfficersRecordType.Variation], chunk.type4RecordCount, 'variation record count doesn\'t match expected count')
          assert.equal(actualTotalCount, chunk.totalRecordCountExcludingHeaderTrailer, 'total count doesn\'t match expected count')
          console.timeEnd('from parsing header to trailer record')
          break;
      }
      if (signal.aborted) break;
    } catch (e) {
      console.log("Failed to process record: ", e, {counters, record: JSON.stringify(chunk)})
      throw e
    }
  }
}

function comparePersonNumberPrefixes(a: string, b: string){
  return a.slice(0,8) === b.slice(0,8)
}

function convertDate(date: { year: number, month: number, day: number }) {
  return [date?.year?.toFixed(0), date?.month?.toFixed(0).padStart(2, '0'), date?.day?.toFixed(0).padStart(2, '0')].filter(s => s).join('-') || undefined
}

function getActSection(sectionOfTheAct: string) {
  const [id, ...sectionNumber] = sectionOfTheAct.split(' ').at(-1)??[]
  // can be {section:'10'} or {article: '10'} depending on S10 or A10 value prefix.
  const part = {[id === 'S' ? 'section':'article']:sectionNumber.join('')}
  if (sectionOfTheAct.startsWith('CDDA 1986')) {
    return {act: 'company-directors-disqualification-act-1986', ...part}
  } else if (sectionOfTheAct.startsWith('CDDO 2002')) {
    return {
      act: 'company-directors-disqualification-northern-ireland-order-2002',
      ...part
    }
  } else throw new Error('Could not get section of the act from: ' + sectionOfTheAct)
}

function getDisqualificationType(disqualType: string) {
  if (disqualType === 'ORDER') return 'court-order'
  else if (disqualType === 'UNDERTAKING') return 'undertaking'
  else throw new Error('Unrecognised disqualification type: ' + disqualType)
}

function getHearingDateKey(disqualTypeEnum:'court-order'|'undertaking'){
  if(disqualTypeEnum === 'court-order') return 'heard_on'
  else if(disqualTypeEnum === 'undertaking') return 'undertaken_on'
  else throw new Error('Unrecognised disqualification type enum: '+disqualTypeEnum)
}

/** Splits forename into forename and other_names */
function parseForenames(forenames: string) {
  const [forename, ...otherNamesArray] = forenames?.split(' ') ?? []
  return {forename, other_names: otherNamesArray.length ? otherNamesArray.join(' ') : undefined}
}

function constructApiResponse(person, disquals, exemptions, variations) {
  // combine exemptions if the dates are the same, and put company names in an array
  const permissionDates = new Set(exemptions.map(e=>[convertDate(e.exemptionStartDate),convertDate(e.exemptionEndDate)].join(' - ')))
  const permissions_to_act = exemptions.length ? [...permissionDates].map(key => {
    const es = exemptions.filter(e=>[convertDate(e.exemptionStartDate),convertDate(e.exemptionEndDate)].join(' - ') === key)
    return ({
      company_names: es.map(e=>e.exemptionCompanyName).sort(),
      // court_name: '', // don't have this data point
      granted_on: convertDate(es[0].exemptionStartDate),
      expires_on: convertDate(es[0].exemptionEndDate)
    });
  }) : undefined
  const {forename, other_names} = parseForenames(person.personDetails.forenames)
  const address = {
    region: person.personDetails.county ? titleCase(person.personDetails.county.toLowerCase()) : undefined,
    locality: person.personDetails.posttown ? titleCase(person.personDetails.posttown.toLowerCase()) : undefined,
    postal_code: person.personPostcode,
    address_line_1: person.personDetails.addressLine1 ? titleCase(person.personDetails.addressLine1.toLowerCase()) : undefined,
    address_line_2: person.personDetails.addressLine2 ? titleCase(person.personDetails.addressLine2.toLowerCase()) : undefined,
    country: person.personDetails.country ? titleCase(person.personDetails.country.toLowerCase()) : undefined
  }
  const disqualificationCases = new Set(disquals.map(d=>d.caseNumber)) // de-duplicate cases, combine company names in array
  const disqualifications = [...disqualificationCases].map(caseNumber => {
    const d = disquals.find(di=>di.caseNumber === caseNumber) // find first disqual with the right case number
    const actSection = getActSection(d.sectionOfTheAct)
    const disqualification_type = getDisqualificationType(d.disqualificationType)
    const company_names = disquals.filter(di=>di.caseNumber === d.caseNumber).map(di=>di.companyName).filter(s=>s).sort()
    return {
      [getHearingDateKey(disqualification_type)]: convertDate(d['disqualOrderUndertakingDate']),
      disqualified_from: convertDate(d.disqualStartDate),
      disqualified_until: convertDate(d.disqualEndDate),
      address,
      disqualification_type,
      company_names: company_names.length ? company_names : undefined,
      reason: {
        ...actSection
      },
      court_name: disqualification_type === 'court-order' && d.courtName ? titleCase(d.courtName.toLowerCase()):undefined,
      case_identifier: d.caseNumber
    }
  })
  const officer_id = person.personNumber
  return {
    officer_id,
    date_of_birth: convertDate(person.personDateOfBirth),
    disqualifications,
    permissions_to_act,
    etag: randomUUID(),
    forename: forename ? titleCase(forename.toLowerCase()) : undefined, other_forenames: other_names ? titleCase(other_names.toLowerCase()) : undefined,
    kind: 'corporateNumber' in person.personDetails ? 'corporate-disqualification' : 'natural-disqualification',
    links: {
      self: `/disqualified-officers/natural/${officer_id}`
    },
    nationality: person.personDetails.nationality ? person.personDetails.nationality.toLowerCase().split(',').map(titleCase).join(',') : undefined,
    surname: person.personDetails.surname,
    title: person.personDetails.title ? titleCase(person.personDetails.title.toLowerCase()) : undefined
  }
}


//todo:
// - [x] split forename into other_names as overflow
// - [ ] remove nulls (permission_to_act etc)
// - write a database validator using the official API to check
// - [x] remove court name
// - [x] title case forename, other_names, title, address details, nationality
// - [won't do] split premises from address line 1
// - try figure out the reason description identifier
// - find an example of a corporate disqualified officer

