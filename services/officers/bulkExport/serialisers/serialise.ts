import {ExportType, serialisers} from "./exportTypes.js"
import {Transform} from "stream";

export type Serialiser = (record: any) => string

export function serialiseRecord(record: any, type: ExportType): string{
  const serialiser = serialisers[type]
  return serialiser(record)
}

export const serialiseTransform = (type: ExportType) => new Transform({
  autoDestroy: false,
  writableObjectMode: true,
  readableObjectMode: false,
  transform(chunk: any, encoding: BufferEncoding, callback) {
    {
      callback(null, serialiseRecord(chunk, type))
    }
  }
})
