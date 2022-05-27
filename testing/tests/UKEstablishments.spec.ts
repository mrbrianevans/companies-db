import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('ukestablishments-service', function () {
  this.timeout(5000)
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
                anyOf: [
                  {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        company: {
                          type: 'string',
                          description: 'The link to the company.'
                        }
                      },
                      required: ['company']
                    }
                  },
                  {
                    type: 'object',
                    properties: { company: { type: 'string' } },
                    required: ['company']
                  }
                ]
              },
              locality: { type: 'string' },
              company_number: { type: 'string' },
              company_name: { type: 'string' },
              company_status: { type: 'string' }
            },
            required: [
              'links',
              'company_number',
              'company_name',
              'company_status'
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
      required: ['etag', 'items', 'kind'],
      additionalProperties: false,
      title: 'getUKEstablishments',
      example: {
        etag: 'e107f7caacf1efb5019ac55144b1f8d0568a0f10',
        items: [
          {
            links: { company: '/company/BR023799' },
            locality: 'Farnham',
            company_number: 'BR023799',
            company_name: 'UPPER FROYLE PROPERTY INVESTMENTS LIMITED',
            company_status: 'open'
          }
        ],
        kind: 'related-companies',
        links: { self: '/company/FC038704' }
      }
    }
    await testRequests(
      testUrls.getUKEstablishments.map((path) => ({ path })),
      schema
    )
  })
})
