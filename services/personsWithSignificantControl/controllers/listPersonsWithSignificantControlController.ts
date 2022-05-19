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
        res.header('X-Ratelimit-Limit', ratelimit.limit)
        res.header('X-Ratelimit-Remain', ratelimit.remain)
        res.header('X-Ratelimit-Reset', ratelimit.reset)
        res.header('X-Ratelimit-Window', ratelimit.window)
        return reflect(req.url)
        return listPersonsWithSignificantControl(
          company_number,
          items_per_page,
          start_index,
          register_view
        )
      }
    )
  }
