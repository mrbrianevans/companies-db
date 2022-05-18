import { FastifyPluginAsync } from 'fastify'
import { getExemptions } from '../service/getExemptions.js'
import {
  GetExemptionsSchema as schema,
  GetExemptionsQueryString,
  GetExemptionsParams,
} from '../schemas/GetExemptionsSchema.js'

export const getExemptionsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetExemptionsParams
    Querystring: GetExemptionsQueryString
  }>('/company/:company_number/exemptions', schema, (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    return getExemptions(company_number)
  })
}
