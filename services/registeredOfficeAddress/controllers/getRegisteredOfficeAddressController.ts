import {FastifyPluginAsync} from "fastify";
import {getRegisteredOfficeAddress} from "../service/getRegisteredOfficeAddress.js";
import {
  getRegisteredOfficeAddressParams,
  getRegisteredOfficeAddressQueryString,
  getRegisteredOfficeAddressSchema as schema
} from "../schemas/getRegisteredOfficeAddressSchema.js";


export const getRegisteredOfficeAddressController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: getRegisteredOfficeAddressParams, Querystring: getRegisteredOfficeAddressQueryString }>('/company/:company_number/registered-office-address', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getRegisteredOfficeAddress(company_number)
  })
}

