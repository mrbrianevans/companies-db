import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('officers-service', function () {
  this.timeout(50000)
  // tests for each path
  it('listOfficerAppointments: /officers/{officer_id}/appointments', async function () {
    const schema = {
      type: 'object',
      properties: {
        date_of_birth: {
          type: 'object',
          properties: { year: { type: 'integer' }, month: { type: 'integer' } },
          required: ['year', 'month']
        },
        etag: { type: 'string' },
        is_corporate_officer: { type: 'boolean' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              officer_role: { type: 'string' },
              appointed_to: {
                type: 'object',
                properties: {
                  company_status: { type: 'string' },
                  company_name: { type: 'string' },
                  company_number: { type: 'string' }
                },
                required: ['company_number']
              },
              country_of_residence: { type: 'string' },
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
                      }
                    }
                  },
                  {
                    type: 'object',
                    properties: {
                      postal_code: { type: 'string' },
                      address_line_1: { type: 'string' },
                      region: { type: 'string' },
                      locality: { type: 'string' },
                      premises: { type: 'string' },
                      country: { type: 'string' },
                      address_line_2: { type: 'string' },
                      care_of: { type: 'string' },
                      po_box: { type: 'string' }
                    }
                  }
                ]
              },
              name_elements: {
                type: 'object',
                properties: {
                  forename: { type: 'string' },
                  other_forenames: { type: 'string' },
                  title: { type: 'string' },
                  surname: { type: 'string' },
                  honours: { type: 'string' }
                },
                required: ['surname']
              },
              appointed_on: { type: 'string' },
              name: { type: 'string' },
              links: {
                type: 'object',
                properties: { company: { type: 'string' } },
                required: ['company']
              },
              nationality: { type: 'string' },
              resigned_on: { type: 'string' },
              occupation: { type: 'string' },
              is_pre_1992_appointment: { type: 'boolean' },
              appointed_before: { type: 'string' },
              identification: {
                type: 'object',
                properties: {
                  registration_number: { type: 'string' },
                  place_registered: { type: 'string' },
                  identification_type: { type: 'string' },
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
                        forenames: { type: 'string' },
                        surname: { type: 'string' }
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
              }
            },
            required: [
              'officer_role',
              'appointed_to',
              'address',
              'name',
              'links'
            ]
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        name: { type: 'string' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'etag',
        'is_corporate_officer',
        'items',
        'items_per_page',
        'kind',
        'links',
        'name',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'listOfficerAppointments',
      example: {
        date_of_birth: { year: 1971, month: 4 },
        etag: 'c12a22174815a08d78fe2888639d5ddbfdab5779',
        is_corporate_officer: false,
        items: [
          {
            officer_role: 'llp-member',
            appointed_to: {
              company_status: 'active',
              company_name: 'BLUEBAY ASSET MANAGEMENT LLP',
              company_number: 'OC370085'
            },
            country_of_residence: 'United Kingdom',
            address: {
              postal_code: 'W1K 3JR',
              address_line_1: 'Grosvenor Street',
              region: 'Greater London',
              locality: 'London',
              premises: '77'
            },
            name_elements: {
              forename: 'Mark',
              other_forenames: 'Charles David',
              title: 'Mr',
              surname: 'DOWDING'
            },
            appointed_on: '2012-04-02',
            name: 'Mark Charles David DOWDING',
            links: { company: '/company/OC370085' }
          },
          {
            officer_role: 'director',
            name_elements: {
              other_forenames: 'Charles David',
              forename: 'Mark',
              title: 'Mr',
              surname: 'DOWDING'
            },
            address: {
              locality: 'St Albans',
              region: 'Hertfordshire',
              address_line_1: '60 Marshals Drive',
              postal_code: 'AL1 4RF'
            },
            nationality: 'British',
            country_of_residence: 'United Kingdom',
            appointed_to: {
              company_status: 'active',
              company_number: '00949417',
              company_name: 'INVESCO ASSET MANAGEMENT LIMITED'
            },
            resigned_on: '2007-04-05',
            name: 'Mark Charles David DOWDING',
            appointed_on: '2006-09-22',
            occupation: 'Company Director',
            links: { company: '/company/00949417' }
          }
        ],
        items_per_page: 35,
        kind: 'personal-appointment',
        links: { self: '/officers/_KEhtG96oweECRpL-MofQUhT1qI/appointments' },
        name: 'Mark Charles David DOWDING',
        start_index: 0,
        total_results: 2
      }
    }
    await testRequests(
      testUrls.listOfficerAppointments.map((path) => ({ path })),
      schema
    )
  })

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

  it('searchOfficers: /search/officers', async function () {
    const schema = {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              address_snippet: { type: 'string' },
              address: {
                type: 'object',
                properties: {
                  country: { type: 'string' },
                  address_line_1: { type: 'string' },
                  region: { type: 'string' },
                  postal_code: { type: 'string' },
                  locality: { type: 'string' },
                  premises: { type: 'string' },
                  address_line_2: { type: 'string' },
                  po_box: { type: 'string' },
                  care_of: { type: 'string' }
                }
              },
              appointment_count: { type: 'integer' },
              snippet: { type: 'string' },
              description_identifiers: {
                anyOf: [
                  {
                    type: 'string',
                    description:
                      'An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations.',
                    enum: ['appointment-count', 'born-on']
                  },
                  { type: 'array', items: { type: 'string' } }
                ]
              },
              description: { type: 'string' },
              kind: { type: 'string' },
              title: { type: 'string' },
              matches: {
                type: 'object',
                properties: {
                  snippet: { type: 'array', items: { type: 'integer' } },
                  title: { type: 'array', items: { type: 'integer' } }
                },
                required: ['snippet']
              },
              date_of_birth: {
                type: 'object',
                properties: {
                  year: { type: 'integer' },
                  month: { type: 'integer' }
                },
                required: ['year', 'month']
              }
            },
            required: [
              'address_snippet',
              'address',
              'appointment_count',
              'description',
              'kind',
              'title'
            ]
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        page_number: { type: 'integer' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: ['kind'],
      additionalProperties: false,
      title: 'searchOfficers',
      example: {
        items: [
          {
            links: {
              self: '/officers/jzwJPDI848ea-bOSg1ooqmrv8g8/appointments'
            },
            address_snippet: '100 New Bridge Street, London,  ,  , EC4V 6JA',
            address: {
              country: ' ',
              address_line_1: '100 New Bridge Street',
              region: ' ',
              postal_code: 'EC4V 6JA',
              locality: 'London'
            },
            appointment_count: 1,
            snippet: '',
            description_identifiers: ['appointment-count'],
            description: 'Total number of appointments 1',
            kind: 'searchresults#officer',
            title: 'WYATT TRUSTEE LIMITED',
            matches: { snippet: [], title: [1, 5] }
          },
          {
            address_snippet:
              'Braithwaite Street, Holbeck Lane, Leeds, United Kingdom, LS11 9XE',
            address: {
              locality: 'Leeds',
              postal_code: 'LS11 9XE',
              address_line_1: 'Holbeck Lane',
              country: 'United Kingdom',
              premises: 'Braithwaite Street'
            },
            links: {
              self: '/officers/WofTSaSTk6iaYlGERAQOdurrDOE/appointments'
            },
            appointment_count: 1,
            description_identifiers: ['appointment-count'],
            snippet: '',
            description: 'Total number of appointments 1',
            kind: 'searchresults#officer',
            title: 'JOHN WYATT (FEED FATS) LIMITED',
            matches: { title: [6, 10], snippet: [] }
          },
          {
            description: 'Total number of appointments 1',
            title: 'THE WYATT 2012 FAMILY SETTLEMENT ',
            kind: 'searchresults#officer',
            matches: { title: [5, 9], snippet: [] },
            links: {
              self: '/officers/BfNSZvzMDTwUZpn1eM2s3OJZ7U4/appointments'
            },
            address: {
              locality: 'Nailsea',
              country: 'England',
              address_line_1: 'Briar Close',
              premises: '1',
              postal_code: 'BS48 1QG',
              region: 'N Somerset'
            },
            address_snippet:
              '1 Briar Close, Nailsea, N Somerset, England, BS48 1QG',
            appointment_count: 1,
            snippet: '',
            description_identifiers: ['appointment-count']
          },
          {
            matches: { title: [7, 11], snippet: [] },
            description: 'Total number of appointments 1',
            kind: 'searchresults#officer',
            title: 'LEWIS WYATT (CONSTRUCTION) LIMITED',
            snippet: '',
            description_identifiers: ['appointment-count'],
            address_snippet: '1 Parkstone Road, Poole, Dorset, BH15 2NN',
            address: {
              region: 'Dorset',
              postal_code: 'BH15 2NN',
              premises: '1 Parkstone Road',
              locality: 'Poole'
            },
            links: {
              self: '/officers/0qflnf-ZfngF64hVSmxvTog49p0/appointments'
            },
            appointment_count: 1
          },
          {
            matches: { title: [5, 9], snippet: [] },
            kind: 'searchresults#officer',
            title:
              'THE WYATT ALEXANDER STURN FAMILY TRUST SETH M CAMERON TRUSTEE',
            description: 'Total number of appointments 0',
            snippet: '',
            description_identifiers: ['appointment-count'],
            appointment_count: 0,
            address: {
              locality: 'Greenwich',
              premises: '115',
              address_line_1: 'East Putnam Avenue',
              country: 'United States',
              region: 'Connecticut',
              postal_code: '06830'
            },
            address_snippet:
              '115 East Putnam Avenue, Greenwich, Connecticut, United States, 06830',
            links: {
              self: '/officers/q1Xfjw-zRets3MuXYR5RtPmhmNI/appointments'
            }
          },
          {
            matches: { snippet: [], title: [18, 22] },
            kind: 'searchresults#officer',
            title: 'Susan Mary ASHBY WYATT',
            description: 'Total number of appointments 0',
            snippet: '',
            description_identifiers: ['appointment-count'],
            appointment_count: 0,
            address: {
              locality: 'Littlehampton',
              postal_code: 'BN17 7PU',
              region: 'West Sussex',
              address_line_1: '54 Old Mead Road'
            },
            address_snippet:
              '54 Old Mead Road, Littlehampton, West Sussex, BN17 7PU',
            links: {
              self: '/officers/W86fhtqv0vAdF5sWQCLm8hIvgAE/appointments'
            }
          },
          {
            matches: { title: [22, 26], snippet: [] },
            description: 'Total number of appointments 1',
            title: 'Amanada Jane BALBIER WYATT',
            kind: 'searchresults#officer',
            description_identifiers: ['appointment-count'],
            snippet: '',
            links: {
              self: '/officers/BXyTJfi3HAZiNllSNYJ7YAcDOS4/appointments'
            },
            address_snippet:
              'Alpha House, 4 Greek Street, Stockport, Cheshire, United Kingdom, SK3 8AB',
            address: {
              postal_code: 'SK3 8AB',
              region: 'Cheshire',
              country: 'United Kingdom',
              premises: 'Alpha House',
              address_line_1: '4 Greek Street',
              locality: 'Stockport'
            },
            appointment_count: 1
          },
          {
            matches: { snippet: [], title: [21, 25] },
            kind: 'searchresults#officer',
            title: 'Amanda Jane BALBIER WYATT',
            description: 'Total number of appointments 1',
            snippet: '',
            description_identifiers: ['appointment-count'],
            appointment_count: 1,
            address_snippet:
              '69 Moor Lane, Wilmslow, Cheshire, United Kingdom, SK9 6BQ',
            address: {
              address_line_1: 'Moor Lane',
              premises: '69',
              country: 'United Kingdom',
              region: 'Cheshire',
              postal_code: 'SK9 6BQ',
              locality: 'Wilmslow'
            },
            links: {
              self: '/officers/ndcMlyRLsfaFPLGr43_JfMjrBaU/appointments'
            }
          },
          {
            appointment_count: 0,
            links: {
              self: '/officers/mu_U2Phro2Lx1uuolnre_JcTrEU/appointments'
            },
            address: {
              locality: 'York',
              postal_code: 'YO10 3DB',
              country: 'England',
              premises: '6',
              address_line_1: 'Sadberge Court'
            },
            address_snippet: '6 Sadberge Court, York, England, YO10 3DB',
            description_identifiers: ['appointment-count', 'born-on'],
            snippet: '',
            title: 'Edward James Channer BARKER WYATT',
            kind: 'searchresults#officer',
            description: 'Total number of appointments 0 - Born April 1976',
            date_of_birth: { year: 1976, month: 4 },
            matches: { snippet: [], title: [29, 33] }
          },
          {
            kind: 'searchresults#officer',
            title: 'Jessica BRADLEY',
            description: 'Total number of appointments 0 - Born September 1984',
            date_of_birth: { month: 9, year: 1984 },
            matches: { snippet: [9, 13] },
            appointment_count: 0,
            address_snippet:
              '19a, Hookstone Chase, Harrogate, United Kingdom, HG27HH',
            address: {
              locality: 'Harrogate',
              premises: '19a',
              address_line_1: 'Hookstone Chase',
              country: 'United Kingdom',
              postal_code: 'HG27HH'
            },
            links: {
              self: '/officers/caRLlpnpxXXnUWMTtfSKeAzo_iA/appointments'
            },
            description_identifiers: ['appointment-count', 'born-on'],
            snippet: 'Jessica WYATT '
          },
          {
            snippet: '',
            description_identifiers: ['appointment-count', 'born-on'],
            appointment_count: 0,
            links: {
              self: '/officers/QoUVNnjMFX7eQYCBbFAr-zBl3xw/appointments'
            },
            address: {
              locality: 'Essex',
              country: 'United Kingdom',
              address_line_1: '321-323 High Road',
              premises: 'Office 647',
              postal_code: 'RM6 6AX',
              address_line_2: 'Chadwell Heath'
            },
            address_snippet:
              'Office 647, 321-323 High Road, Chadwell Heath, Essex, United Kingdom, RM6 6AX',
            date_of_birth: { month: 6, year: 1996 },
            matches: { title: [13, 17], snippet: [] },
            title: 'Hywel COSBY WYATT',
            kind: 'searchresults#officer',
            description: 'Total number of appointments 0 - Born June 1996'
          },
          {
            description_identifiers: ['appointment-count', 'born-on'],
            snippet: 'Valerie Diana DEVINE - WYATT ',
            appointment_count: 2,
            address_snippet:
              'Manzold House, Little Saxham, Bury St Edmunds, Suffolk, IP29 5LD',
            address: {
              locality: 'Bury St Edmunds',
              address_line_1: 'Manzold House',
              region: 'Suffolk',
              postal_code: 'IP29 5LD',
              address_line_2: 'Little Saxham'
            },
            links: {
              self: '/officers/95OsHpEhlqkWgHr-bFQEYwRTOQs/appointments'
            },
            date_of_birth: { month: 8, year: 1938 },
            matches: { snippet: [24, 28] },
            title: 'Valerie Diana DEVINE-WYATT',
            kind: 'searchresults#officer',
            description: 'Total number of appointments 2 - Born August 1938'
          },
          {
            title: 'Kenneth FORD - WYATT',
            kind: 'searchresults#officer',
            description: 'Total number of appointments 0 - Born July 1969',
            date_of_birth: { month: 7, year: 1969 },
            matches: { title: [16, 20], snippet: [] },
            appointment_count: 0,
            links: {
              self: '/officers/MA14j-hAtqZak8rXlpJozEuYw58/appointments'
            },
            address: {
              locality: 'London',
              postal_code: 'W1J 9HL',
              address_line_1: 'Piccadilly',
              premises: '212 Piccadilly London',
              country: 'England'
            },
            address_snippet:
              '212 Piccadilly London Piccadilly, London, England, W1J 9HL',
            snippet: '',
            description_identifiers: ['appointment-count', 'born-on']
          },
          {
            date_of_birth: { year: 1969, month: 7 },
            matches: { title: [14, 18], snippet: [] },
            kind: 'searchresults#officer',
            title: 'Kenneth FORD WYATT',
            description: 'Total number of appointments 0 - Born July 1969',
            snippet: '',
            description_identifiers: ['appointment-count', 'born-on'],
            appointment_count: 0,
            address_snippet:
              'Floor 4, Regis, Victoria House, Chelmsford, United Kingdom, CM1 1JR',
            address: {
              locality: 'Chelmsford',
              premises: 'Floor 4',
              address_line_1: 'Regis',
              country: 'United Kingdom',
              address_line_2: 'Victoria House',
              postal_code: 'CM1 1JR'
            },
            links: {
              self: '/officers/QOxTn6k_f9fWq_ESl7XbjuQ4NXQ/appointments'
            }
          },
          {
            description_identifiers: ['appointment-count', 'born-on'],
            snippet: '',
            appointment_count: 1,
            address: {
              locality: 'London',
              postal_code: 'SE10 0RU',
              country: 'England',
              address_line_1: 'West Parkside',
              premises: '106 Farnsworth Court'
            },
            address_snippet:
              '106 Farnsworth Court, West Parkside, London, England, SE10 0RU',
            links: {
              self: '/officers/21aPhimKWUBZJN_QT71Oz9Z758w/appointments'
            },
            date_of_birth: { year: 1979, month: 7 },
            matches: { title: [24, 28], snippet: [] },
            title: 'Dr Robin James GLOSTER WYATT',
            kind: 'searchresults#officer',
            description: 'Total number of appointments 1 - Born July 1979'
          },
          {
            appointment_count: 3,
            links: {
              self: '/officers/NSfJctBbBP6aZcGu1FuJ6h9ogpQ/appointments'
            },
            address: {
              postal_code: 'EC1Y 0TL',
              premises: 'Invicta House',
              country: 'England',
              address_line_1: '108 - 114 Golden Lane',
              locality: 'London'
            },
            address_snippet:
              'Invicta House, 108 - 114 Golden Lane, London, England, EC1Y 0TL',
            snippet: '',
            description_identifiers: ['appointment-count', 'born-on'],
            title: 'Loredana Maria GUETG WYATT',
            kind: 'searchresults#officer',
            description: 'Total number of appointments 3 - Born November 1975',
            date_of_birth: { month: 11, year: 1975 },
            matches: { snippet: [], title: [22, 26] }
          },
          {
            appointment_count: 1,
            links: {
              self: '/officers/7rxopMYfjZxZrARQQiJmejmJLW8/appointments'
            },
            address_snippet:
              'The White House, Wilderspool Business Park, Greenalls Avenue, Warrington, England, WA4 6HL',
            address: {
              locality: 'Warrington',
              postal_code: 'WA4 6HL',
              address_line_2: 'Greenalls Avenue',
              premises: 'The White House',
              country: 'England',
              address_line_1: 'Wilderspool Business Park'
            },
            description_identifiers: ['appointment-count'],
            snippet: '',
            kind: 'searchresults#officer',
            title: 'Loredana Maria GUETG WYATT',
            description: 'Total number of appointments 1',
            matches: { snippet: [], title: [22, 26] }
          },
          {
            snippet: '',
            description_identifiers: ['appointment-count', 'born-on'],
            appointment_count: 1,
            links: {
              self: '/officers/jNed3MBWsfMR4qH00pT1ape32ds/appointments'
            },
            address_snippet:
              'Garden Halls, 1 Cartwright Gardens, London, England, WC1H 9EN',
            address: {
              locality: 'London',
              postal_code: 'WC1H 9EN',
              premises: 'Garden Halls',
              address_line_1: '1 Cartwright Gardens',
              country: 'England'
            },
            date_of_birth: { year: 2001, month: 10 },
            matches: { snippet: [], title: [35, 39] },
            title: 'Emilia Felicity Katherine HANNIS- WYATT',
            kind: 'searchresults#officer',
            description: 'Total number of appointments 1 - Born October 2001'
          },
          {
            snippet: 'Mary Therese WYATT ',
            description_identifiers: ['appointment-count', 'born-on'],
            appointment_count: 2,
            links: {
              self: '/officers/gTaZCUkMI9y7ar65DkQ4Adk8yAc/appointments'
            },
            address_snippet: '236 Chaldon Way, Coulsdon, England, CR5 1DH',
            address: {
              country: 'England',
              address_line_1: 'Chaldon Way',
              premises: '236',
              postal_code: 'CR5 1DH',
              locality: 'Coulsdon'
            },
            date_of_birth: { year: 1962, month: 2 },
            matches: { snippet: [14, 18] },
            kind: 'searchresults#officer',
            title: 'Mary Therese HARCOURT-ELLIS',
            description: 'Total number of appointments 2 - Born February 1962'
          },
          {
            appointment_count: 0,
            address_snippet:
              '3 Littlecote Road, Chippenham, Wiltshire, SN14 0NY',
            address: {
              postal_code: 'SN14 0NY',
              region: 'Wiltshire',
              address_line_1: 'Littlecote Road',
              premises: '3',
              locality: 'Chippenham'
            },
            links: {
              self: '/officers/HmUfaHcOBSdWpF82J4uXYKGTs2U/appointments'
            },
            description_identifiers: ['appointment-count', 'born-on'],
            snippet: '',
            title: 'Mark HAWKINS WYATT',
            kind: 'searchresults#officer',
            description: 'Total number of appointments 0 - Born December 1974',
            date_of_birth: { year: 1974, month: 12 },
            matches: { snippet: [], title: [14, 18] }
          }
        ],
        items_per_page: 20,
        kind: 'search#officers',
        page_number: 1,
        start_index: 0,
        total_results: 3380
      }
    }
    await testRequests(
      testUrls.searchOfficers.map((path) => ({ path })),
      schema
    )
  })
})
