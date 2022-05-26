import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('insolvency-service', function () {
  // tests for each path
  it('getInsolvency: /company/{company_number}/insolvency', async function () {
    const schema = {
      type: 'object',
      properties: {
        cases: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              number: { type: 'string' },
              dates: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    date: { type: 'string' },
                    type: { type: 'string' }
                  },
                  required: ['date', 'type']
                }
              },
              type: { type: 'string' },
              practitioners: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    address: {
                      type: 'object',
                      properties: {
                        address_line_1: { type: 'string' },
                        address_line_2: { type: 'string' },
                        locality: { type: 'string' },
                        postal_code: { type: 'string' },
                        region: { type: 'string' },
                        country: { type: 'string' }
                      },
                      required: ['address_line_1']
                    },
                    appointed_on: { type: 'string' },
                    role: { type: 'string' },
                    name: { type: 'string' },
                    ceased_to_act_on: { type: 'string' }
                  },
                  required: ['address', 'role', 'name']
                }
              },
              links: {
                type: 'object',
                properties: { charge: { type: 'string' } },
                required: ['charge']
              },
              notes: { type: 'array', items: { type: 'string' } }
            },
            required: ['number', 'dates', 'type', 'practitioners']
          }
        },
        etag: { type: 'string' },
        status: { type: 'array', items: { type: 'string' } }
      },
      required: ['cases'],
      additionalProperties: false,
      title: 'getInsolvency',
      example: {
        cases: [
          {
            number: '1',
            dates: [
              { date: '2017-03-27', type: 'wound-up-on' },
              { type: 'dissolved-on', date: '2019-06-06' }
            ],
            type: 'members-voluntary-liquidation',
            practitioners: [
              {
                address: {
                  address_line_1: 'Geoffrey Martin & Co 15 Westferry Circus',
                  address_line_2: 'Canary Wharf',
                  locality: 'London',
                  postal_code: 'E14 4HD'
                },
                appointed_on: '2017-03-27',
                role: 'practitioner',
                name: 'Peter Hart'
              },
              {
                address: {
                  postal_code: 'HP9 2NB',
                  region: 'Buckinghamshire',
                  locality: 'Beaconsfield',
                  address_line_1: '5 Baring Road'
                },
                appointed_on: '2017-03-27',
                role: 'practitioner',
                name: 'James Earp'
              }
            ]
          }
        ],
        etag: '9aef08d032eb8ff03e798a4df96f925f3c7bacc2'
      }
    }
    await testRequests(
      testUrls.getInsolvency.map((path) => ({ path })),
      schema
    )
  })
})
