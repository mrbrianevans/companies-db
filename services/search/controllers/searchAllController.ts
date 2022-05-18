import {FastifyPluginAsync} from "fastify";
import {searchAll} from "../service/searchAll.js";
import {SearchAllParams, SearchAllQueryString, SearchAllSchema as schema} from "../schemas/SearchAllSchema.js";


export const searchAllController: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{ Params: SearchAllParams, Querystring: SearchAllQueryString }>('/search', schema, (req, res) => {
    const {} = req.params
    const {, ,
  }
    = req.query
    return searchAll(q, items_per_page, start_index)
  })
}

