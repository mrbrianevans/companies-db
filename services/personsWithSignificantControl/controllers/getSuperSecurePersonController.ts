import {FastifyPluginAsync} from "fastify";
import {getSuperSecurePerson} from "../service/getSuperSecurePerson.js";
import {
  getSuperSecurePersonParams,
  getSuperSecurePersonQueryString,
  getSuperSecurePersonSchema as schema
} from "../schemas/getSuperSecurePersonSchema.js";


export const getSuperSecurePersonController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getSuperSecurePersonParams, Querystring: getSuperSecurePersonQueryString }>('/company/:company_number/persons-with-significant-control/super-secure/:super_secure_id', schema, (req, res) => {
    const {company_number, super_secure_id} = req.params
    const {} = req.query
    return getSuperSecurePerson(company_number, super_secure_id)
  })
}

