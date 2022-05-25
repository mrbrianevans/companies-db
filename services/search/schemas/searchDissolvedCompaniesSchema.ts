import { FromSchema } from 'json-schema-to-ts'

export interface SearchDissolvedCompaniesParams {}

export interface SearchDissolvedCompaniesQueryString {
  /** The company name being searched for */
  q?: string
  /** Determines type of search. Options are alphabetical, best-match, previous-name-dissolved */
  search_type?: string
  /** The ordered_alpha_key_with_id used for alphabetical paging */
  search_above?: string
  /** The ordered_alpha_key_with_id used for alphabetical paging */
  search_below?: string
  /** The maximum number of results matching the search term(s) to return with a range of 1 to 100 */
  size?: string
  /** Used in best-match and previous-name-dissolved search-type */
  start_index?: string
}

export const SearchDissolvedCompaniesSchema = {
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
        search_type: {
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
                ordered_alpha_key_with_id: {
                  type: 'string'
                },
                kind: {
                  type: 'string'
                },
                date_of_cessation: {
                  type: 'string'
                },
                date_of_creation: {
                  type: 'string'
                },
                previous_company_names: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      ceased_on: {
                        type: 'string'
                      },
                      effective_from: {
                        type: 'string'
                      },
                      name: {
                        type: 'string'
                      },
                      company_number: {
                        type: 'string'
                      }
                    },
                    required: [
                      'ceased_on',
                      'effective_from',
                      'name',
                      'company_number'
                    ]
                  }
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
                    }
                  },
                  required: ['address_line_1']
                }
              },
              required: [
                'company_name',
                'company_number',
                'company_status',
                'ordered_alpha_key_with_id',
                'kind',
                'date_of_cessation',
                'date_of_creation'
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
              ordered_alpha_key_with_id: {
                type: 'string'
              },
              kind: {
                type: 'string'
              },
              date_of_cessation: {
                type: 'string'
              },
              date_of_creation: {
                type: 'string'
              },
              previous_company_names: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    ceased_on: {
                      type: 'string'
                    },
                    effective_from: {
                      type: 'string'
                    },
                    name: {
                      type: 'string'
                    },
                    company_number: {
                      type: 'string'
                    }
                  },
                  required: [
                    'ceased_on',
                    'effective_from',
                    'name',
                    'company_number'
                  ]
                }
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
                  }
                },
                required: ['address_line_1', 'address_line_2', 'postal_code']
              }
            },
            required: [
              'company_name',
              'company_number',
              'company_status',
              'ordered_alpha_key_with_id',
              'kind',
              'date_of_cessation',
              'date_of_creation'
            ]
          }
        },
        required: ['etag', 'hits', 'items', 'kind', 'top_hit'],
        additionalProperties: false,
        title: 'searchDissolved',
        example: {
          etag: '78835bd666832e4114a1b454ad1d2bc9fd1100c4',
          hits: 3978,
          items: [
            {
              company_name: 'CADMIUM COURT LIMITED',
              company_number: '02032259',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'CADMIUMCOURT:02032259',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1993-10-12',
              date_of_creation: '1986-06-27',
              previous_company_names: [
                {
                  ceased_on: '1988-06-27',
                  effective_from: '1986-06-27',
                  name: 'LAWCOURT LIMITED',
                  company_number: '02032259'
                }
              ]
            },
            {
              company_name: 'FANS COURT LIMITED',
              company_number: '06268400',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'FANSCOURT:06268400',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2009-04-07',
              date_of_creation: '2007-06-04',
              registered_office_address: {
                address_line_1: '3 Queens Gardens',
                address_line_2: 'Dartford',
                locality: 'Kent',
                postal_code: 'DA2 6HZ'
              }
            },
            {
              company_name: 'HIGHFIELD COURT LIMITED',
              company_number: '02639105',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'HIGHFIELDCOURT:02639105',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1993-05-25',
              date_of_creation: '1991-08-19'
            },
            {
              company_name: 'STERLING COURT LIMITED',
              company_number: '03312049',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'STERLINGCOURT:03312049',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2005-11-15',
              date_of_creation: '1997-02-03',
              registered_office_address: {
                address_line_1: 'Sterling House',
                address_line_2: '2-6 Market Place',
                locality: 'Atherton',
                postal_code: 'M46 0EG'
              },
              previous_company_names: [
                {
                  ceased_on: '2000-12-22',
                  effective_from: '1997-02-03',
                  name: 'GRANGE GREEN MANOR DEVELOPMENTS LIMITED',
                  company_number: '03312049'
                }
              ]
            },
            {
              company_name: 'OAKFIELD COURT LIMITED',
              company_number: '02370283',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'OAKFIELDCOURT:02370283',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2001-03-27',
              date_of_creation: '1989-04-10'
            },
            {
              company_name: 'WOODSTOCK COURT LIMITED',
              company_number: '06238747',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'WOODSTOCKCOURT:06238747',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2008-02-05',
              date_of_creation: '2007-05-08',
              registered_office_address: {
                address_line_1: '788-790 Finchley Road',
                address_line_2: 'Temple Fortune',
                locality: 'London',
                postal_code: 'NW11 7TJ'
              },
              previous_company_names: [
                {
                  ceased_on: '2007-05-23',
                  effective_from: '2007-05-08',
                  name: 'WOODSTOCK COURT (TOTON) MANAGEMENT COMPANY LIMITED',
                  company_number: '06238747'
                }
              ]
            },
            {
              company_name: 'GARDEN COURT LIMITED',
              company_number: '02189069',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'GARDENCOURT:02189069',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1990-10-23',
              date_of_creation: '1987-11-05'
            },
            {
              company_name: 'GREEMOUNT COURT LIMITED',
              company_number: '00292032',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'GREEMOUNTCOURT:00292032',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2007-06-26',
              date_of_creation: '1934-09-13',
              registered_office_address: {
                address_line_1: '2 Heap Bridge',
                address_line_2: 'Bury',
                locality: 'Lancashire',
                postal_code: 'BL9 7HR'
              },
              previous_company_names: [
                {
                  ceased_on: '2001-07-17',
                  effective_from: '1992-05-18',
                  name: 'DETAILVALUE LIMITED',
                  company_number: '00292032'
                },
                {
                  ceased_on: '1992-05-18',
                  effective_from: '1987-05-08',
                  name: 'BYSON PLASTICS LIMITED',
                  company_number: '00292032'
                },
                {
                  ceased_on: '1987-05-08',
                  effective_from: '1934-09-13',
                  name: 'BYSON APPLIANCE CO.LIMITED',
                  company_number: '00292032'
                }
              ]
            },
            {
              company_name: 'HIGHNAM COURT LIMITED',
              company_number: '01959999',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'HIGHNAMCOURT:01959999',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1995-05-02',
              date_of_creation: '1985-11-15',
              previous_company_names: [
                {
                  ceased_on: '1986-09-18',
                  effective_from: '1985-11-15',
                  name: 'SWIFT 790 LIMITED',
                  company_number: '01959999'
                }
              ]
            },
            {
              company_name: 'HOLLIN COURT LIMITED',
              company_number: '02815658',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'HOLLINCOURT:02815658',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2000-01-18',
              date_of_creation: '1993-05-06'
            },
            {
              company_name: 'COURT LION LIMITED',
              company_number: '03143234',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'COURTLION:03143234',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1999-09-07',
              date_of_creation: '1996-01-03',
              previous_company_names: [
                {
                  ceased_on: '1996-07-03',
                  effective_from: '1996-01-03',
                  name: 'HOLAW (355) LIMITED',
                  company_number: '03143234'
                }
              ]
            },
            {
              company_name: 'ELDON COURT PLC',
              company_number: 'SC127518',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'ELDONCOURT:SC127518',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1994-05-20',
              date_of_creation: '1990-09-25'
            },
            {
              company_name: 'VICTORIA COURT LIMITED',
              company_number: '00721507',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'VICTORIACOURT:00721507',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1994-07-05',
              date_of_creation: '1962-04-13'
            },
            {
              company_name: 'HEADWAY COURT LIMITED',
              company_number: '02471912',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'HEADWAYCOURT:02471912',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1995-08-01',
              date_of_creation: '1990-02-20'
            },
            {
              company_name: "FRIDAY'S COURT LIMITED",
              company_number: '01946707',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'FRIDAYSCOURT:01946707',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2005-04-05',
              date_of_creation: '1985-09-12',
              registered_office_address: {
                address_line_1: '3 Durrant Road',
                address_line_2: 'Bournemouth',
                locality: 'Dorset',
                postal_code: 'BH2 6NE'
              }
            },
            {
              company_name: 'BARRACK COURT LIMITED',
              company_number: '02268063',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'BARRACKCOURT:02268063',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1991-02-12',
              date_of_creation: '1988-06-16'
            },
            {
              company_name: 'COURT PERSONNEL LIMITED',
              company_number: '01807372',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'COURTPERSONNEL:01807372',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1990-11-27',
              date_of_creation: '1984-04-10'
            },
            {
              company_name: 'COURT EXPERIENCE LIMITED',
              company_number: '03498419',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'COURTEXPERIENCE:03498419',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1999-07-06',
              date_of_creation: '1998-01-23'
            },
            {
              company_name: 'COURT CONSULTANTS LIMITED',
              company_number: '04437406',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'COURTCONSULTANTS:04437406',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2009-06-30',
              date_of_creation: '2002-05-13',
              registered_office_address: {
                address_line_1: 'Eastgate House',
                address_line_2: '11 Cheyne Walk',
                locality: 'Northampton',
                postal_code: 'NN1 5PT'
              }
            },
            {
              company_name: 'CHARNWOOD COURT LIMITED',
              company_number: '02818345',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'CHARNWOODCOURT:02818345',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2009-10-13',
              date_of_creation: '1993-05-17',
              registered_office_address: {
                address_line_1: 'Flat 6, Charnwood Court',
                address_line_2: 'Leighton Street',
                locality: 'South Shields',
                postal_code: 'NE33 3BF'
              }
            }
          ],
          kind: 'search#dissolved',
          top_hit: {
            company_name: 'CADMIUM COURT LIMITED',
            company_number: '02032259',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'CADMIUMCOURT:02032259',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1993-10-12',
            date_of_creation: '1986-06-27',
            previous_company_names: [
              {
                ceased_on: '1988-06-27',
                effective_from: '1986-06-27',
                name: 'LAWCOURT LIMITED',
                company_number: '02032259'
              }
            ]
          }
        }
      }
    }
  }
} as const

export type SearchDissolvedCompaniesResponse = FromSchema<
  typeof SearchDissolvedCompaniesSchema['schema']['response']['200']
>
//export type SearchDissolvedCompaniesResponse = any // temporary until schemas can be fixed
