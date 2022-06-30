import { FromSchema } from 'json-schema-to-ts'

export interface SearchCompaniesAlphabeticallyParams {}

export interface SearchCompaniesAlphabeticallyQueryString {
  /** The company name being searched for */
  q: string
  /** The ordered_alpha_key_with_id used for paging */
  search_above?: string
  /** The ordered_alpha_key_with_id used for paging */
  search_below?: string
  /** The maximum number of results matching the search term(s) to return with a range of 1 to 100 */
  size?: string
}

export const SearchCompaniesAlphabeticallySchema = {
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
        search_above: {
          type: 'string'
        },
        search_below: {
          type: 'string'
        },
        size: {
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
                ordered_alpha_key_with_id: {
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
                }
              },
              required: [
                'company_name',
                'company_number',
                'company_type',
                'ordered_alpha_key_with_id',
                'kind',
                'links'
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
              ordered_alpha_key_with_id: {
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
              }
            },
            required: [
              'company_name',
              'company_number',
              'company_type',
              'ordered_alpha_key_with_id',
              'kind',
              'links'
            ]
          }
        },
        required: ['items', 'kind', 'top_hit'],
        additionalProperties: false,
        title: 'searchCompaniesAlphabetically',
        example: {
          items: [
            {
              company_name: 'DAVICO INDUSTRIAL LIMITED',
              company_number: '00900196',
              company_status: 'liquidation',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICOINDUSTRIAL:00900196',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/00900196'
              }
            },
            {
              company_name: 'DAVICOL COMMUNICATIONS LIMITED',
              company_number: '07676777',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICOLCOMMUNICATIONS:07676777',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/07676777'
              }
            },
            {
              company_name: 'DAVICON LTD',
              company_number: '05848804',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICON:05848804',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/05848804'
              }
            },
            {
              company_name: 'DAVICON ENGINEERING LIMITED',
              company_number: '06498788',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICONENGINEERING:06498788',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/06498788'
              }
            },
            {
              company_name: 'DAVICON GROUP LIMITED',
              company_number: '13019633',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICONGROUP:13019633',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/13019633'
              }
            },
            {
              company_name: 'DAVICON HOLDINGS LIMITED',
              company_number: '10891479',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICONHOLDINGS:10891479',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/10891479'
              }
            },
            {
              company_name: 'DAVICON MEZZANINE FLOORS LIMITED',
              company_number: '07014080',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICONMEZZANINEFLOORS:07014080',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/07014080'
              }
            },
            {
              company_name: 'DAVICO (NORTHERN) LIMITED',
              company_number: '01617227',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICONORTHERN:01617227',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/01617227'
              }
            },
            {
              company_name: 'DAVICO (PRODUCTS) LIMITED',
              company_number: '01615355',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICOPRODUCTS:01615355',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/01615355'
              }
            },
            {
              company_name: 'DAVICO PROPERTIES U.K. LIMITED',
              company_number: '03095731',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICOPROPERTIESUK:03095731',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/03095731'
              }
            },
            {
              company_name: 'DAVICO TIES & TERMINALS LIMITED',
              company_number: '10413229',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICOTIESANDTERMINALS:10413229',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/10413229'
              }
            },
            {
              company_name: 'DAVIC PRODUCTS LTD',
              company_number: '11550004',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICPRODUCTS:11550004',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/11550004'
              }
            },
            {
              company_name: 'DAVIC (PROPERTIES) LIMITED',
              company_number: '09337441',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICPROPERTIES:09337441',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/09337441'
              }
            },
            {
              company_name: 'DAVIC PROPERTY LTD',
              company_number: '09053287',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICPROPERTY:09053287',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/09053287'
              }
            },
            {
              company_name: 'DAVIC PUBCO LIMITED',
              company_number: 'SC287483',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICPUBCO:SC287483',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/SC287483'
              }
            },
            {
              company_name: 'DAVICS CONSTRUCTION LIMITED',
              company_number: '03373711',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICSCONSTRUCTION:03373711',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/03373711'
              }
            },
            {
              company_name: 'DAVICS PROPERTY LTD',
              company_number: '12805716',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICSPROPERTY:12805716',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/12805716'
              }
            },
            {
              company_name: 'DAVICS TECHNOLOGIES LTD',
              company_number: '13947120',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICSTECHNOLOGIES:13947120',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/13947120'
              }
            },
            {
              company_name: 'DAVIC TECH LIMITED',
              company_number: '08437758',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICTECH:08437758',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/08437758'
              }
            },
            {
              company_name: 'DAVICTOR LIMITED',
              company_number: '07401500',
              company_status: 'liquidation',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVICTOR:07401500',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/07401500'
              }
            },
            {
              company_name: 'DAVID LIMITED',
              company_number: '03403744',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:03403744',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/03403744'
              }
            },
            {
              company_name: 'DAVID & AARONS PAPERWORKS LTD',
              company_number: '06999775',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:06999775',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/06999775'
              }
            },
            {
              company_name: 'DAVID & COMPANY LIMITED',
              company_number: '08305500',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:08305500',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/08305500'
              }
            },
            {
              company_name: 'DAVID & CRIS LTD',
              company_number: '09129719',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:09129719',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/09129719'
              }
            },
            {
              company_name: 'DAVID & CO LTD',
              company_number: '09394851',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:09394851',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/09394851'
              }
            },
            {
              company_name: 'DAVID & BELL LIMITED',
              company_number: '09549021',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:09549021',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/09549021'
              }
            },
            {
              company_name: 'DAVID&M LIMITED',
              company_number: '10498991',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:10498991',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/10498991'
              }
            },
            {
              company_name: 'DAVID&CRISTIAN. LIMITED',
              company_number: '11206225',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:11206225',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/11206225'
              }
            },
            {
              company_name: 'DAVID & DANIEL LTD',
              company_number: '11541478',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:11541478',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/11541478'
              }
            },
            {
              company_name: 'DAVID&ANDI LTD',
              company_number: '11720085',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:11720085',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/11720085'
              }
            },
            {
              company_name: 'DAVID & POLO LIMITED',
              company_number: '11858774',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:11858774',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/11858774'
              }
            },
            {
              company_name: 'DAVID&ALEXANDRU LTD',
              company_number: '11946800',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:11946800',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/11946800'
              }
            },
            {
              company_name: 'DAVID & CO. LTD',
              company_number: '13481075',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVID:13481075',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/13481075'
              }
            },
            {
              company_name: 'DAVID A LIMITED',
              company_number: '09408113',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVIDA:09408113',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/09408113'
              }
            },
            {
              company_name: 'DAVIDA LIMITED',
              company_number: 'SC313857',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVIDA:SC313857',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/SC313857'
              }
            },
            {
              company_name: 'DAVIDAARMSTRONG LIMITED',
              company_number: '07199382',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVIDAARMSTRONG:07199382',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/07199382'
              }
            },
            {
              company_name: 'DAVID AARON LIMITED',
              company_number: '09435505',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVIDAARON:09435505',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/09435505'
              }
            },
            {
              company_name: 'DAVID ABBOTT & PARTNERS LIMITED',
              company_number: '02310410',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVIDABBOTTANDPARTNERS:02310410',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/02310410'
              }
            },
            {
              company_name: 'DAVID ABBOTT PROJECTS LTD.',
              company_number: '07231357',
              company_status: 'active',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVIDABBOTTPROJECTS:07231357',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/07231357'
              }
            },
            {
              company_name: 'DAVID ABBOTTS CONSULTING LTD',
              company_number: '12946947',
              company_status: 'dissolved',
              company_type: 'ltd',
              ordered_alpha_key_with_id: 'DAVIDABBOTTSCONSULTING:12946947',
              kind: 'searchresults#alphabetical-search',
              links: {
                company_profile: '/company/12946947'
              }
            }
          ],
          kind: 'search#alphabetical-search',
          top_hit: {
            company_name: 'DAVID LIMITED',
            company_number: '03403744',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:03403744',
            kind: 'searchresults#alphabetical-search',
            links: {
              company_profile: '/company/03403744'
            }
          }
        }
      }
    }
  }
} as const

export type SearchCompaniesAlphabeticallyResponse = FromSchema<
  typeof SearchCompaniesAlphabeticallySchema['schema']['response']['200']
>
//export type SearchCompaniesAlphabeticallyResponse = any // temporary until schemas can be fixed
