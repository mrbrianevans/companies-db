import {FastifyPluginAsync} from "fastify";
import {getRegisteredOfficeAddress} from "../service/getRegisteredOfficeAddress.js";
import {
  GetRegisteredOfficeAddressParams,
  GetRegisteredOfficeAddressQueryString,
  GetRegisteredOfficeAddressSchema as schema
} from "../schemas/GetRegisteredOfficeAddressSchema.js";


export const getRegisteredOfficeAddressController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: GetRegisteredOfficeAddressParams, Querystring: GetRegisteredOfficeAddressQueryString }>('/company/:company_number/registered-office-address', schema, (req, res) => {
    const {company_number} = req.params
    const {} = req.query
    return getRegisteredOfficeAddress(company_number)
  })
}

