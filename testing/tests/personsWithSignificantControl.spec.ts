import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('persons-with-significant-control-service', function () {
  this.timeout(50000)
  // tests for each path
  it('getSuperSecurePerson: /company/{company_number}/persons-with-significant-control/super-secure/{super_secure_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        description: { type: 'string' },
        etag: { type: 'string' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        ceased: {
          description:
            'Presence of that indicator means the super secure person status is ceased\n',
          type: 'boolean'
        }
      },
      required: ['description', 'etag', 'kind', 'links'],
      additionalProperties: false,
      title: 'getSuperSecurePerson',
      example: {
        description: 'super-secure-persons-with-significant-control',
        etag: '71519abc34634304d42ef2720a4ed0a432e28d96',
        kind: 'super-secure-person-with-significant-control',
        links: {
          self: '/company/OC418501/persons-with-significant-control/super-secure/hsp93JPzJLp3FHQiu0kZ040-jqk'
        }
      }
    }
    await testRequests(
      testUrls.getSuperSecurePerson.map((path) => ({ path })),
      schema
    )
  })

  it('getStatement: /company/{company_number}/persons-with-significant-control-statements/{statement_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        ceased_on: { type: 'string' },
        etag: { type: 'string' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            person_with_significant_control: {
              description:
                'The URL of the person with significant control linked to this statement.',
              type: 'string'
            }
          },
          required: ['self']
        },
        notified_on: { type: 'string' },
        statement: { type: 'string' },
        restrictions_notice_withdrawal_reason: {
          description:
            'The reason for the company withdrawing a <code>restrictions-notice-issued-to-psc</code> statement',
          enum: [
            'restrictions-notice-withdrawn-by-court-order',
            'restrictions-notice-withdrawn-by-company'
          ],
          type: 'string'
        },
        linked_psc_name: {
          description: 'The name of the psc linked to this statement.',
          type: 'string'
        }
      },
      required: ['etag', 'kind', 'links', 'notified_on', 'statement'],
      additionalProperties: false,
      title: 'getStatement',
      example: {
        ceased_on: '2021-11-08',
        etag: '3f359cc57b46e2062a678196b8408e1b60b92d60',
        kind: 'persons-with-significant-control-statement',
        links: {
          self: '/company/08162785/persons-with-significant-control-statements/8N8QcP_qKb7tJT7skvkO_hxRMEk'
        },
        notified_on: '2016-07-31',
        statement: 'no-individual-or-entity-with-signficant-control'
      }
    }
    await testRequests(
      testUrls.getStatement.map((path) => ({ path })),
      schema
    )
  })

  it('listStatements: /company/{company_number}/persons-with-significant-control-statements', async function () {
    const schema = {
      type: 'object',
      properties: {
        active_count: { type: 'integer' },
        ceased_count: { type: 'integer' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              kind: { type: 'string' },
              etag: { type: 'string' },
              notified_on: { type: 'string' },
              statement: { type: 'string' },
              links: {
                type: 'object',
                properties: {
                  self: { type: 'string' },
                  person_with_significant_control: {
                    description:
                      'The URL of the person with significant control linked to this statement.',
                    type: 'string'
                  }
                },
                required: ['self']
              },
              ceased_on: { type: 'string' },
              restrictions_notice_withdrawal_reason: {
                description:
                  'The reason for the company withdrawing a <code>restrictions-notice-issued-to-psc</code> statement',
                enum: [
                  'restrictions-notice-withdrawn-by-court-order',
                  'restrictions-notice-withdrawn-by-company'
                ],
                type: 'string'
              },
              linked_psc_name: {
                description: 'The name of the psc linked to this statement.',
                type: 'string'
              }
            },
            required: ['kind', 'etag', 'notified_on', 'statement', 'links']
          }
        },
        items_per_page: { type: 'integer' },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            persons_with_significant_control: { type: 'string' },
            persons_with_significant_control_statements_list: {
              description:
                'The URL of the persons with significant control statements list resource.',
              type: 'string'
            }
          },
          required: ['self']
        },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'active_count',
        'ceased_count',
        'items',
        'items_per_page',
        'links',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'listStatements',
      example: {
        active_count: 1,
        ceased_count: 0,
        items: [
          {
            kind: 'persons-with-significant-control-statement',
            etag: '5493058979a9265cd855efb03706833c439b6542',
            notified_on: '2017-06-30',
            statement: 'no-individual-or-entity-with-signficant-control',
            links: {
              self: '/company/10843053/persons-with-significant-control-statements/JwBAymT3-nexdr9HQdEaVXlTEUY'
            }
          }
        ],
        items_per_page: 25,
        links: {
          self: '/company/10843053/persons-with-significant-control-statements'
        },
        start_index: 0,
        total_results: 1
      }
    }
    await testRequests(
      testUrls.listStatements.map((path) => ({ path })),
      schema
    )
  })

  it('getLegalPersons: /company/{company_number}/persons-with-significant-control/legal-person/{psc_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            postal_code: { type: 'string' },
            locality: { type: 'string' },
            address_line_1: { type: 'string' },
            premises: { type: 'string' },
            country: { type: 'string' },
            region: { type: 'string' },
            address_line_2: { type: 'string' },
            care_of: { description: 'Care of name.', type: 'string' },
            po_box: {
              description: 'The post-officer box number.',
              type: 'string'
            }
          },
          required: ['premises']
        },
        etag: { type: 'string' },
        identification: {
          type: 'object',
          properties: {
            legal_authority: { type: 'string' },
            legal_form: { type: 'string' }
          },
          required: ['legal_authority', 'legal_form']
        },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            statement: {
              description:
                'The URL of the statement linked to this person with significant control.',
              type: 'string'
            }
          },
          required: ['self']
        },
        name: { type: 'string' },
        natures_of_control: { type: 'array', items: { type: 'string' } },
        notified_on: { type: 'string' },
        ceased_on: { type: 'string' }
      },
      required: [
        'address',
        'etag',
        'identification',
        'kind',
        'links',
        'name',
        'natures_of_control',
        'notified_on'
      ],
      additionalProperties: false,
      title: 'getLegalPersons',
      example: {
        address: {
          postal_code: 'NW7 3TD',
          locality: 'London',
          address_line_1: '86 The Broadway',
          premises: 'Athene House, Suite Q',
          country: 'United Kingdom'
        },
        etag: '60b7226f0b145e0f2b3800bfe5e76a2da64dc15b',
        identification: {
          legal_authority: 'England & Wales',
          legal_form: 'Limited'
        },
        kind: 'legal-person-person-with-significant-control',
        links: {
          self: '/company/13698056/persons-with-significant-control/legal-person/jYbWLJ4XfiUzSp4_lbgGz9mIWvE'
        },
        name: 'Qa Directors Limited',
        natures_of_control: [
          'ownership-of-shares-75-to-100-percent',
          'voting-rights-75-to-100-percent',
          'right-to-appoint-and-remove-directors'
        ],
        notified_on: '2021-10-22'
      }
    }
    await testRequests(
      testUrls.getLegalPersons.map((path) => ({ path })),
      schema
    )
  })

  it('getCorporateEntities: /company/{company_number}/persons-with-significant-control/corporate-entity/{psc_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            country: { type: 'string' },
            postal_code: { type: 'string' },
            locality: { type: 'string' },
            premises: { type: 'string' },
            address_line_1: { type: 'string' },
            region: { type: 'string' },
            address_line_2: { type: 'string' },
            po_box: { type: 'string' },
            care_of: { description: 'Care of name.', type: 'string' }
          }
        },
        ceased_on: { type: 'string' },
        etag: { type: 'string' },
        identification: {
          type: 'object',
          properties: {
            legal_form: { type: 'string' },
            place_registered: { type: 'string' },
            legal_authority: { type: 'string' },
            country_registered: { type: 'string' },
            registration_number: { type: 'string' }
          },
          required: ['legal_form', 'legal_authority']
        },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            statement: {
              description:
                'The URL of the statement linked to this person with significant control.',
              type: 'string'
            }
          },
          required: ['self']
        },
        name: { type: 'string' },
        natures_of_control: { type: 'array', items: { type: 'string' } },
        notified_on: { type: 'string' }
      },
      required: [
        'address',
        'etag',
        'identification',
        'kind',
        'links',
        'name',
        'natures_of_control',
        'notified_on'
      ],
      additionalProperties: false,
      title: 'getCorporateEntities',
      example: {
        address: {
          country: 'United Kingdom',
          postal_code: 'N12 0DR',
          locality: 'London',
          premises: 'Winnington House',
          address_line_1: '2 Woodberry Grove'
        },
        ceased_on: '2020-07-06',
        etag: '67b51cedbaa227a7ebbc7dbfd7edb16934342091',
        identification: {
          legal_form: 'Limited By Shares',
          place_registered: 'Companies House',
          legal_authority: 'England',
          country_registered: 'England',
          registration_number: '07168188'
        },
        kind: 'corporate-entity-person-with-significant-control',
        links: {
          self: '/company/08888819/persons-with-significant-control/corporate-entity/c7EGmbxSnWjD-jN-Mhr1cUDNGYA'
        },
        name: 'Woodberry Secretarial Limited',
        natures_of_control: [
          'ownership-of-shares-75-to-100-percent',
          'voting-rights-75-to-100-percent',
          'right-to-appoint-and-remove-directors'
        ],
        notified_on: '2016-04-06'
      }
    }
    await testRequests(
      testUrls.getCorporateEntities.map((path) => ({ path })),
      schema
    )
  })

  it('getIndividual: /company/{company_number}/persons-with-significant-control/individual/{psc_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            premises: { type: 'string' },
            region: { type: 'string' },
            postal_code: { type: 'string' },
            country: { type: 'string' },
            locality: { type: 'string' },
            address_line_1: { type: 'string' },
            address_line_2: { type: 'string' },
            po_box: { type: 'string' },
            care_of: { type: 'string' }
          }
        },
        country_of_residence: { type: 'string' },
        date_of_birth: {
          type: 'object',
          properties: {
            month: { type: 'integer' },
            year: { type: 'integer' },
            day: {
              description: 'The day of the date of birth.',
              type: 'integer'
            }
          },
          required: ['month', 'year']
        },
        etag: { type: 'string' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            statement: {
              description:
                'The URL of the statement linked to this person with significant control.',
              type: 'string'
            }
          },
          required: ['self']
        },
        name: { type: 'string' },
        name_elements: {
          type: 'object',
          properties: {
            middle_name: { type: 'string' },
            surname: { type: 'string' },
            title: { type: 'string' },
            forename: { type: 'string' },
            other_forenames: {
              description:
                'Other forenames of the person with significant control.',
              type: 'string'
            }
          },
          required: ['surname']
        },
        nationality: { type: 'string' },
        natures_of_control: { type: 'array', items: { type: 'string' } },
        notified_on: { type: 'string' },
        ceased_on: { type: 'string' }
      },
      required: [
        'address',
        'country_of_residence',
        'date_of_birth',
        'etag',
        'kind',
        'links',
        'name',
        'name_elements',
        'nationality',
        'natures_of_control',
        'notified_on'
      ],
      additionalProperties: false,
      title: 'getIndividual',
      example: {
        address: {
          premises: '14 Broad Acres',
          region: 'Hertfordshire',
          postal_code: 'AL10 9LD',
          country: 'England',
          locality: 'Hatfield'
        },
        country_of_residence: 'England',
        date_of_birth: { month: 3, year: 1980 },
        etag: '585f0033128d445423565ef6119366f38299d73e',
        kind: 'individual-person-with-significant-control',
        links: {
          self: '/company/09454270/persons-with-significant-control/individual/yTVnaEeES8-Ar9U0mLOtefLnuaQ'
        },
        name: 'Mr Laga Leyira Wiwuga',
        name_elements: {
          middle_name: 'Leyira',
          surname: 'Wiwuga',
          title: 'Mr',
          forename: 'Laga'
        },
        nationality: 'British',
        natures_of_control: [
          'ownership-of-shares-75-to-100-percent',
          'voting-rights-75-to-100-percent'
        ],
        notified_on: '2016-04-06'
      }
    }
    await testRequests(
      testUrls.getIndividual.map((path) => ({ path })),
      schema
    )
  })

  it('listPersonsWithSignificantControl: /company/{company_number}/persons-with-significant-control', async function () {
    const schema = {
      type: 'object',
      properties: {
        active_count: { type: 'integer' },
        ceased_count: { type: 'integer' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date_of_birth: {
                type: 'object',
                properties: {
                  year: { type: 'integer' },
                  month: { type: 'integer' },
                  day: {
                    description: 'The day of the date of birth.',
                    type: 'integer'
                  }
                },
                required: ['year', 'month']
              },
              name_elements: {
                type: 'object',
                properties: {
                  middle_name: { type: 'string' },
                  forename: { type: 'string' },
                  surname: { type: 'string' },
                  title: { type: 'string' },
                  other_forenames: {
                    description:
                      'Other forenames of the person with significant control.',
                    type: 'string'
                  }
                },
                required: ['surname']
              },
              kind: { type: 'string' },
              natures_of_control: {
                anyOf: [
                  {
                    description:
                      'Indicates the nature of control the person with significant control holds.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file.\n',
                    type: 'string'
                  },
                  { type: 'array', items: { type: 'string' } }
                ]
              },
              name: { type: 'string' },
              country_of_residence: { type: 'string' },
              nationality: { type: 'string' },
              address: {
                type: 'object',
                properties: {
                  postal_code: { type: 'string' },
                  address_line_1: { type: 'string' },
                  premises: { type: 'string' },
                  locality: { type: 'string' },
                  country: { type: 'string' },
                  region: { type: 'string' },
                  address_line_2: { type: 'string' },
                  care_of: { type: 'string' },
                  po_box: { type: 'string' }
                }
              },
              links: {
                type: 'object',
                properties: {
                  self: { type: 'string' },
                  statement: {
                    description:
                      'The URL of the statement linked to this person with significant control.',
                    type: 'string'
                  }
                },
                required: ['self']
              },
              notified_on: { type: 'string' },
              etag: { type: 'string' },
              ceased_on: { type: 'string' },
              identification: {
                type: 'object',
                properties: {
                  registration_number: { type: 'string' },
                  legal_authority: { type: 'string' },
                  country_registered: { type: 'string' },
                  place_registered: { type: 'string' },
                  legal_form: { type: 'string' }
                },
                required: ['legal_authority', 'legal_form']
              },
              description: { type: 'string' },
              ceased: {
                description:
                  'Presence of that indicator means the super secure person status is ceased <br />',
                type: 'boolean'
              }
            },
            required: ['links', 'etag']
          }
        },
        items_per_page: { type: 'integer' },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            persons_with_significant_control_statements: { type: 'string' },
            exemptions: { type: 'string' },
            persons_with_significant_control_list: {
              description:
                'The URL of the persons with significant control list resource.',
              type: 'string'
            }
          },
          required: ['self']
        },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'active_count',
        'ceased_count',
        'items',
        'items_per_page',
        'links',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'listPersonsWithSignificantControl',
      example: {
        active_count: 1,
        ceased_count: 1,
        items: [
          {
            date_of_birth: { year: 1969, month: 6 },
            name_elements: {
              middle_name: 'Roy',
              forename: 'Jonathan',
              surname: 'Growcott',
              title: 'Mr'
            },
            kind: 'individual-person-with-significant-control',
            natures_of_control: ['ownership-of-shares-75-to-100-percent'],
            name: 'Mr Jonathan Roy Growcott',
            country_of_residence: 'England',
            nationality: 'English',
            address: {
              postal_code: 'DY6 7HU',
              address_line_1: 'Stallings Lane',
              premises: '8a',
              locality: 'Kingswinford',
              country: 'England'
            },
            links: {
              self: '/company/08744864/persons-with-significant-control/individual/oBL_jXq90aj3DzFLaZtqh3Ak9QI'
            },
            notified_on: '2019-09-30',
            etag: '0f3d8e2cb44eb939e8feaba52a625b74ef074371'
          },
          {
            date_of_birth: { month: 9, year: 1960 },
            name_elements: {
              forename: 'Jeremy',
              middle_name: 'Peter',
              surname: 'Moore',
              title: 'Mr'
            },
            name: 'Mr Jeremy Peter Moore',
            natures_of_control: ['ownership-of-shares-75-to-100-percent'],
            ceased_on: '2019-09-30',
            kind: 'individual-person-with-significant-control',
            address: {
              region: 'Shropshire',
              locality: 'Hilton',
              premises: 'New Barns Farm',
              postal_code: 'WV15 5PB'
            },
            country_of_residence: 'England',
            nationality: 'British',
            etag: '3e76a5ad71ef44c634b16e1354f600cd511ed521',
            notified_on: '2016-10-01',
            links: {
              self: '/company/08744864/persons-with-significant-control/individual/PzH2tbV8TNFk1HQXjxvITe5E7MQ'
            }
          }
        ],
        items_per_page: 25,
        links: { self: '/company/08744864/persons-with-significant-control' },
        start_index: 0,
        total_results: 2
      }
    }
    await testRequests(
      testUrls.listPersonsWithSignificantControl.map((path) => ({ path })),
      schema
    )
  })

  it('getExemptions: /company/{company_number}/exemptions', async function () {
    const schema = {
      type: 'object',
      properties: {
        etag: { type: 'string' },
        exemptions: {
          type: 'object',
          properties: {
            psc_exempt_as_trading_on_uk_regulated_market: {
              type: 'object',
              properties: {
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      exempt_to: { type: 'string' },
                      exempt_from: { type: 'string' }
                    },
                    required: ['exempt_from']
                  }
                },
                exemption_type: { type: 'string' }
              },
              required: ['items', 'exemption_type']
            },
            disclosure_transparency_rules_chapter_five_applies: {
              type: 'object',
              properties: {
                exemption_type: { type: 'string' },
                items: {
                  anyOf: [
                    {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          exempt_to: { type: 'string' },
                          exempt_from: { type: 'string' }
                        },
                        required: ['exempt_to', 'exempt_from']
                      }
                    },
                    {
                      type: 'object',
                      properties: {
                        exempt_from: {
                          description: 'Exemption valid from.',
                          type: 'string',
                          format: 'date'
                        },
                        exempt_to: {
                          description: 'Exemption valid to.',
                          type: 'string',
                          format: 'date'
                        }
                      },
                      required: ['exempt_from']
                    }
                  ]
                }
              },
              required: ['exemption_type', 'items']
            },
            psc_exempt_as_trading_on_regulated_market: {
              type: 'object',
              properties: {
                exemption_type: { type: 'string' },
                items: {
                  anyOf: [
                    {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          exempt_to: { type: 'string' },
                          exempt_from: { type: 'string' }
                        },
                        required: ['exempt_to', 'exempt_from']
                      }
                    },
                    {
                      type: 'object',
                      properties: {
                        exempt_from: {
                          description: 'Exemption valid from.',
                          type: 'string',
                          format: 'date'
                        },
                        exempt_to: {
                          description: 'Exemption valid to.',
                          type: 'string',
                          format: 'date'
                        }
                      },
                      required: ['exempt_from']
                    }
                  ]
                }
              },
              required: ['exemption_type', 'items']
            },
            psc_exempt_as_trading_on_eu_regulated_market: {
              type: 'object',
              properties: {
                exemption_type: { type: 'string' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      exempt_from: { type: 'string' },
                      exempt_to: { type: 'string' }
                    },
                    required: ['exempt_from', 'exempt_to']
                  }
                }
              },
              required: ['exemption_type', 'items']
            },
            psc_exempt_as_shares_admitted_on_market: {
              description:
                'If present the company has been or is exempt from keeping a PSC register, as it has voting shares admitted to trading on a market listed in the Register of People with Significant Control Regulations 2016.',
              type: 'object',
              required: ['exemption_type', 'items'],
              properties: {
                items: {
                  description: 'List of dates',
                  type: 'object',
                  properties: {
                    exempt_from: {
                      description: 'Exemption valid from.',
                      type: 'string',
                      format: 'date'
                    },
                    exempt_to: {
                      description: 'Exemption valid to.',
                      type: 'string',
                      format: 'date'
                    }
                  },
                  required: ['exempt_from']
                },
                exemption_type: {
                  description: 'The exemption type.',
                  enum: ['psc-exempt-as-shares-admitted-on-market'],
                  type: 'string'
                }
              }
            }
          }
        },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        }
      },
      required: ['etag', 'exemptions', 'kind', 'links'],
      additionalProperties: false,
      title: 'getExemptions',
      example: {
        etag: '8c96ca11d8c34efadb7c0eae5c2bc9a24c87bd46',
        exemptions: {
          psc_exempt_as_trading_on_uk_regulated_market: {
            items: [{ exempt_to: '2020-12-28', exempt_from: '2017-12-28' }],
            exemption_type: 'psc-exempt-as-trading-on-uk-regulated-market'
          },
          disclosure_transparency_rules_chapter_five_applies: {
            exemption_type:
              'disclosure-transparency-rules-chapter-five-applies',
            items: [{ exempt_to: '2020-12-28', exempt_from: '2016-12-28' }]
          }
        },
        kind: 'exemptions',
        links: { self: '/company/07892904/exemptions' }
      }
    }
    await testRequests(
      testUrls.getExemptions.map((path) => ({ path })),
      schema
    )
  })
})
