import {get, RequestOptions } from "https"
import split2 from "split2"
import "dotenv/config"
import { IncomingMessage } from "node:http"
import {EventEmitter} from "events";
import { nextTick,stdout,env } from "process";

/**
 * Connect to a stream, parse the events JSON.
 * @param streamPath - the url path to the stream. Eg 'filings' or 'companies' etc.
 * @param startFromTimepoint - (optional) a timepoint to begin from. If omitted then streams starts at latest event.
 * @returns an event emitter, which emits the following events:
 *
 *  - `event` - an object when an event is received on the stream.
 *  - `end` - when the stream ends (disconnected).
 *  - `start` - when the stream has connected.
 *  - `error` - if there is an error parsing the output from the stream.
 *  @throws if unable to connect to stream (eg due to authentication).
 */
export async function listenToStream(streamPath: string = "companies", startFromTimepoint?: number): Promise<EventEmitter> {
  const auth = env.STREAM_KEY + ":"
  const path = "/" + streamPath + (typeof startFromTimepoint === "number" ? `?timepoint=${startFromTimepoint}` : "")
  const options: RequestOptions = { hostname: "stream.companieshouse.gov.uk", path, auth }
  const response: IncomingMessage = await new Promise(resolve => get(options, im=>resolve(im)).end())
  response.on("close", () => emitter.emit('end'))
  const emitter = new EventEmitter({})
  if (response.statusCode === 200) {
    nextTick(() => emitter.emit('start'))
    response.pipe(split2(/\r?\n+/,l => l.trim().length>0?JSON.parse(l):undefined,{}))
      .on("data", event => emitter.emit('event', event))
      .on("error", (e) => emitter.emit('error', e))
      .on("end", () => emitter.emit('end'))
    // setTimeout(()=>response.destroy(),20_000) // for testing being disconnected
    return emitter
  }
  else {
    response.pipe(stdout)
    throw new Error('Could not listen on stream')
  }
}
