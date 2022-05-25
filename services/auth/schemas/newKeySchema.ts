import { FromSchema } from 'json-schema-to-ts'

export const NewKeySchema = {
  schema: {
    response: {
      '200': {
        title: 'AuthHeaders',
        required: ['X-Ratelimit-Limit', 'X-Ratelimit-Remain', 'X-Ratelimit-Reset', 'X-Ratelimit-Window', 'key'],
        properties:{'X-Ratelimit-Limit': {
            type: 'number',
          },'X-Ratelimit-Remain': {
            type: 'number',
          },'X-Ratelimit-Reset': {
            type: 'number',
          },'X-Ratelimit-Window': {
            type: 'string',
          },'key': {
            type: 'string',
          }},
      },
    },
  },
} as const

export type NewKeyResponse = FromSchema<
  typeof NewKeySchema['schema']['response']['200']
  >
