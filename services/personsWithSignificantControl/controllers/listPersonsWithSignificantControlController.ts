import { FastifyPluginAsync } from 'fastify'
import { listPersonsWithSignificantControl } from '../service/listPersonsWithSignificantControl.js'
import { reflect, auth } from './reflect.js'
import {
  ListPersonsWithSignificantControlSchema as schema,
  ListPersonsWithSignificantControlQueryString,
  ListPersonsWithSignificantControlParams
} from '../schemas/listPersonsWithSignificantControlSchema.js'

export const listPersonsWithSignificantControlController: FastifyPluginAsync =
  async (fastify, opts) => {
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
        for (const [header, value] of Object.entries(ratelimit))
          res.header(header, value)
        return reflect(req.url)
        const { redis, mongo } = fastify
        const context = { redis, mongo, req }
        return listPersonsWithSignificantControl(
          context,
          company_number,
          items_per_page,
          start_index,
          register_view
        )
      }
    )
  }
