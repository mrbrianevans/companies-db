import { FromSchema } from 'json-schema-to-ts'

export const AuthSchema = {
  schema: {
    response: {
      '200': {
        title: 'AuthHeaders',
        required: ['X-Ratelimit-Limit', 'X-Ratelimit-Remain', 'X-Ratelimit-Reset', 'X-Ratelimit-Window'],
        properties:{'X-Ratelimit-Limit': {
            type: 'number',
          },'X-Ratelimit-Remain': {
            type: 'number',
          },'X-Ratelimit-Reset': {
            type: 'number',
          },'X-Ratelimit-Window': {
            type: 'string',
          }},
      },
    },
  },
} as const

export type AuthResponse = FromSchema<
  typeof AuthSchema['schema']['response']['200']
>
