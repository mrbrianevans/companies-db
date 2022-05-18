import {FastifyPluginAsync} from "fastify";
import {searchDisqualifiedOfficers} from "../service/searchDisqualifiedOfficers.js";
import {
  SearchDisqualifiedOfficersParams,
  SearchDisqualifiedOfficersQueryString,
  SearchDisqualifiedOfficersSchema as schema
} from "../schemas/SearchDisqualifiedOfficersSchema.js";


export const searchDisqualifiedOfficersController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: SearchDisqualifiedOfficersParams, Querystring: SearchDisqualifiedOfficersQueryString }>('/search/disqualified-officers', schema, (req, res) => {
    const {} = req.params
    const {q, items_per_page, start_index} = req.query
    return searchDisqualifiedOfficers(q, items_per_page, start_index)
  })
}

