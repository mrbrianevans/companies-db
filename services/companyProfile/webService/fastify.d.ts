

declare module 'fastify'{
  export interface FastifyInstance{
    // fastify mongo
    mongo
    // fastify redis
    redis
  }
}
export {}
