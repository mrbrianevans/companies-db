import camelcaseKeys from 'camelcase-keys';

export type RecordFields = ({start: number, length: number, name: string, comment?: string}&({dataType: 'V', variableFormat: string}|{dataType: 'X'|'9'|'D'|'B'}))[]
export interface RecordTypeSpec {
  fields: RecordFields
  transformer?: (record) => any
  recordTypeEnum: number
}

function parseDate(date){
  return {
    year: date.slice(0,4).trim(),
    month: date.slice(4,6).trim(),
    day: date.slice(6).trim()
  }
}

export function parseVariableData(keysFormat: string, valuesString: string){
  const keys = keysFormat.split('<').map(s=>(s)).filter(k=>k.length)
  const values = valuesString.split('<')
  return Object.fromEntries(keys.map((k,i)=>[k, values[i]]))
}

export const dataTypeParsers: { [T in RecordFields[number]['dataType']]: (segment: RecordFields[number]  )=>(v: string)=>any } = {
  "9": ()=>parseInt,
  D: ()=>parseDate,
// @ts-ignore
  V: (segment)=>(v:string)=>parseVariableData(segment.variableFormat, v),
  X: ()=>v=>v.trim(),
  // Boolean (either a space or a "Y")
  B: ()=>b=>b==='Y'
}


/**
 * Splits a record line into the segments defined in the format.
 * Applies the dataType transformer (eg parseInt for numbers).
 * Does not trim any whitespace.
 * Returns an object where the keys are the segment names and the values are the values of those segments.
 * @param recordString - a line from the bulk file
 * @param format - a format to parse the segment with.
 */
export function parseRecordByFormat(recordString: string, format: RecordFields){
  return Object.fromEntries(format.map(segment=> {
    const rawValue = recordString.slice(segment.start, segment.start + segment.length)
    const dataTypeParser = dataTypeParsers[segment.dataType]
    const parsedValue = dataTypeParser(segment)(rawValue)
    return [segment.name, parsedValue];
  }))
}


export class RecordParser{
  private readonly recordTypeSpecs: RecordTypeSpec[]
  private readonly recordTypeClassifier: (record: string) => any
  /**
   * Create a parser for a file type.
   * @param recordTypeSpecs - details about each record type, identified by its recordTypeEnum
   * @param recordTypeClassifier - return the enum of a record
   */
  constructor(recordTypeSpecs: RecordTypeSpec[], recordTypeClassifier: (record: string) => any) {
    this.recordTypeSpecs = recordTypeSpecs
    this.recordTypeClassifier = recordTypeClassifier
  }

  public parse(record: string){
    const recordType = this.recordTypeClassifier(record)
    const recordTypeSpec = this.recordTypeSpecs.find(r=>r.recordTypeEnum === recordType)
    if(!recordTypeSpec) throw new Error('Cannot parse record. Record type spec not provided for recordType='+String(JSON.stringify(recordType)))
    const rawValues = parseRecordByFormat(record, recordTypeSpec.fields)
    const transformer = recordTypeSpec.transformer ?? (o => camelcaseKeys(o))
    const transformedValue = transformer(rawValues)
    return {...transformedValue, recordType}
  }
}
