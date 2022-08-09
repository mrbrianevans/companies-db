import {getRecordFormat, RecordTypeFormat} from "./recordFormats.js";
import {dataTypeParsers} from "./dataTypeParsers.js";
import {getRecordType} from "./RecordTypes.js";
import {getTransformer} from "./transformers.js";

/**
 * Splits a record line into the segments defined in the format.
 * Applies the dataType transformer (eg parseInt for numbers).
 * Does not trim any whitespace.
 * Returns an object where the keys are the segment names and the values are the values of those segments.
 * @param recordString - a line from the bulk file
 * @param format - a format to parse the segment with.
 */
export function parseRecordByFormat(recordString: string, format: RecordTypeFormat){
  return Object.fromEntries(format.map(segment=> {
    const rawValue = recordString.slice(segment.start, segment.start + segment.length)
    const transformer = dataTypeParsers[segment.dataType]
    const parsedValue = transformer(segment)(rawValue)
    return [segment.name, parsedValue];
  }))
}


/**
 * Parse a single line record from the bulk file. Can be any of the record types. Returns a JS object.
 * @param record - line of bulk file.
 */
export function parseRecord(record: string){
  const recordType = getRecordType(record)
  const format = getRecordFormat(recordType)
  const rawValues = parseRecordByFormat(record, format)
  const transformer = getTransformer(recordType)
  // @ts-ignore - this could be made generic and everything, but I don't think its worth the time.
  const transformedValue = transformer(rawValues)
  return {...transformedValue, recordType}
}
