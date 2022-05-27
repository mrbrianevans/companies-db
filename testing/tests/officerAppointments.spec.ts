import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('officer-appointments-service', function () {
  this.timeout(5000)
  // tests for each path
  it('listOfficerAppointments: /officers/{officer_id}/appointments', async function () {
    const schema = {
      type: 'object',
      properties: {
        date_of_birth: {
          type: 'object',
          properties: { year: { type: 'integer' }, month: { type: 'integer' } },
          required: ['year', 'month']
        },
        etag: { type: 'string' },
        is_corporate_officer: { type: 'boolean' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              officer_role: { type: 'string' },
              appointed_to: {
                type: 'object',
                properties: {
                  company_status: { type: 'string' },
                  company_name: { type: 'string' },
                  company_number: { type: 'string' }
                },
                required: ['company_number']
              },
              country_of_residence: { type: 'string' },
              address: {
                anyOf: [
                  {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        address_line_1: {
                          description: 'The first line of the address.',
                          type: 'string'
                        },
                        address_line_2: {
                          description: 'The second line of the address.',
                          type: 'string'
                        },
                        care_of: {
                          description: 'The care of name.',
                          type: 'string'
                        },
                        country: {
                          description: 'The country. For example, UK.',
                          type: 'string'
                        },
                        locality: {
                          description: 'The locality. For example London.',
                          type: 'string'
                        },
                        po_box: {
                          description: 'The post-office box number.',
                          type: 'string'
                        },
                        postal_code: {
                          description: 'The postal code. For example CF14 3UZ.',
                          type: 'string'
                        },
                        premises: {
                          description: 'The property name or number.',
                          type: 'string'
                        },
                        region: {
                          description: 'The region. For example Surrey.',
                          type: 'string'
                        }
                      }
                    }
                  },
                  {
                    type: 'object',
                    properties: {
                      postal_code: { type: 'string' },
                      address_line_1: { type: 'string' },
                      region: { type: 'string' },
                      locality: { type: 'string' },
                      premises: { type: 'string' },
                      country: { type: 'string' },
                      address_line_2: { type: 'string' },
                      care_of: { type: 'string' },
                      po_box: { type: 'string' }
                    }
                  }
                ]
              },
              name_elements: {
                type: 'object',
                properties: {
                  forename: { type: 'string' },
                  other_forenames: { type: 'string' },
                  title: { type: 'string' },
                  surname: { type: 'string' },
                  honours: { type: 'string' }
                },
                required: ['surname']
              },
              appointed_on: { type: 'string' },
              name: { type: 'string' },
              links: {
                type: 'object',
                properties: { company: { type: 'string' } },
                required: ['company']
              },
              nationality: { type: 'string' },
              resigned_on: { type: 'string' },
              occupation: { type: 'string' },
              is_pre_1992_appointment: { type: 'boolean' },
              appointed_before: { type: 'string' },
              identification: {
                type: 'object',
                properties: {
                  registration_number: { type: 'string' },
                  place_registered: { type: 'string' },
                  identification_type: { type: 'string' },
                  legal_authority: { type: 'string' },
                  legal_form: { type: 'string' }
                }
              },
              former_names: {
                anyOf: [
                  {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        forenames: { type: 'string' },
                        surname: { type: 'string' }
                      }
                    }
                  },
                  {
                    type: 'object',
                    properties: {
                      forenames: {
                        description: 'Former forenames of the officer.',
                        type: 'string'
                      },
                      surname: {
                        description: 'Former surnames of the officer.',
                        type: 'string'
                      }
                    }
                  }
                ]
              }
            },
            required: [
              'officer_role',
              'appointed_to',
              'address',
              'name',
              'links'
            ]
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        name: { type: 'string' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'etag',
        'is_corporate_officer',
        'items',
        'items_per_page',
        'kind',
        'links',
        'name',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'listOfficerAppointments',
      example: {
        date_of_birth: { year: 1971, month: 4 },
        etag: 'c12a22174815a08d78fe2888639d5ddbfdab5779',
        is_corporate_officer: false,
        items: [
          {
            officer_role: 'llp-member',
            appointed_to: {
              company_status: 'active',
              company_name: 'BLUEBAY ASSET MANAGEMENT LLP',
              company_number: 'OC370085'
            },
            country_of_residence: 'United Kingdom',
            address: {
              postal_code: 'W1K 3JR',
              address_line_1: 'Grosvenor Street',
              region: 'Greater London',
              locality: 'London',
              premises: '77'
            },
            name_elements: {
              forename: 'Mark',
              other_forenames: 'Charles David',
              title: 'Mr',
              surname: 'DOWDING'
            },
            appointed_on: '2012-04-02',
            name: 'Mark Charles David DOWDING',
            links: { company: '/company/OC370085' }
          },
          {
            officer_role: 'director',
            name_elements: {
              other_forenames: 'Charles David',
              forename: 'Mark',
              title: 'Mr',
              surname: 'DOWDING'
            },
            address: {
              locality: 'St Albans',
              region: 'Hertfordshire',
              address_line_1: '60 Marshals Drive',
              postal_code: 'AL1 4RF'
            },
            nationality: 'British',
            country_of_residence: 'United Kingdom',
            appointed_to: {
              company_status: 'active',
              company_number: '00949417',
              company_name: 'INVESCO ASSET MANAGEMENT LIMITED'
            },
            resigned_on: '2007-04-05',
            name: 'Mark Charles David DOWDING',
            appointed_on: '2006-09-22',
            occupation: 'Company Director',
            links: { company: '/company/00949417' }
          }
        ],
        items_per_page: 35,
        kind: 'personal-appointment',
        links: { self: '/officers/_KEhtG96oweECRpL-MofQUhT1qI/appointments' },
        name: 'Mark Charles David DOWDING',
        start_index: 0,
        total_results: 2
      }
    }
    await testRequests(
      testUrls.listOfficerAppointments.map((path) => ({ path })),
      schema
    )
  })
})
