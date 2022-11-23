import type {ListStatementsResponse} from '../schemas/listStatementsSchema.js'
import {ListStatementsSchema} from '../schemas/listStatementsSchema.js'
import type {FastifyRedis} from '@fastify/redis'
import type {FastifyMongoObject} from '@fastify/mongodb'
import type {FastifyRequest} from 'fastify'
import {performance} from 'perf_hooks'
import {GetStatementResponse} from "../schemas/getStatementSchema.js";

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}
// the main database collection for the listStatements service
const colName = 'listStatements'

/** Must be called before any data is inserted */
export async function initListStatementsCollection(
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
      ...ListStatementsSchema['schema']['response']['200']
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
 * List the company persons with significant control statements.
 *
 * List of all persons with significant control statements.
 *
 */
export async function listStatements(
  context: Context,
  company_number: string,
  items_per_page = 25,
  start_index = 0,
  register_view = false
): Promise<ListStatementsResponse | null> {
  if(register_view) throw new Error('Register view not yet supported. Try setting to false or omitting.')
  if (!context.mongo.db) throw new Error('DB not defined')
  if(items_per_page > 100) items_per_page = 100
  if(items_per_page < 0) items_per_page = 0
  const collection =
    context.mongo.db.collection<GetStatementResponse>('getStatement')
  const startFind = performance.now()
  let items = await collection.find({ company_number }).skip(start_index).limit(items_per_page).toArray()
  context.req.log.trace(
    { duration: performance.now() - startFind, found: items.length, operation: 'find' },
    'Find operation in MongoDB'
  )
  const startCount = performance.now()
  let total_results = await collection.countDocuments({ company_number })
  context.req.log.trace(    { duration: performance.now() - startCount, operation: 'count' },    'MongoDB count'  )
  if(total_results === 0) return null
  else return {
    items,
    start_index,
    items_per_page,
    ceased_count: items.filter(o=>o.ceased_on !== undefined).length,
    active_count: items.filter(o=>o.ceased_on === undefined).length,
    links: {
      self: `/company/${company_number}/persons-with-significant-control-statements`
    },
    total_results
  }
}
