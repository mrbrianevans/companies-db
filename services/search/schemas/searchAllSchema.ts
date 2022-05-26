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
                date_of_cessation: {
                  type: 'string'
                },
                company_type: {
                  type: 'string'
                },
                description_identifier: {
                  type: 'array',
                  items: {
                    type: ['null', 'string']
                  }
                },
                matches: {
                  type: 'object',
                  properties: {
                    snippet: {
                      type: 'array',
                      items: {
                        type: 'integer'
                      }
                    },
                    title: {
                      type: 'array',
                      items: {
                        type: 'integer'
                      }
                    }
                  },
                  required: ['snippet']
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
                kind: {
                  type: 'string'
                },
                description: {
                  type: 'string'
                },
                company_number: {
                  type: 'string'
                },
                company_status: {
                  type: ['null', 'string']
                },
                date_of_creation: {
                  type: ['null', 'string']
                },
                snippet: {
                  type: 'string'
                },
                address_snippet: {
                  type: ['null', 'string']
                },
                title: {
                  type: 'string'
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
                        locality: {
                          type: 'string'
                        },
                        postal_code: {
                          type: 'string'
                        },
                        premises: {
                          type: 'string'
                        },
                        region: {
                          type: 'string'
                        },
                        country: {
                          type: 'string'
                        },
                        address_line_2: {
                          type: 'string'
                        },
                        po_box: {
                          type: 'string'
                        },
                        care_of: {
                          type: 'string'
                        },
                        care_of_name: {
                          type: 'string'
                        }
                      }
                    }
                  ]
                },
                appointment_count: {
                  type: 'integer'
                },
                description_identifiers: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
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
                },
                external_registration_number: {
                  type: 'string'
                }
              },
              required: [
                'links',
                'kind',
                'description',
                'address_snippet',
                'title',
                'address'
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
        title: 'searchAll',
        example: {
          items: [
            {
              date_of_cessation: '2021-06-01',
              company_type: 'ltd',
              description_identifier: ['dissolved-on'],
              matches: {
                snippet: [],
                title: [1, 3]
              },
              links: {
                self: '/company/06061086'
              },
              kind: 'searchresults#company',
              description: '06061086 - Dissolved on  1 June 2021',
              company_number: '06061086',
              company_status: 'dissolved',
              date_of_creation: '2007-01-22',
              snippet: '',
              address_snippet:
                'Gable House, 239 Regents Park Road, London, N3 3LF',
              title: 'AND LIMITED',
              address: {
                address_line_1: '239 Regents Park Road',
                locality: 'London',
                postal_code: 'N3 3LF',
                premises: 'Gable House'
              }
            },
            {
              title: 'ANDREW RUSSELL & CO LIMITED',
              address: {
                locality: 'Doncaster',
                region: 'South Yorkshire',
                address_line_1: 'Wood Street',
                premises: 'Cussins House',
                postal_code: 'DN1 3LW'
              },
              address_snippet:
                'Cussins House, Wood Street, Doncaster, South Yorkshire, DN1 3LW',
              snippet: '',
              description: 'Disqualified',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              links: {
                self: '/disqualified-officers/corporate/Rm2f9Cmvp8WkJzQxZA6RY_P7oeE'
              },
              kind: 'searchresults#disqualified-officer'
            },
            {
              appointment_count: 1,
              matches: {
                title: [1, 12],
                snippet: []
              },
              kind: 'searchresults#officer',
              links: {
                self: '/officers/_MjQFReNjY0N97nbVHv5Oeq4b2s/appointments'
              },
              description: 'Total number of appointments 1',
              description_identifiers: ['appointment-count'],
              address_snippet:
                '10 Thistle Street, Aberdeen, Aberdeenshire, United Kingdom, AB10 1XZ',
              snippet: '',
              address: {
                premises: '10',
                country: 'United Kingdom',
                postal_code: 'AB10 1XZ',
                region: 'Aberdeenshire',
                locality: 'Aberdeen',
                address_line_1: 'Thistle Street'
              },
              title: 'ANDERSONBAIN & COMPANY '
            },
            {
              description: 'Total number of appointments 0',
              matches: {
                title: [1, 6],
                snippet: []
              },
              kind: 'searchresults#officer',
              links: {
                self: '/officers/D2p31o5ygP4Z1i0ZSlqPWPECDgM/appointments'
              },
              title: 'ANDREW CROSS & CO ',
              address: {
                address_line_1: 'Lee High Road',
                locality: 'London',
                postal_code: 'SE13 5PT',
                country: 'United Kingdom',
                premises: 'Plaza Building'
              },
              address_snippet:
                'Plaza Building, Lee High Road, London, United Kingdom, SE13 5PT',
              description_identifiers: ['appointment-count'],
              snippet: '',
              appointment_count: 0
            },
            {
              appointment_count: 1,
              matches: {
                snippet: [],
                title: [1, 8]
              },
              links: {
                self: '/officers/DB87ZL8ptGjdrLqthaqXCjy59Nk/appointments'
              },
              kind: 'searchresults#officer',
              description: 'Total number of appointments 1',
              snippet: '',
              description_identifiers: ['appointment-count'],
              address_snippet:
                'Springfield Lodge, Colchester Road, Springfield, Chelmsford, Essex, United Kingdom, CM2 5PW',
              address: {
                address_line_2: 'Springfield',
                country: 'United Kingdom',
                premises: 'Springfield Lodge',
                postal_code: 'CM2 5PW',
                locality: 'Chelmsford',
                region: 'Essex',
                address_line_1: 'Colchester Road'
              },
              title: 'ANDERSON DESIGN & BUILD LIMITED'
            },
            {
              description_identifiers: ['appointment-count'],
              snippet: '',
              address_snippet: '10 Thistle Street, Aberdeen, AB10 1XZ',
              title: 'ANDERSONBAIN & CO ',
              address: {
                address_line_1: 'Thistle Street',
                locality: 'Aberdeen',
                postal_code: 'AB10 1XZ',
                premises: '10'
              },
              links: {
                self: '/officers/ktkAWC0opp5RI7n1ed4aFkhxtv0/appointments'
              },
              matches: {
                title: [1, 12],
                snippet: []
              },
              kind: 'searchresults#officer',
              description: 'Total number of appointments 1',
              appointment_count: 1
            },
            {
              description_identifiers: ['appointment-count'],
              snippet: '',
              address_snippet:
                '24 Old Burlington Street, Mayfair, London, United Kingdom, W1S 3AW',
              title: 'ANDREWS &  BOYD PROJECTS LIMITED',
              address: {
                postal_code: 'W1S 3AW',
                country: 'United Kingdom',
                premises: '24',
                address_line_1: 'Old Burlington Street',
                region: 'London',
                locality: 'Mayfair'
              },
              kind: 'searchresults#officer',
              matches: {
                snippet: [],
                title: [1, 7]
              },
              links: {
                self: '/officers/5M_MzpyknWc-UGB903KAZuA2Mt0/appointments'
              },
              description: 'Total number of appointments 1',
              appointment_count: 1
            },
            {
              description: 'Total number of appointments 2',
              matches: {
                title: [1, 6],
                snippet: []
              },
              links: {
                self: '/officers/9k3GFMs8ETsEsHVqXrilOPRJBus/appointments'
              },
              kind: 'searchresults#officer',
              title: 'ANDREW PURNELL & CO ',
              address: {
                premises: '3 The Pavement',
                country: 'England',
                postal_code: 'SW19 4DA',
                locality: 'London',
                address_line_1: 'Worple Road'
              },
              description_identifiers: ['appointment-count'],
              address_snippet:
                '3 The Pavement, Worple Road, London, England, SW19 4DA',
              snippet: '',
              appointment_count: 2
            },
            {
              description_identifiers: ['appointment-count'],
              address_snippet:
                'The Clockhouse, Bath Hill, Keynsham, Bristol, England, BS31 1HL',
              snippet: '',
              address: {
                address_line_1: 'Bath Hill',
                locality: 'Bristol',
                postal_code: 'BS31 1HL',
                address_line_2: 'Keynsham',
                country: 'England',
                premises: 'The Clockhouse'
              },
              title: 'ANDREWS LETTING AND MANAGEMENT LIMITED',
              matches: {
                snippet: [],
                title: [1, 7, 17, 19]
              },
              links: {
                self: '/officers/dVfam3K1K7hCyomFTlajLiW4p3o/appointments'
              },
              kind: 'searchresults#officer',
              description: 'Total number of appointments 1',
              appointment_count: 1
            },
            {
              description: 'Total number of appointments 3',
              matches: {
                snippet: [],
                title: [1, 3]
              },
              links: {
                self: '/officers/cMc1CWZaKMkmiQN7r7RilVNZ2bc/appointments'
              },
              kind: 'searchresults#officer',
              title: 'AND FINANCE FOR ALL SRL ',
              address: {
                postal_code: '1400',
                country: 'Belgium',
                premises: 'Rue Du Happart 11',
                locality: 'Nivelles'
              },
              description_identifiers: ['appointment-count'],
              address_snippet: 'Rue Du Happart 11, Nivelles, Belgium, 1400',
              snippet: '',
              appointment_count: 3
            },
            {
              kind: 'searchresults#officer',
              matches: {
                title: [1, 6],
                snippet: []
              },
              links: {
                self: '/officers/hIkZ9zBrP3_poq4fM2orqRVpQoY/appointments'
              },
              description: 'Total number of appointments 0',
              description_identifiers: ['appointment-count'],
              snippet: '',
              address_snippet: 'School Lane, Auckley, Doncaster, DN9 3JR',
              address: {
                address_line_1: 'School Lane',
                locality: 'Doncaster',
                postal_code: 'DN9 3JR',
                address_line_2: 'Auckley'
              },
              title: 'ANDREW RUSSEL & CO LTD',
              appointment_count: 0
            },
            {
              appointment_count: 0,
              snippet: '',
              description_identifiers: ['appointment-count'],
              address_snippet:
                'Lathrisk Lane, Newton Of Falkland, Fife, United Kingdom, KY15 7RZ',
              address: {
                locality: 'Newton Of Falkland',
                region: 'Fife',
                country: 'United Kingdom',
                premises: 'Lathrisk Lane',
                postal_code: 'KY15 7RZ'
              },
              title: 'ANDERSON VEITCH & COMPANY LIMITED',
              kind: 'searchresults#officer',
              matches: {
                snippet: [],
                title: [1, 8]
              },
              links: {
                self: '/officers/hF8wixpBviuCQyPjXxHQ93DrI7M/appointments'
              },
              description: 'Total number of appointments 0'
            },
            {
              appointment_count: 1,
              description: 'Total number of appointments 1',
              matches: {
                title: [1, 8],
                snippet: []
              },
              links: {
                self: '/officers/FxJFXV0fU0EzO39BMekGa7A7E2A/appointments'
              },
              kind: 'searchresults#officer',
              address: {
                postal_code: 'ME13 9EJ',
                country: 'United Kingdom',
                address_line_2: 'Highstreet Road Hernhill',
                premises: 'Unit 1',
                address_line_1: 'Waterham Ind Park',
                locality: 'Faversham',
                region: 'Kent'
              },
              title: 'ANDERSON SECURITIES & INVESTMENT LTD',
              address_snippet:
                'Unit 1, Waterham Ind Park, Highstreet Road Hernhill, Faversham, Kent, United Kingdom, ME13 9EJ',
              description_identifiers: ['appointment-count'],
              snippet: ''
            },
            {
              links: {
                self: '/officers/OVE0lyHGFJG_qnsRQd-Utt-V5d0/appointments'
              },
              matches: {
                snippet: [],
                title: [1, 9]
              },
              kind: 'searchresults#officer',
              description: 'Total number of appointments 2',
              snippet: '',
              description_identifiers: ['appointment-count'],
              address_snippet:
                '25 Filmer Road, London, United Kingdom, SW6 7BP',
              address: {
                address_line_1: 'Filmer Road',
                locality: 'London',
                postal_code: 'SW6 7BP',
                premises: '25',
                country: 'United Kingdom'
              },
              title: 'ANDERSONS & SONS LIMITED',
              appointment_count: 2
            },
            {
              appointment_count: 5,
              address: {
                address_line_1: 'High Street',
                locality: 'Cheriton',
                postal_code: 'CT19 4ET',
                country: 'England',
                premises: '30'
              },
              title: 'ANDREW & CO ESTATE AGENTS LIMITED',
              description_identifiers: ['appointment-count'],
              address_snippet: '30 High Street, Cheriton, England, CT19 4ET',
              snippet: '',
              description: 'Total number of appointments 5',
              links: {
                self: '/officers/nI5G5kivxzCi_05rI7S1HvMyAc8/appointments'
              },
              matches: {
                title: [1, 6],
                snippet: []
              },
              kind: 'searchresults#officer'
            },
            {
              links: {
                self: '/officers/AEPECRpmoI8UFVdRIItbUz0LkWE/appointments'
              },
              matches: {
                snippet: [],
                title: [1, 6]
              },
              kind: 'searchresults#officer',
              description: 'Total number of appointments 1',
              snippet: '',
              description_identifiers: ['appointment-count'],
              address_snippet:
                'West Hill House, Allerton Hill, Chapel Allerton, Leeds, West Yorkshire, United Kingdom, LS7 3QB',
              address: {
                postal_code: 'LS7 3QB',
                premises: 'West Hill House',
                address_line_2: 'Chapel Allerton',
                country: 'United Kingdom',
                address_line_1: 'Allerton Hill',
                region: 'West Yorkshire',
                locality: 'Leeds'
              },
              title: 'ANDREW BOON & ASSOCIATES LIMITED',
              appointment_count: 1
            },
            {
              address_snippet:
                '6547 N Academy Blvd, Colorado Springs, United States, CO 80918',
              description_identifiers: ['appointment-count'],
              snippet: '',
              title: 'ANDERSON & SONS - BUSINESS SOLUTIONS LLC ',
              address: {
                address_line_1: 'N Academy Blvd',
                locality: 'Colorado Springs',
                postal_code: 'CO 80918',
                country: 'United States',
                premises: '6547'
              },
              links: {
                self: '/officers/s-Rd6YSrpXGBsiEU-AzrOsmrIiI/appointments'
              },
              matches: {
                title: [1, 8],
                snippet: []
              },
              kind: 'searchresults#officer',
              description: 'Total number of appointments 1',
              appointment_count: 1
            },
            {
              appointment_count: 0,
              title: 'ANDREW HAMILTON AND COMPANY ',
              address: {
                address_line_1: 'Dean Park Mews',
                locality: 'Edinburgh',
                postal_code: 'EH4 1ED',
                country: 'Scotland',
                premises: '38'
              },
              description_identifiers: ['appointment-count'],
              snippet: '',
              address_snippet:
                '38 Dean Park Mews, Edinburgh, Scotland, EH4 1ED',
              description: 'Total number of appointments 0',
              matches: {
                title: [1, 6, 17, 19],
                snippet: []
              },
              links: {
                self: '/officers/QQl3jNktQX4oNWTtjna9UPJO4A8/appointments'
              },
              kind: 'searchresults#officer'
            },
            {
              appointment_count: 1,
              address_snippet:
                '139-141 Watling Street, Gillingham, Kent, England, ME7 2YY',
              description_identifiers: ['appointment-count'],
              snippet: '',
              address: {
                premises: '139-141 Watling Street',
                country: 'England',
                postal_code: 'ME7 2YY',
                region: 'Kent',
                locality: 'Gillingham'
              },
              title: 'ANDREW WELLS ARCHITECTURAL PLANNING & DESIGN LTD',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              kind: 'searchresults#officer',
              links: {
                self: '/officers/Ads7xi7pK5rhLZbtie_9oeX0eUA/appointments'
              },
              description: 'Total number of appointments 1'
            },
            {
              address: {
                locality: 'Tavistock',
                address_line_1: 'West Devon Business Park',
                country: 'England',
                premises: 'Suite 26, Atlas House',
                postal_code: 'PL19 9DP'
              },
              title: 'ANDREW & SARAH PORTER LTD',
              address_snippet:
                'Suite 26, Atlas House, West Devon Business Park, Tavistock, England, PL19 9DP',
              description_identifiers: ['appointment-count'],
              snippet: '',
              description: 'Total number of appointments 1',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              links: {
                self: '/officers/e53bzbU34xgNWu7SLuoayDXibnU/appointments'
              },
              kind: 'searchresults#officer',
              appointment_count: 1
            }
          ],
          items_per_page: 20,
          kind: 'search#all',
          page_number: 1,
          start_index: 0,
          total_results: 1235324
        }
      }
    }
  }
} as const

export type SearchAllResponse = FromSchema<
  typeof SearchAllSchema['schema']['response']['200']
>
//export type SearchAllResponse = any // temporary until schemas can be fixed
