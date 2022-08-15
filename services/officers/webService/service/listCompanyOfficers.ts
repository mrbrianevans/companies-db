import type { ListCompanyOfficersResponse } from '../schemas/listCompanyOfficersSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { ListCompanyOfficersSchema } from '../schemas/listCompanyOfficersSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'
import { OfficerStorage } from '../../shared/storageTypes/Officer.js'
import {transformListCompanyOfficers} from "../transformOfficer.js";

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listCompanyOfficers service
const colName = 'listCompanyOfficers'

/** Must be called before any data is inserted */
export async function initListCompanyOfficersCollection(
  db: FastifyMongoObject['db']
) {
  if (!db) throw new Error('DB not defined')
  const exists = await db
    .listCollections({ name: colName })
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const { example, ...schema } = {
      ...ListCompanyOfficersSchema['schema']['response']['200']
    }
    await db.createCollection(colName, {
      storageEngine: { wiredTiger: { configString: 'block_compressor=zstd' } }
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
    await db
      .collection(colName)
      .createIndex({ company_number: 1 }, { unique: true })
  }
}

/**
 * Company Officers.
 *
 * List of all company officers.
 *
 */
export async function listCompanyOfficers(
  context: Context,
  company_number: string,
  items_per_page = 35,
  register_type?: string,
  register_view?: string,
  start_index = 0,
  order_by: 'appointed_on'| 'resigned_on'|'surname' = 'appointed_on'
): Promise<ListCompanyOfficersResponse | null> {
  if (!context.mongo.db) throw new Error('DB not defined')
  if(items_per_page > 100) items_per_page = 100
  if(items_per_page < 0) items_per_page = 0
  const collection =
    context.mongo.db.collection<OfficerStorage>('officers')
  const startFind = performance.now()
  let total_results = await collection.countDocuments({ company_number })
  let res = await collection.find({ company_number }).sort(order_by, 'ascending').skip(start_index).limit(items_per_page).toArray()
  const findDurationMs = performance.now() - startFind
  context.req.log.trace(
    { findDurationMs, found: Boolean(res) },
    'Find one operation in MongoDB'
  )
 return {
   active_count: res.filter(o=>o.resigned_on === undefined).length, // not sure what this should be?? I think it's if the companies are active
   etag: '490e7c1c96f85192cf3f3973d59e9b33e47cade0',
   inactive_count: res.filter(o=>o.resigned_on !== undefined).length, // not sure what this should be??
   items: res.map(transformListCompanyOfficers),
   items_per_page,
   kind: 'officer-list',
   links: {
     self: `/company/${company_number}/officers`
   },
   resigned_count: res.filter(o=>o.resigned_on !== undefined).length,
   start_index,
   total_results
 }
}
