import {RequestOptions} from "https";
import {request as requestCb} from "node:https";
import {IncomingMessage} from "http";

export function request(url: string | URL,     options: RequestOptions){
  console.log("Request to", url)
  return new Promise<IncomingMessage>(resolve => requestCb(url, options, res=> {
    console.log("Request to", url, 'calling callback')
    resolve(res)
  }))
}
