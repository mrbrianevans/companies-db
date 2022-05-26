import {baseUrl} from "./url";
import {headers} from "./headers";
import assert from "assert";
import { Temporal } from 'temporal-polyfill'
import Ajv, {Schema} from "ajv";
const ajv = new Ajv()
ajv.addFormat('date', (date)=> {
  try{
    Temporal.PlainDate.from(date)
    return true
  }catch (e) {
    console.log("date failed validation:", date, e)
    return false
  }
})
ajv.addFormat('uri', (uri)=> {
  try{
    new URL(uri)
    return true
  }catch (e) {
    console.log("uri failed validation:", uri, e)
    return false
  }
})
ajv.addKeyword('example')
export async function testRequests(requests: { path: string }[], schema: Schema) {
  assert(ajv.validateSchema(schema, false),'Schema not valid')
  const validate = ajv.compile(schema)
  assert(requests.length > 0, 'Zero requests to test')
  console.log(requests.length, 'test requests', requests.length > 20 ? 'Only using first 20':'')
  for (const request of requests.slice(0,20)) {
    const url = baseUrl + request.path
    const res = await fetch(url, {headers})
    const json = await res.json()
    assert(res.ok, 'Failed with status code ' + res.status + ' ' + res.statusText + ' on url ' + url + ' ' + json.message)
    const valid = validate(json)
    assert(valid, `${request.path} failed schema validation with ${validate.errors?.length} error(s): ${validate.errors?.map(e=>e.instancePath +' ' +e.message)}`)
  }
}
