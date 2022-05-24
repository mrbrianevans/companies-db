import { Db} from "mongodb";
import 'dotenv/config'
import {PassThrough, Writable} from "stream";
import camelcase from "camelcase";
import {ListOfficers} from "./listOfficersTypeDefs";
import {WebSocket} from 'ws'
import {setTimeout} from "timers/promises";

const searchQueries = ['barbers', 'hairdressers', 'printing']

function* getQuery(){
  for (let i = 0; i <= searchQueries.length-1; i++) yield searchQueries[i];
  return searchQueries[searchQueries.length - 1]
}

export class Crawler{
  db: Db
  baseUrl = 'https://api.company-information.service.gov.uk'
  apiKey: string
  crawled: Set<string>

  constructor(db: Db) {
    this.db = db
    this.apiKey = process.env.REST_API_KEY
    this.crawled = new Set()
  }

  async crawl(timeLimitSeconds: number = 30){
    const endTime = Date.now() + (timeLimitSeconds * 1000)
    const queries = getQuery()
    while(Date.now() < endTime){
      const query = queries.next()
      // search for something, get company numbers and crawl documents
      const docs = await this.fetchAndSave('/search/companies?items_per_page=100&q='+query.value, 'searchCompanies')
      await this.crawlCompanies(docs)
      // console.log("Found", docsFound.length, 'docs')
      if(query.done) break
    }
  }

  async getSavedDocument(path: string, operationName: string){
    return this.db.collection(operationName).findOne({_id:path})
  }

  async addDocument(path: string, operationName: string, response: Record<any, any>){
    response._id = path
    await this.db.collection(operationName).updateOne({_id: path}, {$set: response}, {upsert: true})
  }

  async fetchPath(path: string){
    console.log("Fetch", path)
    const headers = {
      Authorization:
        'Basic ' + Buffer.from(this.apiKey + ':').toString('base64')
    }
    const res = await fetch(this.baseUrl + path, {headers}).then(async r=> {
      let rateLimitRemaining = parseInt(r.headers.get('X-Ratelimit-Remain'))
      let rateLimitReset = parseInt(r.headers.get('X-Ratelimit-Reset'))
      if(rateLimitRemaining < 5) {
        const delay = Math.abs((rateLimitReset * 1000) - Date.now()) + 1
        console.log("Sleeping", delay/1000, 'seconds for ratelimit to reset', new Date())
        await setTimeout(delay)
      }
      if(r.ok)
      return r.json()
        else if (r.status === 429) process.exit(r.status)
      else throw new Error('Request failed. Status: '+r.status + ' ' + r.statusText)
    })
    return res
  }

  async fetchAndSave(path: string, operationName: string){
    let document = await this.getSavedDocument(path, operationName)
    if(!document) {
      document = await this.fetchPath(path)
      await this.addDocument(path, operationName, document)
    }
    return document
  }

  async crawlCompanies(companies){
    for (const company of companies.items) {
      const {links: {self}} = company
      const profile = await this.fetchAndSave(self, 'company')
      await this.crawlDocument(profile, self)
    }
  }
  async crawlDocument(document, url?: string){
    if(url && this.crawled.has(url)) return
    else this.crawled.add(url)
    // console.log("Crawling document", url)
    if('items' in document){
      for(const item of document.items){
        await this.crawlDocument(item)
      }
    }else if(('links' in document)) {
      for (const [operation, link] of Object.entries(document.links)) {
        if(typeof link === 'object'){
          for (const [innerOperation, innerLink] of Object.entries(link)) {
            if (typeof innerLink !== 'string' || (innerOperation === 'self') || innerLink.startsWith('http')) continue
            try {
              const doc = await this.fetchAndSave(innerLink, camelcase(innerOperation))
              await this.crawlDocument(doc, innerLink)
            }catch (e) {
              console.log("Failed on", operation, innerOperation, link, innerLink, e)
            }
          }
        }
        if (typeof link !== 'string' || ( operation === 'self') || link.startsWith('http')) continue
        try {
        const doc = await this.fetchAndSave(link, camelcase(operation))
        await this.crawlDocument(doc, link)
        }catch (e) {
          console.log("Failed on", operation, link, e)
        }
      }
    }
    return []
  }

  async crawlOfficers(){
    const officers = this.db.collection<ListOfficers>('officers').find()
    for await(const officerList of officers) {
      for(const officer of officerList.items){
        await this.fetchAndSave(officer.links.officer.appointments, 'appointments')
      }
    }
  }

  async crawlFilingHistory(){
    const filingHistories = this.db.collection('filingHistory').find()
    for await(const filingHistory of filingHistories) {
      for(const filing of filingHistory.items){
        if(filing.links.self)
        await this.fetchAndSave(filing.links.self, 'filingHistoryItem')
      }
    }
  }
  async crawlCharges(){
    const chargesLists = this.db.collection('charges').find()
    for await(const chargesList of chargesLists) {
      for(const charge of chargesList.items){
        if(charge.links.self)
          await this.fetchAndSave(charge.links.self, 'chargesItem')
      }
    }
  }

  async listenOnWebsocket(){
    const events = new WebSocket('wss://companies.stream/events')
    const pass = new PassThrough({objectMode: true})
    const streamNames = {
      'company-charges': 'chargesItem',
      'company-insolvency':'insolvency',
      'company-officers':'officersItem',
      'company-profile': 'company',
      'company-psc-corporate': 'pscCorporate',
      'company-psc-individual': 'pscIndividual',
      'filing-history': 'filingHistoryItem',
    }
    events.addEventListener('message', async ({data}) => {
      const {resource_uri, resource_kind} = JSON.parse(data.toString())
      pass.push({resource_uri, resource_kind})
    })
    for await(const {resource_uri, resource_kind} of pass){
        const doc = await this.fetchAndSave(resource_uri, streamNames[resource_kind] ?? camelcase(resource_kind+'-stream'))
        await this.crawlDocument(doc, resource_uri)
    }
    events.close()
  }

}

// supposed to be for something like https.request().pipe(ReadResponse) to get a full JSON response using built in https
class ReadResponse extends Writable{
  private data: string

  constructor() {
    super({decodeStrings: false});
  }

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
    this.data += chunk.toString()
  }

  json(){
    return JSON.parse(this.data)
  }

}
