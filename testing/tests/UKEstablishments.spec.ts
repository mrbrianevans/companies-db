import * as TestRequests from '../getTestRequests'
import { testRequests } from '../testRequests'
fetch('http://localhost:3000').catch() //to remove warning about fetch being experimental from test results

describe('ukestablishments-service', function () {
  // tests for each path
  it('getUKEstablishments: /company/{company_number}/uk-establishments', async function () {
    const schema = {
      title: 'companyUKEstablishments',
      required: [],
      properties: {
        etag: { type: 'string', description: 'The ETag of the resource.' },
        kind: {
          type: 'string',
          description: 'UK Establishment companies.',
          enum: ['ukestablishment-companies']
        },
        links: {
          type: 'object',
          description: 'UK Establishment Resources related to this company.',
          title: 'self_links',
          required: [],
          properties: {
            self: { type: 'string', description: 'Link to this company.' }
          }
        },
        items: {
          type: 'array',
          description: 'List of UK Establishment companies.',
          items: {
            title: 'companyDetails',
            required: [],
            properties: {
              company_number: {
                type: 'string',
                description: 'The number of the company.'
              },
              company_name: {
                type: 'string',
                description: 'The name of the company.'
              },
              company_status: {
                type: 'string',
                description: 'Company status.'
              },
              locality: {
                type: 'string',
                description: 'The locality e.g London.'
              },
              links: {
                description: 'Resources related to this company.',
                type: 'array',
                items: {
                  title: 'links',
                  required: [],
                  properties: {
                    company: {
                      type: 'string',
                      description: 'The link to the company.'
                    }
                  },
                  type: 'object'
                }
              }
            },
            type: 'object'
          }
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.getUKEstablishmentsReqs, schema)
  })
})
