import { FromSchema } from 'json-schema-to-ts'

export interface AdvancedCompanySearchParams {}

export interface AdvancedCompanySearchQueryString {
  /** The company name (must contain) advanced search filter */
  company_name?: string
  /** The company status advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. company_status=xxx&company_status=yyy */
  company_status?: undefined
  /** The company subtype advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. company_subtype=xxx&company_subtype=yyy */
  company_subtype?: string
  /** The company type advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. company_type=xxx&company_type=yyy */
  company_type?: undefined
  /** The dissolved from date advanced search filter */
  dissolved_from?: undefined
  /** The dissolved to date advanced search filter */
  dissolved_to?: undefined
  /** The incorporated from date advanced search filter */
  incorporated_from?: undefined
  /** The incorporated to date advanced search filter */
  incorporated_to?: undefined
  /** The location advanced search filter */
  location?: string
  /** The SIC codes advanced search filter. To search using multiple values, use a comma delimited list or multiple of the same key i.e. sic_codes=xxx&sic_codes=yyy */
  sic_codes?: undefined
  /** The maximum number of results matching the search term(s) to return with a range of 1 to 5000 */
  size?: string
  /** The point at which results will start from i.e show search results from result 20 (used for paging) */
  start_index?: string
}

export const AdvancedCompanySearchSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {},
      required: []
    },
    querystring: {
      type: 'object',
      properties: {
        company_name: {
          type: 'string'
        },
        company_status: {},
        company_subtype: {
          type: 'string'
        },
        company_type: {},
        dissolved_from: {},
        dissolved_to: {},
        incorporated_from: {},
        incorporated_to: {},
        location: {
          type: 'string'
        },
        sic_codes: {},
        size: {
          type: 'string'
        },
        start_index: {
          type: 'string'
        }
      },
      required: []
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          etag: {
            type: 'string'
          },
          hits: {
            type: 'integer'
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                company_name: {
                  type: 'string'
                },
                company_number: {
                  type: 'string'
                },
                company_status: {
                  type: 'string'
                },
                company_type: {
                  type: 'string'
                },
                kind: {
                  type: 'string'
                },
                links: {
                  type: 'object',
                  properties: {
                    company_profile: {
                      type: 'string'
                    }
                  },
                  required: ['company_profile']
                },
                date_of_cessation: {
                  type: 'string'
                },
                date_of_creation: {
                  type: 'string'
                },
                registered_office_address: {
                  type: 'object',
                  properties: {
                    address_line_1: {
                      type: 'string'
                    },
                    address_line_2: {
                      type: 'string'
                    },
                    locality: {
                      type: 'string'
                    },
                    postal_code: {
                      type: 'string'
                    },
                    region: {
                      type: 'string'
                    },
                    country: {
                      type: 'string'
                    }
                  }
                },
                sic_codes: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                },
                company_subtype: {
                  type: 'string'
                }
              },
              required: [
                'company_name',
                'company_number',
                'company_status',
                'company_type',
                'kind',
                'links',
                'date_of_creation',
                'registered_office_address',
                'sic_codes'
              ]
            }
          },
          kind: {
            type: 'string'
          },
          top_hit: {
            type: 'object',
            properties: {
              company_name: {
                type: 'string'
              },
              company_number: {
                type: 'string'
              },
              company_status: {
                type: 'string'
              },
              company_type: {
                type: 'string'
              },
              kind: {
                type: 'string'
              },
              links: {
                type: 'object',
                properties: {
                  company_profile: {
                    type: 'string'
                  }
                },
                required: ['company_profile']
              },
              date_of_cessation: {
                type: 'string'
              },
              date_of_creation: {
                type: 'string'
              },
              registered_office_address: {
                type: 'object',
                properties: {
                  address_line_1: {
                    type: 'string'
                  },
                  address_line_2: {
                    type: 'string'
                  },
                  locality: {
                    type: 'string'
                  },
                  postal_code: {
                    type: 'string'
                  },
                  region: {
                    type: 'string'
                  },
                  country: {
                    type: 'string'
                  }
                },
                required: ['address_line_1']
              },
              sic_codes: {
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            },
            required: [
              'company_name',
              'company_number',
              'company_status',
              'company_type',
              'kind',
              'links',
              'date_of_creation',
              'registered_office_address',
              'sic_codes'
            ]
          }
        },
        required: ['hits', 'items', 'kind', 'top_hit'],
        additionalProperties: false,
        title: 'advancedCompanySearch',
        example: {
          etag: '425f6d9a46dcc54ffc185ed3d4311dc22f2accef',
          hits: 25966,
          items: [
            {
              company_name: 'SOUTHDOWN RADIO COMMUNICATIONS LIMITED',
              company_number: '02308661',
              company_status: 'dissolved',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02308661'
              },
              date_of_cessation: '2016-06-07',
              date_of_creation: '1988-10-25',
              registered_office_address: {
                address_line_1: 'Sussex House',
                address_line_2: '190 South Coast Road',
                locality: 'Peacehaven',
                postal_code: 'BN10 8JJ',
                region: 'East Sussex'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'ORANGE CORPORATE SERVICES LIMITED',
              company_number: '02330298',
              company_status: 'dissolved',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02330298'
              },
              date_of_cessation: '2019-07-02',
              date_of_creation: '1988-12-21',
              registered_office_address: {
                address_line_1: '3 More London Riverside',
                locality: 'London',
                postal_code: 'SE1 2AQ',
                region: 'England'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'EVOLVING SYSTEMS LIMITED',
              company_number: '02325854',
              company_status: 'active',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02325854'
              },
              date_of_creation: '1988-12-07',
              registered_office_address: {
                address_line_1: '4th Floor 2 City Approach Albert Street',
                address_line_2: 'Eccles',
                locality: 'Manchester',
                postal_code: 'M30 0BL',
                country: 'England'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'VANCO UK LIMITED',
              company_number: '02296733',
              company_status: 'active',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02296733'
              },
              date_of_creation: '1988-09-15',
              registered_office_address: {
                address_line_1: 'World Business Centre 2',
                address_line_2: 'Newall Road',
                locality: 'Middlesex',
                postal_code: 'TW6 2SF',
                country: 'United Kingdom'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'THE BUSINESS ORGANISATION LIMITED',
              company_number: '02371977',
              company_status: 'dissolved',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02371977'
              },
              date_of_cessation: '2016-09-27',
              date_of_creation: '1989-04-13',
              registered_office_address: {
                address_line_1: 'The Cott',
                address_line_2: 'The Dell Anderby Creek',
                locality: 'Lincolnshire',
                postal_code: 'PE24 5XT'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'NTL CABLECOMMS CHESHIRE',
              company_number: '02379804',
              company_status: 'dissolved',
              company_type: 'private-unlimited',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02379804'
              },
              date_of_cessation: '2020-02-28',
              date_of_creation: '1989-05-04',
              registered_office_address: {
                address_line_1: '1 More London Place',
                locality: 'London',
                postal_code: 'SE1 2AF'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'TELEWEST COMMUNICATIONS (TELFORD) LIMITED',
              company_number: '02389377',
              company_status: 'dissolved',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02389377'
              },
              date_of_cessation: '2018-08-28',
              date_of_creation: '1989-05-25',
              registered_office_address: {
                address_line_1: 'Media House',
                address_line_2: 'Bartley Wood Business Park',
                locality: 'Hook',
                postal_code: 'RG27 9UP',
                region: 'Hampshire'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'NTL CABLECOMMS DERBY',
              company_number: '02387713',
              company_status: 'dissolved',
              company_type: 'private-unlimited',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02387713'
              },
              date_of_cessation: '2019-08-25',
              date_of_creation: '1989-05-22',
              registered_office_address: {
                address_line_1: '1 More London Place',
                locality: 'London',
                postal_code: 'SE1 2AF'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'TELEWEST COMMUNICATIONS (TYNESIDE) LIMITED',
              company_number: '02407676',
              company_status: 'dissolved',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02407676'
              },
              date_of_cessation: '2021-03-16',
              date_of_creation: '1989-07-25',
              registered_office_address: {
                address_line_1: '500 Brook Drive',
                locality: 'Reading',
                postal_code: 'RG2 6UU',
                country: 'United Kingdom'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'BT GLOBAL SERVICES LIMITED',
              company_number: '02410810',
              company_status: 'active',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02410810'
              },
              date_of_creation: '1989-08-03',
              registered_office_address: {
                address_line_1: '1 Braham Street',
                locality: 'London',
                postal_code: 'E1 8EE',
                country: 'United Kingdom'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'FREEDOM COMMUNICATIONS (U.K.) LIMITED',
              company_number: '02443243',
              company_status: 'active',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02443243'
              },
              date_of_creation: '1989-11-15',
              registered_office_address: {
                address_line_1: '19-25 Nuffield Road',
                locality: 'Poole',
                postal_code: 'BH17 0RU',
                region: 'Dorset',
                country: 'England'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'NTL CABLECOMMS BURY AND ROCHDALE',
              company_number: '02446183',
              company_status: 'dissolved',
              company_type: 'private-unlimited',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02446183'
              },
              date_of_cessation: '2018-11-13',
              date_of_creation: '1989-11-24',
              registered_office_address: {
                address_line_1: '1 More London Place',
                locality: 'London',
                postal_code: 'SE1 2AF'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'DIGITAL EXCHANGE PRODUCTS LIMITED',
              company_number: '02446759',
              company_status: 'active',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02446759'
              },
              date_of_creation: '1989-11-27',
              registered_office_address: {
                address_line_1: 'Gate House 5 Chapel Place',
                address_line_2: 'Rivington Street',
                locality: 'London',
                postal_code: 'EC2A 3SB',
                country: 'England'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'MIDDLESEX CABLE LIMITED',
              company_number: '02460325',
              company_status: 'dissolved',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02460325'
              },
              date_of_cessation: '2018-04-18',
              date_of_creation: '1990-01-17',
              registered_office_address: {
                address_line_1: '1 More London Place',
                locality: 'London',
                postal_code: 'SE1 2AF'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'CABLE ENFIELD LIMITED',
              company_number: '02466511',
              company_status: 'dissolved',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02466511'
              },
              date_of_cessation: '2018-04-18',
              date_of_creation: '1990-02-02',
              registered_office_address: {
                address_line_1: '1 More London Place',
                locality: 'London',
                postal_code: 'SE1 2AF'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'SHEFFIELD CABLE COMMUNICATIONS LIMITED',
              company_number: '02465953',
              company_status: 'dissolved',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02465953'
              },
              date_of_cessation: '2019-08-25',
              date_of_creation: '1990-02-01',
              registered_office_address: {
                address_line_1: '1 More London Place',
                locality: 'London',
                postal_code: 'SE1 2AF'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'ALL POINTS NORTH PUBLICATIONS LIMITED',
              company_number: '02524607',
              company_status: 'active',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02524607'
              },
              date_of_creation: '1990-07-23',
              registered_office_address: {
                address_line_1: '12 Heatons Court Heatons Court',
                locality: 'Leeds',
                postal_code: 'LS1 4LJ',
                country: 'England'
              },
              sic_codes: ['56302', '61900']
            },
            {
              company_name: 'THE BUSH TELEGRAPH COMPANY (UK) LIMITED',
              company_number: '02534698',
              company_status: 'dissolved',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02534698'
              },
              date_of_cessation: '2018-04-10',
              date_of_creation: '1990-08-28',
              registered_office_address: {
                address_line_1: '53 Fore Street',
                locality: 'Ivybridge',
                postal_code: 'PL21 9AE',
                region: 'Devon'
              },
              sic_codes: ['61100', '61200', '61900']
            },
            {
              company_name: 'NETCOM (U.K.) LIMITED',
              company_number: '02532785',
              company_status: 'active',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02532785'
              },
              date_of_creation: '1990-08-20',
              registered_office_address: {
                address_line_1: 'Langton',
                address_line_2: 'Gorelands Lane',
                locality: 'Chalfont St. Giles',
                postal_code: 'HP8 4HQ',
                region: 'Buckinghamshire'
              },
              sic_codes: ['61900']
            },
            {
              company_name: 'WIZANER LIMITED',
              company_number: '02530183',
              company_status: 'active',
              company_type: 'ltd',
              kind: 'search-results#company',
              links: {
                company_profile: '/company/02530183'
              },
              date_of_creation: '1990-08-13',
              registered_office_address: {
                address_line_1: '61 Charlotte Street',
                address_line_2: 'Birmingham',
                locality: 'West Midlands',
                postal_code: 'B3 1PX'
              },
              sic_codes: ['61900', '62020']
            }
          ],
          kind: 'search#advanced-search',
          top_hit: {
            company_name: 'SOUTHDOWN RADIO COMMUNICATIONS LIMITED',
            company_number: '02308661',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: {
              company_profile: '/company/02308661'
            },
            date_of_cessation: '2016-06-07',
            date_of_creation: '1988-10-25',
            registered_office_address: {
              address_line_1: 'Sussex House',
              address_line_2: '190 South Coast Road',
              locality: 'Peacehaven',
              postal_code: 'BN10 8JJ',
              region: 'East Sussex'
            },
            sic_codes: ['61900']
          }
        }
      }
    }
  }
} as const

export type AdvancedCompanySearchResponse = FromSchema<
  typeof AdvancedCompanySearchSchema['schema']['response']['200']
>
//export type AdvancedCompanySearchResponse = any // temporary until schemas can be fixed
