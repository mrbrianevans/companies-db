import Fastify from 'fastify'
import {listFilingHistoryController} from "./controllers/listFilingHistoryController.js";
import {getFilingHistoryController} from "./controllers/getFilingHistoryController.js";
const fastify = Fastify({logger: true})

fastify.register(listFilingHistoryController)
fastify.register(getFilingHistoryController)

await fastify.listen(3000)
