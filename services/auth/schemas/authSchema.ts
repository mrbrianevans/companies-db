import { FromSchema } from 'json-schema-to-ts'

export const AuthSchema = {
  schema: {
    response: {
      '200': {
        title: 'AuthHeaders',
        required: ['limit', 'remain', 'reset', 'window'],
        properties:{limit: {
            type: 'number',
          },remain: {
            type: 'number',
          },reset: {
            type: 'number',
          },window: {
            type: 'string',
          }},
      },
    },
  },
} as const

export type AuthResponse = FromSchema<
  typeof AuthSchema['schema']['response']['200']
>
