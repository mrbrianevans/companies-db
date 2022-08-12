import { FastifyMongoNestedObject, FastifyMongoObject } from '@fastify/mongodb'
import { FastifyRedis } from '@fastify/redis'

declare module 'fastify' {
  export interface FastifyInstance {
    // fastify mongo
    mongo: FastifyMongoObject & FastifyMongoNestedObject
    // fastify redis
    redis: FastifyRedis
  }
}
export {}
