import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('officers-service', function () {
  this.timeout(50000)
  // tests for each path
  it('getOfficers: /company/{company_number}/appointments/{appointment_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        address: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'object',
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
                    description: 'The country e.g. United Kingdom.',
                    type: 'string'
                  },
                  locality: {
                    description: 'The locality e.g. London.',
                    type: 'string'
                  },
                  po_box: {
                    description: 'The post-office box number.',
                    type: 'string'
                  },
                  postal_code: {
                    description: 'The postal code e.g. CF14 3UZ.',
                    type: 'string'
                  },
                  premises: {
                    description: 'The property name or number.',
                    type: 'string'
                  },
                  region: {
                    description: 'The region e.g. Surrey.',
                    type: 'string'
                  }
                },
                required: ['address_line_1', 'locality']
              }
            },
            {
              type: 'object',
              properties: {
                address_line_1: { type: 'string' },
                address_line_2: { type: 'string' },
                country: { type: 'string' },
                locality: { type: 'string' },
                postal_code: { type: 'string' },
                premises: { type: 'string' },
                region: { type: 'string' },
                care_of: { type: 'string' },
                po_box: { type: 'string' }
              }
            }
          ]
        },
        appointed_on: { type: 'string' },
        identification: {
          type: 'object',
          properties: {
            identification_type: { type: 'string' },
            registration_number: { type: 'string' },
            legal_authority: { type: 'string' },
            legal_form: { type: 'string' },
            place_registered: { type: 'string' }
          }
        },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            officer: {
              type: 'object',
              properties: { appointments: { type: 'string' } },
              required: ['appointments']
            }
          },
          required: ['self', 'officer']
        },
        name: { type: 'string' },
        officer_role: { type: 'string' },
        resigned_on: { type: 'string' },
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
        nationality: { type: 'string' },
        occupation: { type: 'string' },
        former_names: {
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  surname: { type: 'string' },
                  forenames: { type: 'string' }
                }
              }
            },
            {
              type: 'object',
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
            }
          ]
        },
        contact_details: {
          description:
            'The contact at the `corporate-managing-officer` of a `registered-overseas-entity`.',
          type: 'object',
          title: 'contactDetails',
          required: ['address_line_1', 'locality', 'name'],
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
              description: 'The country e.g. United Kingdom.',
              type: 'string'
            },
            locality: {
              description: 'The locality e.g. London.',
              type: 'string'
            },
            name: { description: 'The name of the contact.', type: 'string' },
            po_box: {
              description: 'The post-office box number.',
              type: 'string'
            },
            postal_code: {
              description: 'The postal code e.g. CF14 3UZ.',
              type: 'string'
            },
            premises: {
              description: 'The property name or number.',
              type: 'string'
            },
            region: { description: 'The region e.g. Surrey.', type: 'string' }
          }
        },
        principal_office_address: {
          description:
            'The principal/registered office address of a `corporate-managing-officer` of a `registered-overseas-entity`.',
          type: 'object',
          title: 'address',
          required: ['address_line_1', 'locality'],
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
              description: 'The country e.g. United Kingdom.',
              type: 'string'
            },
            locality: {
              description: 'The locality e.g. London.',
              type: 'string'
            },
            po_box: {
              description: 'The post-office box number.',
              type: 'string'
            },
            postal_code: {
              description: 'The postal code e.g. CF14 3UZ.',
              type: 'string'
            },
            premises: {
              description: 'The property name or number.',
              type: 'string'
            },
            region: { description: 'The region e.g. Surrey.', type: 'string' }
          }
        },
        responsibilities: {
          description:
            'The responsibilities of the managing officer of a `registered-overseas-entity`.',
          type: 'string'
        }
      },
      required: ['links', 'name', 'officer_role'],
      additionalProperties: false,
      title: 'getOfficers',
      example: {
        address: {
          address_line_1: '1229 Stratford Road',
          address_line_2: 'Hall Green',
          country: 'England',
          locality: 'Birmingham',
          postal_code: 'B28 9AA',
          premises: 'Cambrai Court'
        },
        appointed_on: '2011-06-10',
        identification: {
          identification_type: 'uk-limited-company',
          registration_number: '4527552'
        },
        links: {
          self: '/company/07665437/appointments/Maj2T4RZGfhC4yrgNJqXVo-dOsI',
          officer: {
            appointments: '/officers/UfHA2EySqUtaf2U6JlRT_cCdHYQ/appointments'
          }
        },
        name: 'CAPITAX & CO. (TAX CONSULTANTS) LTD.',
        officer_role: 'corporate-secretary',
        resigned_on: '2021-06-14'
      }
    }
    await testRequests(
      testUrls.getOfficers.map((path) => ({ path })),
      schema
    )
  })

  it('listOfficers: /company/{company_number}/officers', async function () {
    const schema = {
      type: 'object',
      properties: {
        active_count: { type: 'integer' },
        etag: { type: 'string' },
        inactive_count: { type: 'integer' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              nationality: { type: 'string' },
              country_of_residence: { type: 'string' },
              appointed_on: { type: 'string' },
              links: {
                type: 'object',
                properties: {
                  self: { type: 'string' },
                  officer: {
                    type: 'object',
                    properties: { appointments: { type: 'string' } },
                    required: ['appointments']
                  }
                },
                required: ['self', 'officer']
              },
              occupation: { type: 'string' },
              name: { type: 'string' },
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
              officer_role: { type: 'string' },
              address: {
                anyOf: [
                  {
                    type: 'array',
                    items: {
                      type: 'object',
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
                          description: 'The country e.g. United Kingdom.',
                          type: 'string'
                        },
                        locality: {
                          description: 'The locality e.g. London.',
                          type: 'string'
                        },
                        po_box: {
                          description: 'The post-office box number.',
                          type: 'string'
                        },
                        postal_code: {
                          description: 'The postal code e.g. CF14 3UZ.',
                          type: 'string'
                        },
                        premises: {
                          description: 'The property name or number.',
                          type: 'string'
                        },
                        region: {
                          description: 'The region e.g. Surrey.',
                          type: 'string'
                        }
                      },
                      required: ['address_line_1', 'locality']
                    }
                  },
                  {
                    type: 'object',
                    properties: {
                      address_line_2: { type: 'string' },
                      postal_code: { type: 'string' },
                      country: { type: 'string' },
                      region: { type: 'string' },
                      address_line_1: { type: 'string' },
                      premises: { type: 'string' },
                      locality: { type: 'string' },
                      care_of: { type: 'string' },
                      po_box: { type: 'string' }
                    }
                  }
                ]
              },
              resigned_on: { type: 'string' },
              identification: {
                type: 'object',
                properties: {
                  registration_number: { type: 'string' },
                  identification_type: { type: 'string' },
                  place_registered: { type: 'string' },
                  legal_authority: { type: 'string' },
                  legal_form: { type: 'string' }
                }
              },
              former_names: {
                anyOf: [
                  {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        surname: { type: 'string' },
                        forenames: { type: 'string' }
                      }
                    }
                  },
                  {
                    type: 'object',
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
                  }
                ]
              },
              contact_details: {
                description:
                  'The contact at the `corporate-managing-officer` of a `registered-overseas-entity`.',
                type: 'object',
                title: 'contactDetails',
                required: ['address_line_1', 'locality', 'name'],
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
                    description: 'The country e.g. United Kingdom.',
                    type: 'string'
                  },
                  locality: {
                    description: 'The locality e.g. London.',
                    type: 'string'
                  },
                  name: {
                    description: 'The name of the contact.',
                    type: 'string'
                  },
                  po_box: {
                    description: 'The post-office box number.',
                    type: 'string'
                  },
                  postal_code: {
                    description: 'The postal code e.g. CF14 3UZ.',
                    type: 'string'
                  },
                  premises: {
                    description: 'The property name or number.',
                    type: 'string'
                  },
                  region: {
                    description: 'The region e.g. Surrey.',
                    type: 'string'
                  }
                }
              },
              principal_office_address: {
                description:
                  'The principal/registered office address of a `corporate-managing-officer` of a `registered-overseas-entity`.',
                type: 'object',
                title: 'address',
                required: ['address_line_1', 'locality'],
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
                    description: 'The country e.g. United Kingdom.',
                    type: 'string'
                  },
                  locality: {
                    description: 'The locality e.g. London.',
                    type: 'string'
                  },
                  po_box: {
                    description: 'The post-office box number.',
                    type: 'string'
                  },
                  postal_code: {
                    description: 'The postal code e.g. CF14 3UZ.',
                    type: 'string'
                  },
                  premises: {
                    description: 'The property name or number.',
                    type: 'string'
                  },
                  region: {
                    description: 'The region e.g. Surrey.',
                    type: 'string'
                  }
                }
              },
              responsibilities: {
                description:
                  'The responsibilities of the managing officer of a `registered-overseas-entity`.',
                type: 'string'
              }
            },
            required: ['links', 'name', 'officer_role']
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        resigned_count: { type: 'integer' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'active_count',
        'etag',
        'items',
        'items_per_page',
        'kind',
        'links',
        'resigned_count',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'listOfficers',
      example: {
        active_count: 0,
        etag: '490e7c1c96f85192cf3f3973d59e9b33e47cade0',
        inactive_count: 1,
        items: [
          {
            nationality: 'British',
            country_of_residence: 'England',
            appointed_on: '2015-11-12',
            links: {
              self: '/company/09870307/appointments/0bhRVXIQoMxmVUWz_I5Aeo1q_gI',
              officer: {
                appointments:
                  '/officers/VCAEYwOwGM_IN1qPw2UDOgPMHQ0/appointments'
              }
            },
            occupation: 'Company Director',
            name: 'KIRKHAM, Graham, Lord',
            date_of_birth: { month: 12, year: 1944 },
            officer_role: 'director',
            address: {
              address_line_2: 'Redhouse Interchange, Ardwick-Le-Street',
              postal_code: 'DN6 7FE',
              country: 'England',
              region: 'South Yorkshire',
              address_line_1: 'Ebor Court',
              premises: '8,',
              locality: 'Doncaster'
            }
          }
        ],
        items_per_page: 35,
        kind: 'officer-list',
        links: { self: '/company/09870307/officers' },
        resigned_count: 0,
        start_index: 0,
        total_results: 1
      }
    }
    await testRequests(
      testUrls.listOfficers.map((path) => ({ path })),
      schema
    )
  })
})
