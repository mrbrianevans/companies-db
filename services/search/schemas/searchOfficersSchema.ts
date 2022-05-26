import { FromSchema } from 'json-schema-to-ts'

export interface SearchOfficersParams {}

export interface SearchOfficersQueryString {
  /** The term being searched for. */
  q: string
  /** The number of search results to return per page. */
  items_per_page?: number
  /** The index of the first result item to return. */
  start_index?: number
}

export const SearchOfficersSchema = {
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
                address: {
                  type: 'object',
                  properties: {
                    locality: {
                      type: 'string'
                    },
                    country: {
                      type: 'string'
                    },
                    premises: {
                      type: 'string'
                    },
                    address_line_1: {
                      type: 'string'
                    },
                    postal_code: {
                      type: 'string'
                    },
                    address_line_2: {
                      type: 'string'
                    },
                    region: {
                      type: 'string'
                    },
                    care_of: {
                      type: 'string'
                    },
                    po_box: {
                      type: 'string'
                    }
                  }
                },
                description_identifiers: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                },
                kind: {
                  type: 'string'
                },
                address_snippet: {
                  type: 'string'
                },
                title: {
                  type: 'string'
                },
                snippet: {
                  type: 'string'
                },
                appointment_count: {
                  type: 'integer'
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
              required: [
                'address',
                'description_identifiers',
                'kind',
                'address_snippet',
                'title',
                'appointment_count',
                'links',
                'description'
              ]
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
        required: [
          'items',
          'items_per_page',
          'kind',
          'page_number',
          'start_index',
          'total_results'
        ],
        additionalProperties: false,
        title: 'searchOfficers',
        example: {
          items: [
            {
              address: {
                locality: 'Alton',
                country: 'United Kingdom',
                premises: 'The Elkolet Centre',
                address_line_1: 'Mill Lane',
                postal_code: 'GU34 2QG'
              },
              description_identifiers: ['appointment-count'],
              kind: 'searchresults#officer',
              address_snippet:
                'The Elkolet Centre, Mill Lane, Alton, United Kingdom, GU34 2QG',
              title: 'KNOWLES INDUSTRIES (UK) LIMITED',
              snippet: '',
              appointment_count: 5,
              links: {
                self: '/officers/4thsnQuBqNP0opyNEarG4afJTP8/appointments'
              },
              description: 'Total number of appointments 5',
              matches: {
                title: [1, 7],
                snippet: []
              }
            },
            {
              address_snippet:
                'The Elkolet Centre, Mill Lane, Alton, England, GU34 2QG',
              title: 'KNOWLES INDUSTRIES (UK) LIMITED',
              appointment_count: 1,
              links: {
                self: '/officers/WY2Q_jh9LKon6dcIgnhFrNX2OhY/appointments'
              },
              snippet: '',
              matches: {
                title: [1, 7],
                snippet: []
              },
              description: 'Total number of appointments 1',
              address: {
                locality: 'Alton',
                country: 'England',
                premises: 'The Elkolet Centre',
                address_line_1: 'Mill Lane',
                postal_code: 'GU34 2QG'
              },
              description_identifiers: ['appointment-count'],
              kind: 'searchresults#officer'
            },
            {
              appointment_count: 1,
              snippet: '',
              links: {
                self: '/officers/ty6wRGrba6xBXU8Mzu6n5FNGGhQ/appointments'
              },
              description: 'Total number of appointments 1',
              matches: {
                title: [1, 7],
                snippet: []
              },
              title: 'KNOWLES INDUSTRIES (UK) LIMITED',
              address_snippet:
                'The Elkolet Centre, Mill Lane, Alton, United Kingdom, GU34 2QG',
              kind: 'searchresults#officer',
              address: {
                postal_code: 'GU34 2QG',
                address_line_1: 'Mill Lane',
                premises: 'The Elkolet Centre',
                locality: 'Alton',
                country: 'United Kingdom'
              },
              description_identifiers: ['appointment-count']
            },
            {
              address_snippet: '183 Fraser Road, Sheffield, England, S8 0JP',
              title: 'KNOWLES WARWICK LIMITED',
              matches: {
                title: [1, 7],
                snippet: []
              },
              description: 'Total number of appointments 1',
              appointment_count: 1,
              snippet: '',
              links: {
                self: '/officers/MBhY8mfEG33AY-0exjb_UI4X94w/appointments'
              },
              description_identifiers: ['appointment-count'],
              address: {
                premises: '183',
                postal_code: 'S8 0JP',
                address_line_1: 'Fraser Road',
                country: 'England',
                locality: 'Sheffield'
              },
              kind: 'searchresults#officer'
            },
            {
              title: 'KNOWLES & ASSOCIATES LIMITED',
              address_snippet:
                '3 Kitsmead Lane, Longcross, Chertsey, Surrey, England, KT16 0EF',
              matches: {
                snippet: [],
                title: [1, 7]
              },
              description: 'Total number of appointments 1',
              links: {
                self: '/officers/_8Po1f0PRp9jQszDFuo_qUPl7Ek/appointments'
              },
              appointment_count: 1,
              snippet: '',
              kind: 'searchresults#officer',
              description_identifiers: ['appointment-count'],
              address: {
                locality: 'Chertsey',
                country: 'England',
                address_line_2: 'Longcross',
                postal_code: 'KT16 0EF',
                address_line_1: 'Kitsmead Lane',
                region: 'Surrey',
                premises: '3'
              }
            },
            {
              appointment_count: 1,
              links: {
                self: '/officers/mmsqLoaH8wwdkmDnNCnZnI5veJA/appointments'
              },
              snippet: '',
              description: 'Total number of appointments 1',
              matches: {
                snippet: [],
                title: [1, 7]
              },
              title: 'KNOWLES HOLDING COMPANY LTD',
              address_snippet:
                '252a Grantham Road, Sleaford, Lincolnshire, England, NG34 7NX',
              kind: 'searchresults#officer',
              address: {
                region: 'Lincolnshire',
                premises: '252a',
                postal_code: 'NG34 7NX',
                address_line_1: 'Grantham Road',
                country: 'England',
                locality: 'Sleaford'
              },
              description_identifiers: ['appointment-count']
            },
            {
              address_snippet:
                'Belgrave Hall, Belgrave Street, Leeds, England, LS2 8DD',
              title: 'KNOWLES IP LIMITED',
              matches: {
                title: [1, 7],
                snippet: []
              },
              description: 'Total number of appointments 1',
              appointment_count: 1,
              snippet: '',
              links: {
                self: '/officers/2luMjijrb3zKXx5BqtVDaUdNy64/appointments'
              },
              kind: 'searchresults#officer',
              description_identifiers: ['appointment-count'],
              address: {
                premises: 'Belgrave Hall',
                address_line_1: 'Belgrave Street',
                postal_code: 'LS2 8DD',
                country: 'England',
                locality: 'Leeds'
              }
            },
            {
              address: {
                locality: 'Stockton Heath',
                postal_code: 'WA4 6BH',
                address_line_1: 'Walton Road',
                region: 'Cheshire',
                premises: 'Apartment 2 Village Terrace'
              },
              description_identifiers: ['appointment-count'],
              kind: 'searchresults#officer',
              title: 'KNOWLES COMPUTER SERVICES LTD',
              address_snippet:
                'Apartment 2 Village Terrace Walton Road, Stockton Heath, Cheshire, WA4 6BH',
              snippet: '',
              appointment_count: 1,
              links: {
                self: '/officers/1zmHlQOFqy4JMVhbUTNsLw2Ut0E/appointments'
              },
              matches: {
                snippet: [],
                title: [1, 7]
              },
              description: 'Total number of appointments 1'
            },
            {
              address_snippet: '96 Church Street, Brighton, England, BN1 1UJ',
              title: 'KNOWLES EUROPE',
              matches: {
                snippet: [],
                title: [1, 7]
              },
              description: 'Total number of appointments 1',
              snippet: '',
              appointment_count: 1,
              links: {
                self: '/officers/5NDxCRTWq61i5pDPpPprWsZiE50/appointments'
              },
              kind: 'searchresults#officer',
              description_identifiers: ['appointment-count'],
              address: {
                address_line_1: 'Church Street',
                postal_code: 'BN1 1UJ',
                premises: '96',
                locality: 'Brighton',
                country: 'England'
              }
            },
            {
              description: 'Total number of appointments 5',
              matches: {
                title: [1, 7],
                snippet: []
              },
              snippet: '',
              appointment_count: 5,
              links: {
                self: '/officers/N_mOug62gW01dfVw8y7nDH6xUxs/appointments'
              },
              address_snippet:
                'Trust Company Complex, Ajeltake Island, Majuro, Marshall Islands, MH96960',
              title: 'KNOWLES SECRETARY INC ',
              description_identifiers: ['appointment-count'],
              address: {
                address_line_1: 'Trust Company Complex',
                postal_code: 'MH96960',
                address_line_2: 'Ajeltake Island',
                country: 'Marshall Islands',
                locality: 'Majuro'
              },
              kind: 'searchresults#officer'
            },
            {
              description: 'Total number of appointments 5',
              matches: {
                title: [1, 7],
                snippet: []
              },
              snippet: '',
              appointment_count: 5,
              links: {
                self: '/officers/T5EkJr4PCYRNLI8vcCr39-GjaOY/appointments'
              },
              title: 'KNOWLES DIRECTOR INC ',
              address_snippet:
                'Trust Company Complex, Ajeltake Road, Ajeltake Island, Majuro, Mh 96960, Marshall Islands',
              kind: 'searchresults#officer',
              description_identifiers: ['appointment-count'],
              address: {
                region: 'Mh 96960',
                address_line_1: 'Trust Company Complex',
                address_line_2: 'Ajeltake Road, Ajeltake Island',
                country: 'Marshall Islands',
                locality: 'Majuro'
              }
            },
            {
              address_snippet:
                'Union Pension Trustees Ltd, 18-21 Queen Square, Bristol, United Kingdom, BS1 4NH',
              title: 'SIPP SIR NIGEL KNOWLES ',
              description: 'Total number of appointments 1',
              matches: {
                snippet: [],
                title: [16, 22]
              },
              appointment_count: 1,
              snippet: '',
              links: {
                self: '/officers/MzkIto38dPVQv_96eXKHC-NgdQk/appointments'
              },
              description_identifiers: ['appointment-count'],
              address: {
                postal_code: 'BS1 4NH',
                address_line_1: '18-21 Queen Square',
                premises: 'Union Pension Trustees Ltd',
                country: 'United Kingdom',
                locality: 'Bristol'
              },
              kind: 'searchresults#officer'
            },
            {
              description: 'Total number of appointments 1',
              matches: {
                title: [34, 40],
                snippet: []
              },
              snippet: '',
              appointment_count: 1,
              links: {
                self: '/officers/yJDtY9jrr0EVE_dFQNPbJyUCkhk/appointments'
              },
              title:
                'TRUSTEES OF THE RODNEY GILCHRIST KNOWLES LIFE INTEREST TRUST ',
              address_snippet:
                'Flat 1 Delph Court, 27a Taptonville Road, Sheffield, England, S10 5DH',
              description_identifiers: ['appointment-count'],
              address: {
                premises: 'Flat 1 Delph Court',
                postal_code: 'S10 5DH',
                address_line_1: '27a Taptonville Road',
                country: 'England',
                locality: 'Sheffield'
              },
              kind: 'searchresults#officer'
            },
            {
              description: 'Total number of appointments 1',
              matches: {
                title: [3, 9],
                snippet: []
              },
              appointment_count: 1,
              links: {
                self: '/officers/wxQE4U8T_Dn_AK3Ompf8oNLOhY8/appointments'
              },
              snippet: '',
              address_snippet:
                'Clough Willu Cottage, Tosaby Road, St. Marks, Ballasalla, Isle Of Man, IM9 3AN',
              title: 'T KNOWLES ',
              description_identifiers: ['appointment-count'],
              address: {
                locality: 'Isle Of Man',
                postal_code: 'IM9 3AN',
                address_line_1: 'Tosaby Road',
                premises: 'Clough Willu Cottage',
                address_line_2: 'St. Marks, Ballasalla'
              },
              kind: 'searchresults#officer'
            },
            {
              title: 'DICKON KNOWLES LIMITED',
              address_snippet:
                'Mariners, Penwerris Lane, Falmouth, Cornwall, United Kingdom, TR11 2PF',
              matches: {
                title: [8, 14],
                snippet: []
              },
              description: 'Total number of appointments 0',
              appointment_count: 0,
              links: {
                self: '/officers/doHyGk0dvE4TjvWK8qPb3P3cZnM/appointments'
              },
              snippet: '',
              kind: 'searchresults#officer',
              description_identifiers: ['appointment-count'],
              address: {
                country: 'United Kingdom',
                locality: 'Falmouth',
                address_line_1: 'Penwerris Lane',
                postal_code: 'TR11 2PF',
                premises: 'Mariners',
                region: 'Cornwall'
              }
            },
            {
              address_snippet:
                '23 Chestergate, Macclesfield, England, SK11 6BX',
              title: 'CARTER KNOWLES LTD',
              links: {
                self: '/officers/yFjV2g3Q5tFcRdx3Q344MRf-dpU/appointments'
              },
              appointment_count: 7,
              snippet: '',
              description: 'Total number of appointments 7',
              matches: {
                snippet: [],
                title: [8, 14]
              },
              kind: 'searchresults#officer',
              address: {
                country: 'England',
                locality: 'Macclesfield',
                premises: '23',
                postal_code: 'SK11 6BX',
                address_line_1: 'Chestergate'
              },
              description_identifiers: ['appointment-count']
            },
            {
              address: {
                premises: '5',
                postal_code: 'PE19 5SD',
                address_line_1: 'Copes Close',
                address_line_2: 'Buckden',
                care_of: 'STEPHEN KNOWLES',
                country: 'United Kingdom',
                locality: 'St. Neots'
              },
              description_identifiers: ['appointment-count'],
              kind: 'searchresults#officer',
              snippet: '',
              appointment_count: 1,
              links: {
                self: '/officers/FgituhsNjt1Avgh8CrarT3u2sUY/appointments'
              },
              description: 'Total number of appointments 1',
              matches: {
                snippet: [],
                title: [4, 10]
              },
              title: 'SJ KNOWLES IT LTD',
              address_snippet:
                'STEPHEN KNOWLES, 5 Copes Close, Buckden, St. Neots, United Kingdom, PE19 5SD'
            },
            {
              appointment_count: 1,
              snippet: '',
              links: {
                self: '/officers/GXuHHnkV0dNM-snBJ9S6-hPu4F0/appointments'
              },
              description: 'Total number of appointments 1',
              matches: {
                title: [16, 22],
                snippet: []
              },
              title: 'SIPP SIR NIGEL KNOWLES',
              address_snippet:
                'Union Pension Trustees Ltd, 18-21 Queen Square, Bristol, United Kingdom, BS1 4NH',
              kind: 'searchresults#officer',
              address: {
                country: 'United Kingdom',
                locality: 'Bristol',
                address_line_1: '18-21 Queen Square',
                postal_code: 'BS1 4NH',
                premises: 'Union Pension Trustees Ltd'
              },
              description_identifiers: ['appointment-count']
            },
            {
              appointment_count: 0,
              snippet: 'Marisa Julie KNOWLES ',
              links: {
                self: '/officers/Em028n6eJpEZ5qqbwpIZ39JFXWo/appointments'
              },
              matches: {
                snippet: [14, 20],
                title: [21, 27]
              },
              description: 'Total number of appointments 0 - Born October 1972',
              address_snippet: '49 Rushmore Drive, Widnes, England, WA8 9QB',
              title: 'Marisa Julie AUSTIN KNOWLES',
              date_of_birth: {
                year: 1972,
                month: 10
              },
              address: {
                premises: '49',
                postal_code: 'WA8 9QB',
                address_line_1: 'Rushmore Drive',
                country: 'England',
                locality: 'Widnes'
              },
              description_identifiers: ['appointment-count', 'born-on'],
              kind: 'searchresults#officer'
            },
            {
              description_identifiers: ['appointment-count', 'born-on'],
              address: {
                premises: 'Palladium House',
                address_line_1: '1-4 Argyll Street',
                postal_code: 'W1F 7LD',
                country: 'Uk',
                locality: 'London'
              },
              kind: 'searchresults#officer',
              description: 'Total number of appointments 0 - Born July 1967',
              matches: {
                snippet: [],
                title: [17, 23]
              },
              snippet: '',
              appointment_count: 0,
              links: {
                self: '/officers/IIplC4iD2qTzZw00ZkVracGmvr0/appointments'
              },
              address_snippet:
                'Palladium House, 1-4 Argyll Street, London, Uk, W1F 7LD',
              title: 'Marianne CELINE KNOWLES',
              date_of_birth: {
                month: 7,
                year: 1967
              }
            }
          ],
          items_per_page: 20,
          kind: 'search#officers',
          page_number: 1,
          start_index: 0,
          total_results: 5074
        }
      }
    }
  }
} as const

export type SearchOfficersResponse = FromSchema<
  typeof SearchOfficersSchema['schema']['response']['200']
>
//export type SearchOfficersResponse = any // temporary until schemas can be fixed
