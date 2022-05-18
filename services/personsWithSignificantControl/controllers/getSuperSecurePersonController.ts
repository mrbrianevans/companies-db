import {FastifyPluginAsync} from "fastify";
import {getSuperSecurePerson} from "../service/getSuperSecurePerson.js";
import {
  GetSuperSecurePersonParams,
  GetSuperSecurePersonQueryString,
  GetSuperSecurePersonSchema as schema
} from "../schemas/GetSuperSecurePersonSchema.js";


export const getSuperSecurePersonController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetSuperSecurePersonParams, Querystring: GetSuperSecurePersonQueryString }>('/company/:company_number/persons-with-significant-control/super-secure/:super_secure_id', schema, (req, res) => {
    const {company_number, super_secure_id} = req.params
    const {} = req.query
    return getSuperSecurePerson(company_number, super_secure_id)
  })
}

