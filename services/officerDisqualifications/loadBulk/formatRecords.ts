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
  if (sectionOfTheAct.startsWith('CDDA 1986')) {
    return {act: 'company-directors-disqualification-act-1986', section: sectionOfTheAct.split(' ').at(-1)?.slice(1)}
  } else if (sectionOfTheAct.startsWith('CDDO 2002')) {
    return {
      act: 'company-directors-disqualification-northern-ireland-order-2002',
      section: sectionOfTheAct.split(' ').at(-1)?.slice(1)
    }
  } else throw new Error('Could not get section of the act from: ' + sectionOfTheAct)
}

function getDisqualificationType(disqualType: string) {
  if (disqualType === 'ORDER') return 'court-order'
  else if (disqualType === 'UNDERTAKING') return 'undertaking'
  else throw new Error('Unrecognised disqualification type: ' + disqualType)
}

/** Splits forename into forename and other_names */
function parseForenames(forenames: string) {
  const [forename, ...otherNamesArray] = forenames?.split(' ') ?? []
  return {forename, other_names: otherNamesArray.length ? otherNamesArray.join(' ') : undefined}
}

function constructApiResponse(person, disquals, exemptions, variations) {
  const permissions_to_act = exemptions.length ? exemptions.map(e => ({
    company_names: [e.exemptionCompanyName], // this should combine multiple exemptions if they have the same dates and court name?
    // court_name: '',
    granted_on: convertDate(e.exemptionStartDate),
    expires_on: convertDate(e.exemptionEndDate)
  })) : undefined
  const {forename, other_names} = parseForenames(person.personDetails.forenames)
  const disqualifications = disquals.map(d => {
    const {act, section} = getActSection(d.sectionOfTheAct)
    return {
      undertaken_on: convertDate(d['disqualOrder/undertakingDate']),
      disqualified_from: convertDate(d.disqualStartDate),
      disqualified_until: convertDate(d.disqualEndDate),
      address: {
        region: person.personDetails.county ? titleCase(person.personDetails.county.toLowerCase()) : undefined,
        locality: person.personDetails.posttown ? titleCase(person.personDetails.posttown.toLowerCase()) : undefined,
        postal_code: person.personPostcode,
        address_line_1: person.personDetails.addressLine1 ? titleCase(person.personDetails.addressLine1.toLowerCase()) : undefined,
        address_line_2: person.personDetails.addressLine2 ? titleCase(person.personDetails.addressLine2.toLowerCase()) : undefined,
        country: person.personDetails.country ? titleCase(person.personDetails.country.toLowerCase()) : undefined
      },
      disqualification_type: getDisqualificationType(d.disqualificationType),
      company_names: [d.companyName], // this should combine multiple disqualifications if they are the same but for many companies
      reason: {
        // court_name: d.courtName,
        act,
        section
      },
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
    forename: forename ? titleCase(forename.toLowerCase()) : undefined, other_names: other_names ? titleCase(other_names.toLowerCase()) : undefined,
    kind: 'corporateNumber' in person.personDetails ? 'corporate-disqualification' : 'natural-disqualification',
    links: {
      self: `/disqualified-officers/natural/${officer_id}`
    },
    nationality: person.personDetails.nationality ? titleCase(person.personDetails.nationality.toLowerCase()) : undefined,
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

