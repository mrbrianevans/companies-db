import {createReadStream} from "fs";
import {RecordParser} from "./RecordParser.js";
import {
  classifyDisqualifiedOfficerRecordType,
  DisqualifiedOfficersRecordType,
  disqualifiedOfficersRecordTypes
} from "./disqualifiedOfficersFile.js";
import split2 from 'split2'
import {pipeline} from "node:stream/promises";
import {Transform, TransformCallback} from "stream";
import {randomUUID} from "crypto";

const inputStream = createReadStream('./benchmarkSample.txt')
const parser = new RecordParser(disqualifiedOfficersRecordTypes, classifyDisqualifiedOfficerRecordType)
const parseStream = split2(r=>parser.parse(r))

const stringStream = new Transform({
  writableObjectMode: true,
  readableObjectMode: false,
  transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    callback(null, JSON.stringify(chunk) + '\n')
  }
})
// combines multiple records for the same person, and formats it like an API response
async function* formatRecords (source, { signal }) {
  let currentPerson, currentDisquals = [] as any[], currentExemptions = [] as any[], currentVariations = [] as any[], counter = 0
  for await (const chunk of source) {
    switch (chunk.recordType as DisqualifiedOfficersRecordType) {
      case DisqualifiedOfficersRecordType.Header:
        const {runNumber, productionDate} = chunk
        console.log({runNumber, producedOn: convertDate(productionDate)})
        break;
      case DisqualifiedOfficersRecordType.Person:
        if(currentPerson) {
          const finishedPerson = constructApiResponse(currentPerson, currentDisquals, currentExemptions, currentVariations)
          if (counter++ < 3) console.log(finishedPerson)
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
        console.log('Finished scanning file:', chunk)
        break;
    }
    // todo: need typescript types for chunk
    //if a person is encountered, insert current person to Mongo and store new line as current person
    //   if a disqual/exemption/variation is encountered, add it to current person (checking person numbers to verify)
    //mongo operation should be find and replace I think, or otherwise the db should be dropped before this starts
    if(signal.aborted) break;
  }
}

console.time('pipeline')
//@ts-ignore
await pipeline(inputStream, parseStream, formatRecords, /* should stream to Mongo here using Find and Replace stringStream,process.stdout*/)
console.timeEnd('pipeline')

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
  return {
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
