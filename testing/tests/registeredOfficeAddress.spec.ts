import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('registered-office-address-service', function () {
  // tests for each path
  it('getRegisteredOfficeAddress: /company/{company_number}/registered-office-address', async function () {
    const schema = {
      type: 'object',
      properties: {
        address_line_1: { type: 'string' },
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
        address_line_2: { type: 'string' },
        po_box: { type: 'string' }
      },
      required: ['etag', 'kind', 'links'],
      additionalProperties: false,
      title: 'getRegisteredOfficeAddress',
      example: {
        address_line_1: '29a High Street',
        country: 'England',
        etag: 'd932765332d66741b03f7bd9db5d9cf5f4286642',
        kind: 'registered-office-address',
        links: { self: '/company/14057702/registered-office-address' },
        locality: 'Banstead',
        postal_code: 'SM7 2NH',
        region: 'Surrey'
      }
    }
    await testRequests(
      testUrls.getRegisteredOfficeAddress.map((path) => ({ path })),
      schema
    )
  })
})
