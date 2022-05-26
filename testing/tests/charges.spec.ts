import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('charges-service', function () {
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
            floating_charge_covers_all: { type: 'boolean' },
            contains_fixed_charge: { type: 'boolean' },
            contains_floating_charge: { type: 'boolean' },
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
                properties: { filing: { type: 'string' } },
                required: ['filing']
              },
              delivered_on: { type: 'string' },
              filing_type: { type: 'string' }
            },
            required: ['delivered_on', 'filing_type']
          }
        },
        secured_details: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            type: { type: 'string' }
          },
          required: ['description', 'type']
        },
        satisfied_on: { type: 'string' },
        scottish_alterations: {
          type: 'object',
          properties: { has_restricting_provisions: { type: 'boolean' } },
          required: ['has_restricting_provisions']
        },
        assets_ceased_released: { type: 'string' },
        more_than_four_persons_entitled: { type: 'boolean' }
      },
      required: [
        'charge_number',
        'classification',
        'created_on',
        'delivered_on',
        'etag',
        'links',
        'particulars',
        'persons_entitled',
        'status',
        'transactions'
      ],
      additionalProperties: false,
      title: 'getCharge',
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
              status: { type: 'string' },
              etag: { type: 'string' },
              delivered_on: { type: 'string' },
              transactions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    filing_type: { type: 'string' },
                    links: {
                      type: 'object',
                      properties: {
                        filing: { type: 'string' },
                        insolvency_case: { type: 'string' }
                      },
                      required: ['filing']
                    },
                    delivered_on: { type: 'string' },
                    insolvency_case_number: { type: 'string' }
                  },
                  required: ['delivered_on']
                }
              },
              particulars: {
                type: 'object',
                properties: {
                  contains_fixed_charge: { type: 'boolean' },
                  contains_floating_charge: { type: 'boolean' },
                  floating_charge_covers_all: { type: 'boolean' },
                  contains_negative_pledge: { type: 'boolean' },
                  description: { type: 'string' },
                  type: { type: 'string' },
                  chargor_acting_as_bare_trustee: { type: 'boolean' }
                }
              },
              created_on: { type: 'string' },
              charge_number: { type: 'integer' },
              charge_code: { type: 'string' },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              persons_entitled: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: { name: { type: 'string' } },
                  required: ['name']
                }
              },
              secured_details: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  description: { type: 'string' }
                },
                required: ['type', 'description']
              },
              satisfied_on: { type: 'string' },
              insolvency_cases: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    case_number: { type: 'string' },
                    transaction_id: { type: 'string' },
                    links: {
                      type: 'object',
                      properties: { case: { type: 'string' } },
                      required: ['case']
                    }
                  },
                  required: ['case_number', 'links']
                }
              },
              assets_ceased_released: { type: 'string' },
              acquired_on: { type: 'string' },
              scottish_alterations: {
                type: 'object',
                properties: {
                  has_restricting_provisions: { type: 'boolean' },
                  has_alterations_to_prohibitions: { type: 'boolean' },
                  has_alterations_to_order: { type: 'boolean' }
                }
              }
            },
            required: [
              'classification',
              'status',
              'delivered_on',
              'transactions',
              'particulars',
              'created_on',
              'charge_number',
              'links',
              'persons_entitled'
            ]
          }
        },
        part_satisfied_count: { type: 'integer' },
        satisfied_count: { type: 'integer' },
        total_count: { type: 'integer' },
        unfiltered_count: { type: 'integer' }
      },
      required: [
        'items',
        'part_satisfied_count',
        'satisfied_count',
        'total_count',
        'unfiltered_count'
      ],
      additionalProperties: false,
      title: 'listCharge',
      example: {
        items: [
          {
            classification: {
              description: 'A registered charge',
              type: 'charge-description'
            },
            status: 'outstanding',
            etag: '042be5428363cea67284c5ebc9952e7f55254a9a',
            delivered_on: '2022-01-11',
            transactions: [
              {
                filing_type: 'create-charge-with-deed',
                links: {
                  filing:
                    '/company/13402420/filing-history/MzMyNjMxMDk5MGFkaXF6a2N4'
                },
                delivered_on: '2022-01-11'
              }
            ],
            particulars: {
              contains_fixed_charge: true,
              contains_floating_charge: true,
              floating_charge_covers_all: true,
              contains_negative_pledge: true
            },
            created_on: '2022-01-06',
            charge_number: 1,
            charge_code: '134024200001',
            links: {
              self: '/company/13402420/charges/hVQSDyC7GrQ004Z70famRjrIw60'
            },
            persons_entitled: [{ name: 'Sanne Group (UK) Limited' }]
          }
        ],
        part_satisfied_count: 0,
        satisfied_count: 0,
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
