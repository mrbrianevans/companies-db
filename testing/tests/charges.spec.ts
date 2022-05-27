import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('charges-service', function () {
  this.timeout(50000)
  // tests for each path
  it('getCharges: /company/{company_number}/charges/{charge_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        charge_code: { type: 'string' },
        charge_number: { type: 'integer' },
        classification: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            type: { type: 'string' }
          },
          required: ['description', 'type']
        },
        created_on: { type: 'string' },
        delivered_on: { type: 'string' },
        etag: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        particulars: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            contains_negative_pledge: { type: 'boolean' },
            type: { type: 'string' },
            contains_fixed_charge: { type: 'boolean' },
            contains_floating_charge: { type: 'boolean' },
            floating_charge_covers_all: { type: 'boolean' },
            chargor_acting_as_bare_trustee: { type: 'boolean' }
          }
        },
        persons_entitled: {
          type: 'array',
          items: {
            type: 'object',
            properties: { name: { type: 'string' } },
            required: ['name']
          }
        },
        status: { type: 'string' },
        transactions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              links: {
                type: 'object',
                properties: {
                  filing: { type: 'string' },
                  insolvency_case: {
                    type: 'string',
                    description:
                      'Link to the insolvency case related to this filing'
                  }
                }
              },
              delivered_on: { type: 'string' },
              filing_type: { type: 'string' },
              transaction_id: {
                type: 'integer',
                description: 'The id of the filing'
              },
              insolvency_case_number: {
                type: 'integer',
                description: 'The insolvency case related to this filing'
              }
            }
          }
        },
        satisfied_on: { type: 'string' },
        secured_details: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            type: { type: 'string' }
          },
          required: ['description', 'type']
        },
        assets_ceased_released: { type: 'string' },
        scottish_alterations: {
          type: 'object',
          properties: {
            has_restricting_provisions: { type: 'boolean' },
            type: { type: 'string' },
            description: { type: 'string' },
            has_alterations_to_order: {
              type: 'boolean',
              description: 'The charge has alterations to order'
            },
            has_alterations_to_prohibitions: {
              type: 'boolean',
              description: 'The charge has alterations to prohibitions'
            },
            has_alterations_to_provisions: {
              type: 'boolean',
              description:
                'The charge has provisions restricting the creation of further charges'
            }
          }
        },
        more_than_four_persons_entitled: { type: 'boolean' },
        id: { type: 'string', description: 'The id of the charge' },
        assests_ceased_released: {
          enum: [
            'property-ceased-to-belong',
            'part-property-release-and-ceased-to-belong',
            'part-property-released',
            'part-property-ceased-to-belong',
            'whole-property-released',
            'multiple-filings',
            'whole-property-released-and-ceased-to-belong'
          ],
          type: 'string',
          description:
            'Cease/release information about the charge.\n For enumeration descriptions see `assets-ceased-released` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/mortgage_descriptions.yml)'
        },
        acquired_on: {
          type: 'string',
          format: 'date',
          description: 'The date the property or undertaking was acquired on'
        },
        resolved_on: {
          type: 'string',
          format: 'date',
          description: 'The date the issue was resolved on'
        },
        covering_instrument_date: {
          type: 'string',
          format: 'date',
          description: 'The date by which the series of debentures were created'
        },
        insolvency_cases: {
          type: 'array',
          description: 'Transactions that have been filed for the charge.',
          items: {
            title: 'insolvency_cases',
            properties: {
              case_number: {
                type: 'integer',
                description: 'The number of this insolvency case'
              },
              transaction_id: {
                type: 'integer',
                description: 'The id of the insolvency filing'
              },
              links: {
                type: 'object',
                description: 'The resources related to this insolvency case',
                title: 'insolvency_case_links',
                properties: {
                  case: {
                    type: 'string',
                    description: 'Link to the insolvency case data'
                  }
                }
              }
            },
            type: 'object'
          }
        }
      },
      required: ['charge_number', 'classification', 'etag', 'status'],
      additionalProperties: false,
      title: 'getCharges',
      example: {
        charge_code: '092848280568',
        charge_number: 568,
        classification: {
          description: 'A registered charge',
          type: 'charge-description'
        },
        created_on: '2022-05-13',
        delivered_on: '2022-05-24',
        etag: 'f0449b37b7460b5d58a65849e756a4f64720d291',
        links: {
          self: '/company/09284828/charges/EMGXI7FXv34NdzmPVRyhd6HIFCs'
        },
        particulars: {
          description: '43 wootton drive, hemel hempstead, HP2 6LA. HD605623.',
          contains_negative_pledge: true,
          type: 'brief-description'
        },
        persons_entitled: [{ name: 'Bank of London and the Middle East PLC' }],
        status: 'outstanding',
        transactions: [
          {
            links: {
              filing:
                '/company/09284828/filing-history/MzM0MDMwMjcwMWFkaXF6a2N4'
            },
            delivered_on: '2022-05-24',
            filing_type: 'create-charge-with-deed'
          }
        ]
      }
    }
    await testRequests(
      testUrls.getCharges.map((path) => ({ path })),
      schema
    )
  })

  it('listCharges: /company/{company_number}/charges', async function () {
    const schema = {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              classification: {
                type: 'object',
                properties: {
                  description: { type: 'string' },
                  type: { type: 'string' }
                },
                required: ['description', 'type']
              },
              persons_entitled: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: { name: { type: 'string' } },
                  required: ['name']
                }
              },
              satisfied_on: { type: 'string' },
              secured_details: {
                type: 'object',
                properties: {
                  description: { type: 'string' },
                  type: { type: 'string' }
                },
                required: ['description', 'type']
              },
              created_on: { type: 'string' },
              etag: { type: 'string' },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              particulars: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  description: { type: 'string' },
                  contains_floating_charge: { type: 'boolean' },
                  contains_fixed_charge: { type: 'boolean' },
                  contains_negative_pledge: { type: 'boolean' },
                  floating_charge_covers_all: { type: 'boolean' },
                  chargor_acting_as_bare_trustee: { type: 'boolean' }
                }
              },
              status: { type: 'string' },
              charge_number: { type: 'integer' },
              transactions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    delivered_on: { type: 'string' },
                    filing_type: { type: 'string' },
                    links: {
                      type: 'object',
                      properties: {
                        filing: { type: 'string' },
                        insolvency_case: { type: 'string' }
                      }
                    },
                    insolvency_case_number: {
                      anyOf: [
                        { type: 'string' },
                        {
                          type: 'integer',
                          description:
                            'The insolvency case related to this filing'
                        }
                      ]
                    },
                    transaction_id: {
                      type: 'integer',
                      description: 'The id of the filing'
                    }
                  }
                }
              },
              delivered_on: { type: 'string' },
              charge_code: { type: 'string' },
              scottish_alterations: {
                type: 'object',
                properties: {
                  has_alterations_to_order: { type: 'boolean' },
                  has_restricting_provisions: { type: 'boolean' },
                  has_alterations_to_prohibitions: { type: 'boolean' },
                  type: { type: 'string' },
                  description: { type: 'string' },
                  has_alterations_to_provisions: {
                    type: 'boolean',
                    description:
                      'The charge has provisions restricting the creation of further charges'
                  }
                }
              },
              assets_ceased_released: { type: 'string' },
              insolvency_cases: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    case_number: {
                      anyOf: [
                        { type: 'string' },
                        {
                          type: 'integer',
                          description: 'The number of this insolvency case'
                        }
                      ]
                    },
                    links: {
                      type: 'object',
                      properties: { case: { type: 'string' } }
                    },
                    transaction_id: {
                      anyOf: [
                        { type: 'string' },
                        {
                          type: 'integer',
                          description: 'The id of the insolvency filing'
                        }
                      ]
                    }
                  }
                }
              },
              acquired_on: { type: 'string' },
              id: { type: 'string', description: 'The id of the charge' },
              assests_ceased_released: {
                enum: [
                  'property-ceased-to-belong',
                  'part-property-release-and-ceased-to-belong',
                  'part-property-released',
                  'part-property-ceased-to-belong',
                  'whole-property-released',
                  'multiple-filings',
                  'whole-property-released-and-ceased-to-belong'
                ],
                type: 'string',
                description:
                  'Cease/release information about the charge.\n For enumeration descriptions see `assets-ceased-released` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/mortgage_descriptions.yml)'
              },
              resolved_on: {
                type: 'string',
                format: 'date',
                description: 'The date the issue was resolved on'
              },
              covering_instrument_date: {
                type: 'string',
                format: 'date',
                description:
                  'The date by which the series of debentures were created'
              },
              more_than_four_persons_entitled: {
                type: 'boolean',
                description: 'Charge has more than four person entitled'
              }
            },
            required: ['classification', 'status', 'charge_number']
          }
        },
        part_satisfied_count: { type: 'integer' },
        satisfied_count: { type: 'integer' },
        total_count: { type: 'integer' },
        unfiltered_count: { type: 'integer' },
        etag: { description: 'The ETag of the resource.', type: 'string' },
        unfiletered_count: {
          type: 'integer',
          description: 'Number of satisfied charges'
        }
      },
      required: ['items'],
      additionalProperties: false,
      title: 'listCharges',
      example: {
        items: [
          {
            classification: {
              description: 'Legal charge',
              type: 'charge-description'
            },
            persons_entitled: [{ name: 'Peninsula Finance PLC' }],
            satisfied_on: '2006-07-21',
            secured_details: {
              description:
                'All monies due or to become due from the company to the chargee',
              type: 'amount-secured'
            },
            created_on: '2005-07-17',
            etag: '40ebd950858c2454d9d2f5d576d99dfd4e94baca',
            links: {
              self: '/company/05343375/charges/UzsQvPoNZDG383SZSfwiwb8O_rQ'
            },
            particulars: {
              type: 'short-particulars',
              description: '80 kenwyn streetn truro cornwall.'
            },
            status: 'fully-satisfied',
            charge_number: 1,
            transactions: [
              {
                delivered_on: '2005-07-28',
                filing_type: 'create-charge-pre-2006-companies-act',
                links: {
                  filing:
                    '/company/05343375/filing-history/MDE0MjE3NTAxM2FkaXF6a2N4'
                }
              },
              {
                filing_type: 'charge-satisfaction-pre-2006-companies-act',
                links: {
                  filing:
                    '/company/05343375/filing-history/MDE2MzAzMDI1NGFkaXF6a2N4'
                },
                delivered_on: '2006-07-21'
              }
            ],
            delivered_on: '2005-07-28'
          }
        ],
        part_satisfied_count: 0,
        satisfied_count: 1,
        total_count: 1,
        unfiltered_count: 1
      }
    }
    await testRequests(
      testUrls.listCharges.map((path) => ({ path })),
      schema
    )
  })
})
