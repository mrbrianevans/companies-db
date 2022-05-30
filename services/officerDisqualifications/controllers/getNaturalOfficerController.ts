import { FastifyPluginAsync } from 'fastify'
import {
  getNaturalOfficer,
  Context,
  initGetNaturalOfficerCollection
} from '../service/getNaturalOfficer.js'
import { reflect, auth } from './reflect.js'
import {
  GetNaturalOfficerSchema as schema,
  GetNaturalOfficerQueryString,
  GetNaturalOfficerParams
} from '../schemas/getNaturalOfficerSchema.js'

export const getNaturalOfficerController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  await initGetNaturalOfficerCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetNaturalOfficerParams
    Querystring: GetNaturalOfficerQueryString
  }>('/disqualified-officers/natural/:officer_id', schema, async (req, res) => {
    const { officer_id } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit ?? {}))
      res.header(header, value)
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res.code(429).send('Rate limit hit')
      return
    }
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    const result = getNaturalOfficer(context, officer_id)
    if (result) return result
    else res.code(404).send('Not found')
  })
}
