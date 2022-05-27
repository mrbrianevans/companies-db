import { FromSchema } from 'json-schema-to-ts'

export interface SearchCompaniesParams {}

export interface SearchCompaniesQueryString {
  /** The term being searched for. */
  q: string
  /** The number of search results to return per page. */
  items_per_page?: number
  /** The index of the first result item to return. */
  start_index?: number
  /** Enumerable options to restrict search results. Space separate multiple restriction options to combine functionality. For a "company name availability" search use "active-companies legally-equivalent-company-name" together. */
  restrictions?: string
}

export const SearchCompaniesSchema = {
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
        },
        restrictions: {
          type: 'string'
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
                company_status: {
                  type: ['null', 'string']
                },
                company_number: {
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
                description: {
                  type: 'string'
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
                        'administration'
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
                kind: {
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
                        postal_code: {
                          type: 'string'
                        },
                        address_line_1: {
                          type: 'string'
                        },
                        premises: {
                          type: 'string'
                        },
                        country: {
                          type: 'string'
                        },
                        locality: {
                          type: 'string'
                        },
                        address_line_2: {
                          type: 'string'
                        },
                        care_of_name: {
                          type: 'string'
                        },
                        region: {
                          type: 'string'
                        },
                        po_box: {
                          type: 'string'
                        },
                        care_of: {
                          description: 'The care of name.',
                          type: 'string'
                        }
                      }
                    }
                  ]
                },
                address_snippet: {
                  type: ['null', 'string']
                },
                date_of_creation: {
                  type: ['null', 'string']
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
                snippet: {
                  type: 'string'
                },
                company_type: {
                  type: 'string'
                },
                title: {
                  type: 'string'
                },
                date_of_cessation: {
                  type: 'string'
                },
                external_registration_number: {
                  type: 'string'
                }
              },
              required: [
                'company_status',
                'company_number',
                'links',
                'kind',
                'address',
                'address_snippet',
                'company_type',
                'title'
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
        additionalProperties: false,
        title: 'searchCompanies',
        example: {
          items: [
            {
              company_status: 'active',
              company_number: '05660276',
              links: {
                self: '/company/05660276'
              },
              description: '05660276 - Incorporated on 21 December 2005',
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              address: {
                postal_code: 'W1W 7LT',
                address_line_1: 'Great Portland Street',
                premises: '85',
                country: 'England',
                locality: 'London'
              },
              address_snippet:
                '85 Great Portland Street, London, England, W1W 7LT',
              date_of_creation: '2005-12-21',
              matches: {
                title: [1, 6],
                snippet: []
              },
              snippet: '',
              company_type: 'ltd',
              title: 'CENTRE LTD'
            },
            {
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              description: '09962235 - Incorporated on 21 January 2016',
              company_status: 'active',
              links: {
                self: '/company/09962235'
              },
              company_number: '09962235',
              title: 'ACCESS MEDIATION SERVICES LIMITED',
              matches: {
                snippet: [1, 6]
              },
              date_of_creation: '2016-01-21',
              company_type: 'ltd',
              snippet: 'CENTRE FOR RESOLUTION ',
              address: {
                address_line_1: 'Barbourne Road',
                premises: '73',
                country: 'England',
                locality: 'Worcester',
                postal_code: 'WR1 1SB'
              },
              address_snippet: '73 Barbourne Road, Worcester, England, WR1 1SB'
            },
            {
              description: '13252127 - Incorporated on  8 March 2021',
              company_number: '13252127',
              company_status: 'active',
              links: {
                self: '/company/13252127'
              },
              kind: 'searchresults#company',
              description_identifier: ['incorporated-on'],
              snippet: 'CENTRE FOR ENERGY EQUALITY ',
              company_type: 'private-limited-guarant-nsc',
              date_of_creation: '2021-03-08',
              matches: {
                snippet: [1, 6]
              },
              address: {
                address_line_2: 'Cuddington',
                postal_code: 'CW8 2QH',
                premises: '10',
                country: 'England',
                address_line_1: 'Farndon Close',
                locality: 'Northwich'
              },
              address_snippet:
                '10 Farndon Close, Cuddington, Northwich, England, CW8 2QH',
              title: 'CEE OUTREACH CIC'
            },
            {
              description: '02844232 - Incorporated on 11 August 1993',
              company_number: '02844232',
              company_status: 'active',
              links: {
                self: '/company/02844232'
              },
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              date_of_creation: '1993-08-11',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              company_type: 'ltd',
              snippet: '',
              address: {
                care_of_name: 'CM EASY LIMITED',
                region: 'Middlesex',
                postal_code: 'HA8 7EB',
                address_line_1: 'Spring Villa Road',
                premises: 'Anglodal House',
                locality: 'Edgware'
              },
              address_snippet:
                'CM EASY LIMITED, Anglodal House, Spring Villa Road, Edgware, Middlesex, HA8 7EB',
              title: 'CENTRE ACADEMY LONDON LIMITED'
            },
            {
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              links: {
                self: '/company/09773755'
              },
              company_status: 'active',
              company_number: '09773755',
              description: '09773755 - Incorporated on 11 September 2015',
              title: 'CENTRE ALIGN LIMITED',
              address: {
                postal_code: 'W1B 3HH',
                premises: 'Third Floor',
                country: 'United Kingdom',
                address_line_1: '207 Regent Street',
                locality: 'London'
              },
              address_snippet:
                'Third Floor, 207 Regent Street, London, United Kingdom, W1B 3HH',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              date_of_creation: '2015-09-11',
              company_type: 'ltd',
              snippet: ''
            },
            {
              description: '12457926 - Incorporated on 12 February 2020',
              company_status: 'active',
              links: {
                self: '/company/12457926'
              },
              company_number: '12457926',
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              date_of_creation: '2020-02-12',
              matches: {
                title: [1, 6],
                snippet: []
              },
              snippet: '',
              company_type: 'ltd',
              address_snippet: '91 High Street, Chatham, England, ME4 4DL',
              address: {
                premises: '91',
                country: 'England',
                address_line_1: 'High Street',
                locality: 'Chatham',
                postal_code: 'ME4 4DL'
              },
              title: 'CENTRE ANAHATA LTD'
            },
            {
              title: 'CENTRE ARTS LTD',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              date_of_creation: '2021-12-03',
              company_type: 'ltd',
              snippet: '',
              address_snippet:
                '125 Watling Street, Gillingham, England, ME7 2YY',
              address: {
                country: 'England',
                premises: '125',
                address_line_1: 'Watling Street',
                locality: 'Gillingham',
                postal_code: 'ME7 2YY'
              },
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              description: '13781488 - Incorporated on  3 December 2021',
              company_status: 'active',
              company_number: '13781488',
              links: {
                self: '/company/13781488'
              }
            },
            {
              kind: 'searchresults#company',
              description_identifier: ['incorporated-on'],
              description: '11045549 - Incorporated on  3 November 2017',
              links: {
                self: '/company/11045549'
              },
              company_status: 'active',
              company_number: '11045549',
              title: 'CENTRE ASSOCIATES LIMITED',
              snippet: '',
              company_type: 'ltd',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              date_of_creation: '2017-11-03',
              address: {
                postal_code: 'KT2 6ND',
                region: 'Surrey',
                locality: 'Kingston Upon Thames',
                address_line_1: 'Old London Road',
                premises: '29',
                country: 'England'
              },
              address_snippet:
                '29 Old London Road, Kingston Upon Thames, Surrey, England, KT2 6ND'
            },
            {
              title: 'CENTRE AT THREE WAYS',
              address_snippet:
                'Mill 2  St Pegs Mill C/O Am Insolvency Limited, Thornhills Beck Lane, Brighouse, West Yorkshire, HD6 4AH',
              address: {
                region: 'West Yorkshire',
                address_line_2: 'Thornhills Beck Lane',
                postal_code: 'HD6 4AH',
                premises: 'Mill 2 ',
                address_line_1: 'St Pegs Mill C/O Am Insolvency Limited',
                locality: 'Brighouse'
              },
              date_of_creation: '2011-04-13',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              company_type: 'private-limited-guarant-nsc-limited-exemption',
              snippet: '',
              description_identifier: ['incorporated-on', 'liquidation'],
              kind: 'searchresults#company',
              company_number: '07602848',
              company_status: 'liquidation',
              links: {
                self: '/company/07602848'
              },
              description:
                '07602848 - Incorporated on 13 April 2011 - Liquidation'
            },
            {
              company_status: 'active',
              company_number: '06675759',
              links: {
                self: '/company/06675759'
              },
              description: '06675759 - Incorporated on 18 August 2008',
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              address_snippet:
                '95 Greendale Road, Port Sunlight, Wirral, CH62 4XE',
              address: {
                locality: 'Wirral',
                premises: '95',
                address_line_1: 'Greendale Road',
                postal_code: 'CH62 4XE',
                address_line_2: 'Port Sunlight'
              },
              matches: {
                snippet: [],
                title: [1, 6]
              },
              date_of_creation: '2008-08-18',
              snippet: '',
              company_type: 'ltd',
              title: 'CENTRE ATTRACTION LIVERPOOL LTD'
            },
            {
              description: '02979011 - Incorporated on 14 October 1994',
              company_number: '02979011',
              company_status: 'active',
              links: {
                self: '/company/02979011'
              },
              kind: 'searchresults#company',
              description_identifier: ['incorporated-on'],
              company_type: 'ltd',
              snippet: '',
              date_of_creation: '1994-10-14',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              address: {
                postal_code: 'BR7 6AA',
                premises: '29',
                country: 'England',
                address_line_1: 'The Meadow',
                locality: 'Chislehurst'
              },
              address_snippet: '29 The Meadow, Chislehurst, England, BR7 6AA',
              title: 'CENTRE ATTRACTIONS LTD'
            },
            {
              description: '10084321 - Incorporated on 24 March 2016',
              company_status: 'active',
              company_number: '10084321',
              links: {
                self: '/company/10084321'
              },
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              date_of_creation: '2016-03-24',
              matches: {
                title: [1, 6],
                snippet: []
              },
              snippet: '',
              company_type: 'ltd',
              address_snippet:
                'Hollinwood Business Centre, Albert St, Oldham, Lancs, England, OL8 3QL',
              address: {
                postal_code: 'OL8 3QL',
                region: 'Lancs',
                locality: 'Oldham',
                address_line_1: 'Albert St',
                country: 'England',
                premises: 'Hollinwood Business Centre'
              },
              title: 'CENTRE BAR LTD'
            },
            {
              title: 'CENTRE BARBERS LIMITED',
              address: {
                postal_code: 'PA5 8AN',
                address_line_2: 'Johnstone',
                locality: 'Renfrewshire',
                address_line_1: 'High Street',
                premises: '54'
              },
              address_snippet:
                '54 High Street, Johnstone, Renfrewshire, PA5 8AN',
              company_type: 'ltd',
              snippet: '',
              matches: {
                title: [1, 6],
                snippet: []
              },
              date_of_creation: '2003-08-26',
              kind: 'searchresults#company',
              description_identifier: ['incorporated-on'],
              company_status: 'active',
              company_number: 'SC254774',
              links: {
                self: '/company/SC254774'
              },
              description: 'SC254774 - Incorporated on 26 August 2003'
            },
            {
              title: 'CENTRE BARCS LTD',
              address_snippet:
                'Forbes Watson Ltd, The Old Bakery, Green Street, Lytham St. Annes, United Kingdom, FY8 5LG',
              address: {
                postal_code: 'FY8 5LG',
                country: 'United Kingdom',
                premises: 'Forbes Watson Ltd',
                address_line_1: 'The Old Bakery, Green Street',
                locality: 'Lytham St. Annes'
              },
              date_of_creation: '2022-03-16',
              matches: {
                title: [1, 6],
                snippet: []
              },
              snippet: '',
              company_type: 'ltd',
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              company_status: 'active',
              links: {
                self: '/company/13981081'
              },
              company_number: '13981081',
              description: '13981081 - Incorporated on 16 March 2022'
            },
            {
              description_identifier: ['dissolved-on'],
              kind: 'searchresults#company',
              date_of_cessation: '2021-06-15',
              company_number: '06091884',
              company_status: 'dissolved',
              links: {
                self: '/company/06091884'
              },
              description: '06091884 - Dissolved on 15 June 2021',
              title: 'CENTRE BARKS LIMITED',
              address_snippet:
                'Foxhill House, Clench Common, Marlborough, England, SN8 4DR',
              address: {
                postal_code: 'SN8 4DR',
                locality: 'Marlborough',
                address_line_1: 'Clench Common',
                country: 'England',
                premises: 'Foxhill House'
              },
              date_of_creation: '2007-02-08',
              matches: {
                snippet: [1, 11],
                title: [1, 6]
              },
              snippet: 'CENTREBARCS ',
              company_type: 'ltd'
            },
            {
              description: '13850394 - Incorporated on 14 January 2022',
              company_number: '13850394',
              company_status: 'active',
              links: {
                self: '/company/13850394'
              },
              kind: 'searchresults#company',
              description_identifier: ['incorporated-on'],
              company_type: 'ltd',
              snippet: '',
              date_of_creation: '2022-01-14',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              address: {
                country: 'United Kingdom',
                premises: '67',
                address_line_1: 'Duke Street',
                locality: 'Darlington',
                region: 'County Durham',
                postal_code: 'DL3 7SD'
              },
              address_snippet:
                '67 Duke Street, Darlington, County Durham, United Kingdom, DL3 7SD',
              title: 'CENTRE BARKS LIMITED'
            },
            {
              description_identifier: ['incorporated-on'],
              kind: 'searchresults#company',
              company_number: '10871180',
              company_status: 'active',
              links: {
                self: '/company/10871180'
              },
              description: '10871180 - Incorporated on 18 July 2017',
              title: 'CENTRE BARKS @ MOSCAR LTD',
              address: {
                postal_code: 'S8 7FE',
                locality: 'Sheffield',
                premises: '158',
                country: 'England',
                address_line_1: 'Hemper Lane'
              },
              address_snippet: '158 Hemper Lane, Sheffield, England, S8 7FE',
              date_of_creation: '2017-07-18',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              company_type: 'ltd',
              snippet: ''
            },
            {
              date_of_cessation: 'Unknown',
              kind: 'searchresults#company',
              description_identifier: ['converted-closed-on'],
              description: 'IP25252R - Converted/Closed',
              company_number: 'IP25252R',
              company_status: 'converted-closed',
              links: {
                self: '/company/IP25252R'
              },
              title: 'CENTRE BAR SOCIAL CLUB LIMITED',
              company_type: 'industrial-and-provident-society',
              snippet: '',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              address_snippet: '',
              address: {}
            },
            {
              date_of_cessation: '2021-11-30',
              kind: 'searchresults#company',
              description_identifier: ['dissolved-on'],
              description: '13276589 - Dissolved on 30 November 2021',
              links: {
                self: '/company/13276589'
              },
              company_status: 'dissolved',
              company_number: '13276589',
              title: 'CENTRE BRANDS LTD',
              company_type: 'ltd',
              snippet: '',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              date_of_creation: '2021-03-18',
              address_snippet:
                'Kemp House 152-160 City Road, London, England, EC1V 2NX',
              address: {
                postal_code: 'EC1V 2NX',
                country: 'England',
                premises: 'Kemp House 152-160 City Road',
                locality: 'London'
              }
            },
            {
              title: 'CENTRE BROADCASTING LIMITED',
              company_type: 'ltd',
              snippet: '',
              date_of_creation: '1996-12-19',
              matches: {
                snippet: [],
                title: [1, 6]
              },
              address_snippet: '30 Leicester Square, London, England, WC2H 7LA',
              address: {
                postal_code: 'WC2H 7LA',
                address_line_1: 'Leicester Square',
                country: 'England',
                premises: '30',
                locality: 'London'
              },
              kind: 'searchresults#company',
              description_identifier: ['incorporated-on'],
              description: '03294814 - Incorporated on 19 December 1996',
              company_number: '03294814',
              company_status: 'active',
              links: {
                self: '/company/03294814'
              }
            }
          ],
          items_per_page: 20,
          kind: 'search#companies',
          page_number: 1,
          start_index: 0,
          total_results: 47437
        }
      }
    }
  }
} as const

export type SearchCompaniesResponse = FromSchema<
  typeof SearchCompaniesSchema['schema']['response']['200']
>
//export type SearchCompaniesResponse = any // temporary until schemas can be fixed
