import { FastifyPluginAsync } from 'fastify'
import {
  getCompanyProfile,
  Context,
  initGetCompanyProfileCollection
} from '../service/getCompanyProfile.js'
import { auth } from './reflect.js'
import {
  GetCompanyProfileSchema as schema,
  GetCompanyProfileQueryString,
  GetCompanyProfileParams
} from '../schemas/getCompanyProfileSchema.js'

const getCompanyProfileController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({ route: 'getCompanyProfile' })
  await initGetCompanyProfileCollection(fastify.mongo.db)
  fastify.get<{
    Params: GetCompanyProfileParams
    Querystring: GetCompanyProfileQueryString
  }>('/company/:company_number', schema, async (req, res) => {
    const { company_number } = req.params

    const ratelimit = await auth({ Authorization: req.headers.authorization })
    for (const [header, value] of Object.entries(ratelimit ?? {}))
      res.header(header, value)
    if (ratelimit === null) {
      // these requests should usually be filtered out by Caddy, but just in case some make it through:
      res
        .code(401)
        .send({
          statusCode: 401,
          error: 'Not authorised',
          message: 'Basic authentication token not included in request header.'
        })
      return
    }
    if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
      res
        .code(429)
        .send({
          statusCode: 429,
          error: 'Too many requests',
          message: 'Rate limit exceeded'
        })
      return
    }
    const { redis, mongo } = fastify
    const context: Context = { redis, mongo, req }
    const result = getCompanyProfile(context, company_number)
    if (result) return result
    else
      res
        .code(404)
        .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
  })
}
export default getCompanyProfileController
