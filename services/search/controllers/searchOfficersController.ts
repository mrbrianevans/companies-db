import {FastifyPluginAsync} from "fastify";
import {searchOfficers} from "../service/searchOfficers.js";
import {
  searchOfficersParams,
  searchOfficersQueryString,
  searchOfficersSchema as schema
} from "../schemas/searchOfficersSchema.js";


export const searchOfficersController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: searchOfficersParams, Querystring: searchOfficersQueryString }>('/search/officers', schema, (req, res) => {
    const {} = req.params
    const {, ,
  }
    = req.query
    return searchOfficers(q, items_per_page, start_index)
  })
}

