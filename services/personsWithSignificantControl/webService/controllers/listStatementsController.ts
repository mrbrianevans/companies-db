import { FastifyPluginAsync } from 'fastify'
import {
  listStatements,
  Context,
  initListStatementsCollection
} from '../service/listStatements.js'
import { auth } from './reflect.js'
import {
  ListStatementsSchema as schema,
  ListStatementsQueryString,
  ListStatementsParams
} from '../schemas/listStatementsSchema.js'

export const listStatementsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.log = fastify.log.child({ route: 'listStatements' })
  await initListStatementsCollection(fastify.mongo.db)
  fastify.get<{
    Params: ListStatementsParams
    Querystring: ListStatementsQueryString
  }>(
    '/company/:company_number/persons-with-significant-control-statements',
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
      const result = listStatements(
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
          .send({ statusCode: 404, error: 'Not found', message: 'Not found' })
    }
  )
}
