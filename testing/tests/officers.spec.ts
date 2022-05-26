import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('officers-service', function () {
  // tests for each path
  it('getOfficers: /company/{company_number}/appointments/{appointment_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            address_line_1: { type: 'string' },
            country: { type: 'string' },
            locality: { type: 'string' },
            postal_code: { type: 'string' },
            premises: { type: 'string' },
            region: { type: 'string' },
            address_line_2: { type: 'string' },
            care_of: { type: 'string' },
            po_box: { type: 'string' }
          }
        },
        appointed_on: { type: 'string' },
        country_of_residence: { type: 'string' },
        date_of_birth: {
          type: 'object',
          properties: { month: { type: 'integer' }, year: { type: 'integer' } },
          required: ['month', 'year']
        },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            officer: {
              type: 'object',
              properties: { appointments: { type: 'string' } },
              required: ['appointments']
            }
          },
          required: ['self', 'officer']
        },
        name: { type: 'string' },
        nationality: { type: 'string' },
        occupation: { type: 'string' },
        officer_role: { type: 'string' },
        resigned_on: { type: 'string' },
        identification: {
          type: 'object',
          properties: {
            identification_type: { type: 'string' },
            legal_authority: { type: 'string' },
            legal_form: { type: 'string' },
            place_registered: { type: 'string' },
            registration_number: { type: 'string' }
          },
          required: ['identification_type']
        },
        former_names: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              surname: { type: 'string' },
              forenames: { type: 'string' }
            },
            required: ['surname']
          }
        }
      },
      required: ['address', 'links', 'name', 'officer_role'],
      additionalProperties: false,
      title: 'getCompanyAppointment',
      example: {
        address: {
          address_line_1: 'Staverton',
          country: 'United Kingdom',
          locality: 'Cheltenham',
          postal_code: 'GL51 0UX',
          premises: 'Staverton Court',
          region: 'Gloucestershire'
        },
        appointed_on: '2011-10-24',
        country_of_residence: 'United Kingdom',
        date_of_birth: { month: 1, year: 1948 },
        links: {
          self: '/company/07820800/appointments/crFJgZgte6RtqRg-esqTYnbMSFs',
          officer: {
            appointments: '/officers/i4lZL1tOKwZA_QCbxvLmIDBZ0b4/appointments'
          }
        },
        name: 'WINCKWORTH, Michael Richard',
        nationality: 'British',
        occupation: 'Company Director',
        officer_role: 'director'
      }
    }
    await testRequests(
      testUrls.getOfficers.map((path) => ({ path })),
      schema
    )
  })

  it('listOfficers: /company/{company_number}/officers', async function () {
    const schema = {
      type: 'object',
      properties: {
        active_count: { type: 'integer' },
        etag: { type: 'string' },
        inactive_count: { type: 'integer' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              address: {
                type: 'object',
                properties: {
                  locality: { type: 'string' },
                  address_line_1: { type: 'string' },
                  premises: { type: 'string' },
                  postal_code: { type: 'string' },
                  country: { type: 'string' },
                  region: { type: 'string' },
                  address_line_2: { type: 'string' },
                  care_of: { type: 'string' },
                  po_box: { type: 'string' }
                }
              },
              appointed_on: { type: 'string' },
              links: {
                type: 'object',
                properties: {
                  self: { type: 'string' },
                  officer: {
                    type: 'object',
                    properties: { appointments: { type: 'string' } },
                    required: ['appointments']
                  }
                },
                required: ['self', 'officer']
              },
              name: { type: 'string' },
              officer_role: { type: 'string' },
              date_of_birth: {
                type: 'object',
                properties: {
                  year: { type: 'integer' },
                  month: { type: 'integer' }
                },
                required: ['year', 'month']
              },
              nationality: { type: 'string' },
              occupation: { type: 'string' },
              country_of_residence: { type: 'string' },
              resigned_on: { type: 'string' },
              identification: {
                type: 'object',
                properties: {
                  identification_type: { type: 'string' },
                  registration_number: { type: 'string' },
                  place_registered: { type: 'string' },
                  legal_authority: { type: 'string' },
                  legal_form: { type: 'string' }
                },
                required: ['identification_type']
              },
              former_names: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    surname: { type: 'string' },
                    forenames: { type: 'string' }
                  }
                }
              }
            },
            required: ['links', 'name', 'officer_role']
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        resigned_count: { type: 'integer' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'active_count',
        'etag',
        'inactive_count',
        'items',
        'items_per_page',
        'kind',
        'links',
        'resigned_count',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'listCompanyOfficers',
      example: {
        active_count: 4,
        etag: '79566b66c86329874c13ce61bae1022dba6dee79',
        inactive_count: 0,
        items: [
          {
            address: {
              locality: 'Glasgow',
              address_line_1: 'Sauchiehall Street',
              premises: '217',
              postal_code: 'G2 3EX',
              country: 'United Kingdom'
            },
            appointed_on: '2017-10-12',
            links: {
              self: '/company/SC578764/appointments/Iz_abzJJlhXIA1S0i20WoVAO5W4',
              officer: {
                appointments:
                  '/officers/nP3gmZB3lWqH98KnxGroxeD_FXQ/appointments'
              }
            },
            name: 'DICKSON, Ian',
            officer_role: 'secretary'
          },
          {
            links: {
              officer: {
                appointments:
                  '/officers/4KhFXpxeyOcEy0kUYfVw7ymCAPo/appointments'
              },
              self: '/company/SC578764/appointments/kT2WRWqaFQVRf1jnI4V26rpfJLE'
            },
            date_of_birth: { year: 1950, month: 4 },
            nationality: 'British',
            occupation: 'Director',
            officer_role: 'director',
            country_of_residence: 'United Kingdom',
            name: 'DICKSON, Ian',
            appointed_on: '2017-10-12',
            address: {
              country: 'United Kingdom',
              locality: 'Glasgow',
              address_line_1: 'Sauchiehall Street',
              postal_code: 'G2 3EX',
              premises: '217'
            }
          },
          {
            occupation: 'Director',
            officer_role: 'director',
            country_of_residence: 'Scotland',
            name: 'MCCALLUM, Colin',
            address: {
              country: 'United Kingdom',
              address_line_1: 'Sauchiehall Street',
              postal_code: 'G2 3EX',
              locality: 'Glasgow',
              premises: '217'
            },
            appointed_on: '2022-02-01',
            links: {
              self: '/company/SC578764/appointments/z_09dfxugbWSiZbZd8UDKrQCh3U',
              officer: {
                appointments:
                  '/officers/1HLYRNBXuWirO2VxG0aIk55ZNEY/appointments'
              }
            },
            nationality: 'British',
            date_of_birth: { year: 1958, month: 3 }
          },
          {
            date_of_birth: { year: 1972, month: 8 },
            nationality: 'British',
            links: {
              officer: {
                appointments:
                  '/officers/FMjH8gNRH1IYdXF9sSgSO4RL8uk/appointments'
              },
              self: '/company/SC578764/appointments/cSkjz1xlTcb3alhlaO6mWgK5zbU'
            },
            appointed_on: '2019-08-25',
            address: {
              premises: '217',
              country: 'United Kingdom',
              address_line_1: 'Sauchiehall Street',
              locality: 'Glasgow',
              postal_code: 'G2 3EX'
            },
            country_of_residence: 'Scotland',
            occupation: 'Director',
            officer_role: 'director',
            name: 'YOUNG, Pauline Agnes'
          },
          {
            links: {
              self: '/company/SC578764/appointments/ZUbltBTnEHJ0gRyAW3e5m9Eot1g',
              officer: {
                appointments:
                  '/officers/gIWdb7lKe_mkPVxFZ6oTsS50600/appointments'
              }
            },
            nationality: 'British',
            date_of_birth: { year: 1949, month: 12 },
            occupation: 'Director',
            officer_role: 'director',
            country_of_residence: 'United Kingdom',
            name: 'CAIRNS, David',
            address: {
              country: 'United Kingdom',
              postal_code: 'G2 3EX',
              address_line_1: 'Sauchiehall Street',
              premises: '217',
              locality: 'Glasgow'
            },
            resigned_on: '2020-03-03',
            appointed_on: '2017-10-12'
          },
          {
            links: {
              officer: {
                appointments:
                  '/officers/I2mO4LGkIHc3r8tKeMkbzU8AzGY/appointments'
              },
              self: '/company/SC578764/appointments/-8qz5QzZBnPKnUJH-JWJfWBg-O4'
            },
            date_of_birth: { month: 5, year: 1962 },
            nationality: 'British',
            occupation: 'Director',
            officer_role: 'director',
            country_of_residence: 'United Kingdom',
            name: 'MACKIE, John Ross',
            resigned_on: '2019-02-06',
            appointed_on: '2017-10-12',
            address: {
              locality: 'Glasgow',
              postal_code: 'G2 3EX',
              premises: '217',
              country: 'United Kingdom',
              address_line_1: 'Sauchiehall Street'
            }
          },
          {
            name: 'SINCLAIR, Celia Margaret Lloyd',
            country_of_residence: 'United Kingdom',
            occupation: 'Director',
            officer_role: 'director',
            appointed_on: '2017-10-12',
            resigned_on: '2022-01-31',
            address: {
              country: 'United Kingdom',
              address_line_1: 'Sauchiehall Street',
              postal_code: 'G2 3EX',
              locality: 'Glasgow',
              premises: '217'
            },
            links: {
              officer: {
                appointments:
                  '/officers/5ymszo9eA4oUAFboil6bm1sSfaU/appointments'
              },
              self: '/company/SC578764/appointments/yr2pkyWU-wTKRo94eov84ArehlA'
            },
            date_of_birth: { month: 4, year: 1947 },
            nationality: 'British'
          },
          {
            links: {
              officer: {
                appointments:
                  '/officers/Xyy43RTMDaH3yesypIaEdACu0rE/appointments'
              },
              self: '/company/SC578764/appointments/XtsO7txqc9OTN6F1bm7EeZINW_w'
            },
            date_of_birth: { year: 1939, month: 11 },
            nationality: 'British',
            officer_role: 'director',
            occupation: 'Director',
            country_of_residence: 'Scotland',
            name: 'TAYLOR, Maurice Vincent',
            resigned_on: '2021-07-21',
            appointed_on: '2017-10-12',
            address: {
              address_line_1: 'Sauchiehall Street',
              postal_code: 'G2 3EX',
              country: 'United Kingdom',
              premises: '217',
              locality: 'Glasgow'
            }
          }
        ],
        items_per_page: 35,
        kind: 'officer-list',
        links: { self: '/company/SC578764/officers' },
        resigned_count: 4,
        start_index: 0,
        total_results: 8
      }
    }
    await testRequests(
      testUrls.listOfficers.map((path) => ({ path })),
      schema
    )
  })
})
