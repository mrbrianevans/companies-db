
// at the moment I am just using a functional approach.
// If I find that I need to call across service functions a lot, then I will switch it to object oriented style like the AuthService.
// Thats what this generator is for (the object oriented approach)
function genServiceClass(){
    const fileContent = `
import type {FastifyRedis} from "@fastify/redis";
import type {FastifyMongo} from "@fastify/mongo";
import type {FastifyRequest} from "fastify";

interface Context{
  redis: FastifyRedis,
  mongo: FastifyMongo
  req: FastifyRequest
}

export class ${Name}Service {
  context: Context

  /**
   * Create a new ${Name}Service. This should only be done once per request.
   * @param context - the context in which the ${Name}Service is being executed. Includes db clients, and req for logging.
   */
  constructor(context: Context) {
    this.context = context
  }

}
    `
}
