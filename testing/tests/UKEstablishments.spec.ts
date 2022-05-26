import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('ukestablishments-service', function () {
  // tests for each path
  it('getUKEstablishments: /company/{company_number}/uk-establishments', async function () {
    const schema = {
      type: 'object',
      properties: {
        etag: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              links: {
                type: 'object',
                properties: { company: { type: 'string' } },
                required: ['company']
              },
              company_status: { type: 'string' },
              company_number: { type: 'string' },
              locality: { type: 'string' },
              company_name: { type: 'string' }
            },
            required: [
              'links',
              'company_status',
              'company_number',
              'locality',
              'company_name'
            ]
          }
        },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        }
      },
      required: ['etag', 'items', 'kind', 'links'],
      additionalProperties: false,
      title: 'listUkEstablishments',
      example: {
        etag: '8ad9b7f6dc0c0d0f2fcb8ab6a41db35ccedce243',
        items: [
          {
            links: { company: '/company/BR023780' },
            company_status: 'open',
            company_number: 'BR023780',
            locality: 'London',
            company_name: 'LINCOLN MIDCO PTE. LIMITED'
          }
        ],
        kind: 'related-companies',
        links: { self: '/company/FC038685' }
      }
    }
    await testRequests(
      testUrls.getUKEstablishments.map((path) => ({ path })),
      schema
    )
  })
})
