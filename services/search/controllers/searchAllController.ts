import {FastifyPluginAsync} from "fastify";
import {searchAll} from "../service/searchAll.js";
import {searchAllParams, searchAllQueryString, searchAllSchema as schema} from "../schemas/searchAllSchema.js";


export const searchAllController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: searchAllParams, Querystring: searchAllQueryString }>('/search', schema, (req, res) => {
    const {} = req.params
    const {, ,
  }
    = req.query
    return searchAll(q, items_per_page, start_index)
  })
}

