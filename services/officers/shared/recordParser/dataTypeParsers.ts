import {RecordTypeFormat} from "./recordFormats.js";



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

export const dataTypeParsers: { [T in RecordTypeFormat[number]['dataType']]: (segment: RecordTypeFormat[number]  )=>(v: string)=>any } = {
  "9": ()=>parseInt,
  D: ()=>parseDate,
// @ts-ignore
  V: (segment)=>(v:string)=>parseVariableData(segment.variableFormat, v),
  X: ()=>v=>v.trim(),
  // Boolean (either a space or a "Y")
  B: ()=>b=>b==='Y'
}
