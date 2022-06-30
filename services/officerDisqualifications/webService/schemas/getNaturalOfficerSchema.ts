import { FromSchema } from 'json-schema-to-ts'

export interface GetNaturalOfficerParams {
  /** The disqualified officer's id. */
  officer_id: string
}

export interface GetNaturalOfficerQueryString {}

export const GetNaturalOfficerSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        officer_id: {
          type: 'string'
        }
      },
      required: ['officer_id']
    },
    querystring: {
      type: 'object',
      properties: {},
      required: []
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          date_of_birth: {
            type: 'string'
          },
          disqualifications: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    undertaken_on: {
                      type: 'string'
                    },
                    disqualified_from: {
                      type: 'string'
                    },
                    disqualified_until: {
                      type: 'string'
                    },
                    address: {
                      type: 'object',
                      properties: {
                        locality: {
                          type: 'string'
                        },
                        postal_code: {
                          type: 'string'
                        },
                        address_line_1: {
                          type: 'string'
                        },
                        premises: {
                          type: 'string'
                        },
                        country: {
                          type: 'string'
                        },
                        region: {
                          type: 'string'
                        },
                        address_line_2: {
                          type: 'string'
                        }
                      },
                      required: ['locality']
                    },
                    disqualification_type: {
                      type: 'string'
                    },
                    company_names: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    },
                    reason: {
                      type: 'object',
                      properties: {
                        description_identifier: {
                          type: 'string'
                        },
                        act: {
                          type: 'string'
                        },
                        section: {
                          type: 'string'
                        },
                        article: {
                          type: 'string'
                        }
                      },
                      required: ['description_identifier', 'act']
                    },
                    case_identifier: {
                      type: 'string'
                    },
                    court_name: {
                      type: 'string'
                    },
                    heard_on: {
                      type: 'string'
                    }
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
                    description:
                      'The date the disqualification hearing was on.',
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
          etag: {
            type: 'string'
          },
          forename: {
            type: 'string'
          },
          kind: {
            type: 'string'
          },
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
                properties: {
                  self: {
                    type: 'string'
                  }
                },
                required: ['self']
              }
            ]
          },
          nationality: {
            type: 'string'
          },
          surname: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          other_forenames: {
            type: 'string'
          },
          permissions_to_act: {
            anyOf: [
              {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    court_name: {
                      type: 'string'
                    },
                    granted_on: {
                      type: 'string'
                    },
                    expires_on: {
                      type: 'string'
                    },
                    company_names: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
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
          honours: {
            type: 'string'
          }
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
    }
  }
} as const

export type GetNaturalOfficerResponse = FromSchema<
  typeof GetNaturalOfficerSchema['schema']['response']['200']
>
//export type GetNaturalOfficerResponse = any // temporary until schemas can be fixed
