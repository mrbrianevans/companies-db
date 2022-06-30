import { FromSchema } from 'json-schema-to-ts'

export interface SearchDissolvedCompaniesParams {}

export interface SearchDissolvedCompaniesQueryString {
  /** The company name being searched for */
  q: string
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
      required: ['q']
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
                registered_office_address: {
                  type: 'object',
                  properties: {
                    address_line_1: {
                      type: 'string'
                    },
                    address_line_2: {
                      type: 'string'
                    },
                    postal_code: {
                      type: 'string'
                    },
                    locality: {
                      type: 'string'
                    }
                  },
                  required: ['address_line_1']
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
        additionalProperties: false,
        title: 'searchDissolvedCompanies',
        example: {
          etag: '267d2874b33c3e24ea04257f8b271fce6bddb1c1',
          hits: 4306,
          items: [
            {
              company_name: 'ENERGY LIMITED',
              company_number: '02364353',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'ENERGY:02364353',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1993-10-12',
              date_of_creation: '1989-03-22'
            },
            {
              company_name: 'ENERGY LIMITED',
              company_number: '02886665',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'ENERGY:02886665',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1997-07-15',
              date_of_creation: '1994-01-12'
            },
            {
              company_name: 'ENERGY SKATEPARK LIMITED',
              company_number: '05298758',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'ENERGYSKATEPARK:05298758',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2007-06-02',
              date_of_creation: '2004-11-29',
              registered_office_address: {
                address_line_1: '1 Brassey Road',
                address_line_2: 'Old Potts Way Shrewsbury',
                postal_code: 'SY3 7FA'
              }
            },
            {
              company_name: 'POSITIVE ENERGY LIMITED',
              company_number: '02991454',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'POSITIVEENERGY:02991454',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2002-04-02',
              date_of_creation: '1994-11-17'
            },
            {
              company_name: 'ENERGY ADVOCATES LIMITED',
              company_number: '02672143',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'ENERGYADVOCATES:02672143',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1995-03-28',
              date_of_creation: '1991-12-17'
            },
            {
              company_name: 'EUROPA ENERGY PLC',
              company_number: '01513904',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'EUROPAENERGY:01513904',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2007-03-20',
              date_of_creation: '1980-08-22',
              registered_office_address: {
                address_line_1: 'Hill House',
                address_line_2: '1 Little New Street',
                locality: 'London',
                postal_code: 'EC4A 3TR'
              },
              previous_company_names: [
                {
                  ceased_on: '1990-04-25',
                  effective_from: '1980-12-31',
                  name: 'TR ENERGY PUBLIC LIMITED COMPANY',
                  company_number: '01513904'
                },
                {
                  ceased_on: '1980-12-31',
                  effective_from: '1980-08-22',
                  name: 'KESTVILLE LIMITED',
                  company_number: '01513904'
                }
              ]
            },
            {
              company_name: 'PARKWOOD ENERGY LIMITED',
              company_number: '06190542',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'PARKWOODENERGY:06190542',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2009-03-10',
              date_of_creation: '2007-03-28',
              registered_office_address: {
                address_line_1: '240 Hawthorne Road',
                address_line_2: 'Liverpool',
                postal_code: 'L20 3AS'
              }
            },
            {
              company_name: 'VENTURE ENERGY LIMITED',
              company_number: '03624888',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'VENTUREENERGY:03624888',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2009-01-20',
              date_of_creation: '1998-09-01',
              registered_office_address: {
                address_line_1: '10 Ranelagh Grove',
                address_line_2: 'London',
                postal_code: 'SW1W 8PD'
              }
            },
            {
              company_name: 'WIGHT ENERGY PLC',
              company_number: '02836906',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'WIGHTENERGY:02836906',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1995-06-20',
              date_of_creation: '1993-07-16'
            },
            {
              company_name: 'ENERGY ANGLIA LIMITED',
              company_number: '01442374',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'ENERGYANGLIA:01442374',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1991-07-09',
              date_of_creation: '1979-08-07',
              previous_company_names: [
                {
                  ceased_on: '1988-03-09',
                  effective_from: '1979-08-07',
                  name: 'DISAB (U.K.) LIMITED',
                  company_number: '01442374'
                }
              ]
            },
            {
              company_name: 'ENERGY LINE LIMITED',
              company_number: '03168329',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'ENERGYLINE:03168329',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2000-08-22',
              date_of_creation: '1996-03-06'
            },
            {
              company_name: 'CLAYTON ENERGY LIMITED',
              company_number: '03151028',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'CLAYTONENERGY:03151028',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2003-04-15',
              date_of_creation: '1996-01-25',
              registered_office_address: {
                address_line_1: 'Yorkshire House',
                address_line_2: '7 South Lane',
                locality: 'Holmfirth Huddersfield',
                postal_code: 'HD9 1HN'
              }
            },
            {
              company_name: 'FREEDOM ENERGY LIMITED',
              company_number: '05665927',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'FREEDOMENERGY:05665927',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2008-06-18',
              date_of_creation: '2006-01-04',
              registered_office_address: {
                address_line_1: '2nd Floor',
                address_line_2: '145-157 St.John Street',
                locality: 'London',
                postal_code: 'EC1V 4PY'
              }
            },
            {
              company_name: 'CREATIVE ENERGY LIMITED',
              company_number: '04915887',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'CREATIVEENERGY:04915887',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2005-06-28',
              date_of_creation: '2003-09-30',
              registered_office_address: {
                address_line_1: '11 Coronation Avenue',
                address_line_2: 'Rushwick',
                locality: 'Worcester',
                postal_code: 'WR2 5TF'
              }
            },
            {
              company_name: 'EXXCO ENERGY LIMITED',
              company_number: 'SC158854',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'EXXCOENERGY:SC158854',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1998-09-18',
              date_of_creation: '1995-06-27',
              previous_company_names: [
                {
                  ceased_on: '1995-08-21',
                  effective_from: '1995-06-27',
                  name: 'LEDGE 233 LIMITED',
                  company_number: 'SC158854'
                }
              ]
            },
            {
              company_name: 'OMEGA ENERGY LIMITED',
              company_number: '06314478',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'OMEGAENERGY:06314478',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2009-04-07',
              date_of_creation: '2007-07-16',
              registered_office_address: {
                address_line_1: '24 Grangewood',
                address_line_2: 'Potters Bar',
                locality: 'Herts',
                postal_code: 'EN6 1SH'
              }
            },
            {
              company_name: 'HANSEN ENERGY LIMITED',
              company_number: '04336907',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'HANSENENERGY:04336907',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2009-08-11',
              date_of_creation: '2001-12-10',
              registered_office_address: {
                address_line_1: 'C/O BREBNERS',
                address_line_2: '6th Floor Tubs Hill House North London Road',
                locality: 'Sevenoaks',
                postal_code: 'TN13 1BL'
              }
            },
            {
              company_name: 'WORLDWIDE ENERGY LIMITED',
              company_number: '03112802',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'WORLDWIDEENERGY:03112802',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '1997-07-29',
              date_of_creation: '1995-10-12'
            },
            {
              company_name: 'ROWLEY ENERGY LIMITED',
              company_number: '02763442',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'ROWLEYENERGY:02763442',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2007-10-02',
              date_of_creation: '1992-11-10',
              registered_office_address: {
                address_line_1: '20-22 Queen Street',
                address_line_2: 'Mayfair',
                locality: 'London',
                postal_code: 'W1J 5PR'
              },
              previous_company_names: [
                {
                  ceased_on: '1993-01-15',
                  effective_from: '1992-11-10',
                  name: 'IBIS (214) LIMITED',
                  company_number: '02763442'
                }
              ]
            },
            {
              company_name: 'MCC ENERGY LIMITED',
              company_number: '05570203',
              company_status: 'dissolved',
              ordered_alpha_key_with_id: 'MCCENERGY:05570203',
              kind: 'searchresults#dissolved-company',
              date_of_cessation: '2009-08-18',
              date_of_creation: '2005-09-21',
              registered_office_address: {
                address_line_1: '344 Linen Hall 162 - 168 Regent Street',
                locality: 'London',
                postal_code: 'W1B 5TD'
              },
              previous_company_names: [
                {
                  ceased_on: '2009-01-16',
                  effective_from: '2005-11-01',
                  name: 'MCC ENERGY PLC',
                  company_number: '05570203'
                },
                {
                  ceased_on: '2005-11-01',
                  effective_from: '2005-09-21',
                  name: 'TERSUS ENERGY PLC',
                  company_number: '05570203'
                }
              ]
            }
          ],
          kind: 'search#dissolved',
          top_hit: {
            company_name: 'ENERGY LIMITED',
            company_number: '02364353',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'ENERGY:02364353',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1993-10-12',
            date_of_creation: '1989-03-22'
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
