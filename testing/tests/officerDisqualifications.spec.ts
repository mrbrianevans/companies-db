import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('officer-disqualifications-service', function () {
  this.timeout(50000)
  // tests for each path
  it('getCorporateOfficer: /disqualified-officers/corporate/{officer_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        disqualifications: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  reason: {
                    type: 'object',
                    properties: {
                      section: { type: 'string' },
                      description_identifier: { type: 'string' },
                      act: { type: 'string' }
                    },
                    required: ['section', 'description_identifier', 'act']
                  },
                  disqualification_type: { type: 'string' },
                  disqualified_from: { type: 'string' },
                  case_identifier: { type: 'string' },
                  disqualified_until: { type: 'string' },
                  company_names: { type: 'array', items: { type: 'string' } },
                  address: {
                    type: 'object',
                    properties: {
                      locality: { type: 'string' },
                      address_line_1: { type: 'string' },
                      postal_code: { type: 'string' },
                      region: { type: 'string' },
                      premises: { type: 'string' }
                    },
                    required: [
                      'locality',
                      'address_line_1',
                      'postal_code',
                      'region',
                      'premises'
                    ]
                  }
                },
                required: [
                  'reason',
                  'disqualification_type',
                  'disqualified_from',
                  'case_identifier',
                  'disqualified_until',
                  'company_names',
                  'address'
                ]
              }
            },
            {
              type: 'object',
              properties: {
                case_identifier: {
                  description: 'The case identifier of the disqualification.',
                  type: 'string'
                },
                address: {
                  description:
                    'The address of the disqualified officer as provided by the disqualifying authority.',
                  type: 'array',
                  items: {
                    title: 'address',
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
                        description: 'The country. For example, UK.',
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
                    },
                    type: 'object'
                  }
                },
                company_names: {
                  description:
                    'The companies in which the misconduct took place.',
                  type: 'string'
                },
                court_name: {
                  description:
                    'The name of the court that handled the disqualification case.',
                  type: 'string'
                },
                disqualification_type: {
                  description:
                    'An enumeration type that provides the disqualifying authority that handled the disqualification case.\n For enumeration descriptions see `disqualification_type` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/disqualified_officer_descriptions.yml)',
                  type: 'string'
                },
                disqualified_from: {
                  description: 'The date that the disqualification starts.',
                  type: 'string',
                  format: 'date'
                },
                disqualified_until: {
                  description: 'The date that the disqualification ends.',
                  type: 'string',
                  format: 'date'
                },
                heard_on: {
                  description: 'The date the disqualification hearing was on.',
                  type: 'string',
                  format: 'date'
                },
                undertaken_on: {
                  description:
                    'The date the disqualification undertaking was agreed on.',
                  type: 'string',
                  format: 'date'
                },
                last_variation: {
                  description:
                    'The latest variation made to the disqualification.',
                  type: 'array',
                  items: {
                    title: 'last_variation',
                    properties: {
                      varied_on: {
                        description:
                          'The date the variation was made against the disqualification.',
                        type: 'string',
                        format: 'date'
                      },
                      case_identifier: {
                        description: 'The case identifier of the variation.',
                        type: 'string'
                      },
                      court_name: {
                        description:
                          'The name of the court that handled the variation case.',
                        type: 'string'
                      }
                    },
                    type: 'object'
                  }
                },
                reason: {
                  description: 'The reason for the disqualification.',
                  type: 'array',
                  items: {
                    title: 'reason',
                    properties: {
                      description_identifier: {
                        description:
                          'An enumeration type that provides the description for the reason of disqualification.\n For enumeration descriptions see `description_identifier` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/disqualified_officer_descriptions.yml)',
                        type: 'string'
                      },
                      act: {
                        description:
                          'An enumeration type that provides the law under which the disqualification was made.\n For enumeration descriptions see `act` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/disqualified_officer_descriptions.yml)',
                        type: 'string'
                      },
                      article: {
                        description:
                          'The article of the act under which the disqualification was made.\n Only applicable if `reason.act` is `company-directors-disqualification-northern-ireland-order-2002`.',
                        type: 'string'
                      },
                      section: {
                        description:
                          'The section of the act under which the disqualification was made.\n Only applicable if `reason.act` is `company-directors-disqualification-act-1986`.',
                        type: 'string'
                      }
                    },
                    required: ['description_identifier', 'act'],
                    type: 'object'
                  }
                }
              },
              required: [
                'address',
                'disqualification_type',
                'disqualified_from',
                'disqualified_until',
                'reason'
              ]
            }
          ]
        },
        etag: { type: 'string' },
        kind: { type: 'string' },
        links: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  self: {
                    description: 'Link to this disqualification resource.',
                    type: 'string'
                  }
                },
                required: ['self']
              }
            },
            {
              type: 'object',
              properties: { self: { type: 'string' } },
              required: ['self']
            }
          ]
        },
        name: { type: 'string' },
        company_number: {
          description: 'The registration number of the disqualified officer.',
          type: 'string'
        },
        country_of_registration: {
          description:
            'The country in which the disqualified officer was registered.',
          type: 'string'
        },
        permissions_to_act: {
          description:
            'Permissions that the disqualified officer has to act outside of their disqualification.',
          type: 'object',
          title: 'permission_to_act',
          required: ['expires_on', 'granted_on'],
          properties: {
            company_names: {
              description:
                'The companies for which the disqualified officer has permission to act.',
              type: 'string'
            },
            court_name: {
              description:
                'The name of the court that granted the permission to act.',
              type: 'string'
            },
            expires_on: {
              description: 'The date that the permission ends.',
              type: 'string',
              format: 'date'
            },
            granted_on: {
              description: 'The date that the permission starts.',
              type: 'string',
              format: 'date'
            }
          }
        }
      },
      required: ['disqualifications', 'etag', 'kind', 'links', 'name'],
      additionalProperties: false,
      title: 'getCorporateOfficer',
      example: {
        disqualifications: [
          {
            reason: {
              section: '7',
              description_identifier:
                'order-or-undertaking-and-reporting-provisions',
              act: 'company-directors-disqualification-act-1986'
            },
            disqualification_type: 'undertaking',
            disqualified_from: '2013-10-29',
            case_identifier: 'SIGOURNEY LIMITED',
            disqualified_until: '2022-10-28',
            company_names: ['SIGOURNEY LIMITED'],
            address: {
              locality: 'Doncaster',
              address_line_1: 'Wood Street',
              postal_code: 'DN1 3LW',
              region: 'South Yorkshire',
              premises: 'Cussins House'
            }
          }
        ],
        etag: '1b84389451c9cb428a65a22e2fbf018235deb107',
        kind: 'corporate-disqualification',
        links: {
          self: '/disqualified-officers/corporate/Rm2f9Cmvp8WkJzQxZA6RY_P7oeE'
        },
        name: 'ANDREW RUSSELL & CO LIMITED'
      }
    }
    await testRequests(
      testUrls.getCorporateOfficer.map((path) => ({ path })),
      schema
    )
  })

  it('getNaturalOfficer: /disqualified-officers/natural/{officer_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        date_of_birth: { type: 'string' },
        disqualifications: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  undertaken_on: { type: 'string' },
                  disqualified_from: { type: 'string' },
                  disqualified_until: { type: 'string' },
                  address: {
                    type: 'object',
                    properties: {
                      locality: { type: 'string' },
                      postal_code: { type: 'string' },
                      address_line_1: { type: 'string' },
                      premises: { type: 'string' },
                      country: { type: 'string' },
                      region: { type: 'string' },
                      address_line_2: { type: 'string' }
                    },
                    required: ['locality']
                  },
                  disqualification_type: { type: 'string' },
                  company_names: { type: 'array', items: { type: 'string' } },
                  reason: {
                    type: 'object',
                    properties: {
                      description_identifier: { type: 'string' },
                      act: { type: 'string' },
                      section: { type: 'string' },
                      article: { type: 'string' }
                    },
                    required: ['description_identifier', 'act']
                  },
                  case_identifier: { type: 'string' },
                  court_name: { type: 'string' },
                  heard_on: { type: 'string' }
                },
                required: [
                  'disqualified_from',
                  'disqualified_until',
                  'address',
                  'disqualification_type',
                  'reason'
                ]
              }
            },
            {
              type: 'object',
              properties: {
                case_identifier: {
                  description: 'The case identifier of the disqualification.',
                  type: 'string'
                },
                address: {
                  description:
                    'The address of the disqualified officer as provided by the disqualifying authority.',
                  type: 'array',
                  items: {
                    title: 'address',
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
                        description: 'The country. For example, UK.',
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
                    },
                    type: 'object'
                  }
                },
                company_names: {
                  description:
                    'The companies in which the misconduct took place.',
                  type: 'string'
                },
                court_name: {
                  description:
                    'The name of the court that handled the disqualification case.',
                  type: 'string'
                },
                disqualification_type: {
                  description:
                    'An enumeration type that provides the disqualifying authority that handled the disqualification case.\n For enumeration descriptions see `disqualification_type` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/disqualified_officer_descriptions.yml)',
                  type: 'string'
                },
                disqualified_from: {
                  description: 'The date that the disqualification starts.',
                  type: 'string',
                  format: 'date'
                },
                disqualified_until: {
                  description: 'The date that the disqualification ends.',
                  type: 'string',
                  format: 'date'
                },
                heard_on: {
                  description: 'The date the disqualification hearing was on.',
                  type: 'string',
                  format: 'date'
                },
                undertaken_on: {
                  description:
                    'The date the disqualification undertaking was agreed on.',
                  type: 'string',
                  format: 'date'
                },
                last_variation: {
                  description:
                    'The latest variation made to the disqualification.',
                  type: 'array',
                  items: {
                    title: 'last_variation',
                    properties: {
                      varied_on: {
                        description:
                          'The date the variation was made against the disqualification.',
                        type: 'string',
                        format: 'date'
                      },
                      case_identifier: {
                        description: 'The case identifier of the variation.',
                        type: 'string'
                      },
                      court_name: {
                        description:
                          'The name of the court that handled the variation case.',
                        type: 'string'
                      }
                    },
                    type: 'object'
                  }
                },
                reason: {
                  description: 'The reason for the disqualification.',
                  type: 'array',
                  items: {
                    title: 'reason',
                    properties: {
                      description_identifier: {
                        description:
                          'An enumeration type that provides the description for the reason of disqualification.\n For enumeration descriptions see `description_identifier` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/disqualified_officer_descriptions.yml)',
                        type: 'string'
                      },
                      act: {
                        description:
                          'An enumeration type that provides the law under which the disqualification was made.\n For enumeration descriptions see `act` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/disqualified_officer_descriptions.yml)',
                        type: 'string'
                      },
                      article: {
                        description:
                          'The article of the act under which the disqualification was made.\n Only applicable if `reason.act` is `company-directors-disqualification-northern-ireland-order-2002`.',
                        type: 'string'
                      },
                      section: {
                        description:
                          'The section of the act under which the disqualification was made.\n Only applicable if `reason.act` is `company-directors-disqualification-act-1986`.',
                        type: 'string'
                      }
                    },
                    required: ['description_identifier', 'act'],
                    type: 'object'
                  }
                }
              },
              required: [
                'address',
                'disqualification_type',
                'disqualified_from',
                'disqualified_until',
                'reason'
              ]
            }
          ]
        },
        etag: { type: 'string' },
        forename: { type: 'string' },
        kind: { type: 'string' },
        links: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  self: {
                    description: 'Link to this disqualification resource.',
                    type: 'string'
                  }
                },
                required: ['self']
              }
            },
            {
              type: 'object',
              properties: { self: { type: 'string' } },
              required: ['self']
            }
          ]
        },
        nationality: { type: 'string' },
        surname: { type: 'string' },
        title: { type: 'string' },
        other_forenames: { type: 'string' },
        permissions_to_act: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  court_name: { type: 'string' },
                  granted_on: { type: 'string' },
                  expires_on: { type: 'string' },
                  company_names: { type: 'array', items: { type: 'string' } }
                },
                required: [
                  'court_name',
                  'granted_on',
                  'expires_on',
                  'company_names'
                ]
              }
            },
            {
              type: 'object',
              properties: {
                company_names: {
                  description:
                    'The companies for which the disqualified officer has permission to act.',
                  type: 'string'
                },
                court_name: {
                  description:
                    'The name of the court that granted the permission to act.',
                  type: 'string'
                },
                expires_on: {
                  description: 'The date that the permission ends.',
                  type: 'string',
                  format: 'date'
                },
                granted_on: {
                  description: 'The date that the permission starts.',
                  type: 'string',
                  format: 'date'
                }
              },
              required: ['expires_on', 'granted_on']
            }
          ]
        },
        honours: { type: 'string' }
      },
      required: ['disqualifications', 'etag', 'kind', 'links', 'surname'],
      additionalProperties: false,
      title: 'getNaturalOfficer',
      example: {
        date_of_birth: '1964-04-30',
        disqualifications: [
          {
            undertaken_on: '2022-01-19',
            disqualified_from: '2022-02-09',
            disqualified_until: '2029-02-08',
            address: {
              locality: 'Plymouth',
              postal_code: 'PL6 5WF',
              address_line_1: 'Doidges Farm Close',
              premises: '2',
              country: 'United Kingdom'
            },
            disqualification_type: 'undertaking',
            company_names: ['STEPPING FORWARD SUPPORT LIMITED'],
            reason: {
              description_identifier:
                'order-or-undertaking-and-reporting-provisions',
              act: 'company-directors-disqualification-act-1986',
              section: '7'
            },
            case_identifier: 'INV6252807'
          }
        ],
        etag: '51d55182260140f7e3ba9cc635afde25efe78eae',
        forename: 'Ian',
        kind: 'natural-disqualification',
        links: {
          self: '/disqualified-officers/natural/Q7I2upGr4fwVfTIGM6vHWNxnqKQ'
        },
        nationality: 'British',
        surname: 'DAVEY',
        title: 'Mr'
      }
    }
    await testRequests(
      testUrls.getNaturalOfficer.map((path) => ({ path })),
      schema
    )
  })
})
