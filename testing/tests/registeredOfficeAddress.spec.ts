import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('registered-office-address-service', function () {
  this.timeout(5000)
  // tests for each path
  it('getRegisteredOfficeAddress: /company/{company_number}/registered-office-address', async function () {
    const schema = {
      type: 'object',
      properties: {
        address_line_1: { type: 'string' },
        address_line_2: { type: 'string' },
        country: { type: 'string' },
        etag: { type: 'string' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        locality: { type: 'string' },
        postal_code: { type: 'string' },
        region: { type: 'string' },
        po_box: { type: 'string' },
        premises: {
          type: 'string',
          description: 'The property name or number.'
        }
      },
      additionalProperties: false,
      title: 'getRegisteredOfficeAddress',
      example: {
        address_line_1: '8th Floor (West Wing)',
        address_line_2: '54 Hagley Road',
        country: 'United Kingdom',
        etag: 'a914a2ce96e25f11b96d05632be6426e1578ec64',
        kind: 'registered-office-address',
        links: { self: '/company/13612247/registered-office-address' },
        locality: 'Edgbaston',
        postal_code: 'B16 8PE',
        region: 'Birmingham'
      }
    }
    await testRequests(
      testUrls.getRegisteredOfficeAddress.map((path) => ({ path })),
      schema
    )
  })
})
