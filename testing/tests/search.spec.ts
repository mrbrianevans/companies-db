import * as TestRequests from '../getTestRequests'
import { testRequests } from '../testRequests'
fetch('http://localhost:3000').catch() //to remove warning about fetch being experimental from test results

describe('search-service', function () {
  // tests for each path
  it('advancedCompanySearch: /advanced-search/companies', async function () {
    const schema = {
      title: 'A list of companies',
      type: 'object',
      required: [],
      allOf: [
        {
          properties: {
            etag: { type: 'string' },
            items: {
              type: 'array',
              items: {
                title: 'advancedCompany',
                required: [
                  'company_name',
                  'company_number',
                  'company_status',
                  'company_type',
                  'date_of_creation',
                  'kind'
                ],
                properties: {
                  company_name: {
                    type: 'string',
                    description: 'The company name associated with the company'
                  },
                  company_number: {
                    type: 'string',
                    description: 'The company number of the company'
                  },
                  company_status: {
                    description:
                      'The status of the company.  \n For enumeration descriptions see `company_status` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)  ',
                    type: 'string',
                    enum: [
                      'active',
                      'dissolved',
                      'open',
                      'closed',
                      'converted-closed',
                      'receivership',
                      'administration',
                      'liquidation',
                      'insolvency-proceedings',
                      'voluntary-arrangement'
                    ]
                  },
                  company_type: {
                    description:
                      'The type of the company.  \n For enumeration descriptions see `company_type` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)    ',
                    enum: [
                      'private-unlimited',
                      'ltd',
                      'plc',
                      'old-public-company',
                      'private-limited-guarant-nsc-limited-exemption',
                      'limited-partnership',
                      'private-limited-guarant-nsc',
                      'converted-or-closed',
                      'private-unlimited-nsc',
                      'private-limited-shares-section-30-exemption',
                      'protected-cell-company',
                      'assurance-company',
                      'oversea-company',
                      'eeig',
                      'icvc-securities',
                      'icvc-warrant',
                      'icvc-umbrella',
                      'registered-society-non-jurisdictional',
                      'industrial-and-provident-society',
                      'northern-ireland',
                      'northern-ireland-other',
                      'royal-charter',
                      'investment-company-with-variable-capital',
                      'unregistered-company',
                      'llp',
                      'other',
                      'european-public-limited-liability-company-se',
                      'uk-establishment',
                      'scottish-partnership',
                      'charitable-incorporated-organisation',
                      'scottish-charitable-incorporated-organisation',
                      'further-education-or-sixth-form-college-corporation'
                    ],
                    type: 'string'
                  },
                  company_subtype: {
                    description:
                      'The subtype of the company.  \n For enumeration descriptions see `company_subtype` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)',
                    type: 'string',
                    enum: [
                      'community-interest-company',
                      'private-fund-limited-partnership'
                    ]
                  },
                  kind: {
                    type: 'string',
                    enum: ['search-results#company'],
                    description: 'The type of search result'
                  },
                  links: {
                    type: 'object',
                    description: 'The link to the company',
                    properties: {
                      company_profile: {
                        type: 'string',
                        description: 'The link to the company'
                      }
                    }
                  },
                  date_of_cessation: {
                    type: 'string',
                    format: 'date',
                    description: 'The date that the company was dissolved'
                  },
                  date_of_creation: {
                    type: 'string',
                    format: 'date',
                    description: 'The date that the company was incorporated'
                  },
                  registered_office_address: {
                    title: 'Registered Office Address',
                    description:
                      'This will only appear if there are ROA details in the company record',
                    properties: {
                      address_line_1: {
                        type: 'string',
                        description:
                          'The first line of the address e.g Crown Way'
                      },
                      address_line_2: {
                        type: 'string',
                        description: 'The second line of the address'
                      },
                      locality: {
                        type: 'string',
                        description:
                          'The town associated to the ROA e.g Cardiff'
                      },
                      postal_code: {
                        type: 'string',
                        description: 'The postal code e.g CF14 3UZ'
                      },
                      region: {
                        description: 'The region e.g Surrey.',
                        type: 'string'
                      },
                      country: {
                        description: 'The country.',
                        enum: [
                          'Wales',
                          'England',
                          'Scotland',
                          'Great Britain',
                          'Not specified',
                          'United Kingdom',
                          'Northern Ireland'
                        ],
                        type: 'string'
                      }
                    }
                  },
                  sic_codes: {
                    items: { type: 'string' },
                    type: 'array',
                    description: 'SIC codes for this company'
                  }
                }
              }
            },
            kind: { type: 'string', enum: ['search#advanced-search'] },
            top_hit: {
              allOf: [
                {
                  title: 'advancedCompany',
                  required: [
                    'company_name',
                    'company_number',
                    'company_status',
                    'company_type',
                    'date_of_creation',
                    'kind'
                  ],
                  properties: {
                    company_name: {
                      type: 'string',
                      description:
                        'The company name associated with the company'
                    },
                    company_number: {
                      type: 'string',
                      description: 'The company number of the company'
                    },
                    company_status: {
                      description:
                        'The status of the company.  \n For enumeration descriptions see `company_status` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)  ',
                      type: 'string',
                      enum: [
                        'active',
                        'dissolved',
                        'open',
                        'closed',
                        'converted-closed',
                        'receivership',
                        'administration',
                        'liquidation',
                        'insolvency-proceedings',
                        'voluntary-arrangement'
                      ]
                    },
                    company_type: {
                      description:
                        'The type of the company.  \n For enumeration descriptions see `company_type` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)    ',
                      enum: [
                        'private-unlimited',
                        'ltd',
                        'plc',
                        'old-public-company',
                        'private-limited-guarant-nsc-limited-exemption',
                        'limited-partnership',
                        'private-limited-guarant-nsc',
                        'converted-or-closed',
                        'private-unlimited-nsc',
                        'private-limited-shares-section-30-exemption',
                        'protected-cell-company',
                        'assurance-company',
                        'oversea-company',
                        'eeig',
                        'icvc-securities',
                        'icvc-warrant',
                        'icvc-umbrella',
                        'registered-society-non-jurisdictional',
                        'industrial-and-provident-society',
                        'northern-ireland',
                        'northern-ireland-other',
                        'royal-charter',
                        'investment-company-with-variable-capital',
                        'unregistered-company',
                        'llp',
                        'other',
                        'european-public-limited-liability-company-se',
                        'uk-establishment',
                        'scottish-partnership',
                        'charitable-incorporated-organisation',
                        'scottish-charitable-incorporated-organisation',
                        'further-education-or-sixth-form-college-corporation'
                      ],
                      type: 'string'
                    },
                    company_subtype: {
                      description:
                        'The subtype of the company.  \n For enumeration descriptions see `company_subtype` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/constants.yml)',
                      type: 'string',
                      enum: [
                        'community-interest-company',
                        'private-fund-limited-partnership'
                      ]
                    },
                    kind: {
                      type: 'string',
                      enum: ['search-results#company'],
                      description: 'The type of search result'
                    },
                    links: {
                      type: 'object',
                      description: 'The link to the company',
                      properties: {
                        company_profile: {
                          type: 'string',
                          description: 'The link to the company'
                        }
                      }
                    },
                    date_of_cessation: {
                      type: 'string',
                      format: 'date',
                      description: 'The date that the company was dissolved'
                    },
                    date_of_creation: {
                      type: 'string',
                      format: 'date',
                      description: 'The date that the company was incorporated'
                    },
                    registered_office_address: {
                      title: 'Registered Office Address',
                      description:
                        'This will only appear if there are ROA details in the company record',
                      properties: {
                        address_line_1: {
                          type: 'string',
                          description:
                            'The first line of the address e.g Crown Way'
                        },
                        address_line_2: {
                          type: 'string',
                          description: 'The second line of the address'
                        },
                        locality: {
                          type: 'string',
                          description:
                            'The town associated to the ROA e.g Cardiff'
                        },
                        postal_code: {
                          type: 'string',
                          description: 'The postal code e.g CF14 3UZ'
                        },
                        region: {
                          description: 'The region e.g Surrey.',
                          type: 'string'
                        },
                        country: {
                          description: 'The country.',
                          enum: [
                            'Wales',
                            'England',
                            'Scotland',
                            'Great Britain',
                            'Not specified',
                            'United Kingdom',
                            'Northern Ireland'
                          ],
                          type: 'string'
                        }
                      }
                    },
                    sic_codes: {
                      items: { type: 'string' },
                      type: 'array',
                      description: 'SIC codes for this company'
                    }
                  }
                },
                {
                  description:
                    'The best matching company in an advanced search results'
                }
              ]
            },
            hits: {
              type: 'string',
              description: 'The number of matches found using advanced search'
            }
          }
        }
      ]
    }
    await testRequests(TestRequests.advancedCompanySearchReqs, schema)
  })

  it('searchCompaniesAlphabetically: /alphabetic-search/companies', async function () {
    const schema = {
      title: 'List of companies',
      type: 'object',
      allOf: [
        {
          properties: {
            items: {
              type: 'array',
              items: {
                title: 'Alphabetical company',
                required: [
                  'company_name',
                  'company_number',
                  'company_status',
                  'company_type',
                  'links'
                ],
                properties: {
                  company_name: {
                    type: 'string',
                    description: 'The company name associated with the company'
                  },
                  company_number: {
                    type: 'string',
                    description: 'The company number of the company'
                  },
                  company_status: {
                    type: 'string',
                    description: 'The status of the company'
                  },
                  ordered_alpha_key_with_id: {
                    type: 'string',
                    description:
                      "The alphakey with it's id associated with the company"
                  },
                  kind: {
                    type: 'string',
                    enum: ['search-results#alphabetical-search'],
                    description: 'The type of search result'
                  },
                  links: {
                    type: 'object',
                    description: 'The link to the company',
                    properties: {
                      company_profile: {
                        type: 'string',
                        description: 'The link to the company'
                      }
                    }
                  },
                  company_type: {
                    type: 'string',
                    description:
                      'The type of company associated with the company'
                  }
                }
              }
            },
            kind: {
              type: 'string',
              enum: ['search#alphabetical-search', 'search#enhanced-search']
            },
            top_hit: {
              allOf: [
                {
                  title: 'Alphabetical company',
                  required: [
                    'company_name',
                    'company_number',
                    'company_status',
                    'company_type',
                    'links'
                  ],
                  properties: {
                    company_name: {
                      type: 'string',
                      description:
                        'The company name associated with the company'
                    },
                    company_number: {
                      type: 'string',
                      description: 'The company number of the company'
                    },
                    company_status: {
                      type: 'string',
                      description: 'The status of the company'
                    },
                    ordered_alpha_key_with_id: {
                      type: 'string',
                      description:
                        "The alphakey with it's id associated with the company"
                    },
                    kind: {
                      type: 'string',
                      enum: ['search-results#alphabetical-search'],
                      description: 'The type of search result'
                    },
                    links: {
                      type: 'object',
                      description: 'The link to the company',
                      properties: {
                        company_profile: {
                          type: 'string',
                          description: 'The link to the company'
                        }
                      }
                    },
                    company_type: {
                      type: 'string',
                      description:
                        'The type of company associated with the company'
                    }
                  }
                },
                {
                  description:
                    'The best matching company in alphabetical search results'
                }
              ]
            }
          }
        }
      ]
    }
    await testRequests(TestRequests.searchCompaniesAlphabeticallyReqs, schema)
  })

  it('searchDissolvedCompanies: /dissolved-search/companies', async function () {
    const schema = {
      title: 'List of dissolved companies',
      type: 'object',
      allOf: [
        {
          properties: {
            etag: { type: 'string' },
            items: {
              type: 'array',
              items: {
                title: 'Dissolved company',
                required: [
                  'company_name',
                  'company_number',
                  'date_of_cessation',
                  'date_of_creation'
                ],
                properties: {
                  company_name: {
                    type: 'string',
                    description:
                      'The company name associated with the dissolved company'
                  },
                  company_number: {
                    type: 'string',
                    description: 'The company number of the dissolved company'
                  },
                  company_status: {
                    type: 'string',
                    description: 'The status of the company'
                  },
                  ordered_alpha_key_with_id: {
                    type: 'string',
                    description:
                      "The alphakey with it's id associated with the dissolved company"
                  },
                  kind: {
                    type: 'string',
                    enum: ['search-results#dissolved-company'],
                    description: 'The type of search result'
                  },
                  date_of_cessation: {
                    type: 'string',
                    format: 'date',
                    description: 'The date that the company was dissolved'
                  },
                  date_of_creation: {
                    type: 'string',
                    format: 'date',
                    description: 'The date that the company was incorporated'
                  },
                  registered_office_address: {
                    title: 'Registered Office Address',
                    description:
                      'This will only appear if there are ROA details in the company record',
                    properties: {
                      address_line_1: {
                        type: 'string',
                        description:
                          'The first line of the address e.g Crown Way'
                      },
                      address_line_2: {
                        type: 'string',
                        description: 'The second line of the address'
                      },
                      locality: {
                        type: 'string',
                        description:
                          'The town associated to the ROA e.g Cardiff'
                      },
                      postal_code: {
                        type: 'string',
                        description: 'The postal code e.g CF14 3UZ'
                      }
                    }
                  },
                  previous_company_names: {
                    type: 'array',
                    items: {
                      title: 'Previous company name',
                      properties: {
                        company_number: {
                          type: 'string',
                          description:
                            'The company number of the dissolved company'
                        },
                        ceased_on: {
                          type: 'string',
                          format: 'date',
                          description:
                            'The date that the company ceased being known under the company name'
                        },
                        effective_from: {
                          type: 'string',
                          format: 'date',
                          description:
                            'The date that the company started being known under the company name'
                        },
                        name: {
                          type: 'string',
                          description: 'The previous name of the company'
                        }
                      }
                    }
                  },
                  matched_previous_company_name: {
                    title: 'Previous company name',
                    properties: {
                      company_number: {
                        type: 'string',
                        description:
                          'The company number of the dissolved company'
                      },
                      ceased_on: {
                        type: 'string',
                        format: 'date',
                        description:
                          'The date that the company ceased being known under the company name'
                      },
                      effective_from: {
                        type: 'string',
                        format: 'date',
                        description:
                          'The date that the company started being known under the company name'
                      },
                      name: {
                        type: 'string',
                        description: 'The previous name of the company'
                      }
                    }
                  }
                }
              }
            },
            kind: {
              type: 'string',
              enum: [
                'search#alphabetical-dissolved',
                'search#dissolved',
                'search#previous-name-dissolved'
              ]
            },
            top_hit: {
              allOf: [
                {
                  title: 'Dissolved company',
                  required: [
                    'company_name',
                    'company_number',
                    'date_of_cessation',
                    'date_of_creation'
                  ],
                  properties: {
                    company_name: {
                      type: 'string',
                      description:
                        'The company name associated with the dissolved company'
                    },
                    company_number: {
                      type: 'string',
                      description: 'The company number of the dissolved company'
                    },
                    company_status: {
                      type: 'string',
                      description: 'The status of the company'
                    },
                    ordered_alpha_key_with_id: {
                      type: 'string',
                      description:
                        "The alphakey with it's id associated with the dissolved company"
                    },
                    kind: {
                      type: 'string',
                      enum: ['search-results#dissolved-company'],
                      description: 'The type of search result'
                    },
                    date_of_cessation: {
                      type: 'string',
                      format: 'date',
                      description: 'The date that the company was dissolved'
                    },
                    date_of_creation: {
                      type: 'string',
                      format: 'date',
                      description: 'The date that the company was incorporated'
                    },
                    registered_office_address: {
                      title: 'Registered Office Address',
                      description:
                        'This will only appear if there are ROA details in the company record',
                      properties: {
                        address_line_1: {
                          type: 'string',
                          description:
                            'The first line of the address e.g Crown Way'
                        },
                        address_line_2: {
                          type: 'string',
                          description: 'The second line of the address'
                        },
                        locality: {
                          type: 'string',
                          description:
                            'The town associated to the ROA e.g Cardiff'
                        },
                        postal_code: {
                          type: 'string',
                          description: 'The postal code e.g CF14 3UZ'
                        }
                      }
                    },
                    previous_company_names: {
                      type: 'array',
                      items: {
                        title: 'Previous company name',
                        properties: {
                          company_number: {
                            type: 'string',
                            description:
                              'The company number of the dissolved company'
                          },
                          ceased_on: {
                            type: 'string',
                            format: 'date',
                            description:
                              'The date that the company ceased being known under the company name'
                          },
                          effective_from: {
                            type: 'string',
                            format: 'date',
                            description:
                              'The date that the company started being known under the company name'
                          },
                          name: {
                            type: 'string',
                            description: 'The previous name of the company'
                          }
                        }
                      }
                    },
                    matched_previous_company_name: {
                      title: 'Previous company name',
                      properties: {
                        company_number: {
                          type: 'string',
                          description:
                            'The company number of the dissolved company'
                        },
                        ceased_on: {
                          type: 'string',
                          format: 'date',
                          description:
                            'The date that the company ceased being known under the company name'
                        },
                        effective_from: {
                          type: 'string',
                          format: 'date',
                          description:
                            'The date that the company started being known under the company name'
                        },
                        name: {
                          type: 'string',
                          description: 'The previous name of the company'
                        }
                      }
                    }
                  }
                },
                {
                  description:
                    'The best matching company in dissolved search results'
                }
              ]
            },
            hits: {
              type: 'string',
              description:
                'The number of hits returned on a best-match or previous-company-names search'
            }
          }
        }
      ]
    }
    await testRequests(TestRequests.searchDissolvedCompaniesReqs, schema)
  })

  it('searchDisqualifiedOfficers: /search/disqualified-officers', async function () {
    const schema = {
      title: 'DisqualifiedOfficerSearch',
      allOf: [
        {
          properties: {
            total_results: {
              type: 'integer',
              description:
                'The number of further search results available for the current search.'
            },
            start_index: {
              type: 'integer',
              description:
                'The index into the entire result set that this result page starts.'
            },
            items_per_page: {
              type: 'integer',
              description: 'The number of search items returned per page.'
            },
            etag: { type: 'string', description: 'The ETag of the resource' }
          }
        }
      ],
      required: [],
      properties: {
        kind: {
          type: 'string',
          description: 'The type of response returned.',
          enum: ['search#disqualified-officers']
        },
        items: {
          type: 'array',
          description: 'The results of the completed search.',
          items: {
            title: 'DisqualifiedOfficerSearchItems',
            allOf: [
              {
                properties: {
                  title: {
                    type: 'string',
                    description: 'The title of the search result.'
                  },
                  address_snippet: {
                    type: 'string',
                    description:
                      'A single line address. This will be the address that matched within the indexed document or the primary address otherwise (as returned by the `address` member).'
                  },
                  links: {
                    type: 'object',
                    description: 'The URL of the search result.',
                    items: {
                      title: 'LinksModel',
                      properties: {
                        self: {
                          type: 'string',
                          description:
                            'The URL of the resource being returned by the search item.'
                        }
                      }
                    }
                  },
                  description: {
                    type: 'string',
                    description: 'The result description.'
                  },
                  snippet: {
                    type: 'string',
                    description:
                      'Summary information for the result showing additional details that have matched.'
                  },
                  matches: {
                    type: 'object',
                    description:
                      'A list of members and arrays of character offset defining substrings that matched the search terms.',
                    items: {
                      title: 'MatchesModel',
                      properties: {
                        title: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `title` string. These always occur in pairs and define the start and end of substrings in the member `title` that matched the search terms. The first character of the string is index 1.'
                        },
                        snippet: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `snippet` string. These always occur in pairs and define the start and end of substrings in the member `snippet` that matched the search terms. The first character of the string is index 1.'
                        },
                        address_snippet: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `address_snippet` string. These always occur in pairs and define the start and end of substrings in the member `address_snippet` that matched the search terms.'
                        }
                      }
                    }
                  }
                }
              }
            ],
            required: [],
            properties: {
              kind: {
                type: 'string',
                description: 'Describes the type of result returned.',
                enum: ['searchresults#disqualified-officer']
              },
              date_of_birth: {
                type: 'string',
                format: 'date',
                description: "The disqualified officer's date of birth."
              },
              description_identifiers: {
                type: 'array',
                description:
                  'An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations.',
                enum: ['born-on']
              },
              address: {
                type: 'object',
                description:
                  'The address of the disqualified officer as provided by the disqualifying authority.',
                title: 'DisqualifiedOfficerAddress',
                properties: {
                  address_line_1: {
                    description: 'The first line of the address.',
                    type: 'string'
                  },
                  address_line_2: {
                    description: 'The second line of the address.',
                    type: 'string'
                  },
                  country: {
                    description: 'The country. For example UK.',
                    type: 'string'
                  },
                  locality: {
                    description: 'The locality. For example London.',
                    type: 'string'
                  },
                  postal_code: {
                    description: 'The postal code. For example CF14 3UZ.',
                    type: 'string'
                  },
                  premises: {
                    description: 'The property name or number.',
                    type: 'string'
                  },
                  region: {
                    description: 'The region. For example Surrey.',
                    type: 'string'
                  }
                }
              }
            },
            type: 'object'
          }
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.searchDisqualifiedOfficersReqs, schema)
  })

  it('searchOfficers: /search/officers', async function () {
    const schema = {
      title: 'OfficerSearch',
      allOf: [
        {
          properties: {
            total_results: {
              type: 'integer',
              description:
                'The number of further search results available for the current search.'
            },
            start_index: {
              type: 'integer',
              description:
                'The index into the entire result set that this result page starts.'
            },
            items_per_page: {
              type: 'integer',
              description: 'The number of search items returned per page.'
            },
            etag: { type: 'string', description: 'The ETag of the resource' }
          }
        }
      ],
      required: [],
      properties: {
        kind: {
          type: 'string',
          description: 'The type of response returned.',
          enum: ['search#officers']
        },
        items: {
          type: 'array',
          description: 'The results of the completed search.',
          items: {
            title: 'OfficerSearchItems',
            allOf: [
              {
                properties: {
                  title: {
                    type: 'string',
                    description: 'The title of the search result.'
                  },
                  address_snippet: {
                    type: 'string',
                    description:
                      'A single line address. This will be the address that matched within the indexed document or the primary address otherwise (as returned by the `address` member).'
                  },
                  links: {
                    type: 'object',
                    description: 'The URL of the search result.',
                    items: {
                      title: 'LinksModel',
                      properties: {
                        self: {
                          type: 'string',
                          description:
                            'The URL of the resource being returned by the search item.'
                        }
                      }
                    }
                  },
                  description: {
                    type: 'string',
                    description: 'The result description.'
                  },
                  snippet: {
                    type: 'string',
                    description:
                      'Summary information for the result showing additional details that have matched.'
                  },
                  matches: {
                    type: 'object',
                    description:
                      'A list of members and arrays of character offset defining substrings that matched the search terms.',
                    items: {
                      title: 'MatchesModel',
                      properties: {
                        title: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `title` string. These always occur in pairs and define the start and end of substrings in the member `title` that matched the search terms. The first character of the string is index 1.'
                        },
                        snippet: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `snippet` string. These always occur in pairs and define the start and end of substrings in the member `snippet` that matched the search terms. The first character of the string is index 1.'
                        },
                        address_snippet: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `address_snippet` string. These always occur in pairs and define the start and end of substrings in the member `address_snippet` that matched the search terms.'
                        }
                      }
                    }
                  }
                }
              }
            ],
            required: [],
            properties: {
              kind: {
                type: 'string',
                description: 'Describes the type of result returned.',
                enum: ['searchresults#officer']
              },
              date_of_birth: {
                description: 'The officer date of birth details.',
                type: 'object',
                title: 'OfficerDateOfBirth',
                required: [],
                properties: {
                  month: {
                    description: 'The month the officer was born in.',
                    type: 'integer'
                  },
                  year: {
                    description: 'The year the officer was born in.',
                    type: 'integer'
                  }
                }
              },
              appointment_count: {
                type: 'integer',
                description: 'The total number of appointments the officer has.'
              },
              description_identifiers: {
                type: 'array',
                description:
                  'An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations.',
                enum: ['appointment-count', 'born-on']
              },
              address: {
                type: 'object',
                description: 'The service address of the officer.',
                title: 'OfficerAddress',
                properties: {
                  address_line_1: {
                    description: 'The first line of the address.',
                    type: 'string'
                  },
                  address_line_2: {
                    description: 'The second line of the address.',
                    type: 'string'
                  },
                  care_of: { description: 'The care of name.', type: 'string' },
                  country: {
                    description: 'The country. For example UK.',
                    type: 'string'
                  },
                  locality: {
                    description: 'The locality. For example London.',
                    type: 'string'
                  },
                  po_box: {
                    description: 'The post-office box number.',
                    type: 'string'
                  },
                  postal_code: {
                    description: 'The postal code. For example CF14 3UZ.',
                    type: 'string'
                  },
                  premises: {
                    description: 'The property name or number.',
                    type: 'string'
                  },
                  region: {
                    description: 'The region. For example Surrey.',
                    type: 'string'
                  }
                }
              }
            },
            type: 'object'
          }
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.searchOfficersReqs, schema)
  })

  it('searchCompanies: /search/companies', async function () {
    const schema = {
      title: 'CompanySearch',
      allOf: [
        {
          properties: {
            total_results: {
              type: 'integer',
              description:
                'The number of further search results available for the current search.'
            },
            start_index: {
              type: 'integer',
              description:
                'The index into the entire result set that this result page starts.'
            },
            items_per_page: {
              type: 'integer',
              description: 'The number of search items returned per page.'
            },
            etag: { type: 'string', description: 'The ETag of the resource' }
          }
        }
      ],
      properties: {
        kind: {
          type: 'string',
          description: 'The type of search response returned.',
          enum: ['search#companies']
        },
        items: {
          type: 'array',
          description: 'The results of the completed search.',
          items: {
            title: 'CompanySearchItems',
            allOf: [
              {
                properties: {
                  title: {
                    type: 'string',
                    description: 'The title of the search result.'
                  },
                  address_snippet: {
                    type: 'string',
                    description:
                      'A single line address. This will be the address that matched within the indexed document or the primary address otherwise (as returned by the `address` member).'
                  },
                  links: {
                    type: 'object',
                    description: 'The URL of the search result.',
                    items: {
                      title: 'LinksModel',
                      properties: {
                        self: {
                          type: 'string',
                          description:
                            'The URL of the resource being returned by the search item.'
                        }
                      }
                    }
                  },
                  description: {
                    type: 'string',
                    description: 'The result description.'
                  },
                  snippet: {
                    type: 'string',
                    description:
                      'Summary information for the result showing additional details that have matched.'
                  },
                  matches: {
                    type: 'object',
                    description:
                      'A list of members and arrays of character offset defining substrings that matched the search terms.',
                    items: {
                      title: 'MatchesModel',
                      properties: {
                        title: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `title` string. These always occur in pairs and define the start and end of substrings in the member `title` that matched the search terms. The first character of the string is index 1.'
                        },
                        snippet: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `snippet` string. These always occur in pairs and define the start and end of substrings in the member `snippet` that matched the search terms. The first character of the string is index 1.'
                        },
                        address_snippet: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `address_snippet` string. These always occur in pairs and define the start and end of substrings in the member `address_snippet` that matched the search terms.'
                        }
                      }
                    }
                  }
                }
              }
            ],
            required: [],
            properties: {
              kind: {
                type: 'string',
                description: 'The type of search result.',
                enum: ['searchresults#company']
              },
              description_identifier: {
                type: 'array',
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
              company_number: {
                type: 'string',
                description:
                  'The company registration / incorporation number of the company.'
              },
              date_of_creation: {
                type: 'string',
                format: 'date',
                description: 'The date the company was created.'
              },
              date_of_cessation: {
                type: 'string',
                format: 'date',
                description: 'The date the company ended.'
              },
              company_type: {
                type: 'string',
                enum: [
                  'private-unlimited',
                  'ltd',
                  'plc',
                  'old-public-company',
                  'private-limited-guarant-nsc-limited-exemption',
                  'limited-partnership',
                  'private-limited-guarant-nsc',
                  'converted-or-closed',
                  'private-unlimited-nsc',
                  'private-limited-shares-section-30-exemption',
                  'assurance-company',
                  'oversea-company',
                  'eeig',
                  'icvc-securities',
                  'icvc-warrant',
                  'icvc-umbrella',
                  'industrial-and-provident-society',
                  'northern-ireland',
                  'northern-ireland-other',
                  'royal-charter',
                  'investment-company-with-variable-capital',
                  'unregistered-company',
                  'llp',
                  'other',
                  'european-public-limited-liability-company-se'
                ],
                description: 'The company type.'
              },
              company_status: {
                type: 'string',
                enum: [
                  'active',
                  'dissolved',
                  'liquidation',
                  'receivership',
                  'administration',
                  'voluntary-arrangement',
                  'converted-closed',
                  'insolvency-proceedings'
                ],
                description: 'The company status.'
              },
              address: {
                description: "The address of the company's registered office.",
                type: 'object',
                title: 'registeredOfficeAddress',
                required: [],
                properties: {
                  address_line_1: {
                    description: 'The first line of the address.',
                    type: 'string'
                  },
                  address_line_2: {
                    description: 'The second line of the address.',
                    type: 'string'
                  },
                  country: {
                    description: 'The country.',
                    enum: [
                      'Wales',
                      'England',
                      'Scotland',
                      'Great Britain',
                      'Not specified',
                      'United Kingdom',
                      'Northern Ireland'
                    ],
                    type: 'string'
                  },
                  locality: {
                    description: 'The locality e.g London.',
                    type: 'string'
                  },
                  po_box: {
                    description: 'The post-office box number.',
                    type: 'string'
                  },
                  postal_code: {
                    description: 'The postal code e.g CF14 3UZ.',
                    type: 'string'
                  },
                  care_of: { description: 'The care of name.', type: 'string' },
                  region: {
                    description: 'The region e.g Surrey.',
                    type: 'string'
                  }
                }
              }
            },
            type: 'object'
          }
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.searchCompaniesReqs, schema)
  })

  it('searchAll: /search', async function () {
    const schema = {
      title: 'Search',
      allOf: [
        {
          properties: {
            total_results: {
              type: 'integer',
              description:
                'The number of further search results available for the current search.'
            },
            start_index: {
              type: 'integer',
              description:
                'The index into the entire result set that this result page starts.'
            },
            items_per_page: {
              type: 'integer',
              description: 'The number of search items returned per page.'
            },
            etag: { type: 'string', description: 'The ETag of the resource' }
          }
        }
      ],
      properties: {
        kind: {
          type: 'string',
          description: 'The type of search response returned.',
          enum: ['search#all']
        },
        items: {
          type: 'array',
          description:
            'The results of the completed search. See `items.kind` for details of each specific result resource returned.,',
          items: {
            title: 'SearchItems',
            allOf: [
              {
                properties: {
                  title: {
                    type: 'string',
                    description: 'The title of the search result.'
                  },
                  address_snippet: {
                    type: 'string',
                    description:
                      'A single line address. This will be the address that matched within the indexed document or the primary address otherwise (as returned by the `address` member).'
                  },
                  links: {
                    type: 'object',
                    description: 'The URL of the search result.',
                    items: {
                      title: 'LinksModel',
                      properties: {
                        self: {
                          type: 'string',
                          description:
                            'The URL of the resource being returned by the search item.'
                        }
                      }
                    }
                  },
                  description: {
                    type: 'string',
                    description: 'The result description.'
                  },
                  snippet: {
                    type: 'string',
                    description:
                      'Summary information for the result showing additional details that have matched.'
                  },
                  matches: {
                    type: 'object',
                    description:
                      'A list of members and arrays of character offset defining substrings that matched the search terms.',
                    items: {
                      title: 'MatchesModel',
                      properties: {
                        title: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `title` string. These always occur in pairs and define the start and end of substrings in the member `title` that matched the search terms. The first character of the string is index 1.'
                        },
                        snippet: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `snippet` string. These always occur in pairs and define the start and end of substrings in the member `snippet` that matched the search terms. The first character of the string is index 1.'
                        },
                        address_snippet: {
                          items: { type: 'integer' },
                          type: 'array',
                          description:
                            'An array of character offset into the `address_snippet` string. These always occur in pairs and define the start and end of substrings in the member `address_snippet` that matched the search terms.'
                        }
                      }
                    }
                  }
                }
              }
            ],
            required: [],
            properties: {
              kind: {
                type: 'string',
                description:
                  'The type of search result. Refer to the full resource descriptions [CompanySearch resource](api/docs/company/company_number/CompanySearch-resource.html)  [OfficerSearch resource] (api/docs/company/company_number/OfficerSearch-resource.html) and [DisqualifiedOfficerSearch resource](api/docs/company/company_number/DisqualifiedOfficerSearch-resource.html) for the full list of members returned.',
                enum: [
                  'searchresults#company',
                  'searchresults#officer',
                  'searchresults#disqualified-officer'
                ]
              },
              description_identifier: {
                type: 'array',
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
              address: {
                description: "The address of the company's registered office.",
                type: 'object',
                title: 'registeredOfficeAddress',
                required: [],
                properties: {
                  address_line_1: {
                    description: 'The first line of the address.',
                    type: 'string'
                  },
                  address_line_2: {
                    description: 'The second line of the address.',
                    type: 'string'
                  },
                  country: {
                    description: 'The country.',
                    enum: [
                      'Wales',
                      'England',
                      'Scotland',
                      'Great Britain',
                      'Not specified',
                      'United Kingdom',
                      'Northern Ireland'
                    ],
                    type: 'string'
                  },
                  locality: {
                    description: 'The locality e.g London.',
                    type: 'string'
                  },
                  po_box: {
                    description: 'The post-office box number.',
                    type: 'string'
                  },
                  postal_code: {
                    description: 'The postal code e.g CF14 3UZ.',
                    type: 'string'
                  },
                  care_of: { description: 'The care of name.', type: 'string' },
                  region: {
                    description: 'The region e.g Surrey.',
                    type: 'string'
                  }
                }
              }
            },
            type: 'object'
          }
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.searchAllReqs, schema)
  })
})
