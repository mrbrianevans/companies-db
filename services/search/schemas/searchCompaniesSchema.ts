import { FromSchema } from 'json-schema-to-ts'

export interface SearchCompaniesParams {}

export interface SearchCompaniesQueryString {
  /** The term being searched for. */
  q?: string
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
      required: []
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
                snippet: {
                  type: 'string'
                },
                description: {
                  type: 'string'
                },
                company_status: {
                  type: ['null', 'string']
                },
                address_snippet: {
                  type: ['null', 'string']
                },
                description_identifier: {
                  type: 'array',
                  items: {
                    type: ['null', 'string']
                  }
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
                        country: {
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
                        po_box: {
                          type: 'string'
                        },
                        care_of_name: {
                          type: 'string'
                        }
                      }
                    }
                  ]
                },
                date_of_creation: {
                  type: ['null', 'string']
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
                company_type: {
                  type: 'string'
                },
                title: {
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
                kind: {
                  type: 'string'
                },
                company_number: {
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
                'description',
                'company_status',
                'address_snippet',
                'description_identifier',
                'address',
                'links',
                'company_type',
                'title',
                'kind',
                'company_number'
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
        title: 'searchCompanies',
        example: {
          items: [
            {
              snippet: '',
              description: '03914936 - Incorporated on 27 January 2000',
              company_status: 'active',
              address_snippet: '310 High Road, London, England, N22 8JR',
              description_identifier: ['incorporated-on'],
              address: {
                address_line_1: 'High Road',
                locality: 'London',
                postal_code: 'N22 8JR',
                country: 'England',
                premises: '310'
              },
              date_of_creation: '2000-01-27',
              links: {
                self: '/company/03914936'
              },
              company_type: 'ltd',
              title: 'INTEREST LTD',
              matches: {
                title: [1, 8],
                snippet: []
              },
              kind: 'searchresults#company',
              company_number: '03914936'
            },
            {
              address: {
                address_line_1: '12 Newport Avenue',
                locality: 'London',
                country: 'United Kingdom',
                postal_code: 'E14 2DN',
                premises: 'Flat32 Adventures Court'
              },
              description_identifier: ['incorporated-on'],
              date_of_creation: '2019-10-09',
              snippet: '',
              description: '12253244 - Incorporated on  9 October 2019',
              company_status: 'active',
              address_snippet:
                'Flat32 Adventures Court, 12 Newport Avenue, London, United Kingdom, E14 2DN',
              company_number: '12253244',
              company_type: 'ltd',
              links: {
                self: '/company/12253244'
              },
              title: 'INTEREST ARBITRAGE LIMITED',
              kind: 'searchresults#company',
              matches: {
                snippet: [],
                title: [1, 8]
              }
            },
            {
              description: '13382138 - Incorporated on  7 May 2021',
              snippet: '',
              address_snippet:
                '6 Hanson Close, Kimberley, Nottingham, England, NG16 2NS',
              company_status: 'active',
              description_identifier: ['incorporated-on'],
              address: {
                address_line_2: 'Kimberley',
                country: 'England',
                postal_code: 'NG16 2NS',
                premises: '6',
                locality: 'Nottingham',
                address_line_1: 'Hanson Close'
              },
              date_of_creation: '2021-05-07',
              company_type: 'ltd',
              links: {
                self: '/company/13382138'
              },
              kind: 'searchresults#company',
              matches: {
                snippet: [],
                title: [1, 8]
              },
              title: 'INTEREST FREE LTD',
              company_number: '13382138'
            },
            {
              company_number: '12515217',
              title: 'INTEREST FX LTD',
              kind: 'searchresults#company',
              matches: {
                title: [1, 8],
                snippet: []
              },
              company_type: 'ltd',
              date_of_cessation: '2021-08-03',
              links: {
                self: '/company/12515217'
              },
              date_of_creation: '2020-03-12',
              address: {
                address_line_1: 'Greenway',
                locality: 'London',
                postal_code: 'N20 8EJ',
                premises: '64',
                country: 'England'
              },
              description_identifier: ['dissolved-on'],
              company_status: 'dissolved',
              address_snippet: '64 Greenway, London, England, N20 8EJ',
              snippet: '',
              description: '12515217 - Dissolved on  3 August 2021'
            },
            {
              matches: {
                title: [1, 8],
                snippet: []
              },
              kind: 'searchresults#company',
              title: 'INTEREST IN PEOPLE LTD',
              links: {
                self: '/company/12962916'
              },
              company_type: 'ltd',
              company_number: '12962916',
              company_status: 'active',
              address_snippet:
                'Unit 1b Denby Dale Business Park, Denby Dale, Huddersield, West Yorkshire, England, HD8 8QH',
              description: '12962916 - Incorporated on 20 October 2020',
              snippet: '',
              date_of_creation: '2020-10-20',
              address: {
                address_line_2: 'Denby Dale',
                country: 'England',
                postal_code: 'HD8 8QH',
                premises: 'Unit 1b',
                address_line_1: 'Denby Dale Business Park',
                region: 'West Yorkshire',
                locality: 'Huddersield'
              },
              description_identifier: ['incorporated-on']
            },
            {
              company_type: 'ltd',
              links: {
                self: '/company/09165477'
              },
              title: 'INTEREST LABS (UK) LIMITED',
              kind: 'searchresults#company',
              matches: {
                snippet: [],
                title: [1, 8]
              },
              company_number: '09165477',
              snippet: '',
              description: '09165477 - Incorporated on  7 August 2014',
              address_snippet: '86-90 Paul Street, London, England, EC2A 4NE',
              company_status: 'active',
              address: {
                postal_code: 'EC2A 4NE',
                country: 'England',
                premises: '86-90',
                locality: 'London',
                address_line_1: 'Paul Street'
              },
              description_identifier: ['incorporated-on'],
              date_of_creation: '2014-08-07'
            },
            {
              company_number: 'SC297772',
              matches: {
                title: [1, 8],
                snippet: []
              },
              kind: 'searchresults#company',
              title: 'INTEREST LINK BORDERS',
              company_type: 'private-limited-guarant-nsc-limited-exemption',
              links: {
                self: '/company/SC297772'
              },
              date_of_creation: '2006-02-24',
              address: {
                postal_code: 'TD11 3AF',
                country: 'Scotland',
                premises: 'Volunteer Hall',
                region: 'Berwickshire',
                address_line_1: 'Langtongate',
                locality: 'Duns'
              },
              description_identifier: ['incorporated-on'],
              address_snippet:
                'Volunteer Hall, Langtongate, Duns, Berwickshire, Scotland, TD11 3AF',
              company_status: 'active',
              description: 'SC297772 - Incorporated on 24 February 2006',
              snippet: ''
            },
            {
              snippet: '',
              description: '03890049 - Incorporated on  7 December 1999',
              company_status: 'active',
              address_snippet:
                'Cumbria House, 16-20 Hockliffe Street, Leighton Buzzard, Bedfordshire, LU7 1HJ',
              address: {
                premises: 'Cumbria House',
                postal_code: 'LU7 1HJ',
                region: 'Bedfordshire',
                address_line_1: '16-20 Hockliffe Street',
                locality: 'Leighton Buzzard'
              },
              description_identifier: ['incorporated-on'],
              date_of_creation: '1999-12-07',
              company_type: 'ltd',
              links: {
                self: '/company/03890049'
              },
              title: 'INTEREST ONLY SOLUTIONS LIMITED',
              matches: {
                snippet: [],
                title: [1, 8]
              },
              kind: 'searchresults#company',
              company_number: '03890049'
            },
            {
              description_identifier: ['incorporated-on'],
              address: {
                postal_code: 'CV1 2NT',
                country: 'England',
                premises: 'Union House',
                locality: 'Coventry',
                address_line_1: '111 New Union Street'
              },
              date_of_creation: '2006-11-23',
              description: '06007993 - Incorporated on 23 November 2006',
              snippet: '',
              address_snippet:
                'Union House, 111 New Union Street, Coventry, England, CV1 2NT',
              company_status: 'active',
              company_number: '06007993',
              links: {
                self: '/company/06007993'
              },
              company_type: 'ltd',
              kind: 'searchresults#company',
              matches: {
                snippet: [],
                title: [1, 8]
              },
              title: 'INTEREST RATE SOLUTIONS LTD'
            },
            {
              date_of_creation: '2014-02-24',
              address: {
                region: 'Surrey',
                locality: 'Woking',
                address_line_1: 'South Road',
                premises: 'Tiverton',
                postal_code: 'GU21 4JS'
              },
              description_identifier: ['incorporated-on'],
              company_status: 'active',
              address_snippet: 'Tiverton, South Road, Woking, Surrey, GU21 4JS',
              snippet: '',
              description: '08908109 - Incorporated on 24 February 2014',
              company_number: '08908109',
              title: 'INTERESTS MEDIA LTD',
              kind: 'searchresults#company',
              matches: {
                snippet: [],
                title: [1, 9]
              },
              links: {
                self: '/company/08908109'
              },
              company_type: 'ltd'
            },
            {
              description_identifier: ['incorporated-on'],
              address: {
                premises: 'Dept 2,',
                postal_code: 'DN6 8DA',
                country: 'United Kingdom',
                locality: 'Doncaster',
                address_line_1: '43 Owston Road',
                address_line_2: 'Carcroft'
              },
              date_of_creation: '2021-12-15',
              description: '13802020 - Incorporated on 15 December 2021',
              snippet: '',
              company_status: 'active',
              address_snippet:
                'Dept 2, 43 Owston Road, Carcroft, Doncaster, United Kingdom, DN6 8DA',
              company_number: '13802020',
              company_type: 'ltd',
              links: {
                self: '/company/13802020'
              },
              kind: 'searchresults#company',
              matches: {
                snippet: [],
                title: [1, 8]
              },
              title: 'INTEREST SUPPORT LTD'
            },
            {
              company_number: '12646582',
              title: 'IPS PROPRIETARY CAPITAL LTD LTD',
              kind: 'searchresults#company',
              matches: {
                snippet: [1, 8]
              },
              links: {
                self: '/company/12646582'
              },
              company_type: 'ltd',
              date_of_cessation: '2022-04-12',
              date_of_creation: '2020-06-04',
              description_identifier: ['dissolved-on'],
              address: {
                address_line_1: 'Wenlock Road',
                locality: 'London',
                country: 'England',
                postal_code: 'N1 7GU',
                premises: '20-22'
              },
              address_snippet: '20-22 Wenlock Road, London, England, N1 7GU',
              company_status: 'dissolved',
              snippet: 'INTEREST PAYMENTS SOLUTIONS ',
              description: '12646582 - Dissolved on 12 April 2022'
            },
            {
              company_number: '08748063',
              date_of_cessation: '2020-11-17',
              company_type: 'ltd',
              links: {
                self: '/company/08748063'
              },
              title: 'INTEREST COLLECTIONS LIMITED',
              kind: 'searchresults#company',
              matches: {
                title: [1, 8],
                snippet: []
              },
              description_identifier: ['dissolved-on'],
              address: {
                address_line_1: 'King Cross Road',
                region: 'West Yorkshire',
                locality: 'Halifax',
                postal_code: 'HX1 1EB',
                premises: 'West House'
              },
              date_of_creation: '2013-10-25',
              snippet: '',
              description: '08748063 - Dissolved on 17 November 2020',
              address_snippet:
                'West House, King Cross Road, Halifax, West Yorkshire, HX1 1EB',
              company_status: 'dissolved'
            },
            {
              company_number: '11063682',
              links: {
                self: '/company/11063682'
              },
              company_type: 'ltd',
              title: 'MAGNESIUM HEALTHCARE LIMITED',
              matches: {
                snippet: [1, 8]
              },
              kind: 'searchresults#company',
              address: {
                address_line_2: 'Fulham',
                address_line_1: '.1 Coda Studios 189 Munster Road',
                locality: 'London',
                postal_code: 'SW6 6AW',
                country: 'England',
                premises: '21'
              },
              description_identifier: ['incorporated-on'],
              date_of_creation: '2017-11-14',
              snippet: 'INTEREST IN QUESTION ',
              description: '11063682 - Incorporated on 14 November 2017',
              company_status: 'active',
              address_snippet:
                '21.1 Coda Studios 189 Munster Road, Fulham, London, England, SW6 6AW'
            },
            {
              company_number: '12592369',
              kind: 'searchresults#company',
              matches: {
                snippet: [1, 9]
              },
              title: 'HILL TOP MACHINERY LIMITED',
              links: {
                self: '/company/12592369'
              },
              company_type: 'ltd',
              date_of_creation: '2020-05-07',
              address: {
                country: 'England',
                postal_code: 'DN18 5BW',
                premises: 'Hill Top Machinery Ltd',
                address_line_1: 'Humber Road',
                region: 'North Lincolnshire',
                locality: 'Barton-Upon-Humber'
              },
              description_identifier: ['incorporated-on'],
              company_status: 'active',
              address_snippet:
                'Hill Top Machinery Ltd, Humber Road, Barton-Upon-Humber, North Lincolnshire, England, DN18 5BW',
              description: '12592369 - Incorporated on  7 May 2020',
              snippet: 'INTERESTS BUSINESS '
            },
            {
              date_of_creation: '2019-10-21',
              address: {
                locality: 'Poole',
                region: 'Dorset',
                address_line_1: 'Wareham Road',
                postal_code: 'BH16 6FA',
                country: 'United Kingdom',
                premises: 'Lytchett House 13 Freeland Park'
              },
              description_identifier: ['dissolved-on'],
              address_snippet:
                'Lytchett House 13 Freeland Park, Wareham Road, Poole, Dorset, United Kingdom, BH16 6FA',
              company_status: 'dissolved',
              description: '12273494 - Dissolved on 28 September 2021',
              snippet: 'INTEREST BUSINESS ',
              company_number: '12273494',
              matches: {
                snippet: [1, 8]
              },
              kind: 'searchresults#company',
              title: 'CK PROPERTY HOLCO LTD',
              company_type: 'ltd',
              links: {
                self: '/company/12273494'
              },
              date_of_cessation: '2021-09-28'
            },
            {
              date_of_creation: '2003-10-02',
              address: {
                address_line_1: 'Floor, Regent House',
                locality: 'Wolverhampton',
                country: 'England',
                premises: '3rd ',
                postal_code: 'WV1 4EG',
                address_line_2: 'Bath Avenue'
              },
              description_identifier: ['dissolved-on'],
              company_status: 'dissolved',
              address_snippet:
                '3rd  Floor, Regent House, Bath Avenue, Wolverhampton, England, WV1 4EG',
              description: '04918758 - Dissolved on 10 December 2019',
              snippet: '',
              company_number: '04918758',
              matches: {
                title: [1, 8],
                snippet: []
              },
              kind: 'searchresults#company',
              title: 'INTEREST IN WINE LIMITED',
              company_type: 'ltd',
              date_of_cessation: '2019-12-10',
              links: {
                self: '/company/04918758'
              }
            },
            {
              company_status: 'dissolved',
              address_snippet:
                '17  Ambleside Avenue, Heaton, Bradford, United Kingdom, BD9 5HX',
              description: '11401582 - Dissolved on 12 November 2019',
              snippet: '',
              date_of_creation: '2018-06-06',
              description_identifier: ['dissolved-on'],
              address: {
                address_line_1: 'Ambleside Avenue',
                locality: 'Bradford',
                premises: '17 ',
                country: 'United Kingdom',
                postal_code: 'BD9 5HX',
                address_line_2: 'Heaton'
              },
              matches: {
                title: [1, 8],
                snippet: []
              },
              kind: 'searchresults#company',
              title: 'INTEREST FREE LOANS LTD',
              links: {
                self: '/company/11401582'
              },
              company_type: 'ltd',
              date_of_cessation: '2019-11-12',
              company_number: '11401582'
            },
            {
              title: 'INTEREST RATE BROKERS LIMITED',
              kind: 'searchresults#company',
              matches: {
                title: [1, 8],
                snippet: []
              },
              links: {
                self: '/company/10536540'
              },
              company_type: 'ltd',
              date_of_cessation: '2018-05-29',
              company_number: '10536540',
              company_status: 'dissolved',
              address_snippet:
                'Office 3,  Unit R, Penfold Works, Imperial Way, Watford, United Kingdom, WD24 4YY',
              snippet: '',
              description: '10536540 - Dissolved on 29 May 2018',
              date_of_creation: '2016-12-22',
              address: {
                address_line_2: 'Penfold Works, Imperial Way',
                country: 'United Kingdom',
                premises: 'Office 3, ',
                postal_code: 'WD24 4YY',
                address_line_1: 'Unit R',
                locality: 'Watford'
              },
              description_identifier: ['dissolved-on']
            },
            {
              date_of_creation: '2016-12-22',
              address: {
                locality: 'Watford',
                address_line_1: 'Unit R',
                postal_code: 'WD24 4YY',
                premises: 'Office 3, ',
                country: 'United Kingdom',
                address_line_2: 'Penfold Works, Imperial Way'
              },
              description_identifier: ['dissolved-on'],
              address_snippet:
                'Office 3,  Unit R, Penfold Works, Imperial Way, Watford, United Kingdom, WD24 4YY',
              company_status: 'dissolved',
              description: '10537965 - Dissolved on 29 May 2018',
              snippet: '',
              company_number: '10537965',
              kind: 'searchresults#company',
              matches: {
                snippet: [],
                title: [1, 8]
              },
              title: 'INTEREST RATE REDUCER LIMITED',
              date_of_cessation: '2018-05-29',
              company_type: 'ltd',
              links: {
                self: '/company/10537965'
              }
            }
          ],
          items_per_page: 20,
          kind: 'search#companies',
          page_number: 1,
          start_index: 0,
          total_results: 858
        }
      }
    }
  }
} as const

export type SearchCompaniesResponse = FromSchema<
  typeof SearchCompaniesSchema['schema']['response']['200']
>
//export type SearchCompaniesResponse = any // temporary until schemas can be fixed
