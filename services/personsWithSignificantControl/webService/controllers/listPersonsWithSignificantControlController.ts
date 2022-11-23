import { FastifyPluginAsync } from 'fastify'
import {
  listPersonsWithSignificantControl,
  Context,
  initListPersonsWithSignificantControlCollection
} from '../service/listPersonsWithSignificantControl.js'
import { auth } from './reflect.js'
import {
  ListPersonsWithSignificantControlSchema as schema,
  ListPersonsWithSignificantControlQueryString,
  ListPersonsWithSignificantControlParams
} from '../schemas/listPersonsWithSignificantControlSchema.js'

const listPersonsWithSignificantControlController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({
    route: 'listPersonsWithSignificantControl'
  })
  await initListPersonsWithSignificantControlCollection(fastify.mongo.db)
  fastify.get<{
    Params: ListPersonsWithSignificantControlParams
    Querystring: ListPersonsWithSignificantControlQueryString
  }>(
    '/company/:company_number/persons-with-significant-control',
    schema,
    async (req, res) => {
      const { company_number } = req.params
      const { items_per_page, start_index, register_view } = req.query
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
            message:
              'Basic authentication token not included in request header.'
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
      const result = await listPersonsWithSignificantControl(
        context,
        company_number,
        items_per_page,
        start_index,
        register_view
      )
      if (result) return result
      else
        res
          .code(404)
          .send({ statusCode: 404, error: 'Not found', message: 'Company PSC not found' })
    }
  )
}
export default listPersonsWithSignificantControlController
