import type { ListPersonsWithSignificantControlResponse } from '../schemas/listPersonsWithSignificantControlSchema.js'
import type { FastifyRedis } from '@fastify/redis'
import type { FastifyMongoObject } from '@fastify/mongodb'
import type { FastifyRequest } from 'fastify'

import { ListPersonsWithSignificantControlSchema } from '../schemas/listPersonsWithSignificantControlSchema.js'
import { reflect } from '../controllers/reflect.js'
import { performance } from 'perf_hooks'
import {GetIndividualResponse} from "../schemas/getIndividualSchema.js";
import {GetLegalPersonsResponse} from "../schemas/getLegalPersonsSchema.js";
import {GetCorporateEntitiesResponse} from "../schemas/getCorporateEntitiesSchema.js";
import {GetSuperSecurePersonResponse} from "../schemas/getSuperSecurePersonSchema.js";

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listPersonsWithSignificantControl service
const colName = 'listPersonsWithSignificantControl'

/** Must be called before any data is inserted */
export async function initListPersonsWithSignificantControlCollection(
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
      ...ListPersonsWithSignificantControlSchema['schema']['response']['200']
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
 * List the company persons with significant control.
 *
 * List of all persons with significant control (not statements).
 *
 */
export async function listPersonsWithSignificantControl(
  context: Context,
  company_number: string,
  items_per_page = 25,
  start_index = 0,
  register_view = false
): Promise<ListPersonsWithSignificantControlResponse | null> {
  if(register_view) throw new Error('Register view not yet supported. Try setting to false or omitting.')
  if (!context.mongo.db) throw new Error('DB not defined')
  const collections = new Set(['getCorporateEntities', 'getIndividual', 'getLegalPersons', 'getSuperSecurePerson'])
  const items: ListPersonsWithSignificantControlResponse['items'] = []
  let total_results = 0
  for (const collectionName of collections) {
    const collection = context.mongo.db.collection<GetIndividualResponse|GetLegalPersonsResponse|GetCorporateEntitiesResponse|GetSuperSecurePersonResponse>(collectionName)
    const startFind = performance.now()
    const collectionItems = await collection.find({ company_number }).limit(items_per_page).toArray()
    context.req.log.trace(
      { duration: performance.now() - startFind, found: collectionItems.length, operation: 'find', collectionName },
      'Find operation in MongoDB'
    )
    items.push(...collectionItems)
    total_results += await collection.countDocuments({ company_number })
  }
  //todo: sort items to allow for paging results
  if(total_results === 0) return null
  else return {
    items: items.slice(start_index, start_index + items_per_page),
    start_index,
    items_per_page,
    ceased_count: items.filter(o=>o.ceased_on !== undefined).length,
    active_count: items.filter(o=>o.ceased_on === undefined).length,
    links: {
      self: `/company/${company_number}/persons-with-significant-control`
    },
    total_results
  }
}
