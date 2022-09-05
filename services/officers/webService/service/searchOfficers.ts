import type {SearchOfficersResponse} from '../schemas/searchOfficersSchema.js'
import type {FastifyRedis} from '@fastify/redis'
import type {FastifyMongoObject} from '@fastify/mongodb'
import type {FastifyRequest} from 'fastify'
import {performSearch} from "../../shared/search/performSearch.js";

import {SearchOfficersSchema} from '../schemas/searchOfficersSchema.js'
import {reflect} from '../controllers/reflect.js'
import {performance} from 'perf_hooks'
import {OfficerStorage} from '../../shared/storageTypes/Officer.js';
import {searchIndexPrefix} from '../../shared/search/searchIndexConstants.js';
import {capsCase} from '../../shared/utils.js';

export interface Context {
  redis: FastifyRedis
  mongo: FastifyMongoObject
  req: FastifyRequest
}

// the main database collection for the searchOfficers service
const colName = 'searchOfficers'

/** Must be called before any data is inserted */
export async function initSearchOfficersCollection(db: FastifyMongoObject['db']) {
  if (!db) throw new Error('DB not defined')
  const exists = await db
    .listCollections({name: colName})
    .toArray()
    .then((a) => a.length)
  if (!exists) {
    console.log('Creating collection', colName)
    const {example, ...schema} = {
      ...SearchOfficersSchema['schema']['response']['200']
    }
    await db.createCollection(colName, {
      storageEngine: {wiredTiger: {configString: 'block_compressor=zstd'}}
      // schema validation is temporarily disabled because mongo uses BSONschema which has slightly different types (doesn't support integer)
      // validator: {$jsonSchema: schema },
      // validationAction: "error" || "warn" // if a write fails validation
    })
  }
}

/**
 * Search company officers.
 *
 * Search for officer information.
 *
 */
export async function searchOfficers(context: Context, q: string, items_per_page?: number, start_index?: number): Promise<SearchOfficersResponse | null> {
  items_per_page ??= 35
  start_index ??= 0
  if (!context.mongo.db) throw new Error('DB not defined')
  console.time('Perform search in redis')
  const results = await performSearch(q, {limit: items_per_page, skip: start_index})
  console.timeEnd('Perform search in redis')
  const mongo = context.mongo.db.collection<OfficerStorage>('officers')
  console.time('Get officers from Mongo Promise.all')
  const officers = await Promise.all(results.documents.map(d => mongo.findOne({person_number: parseInt(d.id.slice(searchIndexPrefix.length + 1))})))
  console.timeEnd('Get officers from Mongo Promise.all')
  return {
    start_index, items_per_page, items: results.documents.map((d, i) => {
      const officer = officers[i]
      if (!officer) context.req.log.debug({keyInRedis: d.id}, 'Could\'t find officer for search results in Mongo')
      return officer as OfficerStorage
    }).filter(o => o).map((officer) => ({
      'address_snippet': formatAddressSearchResults(officer.address),
      'address': officer.address,
      'appointment_count': 0,
      description_identifiers: ['appointment-count'],
      'description': `Total number of appointments ${0}`,
      'kind': 'searchresults#officer',
      'title': formatNameSearchResults(officer.name_elements),
      links: {
        self: `/officers/${officer.person_number}/appointments`
      }
    })), page_number: Math.ceil(start_index / items_per_page), total_results: results.total, kind: 'search#officers'
  }
}

function formatNameSearchResults(nameParts?: OfficerStorage['name_elements']): string {
  // name is joined with spaces on this one rather than commas, and in a different order
  return [capsCase(nameParts?.forenames), nameParts?.surname].filter(s=>s).join(' ').trim()
}

function formatAddressSearchResults(addr?: OfficerStorage['address']): string {
  // name is joined with spaces on this one rather than commas, and in a different order
  return [addr?.address_line_1, addr?.address_line_2, addr?.locality, addr?.region, addr?.country, addr?.postal_code].filter(s=>s).join(', ').trim()
}
