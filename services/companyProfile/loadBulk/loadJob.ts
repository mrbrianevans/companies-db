import Papa from 'papaparse'
import {Readable, Transform, Writable} from "stream";
import {MongoClient, UnorderedBulkOperation} from "mongodb";
import {createReadStream} from "fs";
import {transformCompany} from "./transformCompanyFromBulk.js";
import dot from 'dot-object'
import type {GetCompanyProfileResponse} from "../schemas/getCompanyProfileSchema.js";
import {initGetCompanyProfileCollection} from "../service/getCompanyProfile";

const sample = `CompanyName, CompanyNumber,RegAddress.CareOf,RegAddress.POBox,RegAddress.AddressLine1, RegAddress.AddressLine2,RegAddress.PostTown,RegAddress.County,RegAddress.Country,RegAddress.PostCode,CompanyCategory,CompanyStatus,CountryOfOrigin,DissolutionDate,IncorporationDate,Accounts.AccountRefDay,Accounts.AccountRefMonth,Accounts.NextDueDate,Accounts.LastMadeUpDate,Accounts.AccountCategory,Returns.NextDueDate,Returns.LastMadeUpDate,Mortgages.NumMortCharges,Mortgages.NumMortOutstanding,Mortgages.NumMortPartSatisfied,Mortgages.NumMortSatisfied,SICCode.SicText_1,SICCode.SicText_2,SICCode.SicText_3,SICCode.SicText_4,LimitedPartnerships.NumGenPartners,LimitedPartnerships.NumLimPartners,URI,PreviousName_1.CONDATE, PreviousName_1.CompanyName, PreviousName_2.CONDATE, PreviousName_2.CompanyName,PreviousName_3.CONDATE, PreviousName_3.CompanyName,PreviousName_4.CONDATE, PreviousName_4.CompanyName,PreviousName_5.CONDATE, PreviousName_5.CompanyName,PreviousName_6.CONDATE, PreviousName_6.CompanyName,PreviousName_7.CONDATE, PreviousName_7.CompanyName,PreviousName_8.CONDATE, PreviousName_8.CompanyName,PreviousName_9.CONDATE, PreviousName_9.CompanyName,PreviousName_10.CONDATE, PreviousName_10.CompanyName,ConfStmtNextDueDate, ConfStmtLastMadeUpDate
"! LIMITED","12778855","","","UNIT 3 NEWTON BUSINESS CENTRE","NEWTON CHAMBERS ROAD","SHEFFIELD","","UNITED KINGDOM","S35 2PH","Private Limited Company","Active","United Kingdom","","29/07/2020","31","7","29/04/2022","","NO ACCOUNTS FILED","26/08/2021","","0","0","0","0","78300 - Human resources provision and management of human resources functions","","","","0","0","http://business.data.gov.uk/id/company/12778855","","","","","","","","","","","","","","","","","","","","","11/08/2021",""
"! LTD","08209948","","","METROHOUSE 57 PEPPER ROAD","HUNSLET","LEEDS","YORKSHIRE","","LS10 2RU","Private Limited Company","Active","United Kingdom","","11/09/2012","30","9","30/06/2022","30/09/2020","DORMANT","09/10/2016","11/09/2015","0","0","0","0","99999 - Dormant Company","","","","0","0","http://business.data.gov.uk/id/company/08209948","","","","","","","","","","","","","","","","","","","","","25/09/2021","11/09/2020"
"!? LTD","11399177","","","THE STUDIO HATHERLOW HOUSE","HATHERLOW","ROMILEY","","UNITED KINGDOM","SK6 3DY","Private Limited Company","Active","United Kingdom","","05/06/2018","30","6","31/03/2022","30/06/2020","TOTAL EXEMPTION FULL","03/07/2019","","0","0","0","0","47710 - Retail sale of clothing in specialised stores","","","","0","0","http://business.data.gov.uk/id/company/11399177","","","","","","","","","","","","","","","","","","","","","19/06/2022","05/06/2021"
`

// const readable = createReadStream('C:\\Users\\bme\\projects\\companies-house-database-manager\\samples\\companies\\sample.csv')
const readable = createReadStream('C:\\Users\\bme\\projects\\companies-house-database-manager\\samples\\companies\\BasicCompanyDataAsOneFile-2021-07-01.csv')


const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, {header: true, fastMode: false, transformHeader: h=>h.trim(), dynamicTyping: h=>h!=='CompanyNumber', transform: val=>val===''?undefined:val})

const transformer = new Transform({
  objectMode: true,
  transform(chunk: any, encoding: BufferEncoding, callback) {
    const obj = dot.object(chunk)
    // console.log(obj)
    const apiResponse = transformCompany(obj)
    callback( null, apiResponse)
    // callback( null, obj)
  }
})


class MongoInserter extends Writable{
  private bulk: UnorderedBulkOperation
  private mongo: MongoClient
  collectionName: string
  dbName: string
  constructor(dbName: string, collectionName: string) {
    super({objectMode: true, highWaterMark: 1000});
    this.dbName = dbName
    this.collectionName = collectionName
  }
  async _construct(callback: (error?: (Error | null)) => void) {
    try{
      const mongo = new MongoClient(process.env.MONGO_URL??'')
      await mongo.connect()
      this.mongo = mongo
      this.bulk = mongo.db(this.dbName).collection(this.collectionName).initializeUnorderedBulkOp({})
      callback()
    }catch (e) {
      callback(e)
    }
  }

  // async _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
  //   console.error("Single chunk write")
  //   const startTime = performance.now()
  //   await this.mongo.db(this.dbName).collection(this.collectionName).replaceOne({number: chunk.number}, chunk, {upsert: true})
  //   const execTime = performance.now() - startTime
  //   console.log('Write perf:', 1,'in', execTime,'millis. ', (1 / (execTime/1000)).toFixed(2),'per second')
  //   callback()
  // }

  async _writev(chunks: Array<{ chunk: GetCompanyProfileResponse; encoding: BufferEncoding }>, callback: (error?: (Error | null)) => void) {
    if(chunks.length < 10) console.error('WriteV called with few chunks:', chunks.length)
    const bulk = this.mongo.db(this.dbName).collection(this.collectionName).initializeUnorderedBulkOp({})
    for (const {chunk} of chunks) {
      bulk.find({company_number: chunk.company_number}).upsert().replaceOne(chunk)
    }
    const startTime = performance.now()
    const result = await bulk.execute()
    const execTime = performance.now() - startTime
    console.log('WriteV perf:', chunks.length,'in', execTime.toFixed(2),'millis. ', (chunks.length / (execTime/1000)).toFixed(2),'per second')

    callback()
  }

  async _final(callback: (error?: (Error | null)) => void) {
    await this.mongo.close()
    callback()
  }
}

const inserter = new MongoInserter('ch', 'blk')

const mongo = new MongoClient(process.env.MONGO_URL??'')
await mongo.connect()
await initGetCompanyProfileCollection(mongo.db('company-profile'))
await mongo.close()

console.time('Load file')
readable.pipe(parseStream)
  // .take(150_000)
  // .pipe(transformer)
  .map(chunk=>{
    const obj = dot.object(chunk)
    return transformCompany(obj)
  }, {concurrency:8})
  .pipe(inserter)
.on('finish', ()=>console.timeEnd('Load file'))
// this can load a file of 4,957,745 companies in 17m28s (averages 5,000 per second on my machine)
