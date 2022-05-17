import {FastifyPluginAsync} from "fastify";
import {getCorporateEntities} from "../service/getCorporateEntities.js";
import {
  getCorporateEntitiesParams,
  getCorporateEntitiesQueryString,
  getCorporateEntitiesSchema as schema
} from "../schemas/getCorporateEntitiesSchema.js";


export const getCorporateEntitiesController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getCorporateEntitiesParams, Querystring: getCorporateEntitiesQueryString }>('/company/:company_number/persons-with-significant-control/corporate-entity/:psc_id', schema, (req, res) => {
    const {company_number, psc_id} = req.params
    const {} = req.query
    return getCorporateEntities(company_number, psc_id)
  })
}

