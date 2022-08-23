import {capitalCase} from "capital-case";
import { stat } from "fs/promises";


/** Get an environment variable, or throw if its not set */
export function getEnv(name: string): string {
  const value = process.env[name]
  if (value === undefined)
    throw new Error(`${name} environment variable not set`)
  return value
}
export function average<T>(arr: T[], valueGetter = (a: T) => Number(a)) {
  return arr.reduce(
    (avg, current, index) => (index * avg + valueGetter(current)) / (index + 1),
    0
  )
}
/** modifies an object in place to remove any null or undefined values. recurses sub-objects to do the same. */
export function removeNulls(obj){
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }else if(typeof obj[key] === "object"){
      removeNulls(obj[key])
    }
  }
}


export function capsCase(input: string|undefined){
  return input === undefined ? undefined : capitalCase(input, {stripRegexp: /[^A-Z\d,.-]/gi})
}


export async function fileExists(filename: string){
  const s = await stat(filename).catch(e=>null)
  return s?.isFile()
}
export async function dirExists(dirname: string){
  const s = await stat(dirname).catch(e=>null)
  return s?.isDirectory()
}
