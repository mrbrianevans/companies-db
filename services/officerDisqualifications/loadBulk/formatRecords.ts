// combines multiple records for the same person, and formats it like an API response
import {DisqualifiedOfficersRecordType} from "./disqualifiedOfficersFile.js";
import {randomUUID} from "crypto";
import * as assert from "assert";

/*
Stream records from the bulk file in, and API response formatted records will be yielded out. Ready to insert in mongo.
Accumulates records relating to a person, such as the exemptions, disqualifications and variations that follow a person record.
 */
export async function* formatRecords (source, { signal }) {
  let currentPerson, currentDisquals = [] as any[], currentExemptions = [] as any[], currentVariations = [] as any[]
  const counters = {[DisqualifiedOfficersRecordType.Person]: 0, [DisqualifiedOfficersRecordType.Disqualification]: 0, [DisqualifiedOfficersRecordType.Exemption]: 0, [DisqualifiedOfficersRecordType.Variation]: 0}
  for await (const chunk of source) {
    if(chunk.recordType in counters) counters[chunk.recordType]++
    switch (chunk.recordType as DisqualifiedOfficersRecordType) {
      case DisqualifiedOfficersRecordType.Header:
        console.time('from parsing header to trailer record')
        const {runNumber, productionDate} = chunk
        console.log('Processing bulk file number',runNumber,'produced on', convertDate(productionDate))
        break;
      case DisqualifiedOfficersRecordType.Person:
        if(currentPerson) {
          const finishedPerson = constructApiResponse(currentPerson, currentDisquals, currentExemptions, currentVariations)
          yield finishedPerson
        }
        currentPerson = chunk
        currentDisquals = [] as any[]
        currentExemptions = [] as any[]
        currentVariations = [] as any[]
        break;
      case DisqualifiedOfficersRecordType.Disqualification:
        currentDisquals.push(chunk)
        break;
      case DisqualifiedOfficersRecordType.Exemption:
        currentExemptions.push(chunk)
        break;
      case DisqualifiedOfficersRecordType.Variation:
        currentVariations.push(chunk)
        break;
      case DisqualifiedOfficersRecordType.Trailer:
        // verify that the counts of records in the file match the expected counts in the trailer record. will throw if not.
        const actualTotalCount = Object.values(counters).reduce((prev,curr)=>prev+curr, 0)
        console.log('Finished scanning file. Expected', chunk.totalRecordCountExcludingHeaderTrailer, 'records in total. Actually processed', actualTotalCount)
        console.log('Expected',chunk.type1RecordCount, 'person records. Actually processed', counters[DisqualifiedOfficersRecordType.Person])
        console.log('Expected',chunk.type2RecordCount, 'disqual records. Actually processed', counters[DisqualifiedOfficersRecordType.Disqualification])
        console.log('Expected',chunk.type3RecordCount, 'exemption records. Actually processed', counters[DisqualifiedOfficersRecordType.Exemption])
        console.log('Expected',chunk.type4RecordCount, 'variation records. Actually processed', counters[DisqualifiedOfficersRecordType.Variation])
        assert.equal(counters[DisqualifiedOfficersRecordType.Person], chunk.type1RecordCount, 'person record count doesn\'t match expected count')
        assert.equal(counters[DisqualifiedOfficersRecordType.Disqualification], chunk.type2RecordCount, 'disqual record count doesn\'t match expected count')
        assert.equal(counters[DisqualifiedOfficersRecordType.Exemption], chunk.type3RecordCount, 'exemption record count doesn\'t match expected count')
        assert.equal(counters[DisqualifiedOfficersRecordType.Variation], chunk.type4RecordCount, 'variation record count doesn\'t match expected count')
        assert.equal(actualTotalCount, chunk.totalRecordCountExcludingHeaderTrailer, 'total count doesn\'t match expected count')
        console.timeEnd('from parsing header to trailer record')
        break;
    }
    if(signal.aborted) break;
  }
}


function convertDate(date: {year:number, month:number, day: number}){
  return [date?.year?.toFixed(0),date?.month?.toFixed(0).padStart(2, '0'),date?.day?.toFixed(0).padStart(2, '0')].filter(s=>s).join('-') || undefined
}

function getActSection(sectionOfTheAct:string){
  if(sectionOfTheAct.startsWith('CDDA 1986')){
    return {act: 'company-directors-disqualification-act-1986', section: sectionOfTheAct.split(' ').at(-1)?.slice(1)}
  }else if(sectionOfTheAct.startsWith('CDDO 2002')){
    return {act: 'company-directors-disqualification-northern-ireland-order-2002', section: sectionOfTheAct.split(' ').at(-1)?.slice(1)}
  } else throw new Error('Could not get section of the act from: '+sectionOfTheAct)
}

function getDisqualificationType(disqualType: string){
  if(disqualType === 'ORDER') return 'court-order'
  else if(disqualType === 'UNDERTAKING') return 'undertaking'
  else throw new Error('Unrecognised disqualification type: '+disqualType)
}

function constructApiResponse(person, disquals, exemptions, variations){
  const permissions_to_act = exemptions.length ? exemptions.map(e=>({
    company_names: [e.exemptionCompanyName], // this should combine multiple exemptions if they have the same dates and court name?
    // court_name: '',
    granted_on: convertDate(e.exemptionStartDate),
    expires_on: convertDate(e.exemptionEndDate)
  })) : undefined
  return {
    officer_id: person.personNumber,
    date_of_birth: convertDate(person.personDateOfBirth),
    disqualifications: disquals.map(d=>{
      const {act, section} = getActSection(d.sectionOfTheAct)
      return {
        undertaken_on: convertDate(d['disqualOrder/undertakingDate']),
        disqualified_from: convertDate(d.disqualStartDate),
        disqualified_until: convertDate(d.disqualEndDate),
        address: {
          locality: person.personDetails.posttown,
          postal_code: person.personPostcode,
          address_line_1: person.personDetails.addressLine1,
          country: person.personDetails.country
        },
        disqualification_type: getDisqualificationType(d.disqualificationType),
        company_names: [d.companyName], // this should combine multiple disqualifications if they are the same but for many companies
        reason: {
          court_name: d.courtName,
          act,
          section
        },
        case_identifier: d.caseNumber
      }
    }),
    permissions_to_act,
    etag: randomUUID(),
    forename: person.personDetails.forenames,
    kind: 'corporateNumber' in person.personDetails ? 'corporate-disqualification': 'natural-disqualification',
    links: {
      self: `/disqualified-officers/natural/${person.personNumber}`
    },
    nationality: person.personDetails.nationality,
    surname: person.personDetails.surname,
    title: person.personDetails.title
  }
}
