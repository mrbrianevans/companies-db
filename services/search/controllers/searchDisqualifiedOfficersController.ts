import {FastifyPluginAsync} from "fastify";
import {searchDisqualifiedOfficers} from "../service/searchDisqualifiedOfficers.js";
import {
  searchDisqualifiedOfficersParams,
  searchDisqualifiedOfficersQueryString,
  searchDisqualifiedOfficersSchema as schema
} from "../schemas/searchDisqualifiedOfficersSchema.js";


export const searchDisqualifiedOfficersController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: searchDisqualifiedOfficersParams, Querystring: searchDisqualifiedOfficersQueryString }>('/search/disqualified-officers', schema, (req, res) => {
    const {} = req.params
    const {, ,
  }
    = req.query
    return searchDisqualifiedOfficers(q, items_per_page, start_index)
  })
}

