import { FastifyPluginAsync } from 'fastify'
import { getUKEstablishments } from '../service/getUKEstablishments.js'
import {
  GetUKEstablishmentsSchema as schema,
  GetUKEstablishmentsQueryString,
  GetUKEstablishmentsParams,
} from '../schemas/GetUKEstablishmentsSchema.js'

export const getUKEstablishmentsController: FastifyPluginAsync = async (
  fastify,
  opts
) => {
  fastify.get<{
    Params: GetUKEstablishmentsParams
    Querystring: GetUKEstablishmentsQueryString
  }>('/company/:company_number/uk-establishments', schema, (req, res) => {
    const { company_number } = req.params
    const {} = req.query
    return getUKEstablishments(company_number)
  })
}
