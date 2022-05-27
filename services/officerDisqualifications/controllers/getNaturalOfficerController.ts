import { FastifyPluginAsync } from 'fastify'
import { getNaturalOfficer, Context } from '../service/getNaturalOfficer.js'
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
  fastify.get<{
    Params: GetNaturalOfficerParams
    Querystring: GetNaturalOfficerQueryString
  }>('/disqualified-officers/natural/:officer_id', schema, async (req, res) => {
    const { officer_id } = req.params
    const {} = req.query
    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit))
      res.header(header, value)
    return reflect(req.url)
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    return getNaturalOfficer(context, officer_id)
  })
}
