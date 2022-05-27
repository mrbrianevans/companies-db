import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('insolvency-service', function () {
  this.timeout(50000)
  // tests for each path
  it('getInsolvency: /company/{company_number}/insolvency', async function () {
    const schema = {
      type: 'object',
      properties: {
        cases: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  number: { type: 'string' },
                  dates: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        date: { type: 'string' },
                        type: { type: 'string' }
                      },
                      required: ['date', 'type']
                    }
                  },
                  practitioners: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        role: { type: 'string' },
                        ceased_to_act_on: { type: 'string' },
                        appointed_on: { type: 'string' },
                        address: {
                          type: 'object',
                          properties: {
                            locality: { type: 'string' },
                            address_line_1: { type: 'string' },
                            postal_code: { type: 'string' },
                            address_line_2: { type: 'string' },
                            region: { type: 'string' },
                            country: { type: 'string' }
                          },
                          required: ['address_line_1']
                        }
                      },
                      required: ['name', 'role', 'address']
                    }
                  },
                  type: { type: 'string' },
                  notes: { type: 'array', items: { type: 'string' } },
                  links: {
                    type: 'object',
                    properties: { charge: { type: 'string' } },
                    required: ['charge']
                  }
                },
                required: ['number', 'dates', 'practitioners', 'type']
              }
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: [
                    'compulsory-liquidation',
                    'creditors-voluntary-liquidation',
                    'members-voluntary-liquidation',
                    'in-administration',
                    'corporate-voluntary-arrangement',
                    'corporate-voluntary-arrangement-moratorium',
                    'administration-order',
                    'receiver-manager',
                    'administrative-receiver',
                    'receivership',
                    'foreign-insolvency'
                  ],
                  description:
                    'The type of case.\n For enumeration descriptions see `insolvency_case_type` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml).'
                },
                dates: {
                  type: 'object',
                  description: 'The dates specific to the case.',
                  title: 'caseDates',
                  required: ['type', 'date'],
                  properties: {
                    type: {
                      type: 'string',
                      description:
                        'Describes what date is represented by the associated `date` element.\n For enumeration descriptions see `insolvency_case_date_type` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/constants.yml).',
                      enum: [
                        'instrumented-on',
                        'administration-started-on',
                        'administration-discharged-on',
                        'administration-ended-on',
                        'concluded-winding-up-on',
                        'petitioned-on',
                        'ordered-to-wind-up-on',
                        'due-to-be-dissolved-on',
                        'case-end-on',
                        'wound-up-on',
                        'voluntary-arrangement-started-on',
                        'voluntary-arrangement-ended-on',
                        'moratorium-started-on',
                        'moratorium-ended-on',
                        'declaration-solvent-on'
                      ]
                    },
                    date: {
                      type: 'string',
                      format: 'date',
                      description: 'The case date, described by `date_type`.'
                    }
                  }
                },
                notes: {
                  type: 'string',
                  description: 'The dates specific to the case.'
                },
                practitioners: {
                  type: 'array',
                  description: 'The practitioners for the case.',
                  items: {
                    title: 'practitioners',
                    required: ['name', 'address'],
                    properties: {
                      name: {
                        description: 'The name of the practitioner.',
                        type: 'string'
                      },
                      address: {
                        type: 'object',
                        description: "The practitioners' address.",
                        title: 'practitionerAddress',
                        required: ['address_line_1', 'postal_code'],
                        properties: {
                          address_line_1: {
                            type: 'string',
                            description: 'The first line of the address.'
                          },
                          address_line_2: {
                            type: 'string',
                            description: 'The second line of the address.'
                          },
                          locality: {
                            type: 'string',
                            description: 'The locality. For example London.'
                          },
                          region: {
                            type: 'string',
                            description: 'The region. For example Surrey.'
                          },
                          postal_code: {
                            type: 'string',
                            description:
                              'The postal code. For example CF14 3UZ.'
                          },
                          country: {
                            type: 'string',
                            description: 'The country.'
                          }
                        }
                      },
                      appointed_on: {
                        type: 'string',
                        format: 'date',
                        description:
                          'The date the practitioner was appointed on.'
                      },
                      ceased_to_act_on: {
                        type: 'string',
                        format: 'date',
                        description:
                          'The date the practitioner ceased to act for the case.'
                      },
                      role: {
                        type: 'string',
                        description: 'The type of role.',
                        enum: [
                          'final-liquidator',
                          'receiver',
                          'receiver-manager',
                          'proposed-liquidator',
                          'provisional-liquidator',
                          'administrative-receiver',
                          'practitioner',
                          'interim-liquidator'
                        ]
                      }
                    },
                    type: 'object'
                  }
                },
                links: {
                  type: 'array',
                  description: 'The practitioners for the case.',
                  items: {
                    title: 'links',
                    properties: {
                      charge: {
                        type: 'string',
                        description:
                          'The link to the charge this case is lodged against.'
                      }
                    },
                    type: 'object'
                  }
                },
                number: { type: 'integer', description: 'The case number.' }
              },
              required: ['type', 'dates', 'practitioners']
            }
          ]
        },
        etag: { type: 'string' },
        status: {
          anyOf: [
            {
              type: 'string',
              description: 'Company insolvency status details',
              enum: [
                'live-propopsed-transfer-from-gb',
                'voluntary-arrangement',
                'voluntary-arrangement-receivership',
                'live-receiver-manager-on-at-least-one-charge',
                'receiver-manager-or-administrative-receiver',
                'receiver-manager',
                'administrative-receiver',
                'administration-order',
                'receivership',
                'in-administration'
              ]
            },
            { type: 'array', items: { type: 'string' } }
          ]
        }
      },
      required: ['cases'],
      additionalProperties: false,
      title: 'getInsolvency',
      example: {
        cases: [
          {
            number: '1',
            dates: [
              { date: '2022-08-26', type: 'due-to-be-dissolved-on' },
              { type: 'wound-up-on', date: '2018-03-21' }
            ],
            practitioners: [
              {
                name: 'Peter John Windatt',
                role: 'practitioner',
                ceased_to_act_on: '2020-11-16',
                appointed_on: '2018-03-21',
                address: {
                  locality: 'Northampton',
                  address_line_1: '100 St James Road',
                  postal_code: 'NN5 5LF'
                }
              },
              {
                role: 'practitioner',
                name: 'Lauren Louise Auburn',
                appointed_on: '2018-03-21',
                address: {
                  address_line_1: '100 St James Road',
                  locality: 'Northampton',
                  postal_code: 'NN5 5LF'
                }
              },
              {
                appointed_on: '2020-11-16',
                name: 'John William Rimmer',
                role: 'practitioner',
                address: {
                  postal_code: 'NN5 5LF',
                  address_line_1: '100 St James Road',
                  locality: 'Northampton'
                }
              }
            ],
            type: 'creditors-voluntary-liquidation'
          }
        ],
        etag: 'fb97b432f88e4e92167cecc0207ffa24d828e4e4',
        status: ['liquidation']
      }
    }
    await testRequests(
      testUrls.getInsolvency.map((path) => ({ path })),
      schema
    )
  })
})
