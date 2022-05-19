import * as TestRequests from '../getTestRequests'
import { testRequests } from '../testRequests'
fetch('http://localhost:3000').catch() //to remove warning about fetch being experimental from test results

describe('officer-appointments-service', function () {
  // tests for each path
  it('listOfficerAppointments: /officers/{officer_id}/appointments', async function () {
    const schema = {
      title: 'appointmentList',
      properties: {
        date_of_birth: {
          description: "The officer's date of birth details.",
          type: 'object',
          title: 'dateOfBirth',
          properties: {
            month: {
              description: 'The month the officer was born in.',
              type: 'integer'
            },
            year: {
              description: 'The year the officer was born in.',
              type: 'integer'
            }
          },
          required: []
        },
        etag: { description: 'The ETag of the resource.', type: 'string' },
        is_corporate_officer: {
          description:
            'Indicator representing if the officer is a corporate body.',
          type: 'boolean'
        },
        items: {
          description: 'The list of officer appointments.',
          type: 'array',
          items: {
            title: 'officerAppointmentSummary',
            properties: {
              address: {
                description: 'The correspondence address of the officer.',
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
                    care_of: {
                      description: 'The care of name.',
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
                  },
                  type: 'object'
                },
                type: 'array'
              },
              appointed_before: {
                description:
                  'The date the officer was appointed before. Only present when the `is_pre_1992_appointment` attribute is `true`.',
                type: 'string',
                format: 'date'
              },
              appointed_on: {
                description: 'The date the officer was appointed.',
                type: 'string',
                format: 'date'
              },
              appointed_to: {
                description: 'The company information of the appointment.',
                type: 'object',
                title: 'appointedTo',
                properties: {
                  company_name: {
                    description:
                      'The name of the company the officer is acting for.',
                    type: 'string'
                  },
                  company_number: {
                    description:
                      'The number of the company the officer is acting for.',
                    type: 'string'
                  },
                  company_status: {
                    description:
                      'The status of the company the officer is acting for.',
                    type: 'string'
                  }
                },
                required: []
              },
              name: {
                description: 'The full name of the officer.',
                type: 'string'
              },
              country_of_residence: {
                description: "The officer's country of residence.",
                type: 'string'
              },
              former_names: {
                description: 'Former names for the officer, if there are any.',
                type: 'object',
                title: 'formerNames',
                properties: {
                  forenames: {
                    description: 'Former forenames of the officer.',
                    type: 'string'
                  },
                  surname: {
                    description: 'Former surnames of the officer.',
                    type: 'string'
                  }
                }
              },
              identification: {
                description:
                  'Only one from `eea` or `non-eea` can be supplied, not both.',
                type: 'object',
                title: 'corporateIdent',
                properties: {
                  identification_type: {
                    description: "The officer's identity type",
                    enum: ['eea', 'non-eea'],
                    type: 'string'
                  },
                  legal_authority: {
                    description: 'The legal authority supervising the company.',
                    type: 'string'
                  },
                  legal_form: {
                    description:
                      'The legal form of the company as defined by its country of registration.',
                    type: 'string'
                  },
                  place_registered: {
                    description: 'Place registered.',
                    type: 'string'
                  },
                  registration_number: {
                    description: 'Company registration number.',
                    type: 'string'
                  }
                }
              },
              is_pre_1992_appointment: {
                description:
                  'Indicator representing if the officer was appointed before their appointment date.',
                type: 'boolean'
              },
              links: {
                description:
                  'Links to other resources associated with this officer appointment item.',
                type: 'object',
                title: 'appointmentLinkTypes',
                required: [],
                properties: {
                  company: {
                    description:
                      'Link to the company profile resource that this appointment is associated with.',
                    type: 'string'
                  }
                }
              },
              name_elements: {
                description:
                  "A document encapsulating the separate elements of a natural officer's name.",
                type: 'object',
                title: 'nameElements',
                properties: {
                  forename: {
                    description: 'The forename of the officer.',
                    type: 'string'
                  },
                  title: {
                    description: 'Title of the officer.',
                    type: 'string'
                  },
                  other_forenames: {
                    description: 'Other forenames of the officer.',
                    type: 'string'
                  },
                  surname: {
                    description: 'The surname of the officer.',
                    type: 'string'
                  },
                  honours: {
                    description: 'Honours an officer might have.',
                    type: 'string'
                  }
                },
                required: []
              },
              nationality: {
                description: "The officer's nationality.",
                type: 'string'
              },
              occupation: {
                description: "The officer's occupation.",
                type: 'string'
              },
              officer_role: {
                enum: [
                  'cic-manager',
                  'corporate-director',
                  'corporate-llp-designated-member',
                  'corporate-llp-member',
                  'corporate-member-of-a-management',
                  'corporate-member-of-a-supervisory-organ',
                  'corporate-member-of-an-administrative-organ',
                  'corporate-nominee-director',
                  'corporate-nominee-secretary',
                  'corporate-secretary',
                  'director',
                  'judicial-factor',
                  'llp-designated-member',
                  'llp-member',
                  'member-of-a-management',
                  'member-of-a-supervisory-organ',
                  'member-of-an-administrative-organ',
                  'nominee-director',
                  'nominee-secretary',
                  'receiver-and-manager',
                  'secretary'
                ],
                type: 'string'
              },
              resigned_on: {
                description: 'The date the officer was resigned.',
                type: 'string',
                format: 'date'
              }
            },
            required: [],
            type: 'object'
          }
        },
        items_per_page: {
          description: 'The number of officer appointments to return per page.',
          type: 'integer'
        },
        kind: { enum: ['personal-appointment'], type: 'string' },
        links: {
          description:
            'Links to other resources associated with this officer appointment resource.',
          type: 'object',
          title: 'officerLinkTypes',
          required: [],
          properties: {
            self: {
              description: 'Link to this officer appointment resource.',
              type: 'string'
            }
          }
        },
        name: {
          description: 'The corporate or natural officer name.',
          type: 'string'
        },
        start_index: {
          description:
            'The first row of data to retrieve, starting at 0. Use this parameter as a pagination mechanism along with the `items_per_page` parameter.',
          type: 'integer'
        },
        total_results: {
          description:
            'The total number of officer appointments in this result set.',
          type: 'integer'
        }
      },
      required: [],
      type: 'object'
    }
    await testRequests(TestRequests.listOfficerAppointmentsReqs, schema)
  })
})
