import { FromSchema } from 'json-schema-to-ts'

export interface SearchAllParams {}

export interface SearchAllQueryString {
  /** The term being searched for. */
  q: string
  /** The number of search results to return per page. */
  items_per_page?: number
  /** The index of the first result item to return. */
  start_index?: number
}

export const SearchAllSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {},
      required: []
    },
    querystring: {
      type: 'object',
      properties: {
        q: {
          type: 'string'
        },
        items_per_page: {
          type: 'integer'
        },
        start_index: {
          type: 'integer'
        }
      },
      required: ['q']
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                kind: {
                  type: 'string'
                },
                address_snippet: {
                  type: ['null', 'string']
                },
                description_identifier: {
                  anyOf: [
                    {
                      type: 'string',
                      description:
                        'An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations',
                      enum: [
                        'incorporated-on',
                        'registered-on',
                        'formed-on',
                        'dissolved-on',
                        'converted-closed-on',
                        'closed-on',
                        'closed',
                        'first-uk-establishment-opened-on',
                        'opened-on',
                        'voluntary-arrangement',
                        'receivership',
                        'insolvency-proceedings',
                        'liquidation',
                        'administration',
                        'appointment-count',
                        'born-on'
                      ]
                    },
                    {
                      type: 'array',
                      items: {
                        type: ['null', 'string']
                      }
                    }
                  ]
                },
                address: {
                  anyOf: [
                    {
                      type: 'null'
                    },
                    {
                      type: 'object',
                      properties: {
                        address_line_1: {
                          type: 'string'
                        },
                        postal_code: {
                          type: 'string'
                        },
                        premises: {
                          type: 'string'
                        },
                        address_line_2: {
                          type: 'string'
                        },
                        region: {
                          type: 'string'
                        },
                        locality: {
                          type: 'string'
                        },
                        country: {
                          type: 'string'
                        },
                        care_of_name: {
                          type: 'string'
                        },
                        po_box: {
                          type: 'string'
                        },
                        care_of: {
                          type: 'string'
                        }
                      }
                    }
                  ]
                },
                company_type: {
                  type: 'string'
                },
                snippet: {
                  type: 'string'
                },
                links: {
                  type: 'object',
                  properties: {
                    self: {
                      type: 'string'
                    }
                  },
                  required: ['self']
                },
                company_number: {
                  type: 'string'
                },
                title: {
                  type: 'string'
                },
                company_status: {
                  type: ['null', 'string']
                },
                date_of_creation: {
                  type: ['null', 'string']
                },
                description: {
                  type: 'string'
                },
                matches: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'array',
                      items: {
                        type: 'integer'
                      }
                    },
                    snippet: {
                      type: 'array',
                      items: {
                        type: 'integer'
                      }
                    }
                  },
                  required: ['snippet']
                },
                description_identifiers: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                },
                appointment_count: {
                  type: 'integer'
                },
                date_of_cessation: {
                  type: 'string'
                },
                external_registration_number: {
                  type: 'string'
                },
                date_of_birth: {
                  type: 'object',
                  properties: {
                    year: {
                      type: 'integer'
                    },
                    month: {
                      type: 'integer'
                    }
                  },
                  required: ['year', 'month']
                }
              },
              required: ['kind', 'address_snippet', 'address', 'links', 'title']
            }
          },
          items_per_page: {
            type: 'integer'
          },
          kind: {
            type: 'string'
          },
          page_number: {
            type: 'integer'
          },
          start_index: {
            type: 'integer'
          },
          total_results: {
            type: 'integer'
          }
        },
        additionalProperties: false,
        title: 'searchAll',
        example: {
          items: [
            {
              kind: 'searchresults#company',
              address_snippet: '177  Preston Road, Brighton, BN1 6BS',
              description_identifier: ['registered-on'],
              address: {
                address_line_1: 'Preston Road',
                postal_code: 'BN1 6BS',
                premises: '177 ',
                address_line_2: 'Brighton'
              },
              company_type: 'limited-partnership',
              snippet: '',
              links: {
                self: '/company/LP004730'
              },
              company_number: 'LP004730',
              title: 'ELITE L.P.',
              company_status: 'active',
              date_of_creation: '1994-10-11',
              description: 'LP004730 - Registered on 11 October 1994',
              matches: {
                title: [1, 5],
                snippet: []
              }
            },
            {
              company_status: 'active',
              title: 'ELITE LIMITED',
              matches: {
                snippet: [],
                title: [1, 5]
              },
              description: '03759064 - Incorporated on 26 April 1999',
              date_of_creation: '1999-04-26',
              address_snippet:
                'Unit 8 Acorn Business Park, Northarbour Road, Portsmouth, Hampshire, PO6 3TH',
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              company_number: '03759064',
              company_type: 'ltd',
              links: {
                self: '/company/03759064'
              },
              snippet: '',
              address: {
                postal_code: 'PO6 3TH',
                region: 'Hampshire',
                premises: 'Unit 8',
                locality: 'Portsmouth',
                address_line_2: 'Northarbour Road',
                address_line_1: 'Acorn Business Park'
              }
            },
            {
              snippet: '',
              links: {
                self: '/officers/c02SW1uRHkTSjfjwxZ7Gvu6WNvc/appointments'
              },
              description_identifiers: ['appointment-count'],
              address: {
                premises: '36',
                postal_code: 'N12 0PS',
                region: '06210055',
                locality: 'London',
                address_line_1: 'Woodgrange Avenue'
              },
              address_snippet:
                '36 Woodgrange Avenue, London, 06210055, N12 0PS',
              kind: 'searchresults#officer',
              description: 'Total number of appointments 0',
              matches: {
                snippet: [],
                title: [1, 5]
              },
              appointment_count: 0,
              title: 'ELITE HOMECARE & PROPERTIES LIMITED'
            },
            {
              address: {
                address_line_1: 'Sperry Way',
                country: 'England',
                locality: 'Stonehouse',
                postal_code: 'GL10 3UT',
                premises: '701 Stonehouse Park'
              },
              description_identifiers: ['appointment-count'],
              snippet: '',
              links: {
                self: '/officers/DB17-4TJAGLDvUSRJBa-s3BS5OI/appointments'
              },
              kind: 'searchresults#officer',
              address_snippet:
                '701 Stonehouse Park, Sperry Way, Stonehouse, England, GL10 3UT',
              description: 'Total number of appointments 1',
              matches: {
                title: [1, 5],
                snippet: []
              },
              title: 'ELITE SPORT PHYSIOTHERAPY LTD',
              appointment_count: 1
            },
            {
              address: {
                premises: '4',
                postal_code: 'IP8 3ER',
                locality: 'Ipswich',
                country: 'United Kingdom',
                address_line_1: 'Kenney Close'
              },
              description_identifiers: ['appointment-count'],
              snippet: '',
              links: {
                self: '/officers/5LA3v-W3mhOZrZ6bbzVTHK5W0BM/appointments'
              },
              kind: 'searchresults#officer',
              address_snippet:
                '4 Kenney Close, Ipswich, United Kingdom, IP8 3ER',
              description: 'Total number of appointments 1',
              matches: {
                title: [1, 5],
                snippet: []
              },
              title: 'ELITE CATERING BREAKDOWNS LTD',
              appointment_count: 1
            },
            {
              title: 'ELITE SURGEONS LTD',
              appointment_count: 1,
              description: 'Total number of appointments 1',
              matches: {
                title: [1, 5],
                snippet: []
              },
              kind: 'searchresults#officer',
              address_snippet:
                '33 Washington Apartments, 5 Lexington Gardens, Birmingham, England, B15 2DR',
              description_identifiers: ['appointment-count'],
              address: {
                locality: 'Birmingham',
                postal_code: 'B15 2DR',
                premises: '33 Washington Apartments',
                address_line_1: '5 Lexington Gardens',
                country: 'England'
              },
              links: {
                self: '/officers/d931-sswWLMP4yMq9i36NqmxTeg/appointments'
              },
              snippet: ''
            },
            {
              matches: {
                title: [1, 5],
                snippet: []
              },
              description: 'Total number of appointments 0',
              title: 'ELITE SOLUTIONS LONDON LTD',
              appointment_count: 0,
              address: {
                address_line_1: '22 Warrington Road',
                postal_code: 'HA1 1SY',
                region: 'Middlesex',
                locality: 'Harrow'
              },
              description_identifiers: ['appointment-count'],
              snippet: '',
              links: {
                self: '/officers/WULFP3L3OrAHL-5F3r6AvmuqCJA/appointments'
              },
              kind: 'searchresults#officer',
              address_snippet: '22 Warrington Road, Harrow, Middlesex, HA1 1SY'
            },
            {
              title: 'ELITE LIMOUSINES VIP PROTECTION SERVICES LTD',
              appointment_count: 0,
              matches: {
                title: [1, 5],
                snippet: []
              },
              description: 'Total number of appointments 0',
              kind: 'searchresults#officer',
              address_snippet: '55 Daresbury Street, Manchester, M8 9LW',
              description_identifiers: ['appointment-count'],
              address: {
                postal_code: 'M8 9LW',
                premises: '55',
                locality: 'Manchester',
                address_line_1: 'Daresbury Street'
              },
              links: {
                self: '/officers/LILVK5J1dJkM9BBcO0YhrLg-BZI/appointments'
              },
              snippet: ''
            },
            {
              address: {
                postal_code: 'WA1 1PG',
                premises: 'Halton View Villas',
                locality: 'Warrington',
                country: 'United Kingdom',
                address_line_1: '3-5 Wilson Patten Street'
              },
              description_identifiers: ['appointment-count'],
              links: {
                self: '/officers/pWtg9w3wPYwzl3z1hSJEB8WKS58/appointments'
              },
              snippet: 'ELITE EXECUTIVE DEVELOPMENTS ',
              kind: 'searchresults#officer',
              address_snippet:
                'Halton View Villas, 3-5 Wilson Patten Street, Warrington, United Kingdom, WA1 1PG',
              matches: {
                snippet: [1, 5]
              },
              description: 'Total number of appointments 1',
              title: 'JC & NB DEVELOPMENTS LTD',
              appointment_count: 1
            },
            {
              appointment_count: 1,
              title: 'ELITE STEWARTBY LIMITED',
              description: 'Total number of appointments 1',
              matches: {
                title: [1, 5],
                snippet: []
              },
              address_snippet:
                'E3, The Premier Centre, Abbey Park, Romsey, England, SO51 9DG',
              kind: 'searchresults#officer',
              snippet: '',
              links: {
                self: '/officers/8v1E0K4774JvWrhJXLidQfevFkM/appointments'
              },
              description_identifiers: ['appointment-count'],
              address: {
                address_line_1: 'The Premier Centre',
                country: 'England',
                locality: 'Romsey',
                address_line_2: 'Abbey Park',
                postal_code: 'SO51 9DG',
                premises: 'E3'
              }
            },
            {
              description_identifiers: ['appointment-count'],
              address: {
                country: 'England',
                address_line_1: 'Mitton Road',
                premises: 'Unit 23 Mitton Road Business Park',
                postal_code: 'BB7 9YE',
                address_line_2: 'Whalley',
                locality: 'Clitheroe'
              },
              links: {
                self: '/officers/UvYcFPdrW3VQdzqcWHKUMOIECck/appointments'
              },
              snippet: '',
              kind: 'searchresults#officer',
              address_snippet:
                'Unit 23 Mitton Road Business Park, Mitton Road, Whalley, Clitheroe, England, BB7 9YE',
              matches: {
                title: [1, 5],
                snippet: []
              },
              description: 'Total number of appointments 1',
              title: 'ELITE BALUSTRADE SYSTEMS LTD',
              appointment_count: 1
            },
            {
              snippet: '',
              links: {
                self: '/officers/OxtUkv3nUJ4bFBjZhrMc0IbVqoI/appointments'
              },
              address: {
                address_line_1: 'Ruttonjee House',
                country: 'China',
                address_line_2: '11 Duddell Street, Central',
                locality: 'Hong Kong',
                premises: 'Suite 1203, 12th Floor,'
              },
              description_identifiers: ['appointment-count'],
              address_snippet:
                'Suite 1203, 12th Floor,, Ruttonjee House, 11 Duddell Street, Central, Hong Kong, China',
              kind: 'searchresults#officer',
              matches: {
                title: [1, 5],
                snippet: []
              },
              description: 'Total number of appointments 1',
              appointment_count: 1,
              title: 'ELITE GLOBAL SECRETARIES LIMITED'
            },
            {
              title: 'ELITE EXPORTS INC. S.A. ',
              appointment_count: 1,
              matches: {
                title: [1, 5],
                snippet: []
              },
              description: 'Total number of appointments 1',
              kind: 'searchresults#officer',
              address_snippet:
                'Calle Aquilino De La Guardia No. 8, Edificio Igra, Panama, Panama',
              description_identifiers: ['appointment-count'],
              address: {
                address_line_1: 'Edificio Igra',
                country: 'Panama',
                locality: 'Panama',
                premises: 'Calle Aquilino De La Guardia No. 8'
              },
              snippet: '',
              links: {
                self: '/officers/sZGZIY8_hDkxiV4T3LUsaM3S_NE/appointments'
              }
            },
            {
              description: 'Total number of appointments 1',
              matches: {
                title: [1, 5],
                snippet: []
              },
              appointment_count: 1,
              title: 'ELITE KOM KONSULTS LIMITED',
              snippet: '',
              links: {
                self: '/officers/oH_zk7iqQAm7O26ZZjVfPlINvYI/appointments'
              },
              description_identifiers: ['appointment-count'],
              address: {
                country: 'England',
                address_line_1: 'Oxlip Close',
                postal_code: 'CV23 0JQ',
                premises: '17',
                locality: 'Rugby'
              },
              address_snippet: '17 Oxlip Close, Rugby, England, CV23 0JQ',
              kind: 'searchresults#officer'
            },
            {
              kind: 'searchresults#officer',
              address_snippet:
                'Trevear House, Old County Court, Alverton Terrace, Penzance, Cornwall, United Kingdom, TR18 4GH',
              description_identifiers: ['appointment-count'],
              address: {
                address_line_1: 'Old County Court',
                country: 'United Kingdom',
                address_line_2: 'Alverton Terrace',
                locality: 'Penzance',
                premises: 'Trevear House',
                postal_code: 'TR18 4GH',
                region: 'Cornwall'
              },
              snippet: '',
              links: {
                self: '/officers/gkQ9e_xmNMQ6OukcE_jFyFDUDv4/appointments'
              },
              title: 'ELITE ESTATES HOLDINGS LIMITED',
              appointment_count: 1,
              matches: {
                snippet: [],
                title: [1, 5]
              },
              description: 'Total number of appointments 1'
            },
            {
              appointment_count: 2,
              title: 'ELITE ORTHOPAEDIC SERVICES LIMITED',
              matches: {
                title: [1, 5],
                snippet: []
              },
              description: 'Total number of appointments 2',
              address_snippet:
                'Khamillah House, Dawbers Lane, Euxton, Chorley, Lancs, England, PR7 6EQ',
              kind: 'searchresults#officer',
              snippet: '',
              links: {
                self: '/officers/Da7R__qergsTf9Il4SBEpCt5TBk/appointments'
              },
              address: {
                address_line_2: 'Euxton',
                locality: 'Chorley',
                premises: 'Khamillah House',
                postal_code: 'PR7 6EQ',
                region: 'Lancs',
                address_line_1: 'Dawbers Lane',
                country: 'England'
              },
              description_identifiers: ['appointment-count']
            },
            {
              address_snippet: '1 Hatherwood, Leatherhead, England, KT22 8TT',
              kind: 'searchresults#officer',
              links: {
                self: '/officers/hbyLd2Woid57OklADqKNJ3Qzn4Y/appointments'
              },
              snippet: '',
              description_identifiers: ['appointment-count'],
              address: {
                locality: 'Leatherhead',
                postal_code: 'KT22 8TT',
                premises: '1',
                address_line_1: 'Hatherwood',
                country: 'England'
              },
              appointment_count: 2,
              title: 'ELITES GLOBAL GROUP LTD',
              matches: {
                title: [1, 6],
                snippet: []
              },
              description: 'Total number of appointments 2'
            },
            {
              description_identifiers: ['appointment-count'],
              address: {
                address_line_1: 'Highfield Road',
                country: 'United Kingdom',
                locality: 'Dartford',
                premises: '43',
                postal_code: 'DA1 2JS'
              },
              snippet: '',
              links: {
                self: '/officers/iQ2Yo64S43Dfa0SUL3RaRg8B5Sk/appointments'
              },
              kind: 'searchresults#officer',
              address_snippet:
                '43 Highfield Road, Dartford, United Kingdom, DA1 2JS',
              description: 'Total number of appointments 0',
              matches: {
                snippet: [],
                title: [1, 5]
              },
              title: 'ELITE OFFICE CLEANING SERVICES LIMITED',
              appointment_count: 0
            },
            {
              snippet: '',
              links: {
                self: '/officers/SKpD2gaV35Zh4BSB0OiJsFvJMg0/appointments'
              },
              description_identifiers: ['appointment-count'],
              address: {
                locality: 'London',
                postal_code: 'N11 2BJ',
                premises: '71',
                address_line_1: 'Brownlow Road'
              },
              address_snippet: '71 Brownlow Road, London, N11 2BJ',
              kind: 'searchresults#officer',
              matches: {
                title: [1, 5],
                snippet: []
              },
              description: 'Total number of appointments 0',
              appointment_count: 0,
              title: 'ELITE HOMECARE & PROPERTIES LIMITED'
            },
            {
              description: 'Total number of appointments 1',
              matches: {
                snippet: [],
                title: [1, 5]
              },
              appointment_count: 1,
              title: 'ELITE CARDIOLOGY LIMITED',
              snippet: '',
              links: {
                self: '/officers/Qh8p3eqUHDJgan9JZERxHYN3Xu0/appointments'
              },
              address: {
                locality: 'Wilmslow',
                premises: 'Rex Buildings',
                postal_code: 'SK9 1HY',
                region: 'Cheshire',
                address_line_1: 'Alderley Road',
                country: 'United Kingdom'
              },
              description_identifiers: ['appointment-count'],
              address_snippet:
                'Rex Buildings, Alderley Road, Wilmslow, Cheshire, United Kingdom, SK9 1HY',
              kind: 'searchresults#officer'
            }
          ],
          items_per_page: 20,
          kind: 'search#all',
          page_number: 1,
          start_index: 0,
          total_results: 14028
        }
      }
    }
  }
} as const

export type SearchAllResponse = FromSchema<
  typeof SearchAllSchema['schema']['response']['200']
>
//export type SearchAllResponse = any // temporary until schemas can be fixed
