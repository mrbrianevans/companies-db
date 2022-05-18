import {FastifyPluginAsync} from "fastify";
import {listPersonsWithSignificantControl} from "../service/listPersonsWithSignificantControl.js";
import {
  ListPersonsWithSignificantControlParams,
  ListPersonsWithSignificantControlQueryString,
  ListPersonsWithSignificantControlSchema as schema
} from "../schemas/ListPersonsWithSignificantControlSchema.js";


export const listPersonsWithSignificantControlController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: ListPersonsWithSignificantControlParams, Querystring: ListPersonsWithSignificantControlQueryString }>('/company/:company_number/persons-with-significant-control', schema, (req, res) => {
    const {company_number} = req.params
    const {, ,
  }
    = req.query
    return listPersonsWithSignificantControl(company_number, items_per_page, start_index, register_view)
  })
}

