import {Serialiser} from "./serialise.js";
import {serialiseJson} from "./json.js";
import {serialiseCsv} from "./csv.js";

export type ExportType = 'csv'|'json'

export const serialisers: Record<ExportType, Serialiser> = {
  json: serialiseJson,
  csv: serialiseCsv
} as const
