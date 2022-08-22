import {get, RequestOptions } from "https"
import split2 from "split2"
import "dotenv/config"
import { IncomingMessage } from "node:http"
import {EventEmitter, on} from "events";
import { nextTick,stdout,env } from "process";
import {setTimeout} from "timers/promises";
import { getRedisClient } from "../shared/dbClients.js";

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


export async function *streamEventsContinuously<EventType extends {event:{timepoint:number}}= any>(path: string) {
  const streamTimepointKey = 'streams:timepoint:'+path
  try {
    while (true) {//  reconnect if(when) ended
      const redis = await getRedisClient()
      const ac = new AbortController()
      const {signal} = ac

      //pick up at left off timepoint (saved in redis)
      const previousTimepoint = await redis.get(streamTimepointKey)
      if (previousTimepoint) console.log("Picking up from previous time point:", previousTimepoint)
      const eventEmitter = await listenToStream(path, previousTimepoint ? parseInt(previousTimepoint) : undefined)
      eventEmitter.on('end', () => {
        console.log("Event emitter ended", new Date())
        ac.abort()
      })
      eventEmitter.on('start', () => console.log("Event emitter started", new Date()))
      eventEmitter.on('error', (e) => console.log("Event emitter errored", new Date(), e))
      let counter = 0, lastTimepoint: number | null = null
      try {
        for await(const events of on(eventEmitter, 'event', {signal})) {
          for (const event of <EventType[]>events) {
            counter++
            await redis.set(streamTimepointKey, event.event.timepoint)
            lastTimepoint = event.event.timepoint
            yield event
          }
        }
      } catch (e) {
        if (e.code !== 'ABORT_ERR') throw e
      }
      console.log("End of loop after", counter, 'events. Will restart in 60 seconds. Last timepoint:', lastTimepoint)
      await setTimeout(60_000) // wait a minute before reconnecting
      await redis.quit()
    }
  } catch (e) {
    console.log("Exiting update script due to failure to connect to Streaming API.")
    console.log(e)
  }
}
