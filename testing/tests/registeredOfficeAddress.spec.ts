import * as TestRequests from '../getTestRequests'
import { testRequests } from '../testRequests'
fetch('http://localhost:3000').catch() //to remove warning about fetch being experimental from test results

describe('registered-office-address-service', function () {
  // tests for each path
  it('getRegisteredOfficeAddress: /company/{company_number}/registered-office-address', async function () {
    const schema = {
      title: 'registeredOfficeAddress',
      type: 'object',
      required: [],
      properties: {
        etag: {
          type: 'string',
          description: 'The ETag of the resource.',
          readOnly: true
        },
        kind: {
          type: 'string',
          description: 'The type of resource.',
          enum: ['registered-office-address'],
          readOnly: true
        },
        links: {
          type: 'object',
          description: 'Links to the related resources',
          readOnly: true,
          required: [],
          properties: {
            self: {
              description: 'URL to this resource.',
              readOnly: true,
              type: 'string',
              format: 'uri'
            }
          }
        },
        premises: {
          type: 'string',
          description: 'The property name or number.'
        },
        address_line_1: {
          type: 'string',
          description: 'The first line of the address.'
        },
        address_line_2: {
          type: 'string',
          description: 'The second line of the address.'
        },
        locality: { type: 'string', description: 'The locality e.g London.' },
        region: { type: 'string', description: 'The region e.g Surrey.' },
        postal_code: {
          type: 'string',
          description: 'The postal code e.g CF14 3UZ.'
        },
        country: {
          type: 'string',
          description: 'The country.',
          enum: [
            'England',
            'Wales',
            'Scotland',
            'Northern Ireland',
            'Great Britain',
            'United Kingdom',
            'Not specified'
          ]
        },
        po_box: { type: 'string', description: 'The post-office box number.' }
      }
    }
    await testRequests(TestRequests.getRegisteredOfficeAddressReqs, schema)
  })
})
