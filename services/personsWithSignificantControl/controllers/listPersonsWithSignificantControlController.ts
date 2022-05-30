import { FastifyPluginAsync } from 'fastify'
import {
  listPersonsWithSignificantControl,
  Context,
  initListPersonsWithSignificantControlCollection
} from '../service/listPersonsWithSignificantControl.js'
import { reflect, auth } from './reflect.js'
import {
  ListPersonsWithSignificantControlSchema as schema,
  ListPersonsWithSignificantControlQueryString,
  ListPersonsWithSignificantControlParams
} from '../schemas/listPersonsWithSignificantControlSchema.js'

export const listPersonsWithSignificantControlController: FastifyPluginAsync =
  async (fastify, opts) => {
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
        const ratelimit = await auth({
          Authorization: req.headers.authorization
        })
        for (const [header, value] of Object.entries(ratelimit ?? {}))
          res.header(header, value)
        if (ratelimit?.['X-Ratelimit-Remain'] <= 0) {
          res.code(429).send('Rate limit hit')
          return
        }
        const { redis, mongo } = fastify
        const context: Context = { redis, mongo, req }
        const result = listPersonsWithSignificantControl(
          context,
          company_number,
          items_per_page,
          start_index,
          register_view
        )
        if (result) return result
        else res.code(404).send('Not found')
      }
    )
  }
