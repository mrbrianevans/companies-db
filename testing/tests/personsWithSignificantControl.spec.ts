import * as TestRequests from '../getTestRequests'
import { testRequests } from '../testRequests'
fetch('http://localhost:3000').catch() //to remove warning about fetch being experimental from test results

describe('persons-with-significant-control-service', function () {
  // tests for each path
  it('getSuperSecurePerson: /company/{company_number}/persons-with-significant-control/super-secure/{super_secure_id}', async function () {
    const schema = {
      title: 'superSecure',
      required: [],
      properties: {
        etag: { description: 'The ETag of the resource.', type: 'string' },
        kind: {
          enum: ['super-secure-person-with-significant-control'],
          type: 'string'
        },
        description: {
          description: 'Description of the super secure legal statement \n',
          enum: ['super-secure-persons-with-significant-control'],
          type: 'string'
        },
        ceased: {
          description:
            'Presence of that indicator means the super secure person status is ceased \n',
          type: 'boolean'
        },
        links: {
          description: 'A set of URLs related to the resource, including self.',
          type: 'object',
          title: 'superSecureLinksType',
          required: [],
          properties: {
            self: { description: 'The URL of the resource.', type: 'string' }
          }
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.getSuperSecurePersonReqs, schema)
  })

  it('getStatement: /company/{company_number}/persons-with-significant-control-statements/{statement_id}', async function () {
    const schema = {
      title: 'statement',
      required: [],
      properties: {
        etag: { description: 'The ETag of the resource.', type: 'string' },
        kind: {
          enum: ['persons-with-significant-control-statement'],
          type: 'string'
        },
        notified_on: {
          description:
            'The date that the person with significant control statement was processed by Companies House.',
          type: 'string',
          format: 'date'
        },
        ceased_on: {
          description:
            'The date that Companies House was notified about the cessation of this person with significant control.',
          type: 'string',
          format: 'date'
        },
        restrictions_notice_withdrawal_reason: {
          description:
            'The reason for the company withdrawing a <code>restrictions-notice-issued-to-psc</code> statement',
          enum: [
            'restrictions-notice-withdrawn-by-court-order',
            'restrictions-notice-withdrawn-by-company'
          ],
          type: 'string'
        },
        statement: {
          description:
            'Indicates the type of statement filed.\n For enumeration descriptions see `statement_description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n',
          enum: [
            'no-individual-or-entity-with-signficant-control',
            'steps-to-find-psc-not-yet-completed',
            'psc-exists-but-not-identified',
            'psc-details-not-confirmed',
            'psc-contacted-but-no-response',
            'restrictions-notice-issued-to-psc',
            'psc-has-failed-to-confirm-changed-details'
          ],
          type: 'string'
        },
        linked_psc_name: {
          description: 'The name of the psc linked to this statement.',
          type: 'string'
        },
        links: {
          description: 'A set of URLs related to the resource, including self.',
          type: 'object',
          title: 'statementLinksType',
          required: [],
          properties: {
            self: { description: 'The URL of the resource.', type: 'string' },
            person_with_significant_control: {
              description:
                'The URL of the person with significant control linked to this statement.',
              type: 'string'
            }
          }
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.getStatementReqs, schema)
  })

  it('listStatements: /company/{company_number}/persons-with-significant-control-statements', async function () {
    const schema = {
      title: 'statementList',
      properties: {
        items_per_page: {
          description:
            'The number of persons with significant control statements to return per page.',
          type: 'integer'
        },
        items: {
          description:
            'The list of persons with significant control statements.',
          items: {
            title: 'statement',
            required: [],
            properties: {
              etag: {
                description: 'The ETag of the resource.',
                type: 'string'
              },
              kind: {
                enum: ['persons-with-significant-control-statement'],
                type: 'string'
              },
              notified_on: {
                description:
                  'The date that the person with significant control statement was processed by Companies House.',
                type: 'string',
                format: 'date'
              },
              ceased_on: {
                description:
                  'The date that Companies House was notified about the cessation of this person with significant control.',
                type: 'string',
                format: 'date'
              },
              restrictions_notice_withdrawal_reason: {
                description:
                  'The reason for the company withdrawing a <code>restrictions-notice-issued-to-psc</code> statement',
                enum: [
                  'restrictions-notice-withdrawn-by-court-order',
                  'restrictions-notice-withdrawn-by-company'
                ],
                type: 'string'
              },
              statement: {
                description:
                  'Indicates the type of statement filed.\n For enumeration descriptions see `statement_description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n',
                enum: [
                  'no-individual-or-entity-with-signficant-control',
                  'steps-to-find-psc-not-yet-completed',
                  'psc-exists-but-not-identified',
                  'psc-details-not-confirmed',
                  'psc-contacted-but-no-response',
                  'restrictions-notice-issued-to-psc',
                  'psc-has-failed-to-confirm-changed-details'
                ],
                type: 'string'
              },
              linked_psc_name: {
                description: 'The name of the psc linked to this statement.',
                type: 'string'
              },
              links: {
                description:
                  'A set of URLs related to the resource, including self.',
                type: 'object',
                title: 'statementLinksType',
                required: [],
                properties: {
                  self: {
                    description: 'The URL of the resource.',
                    type: 'string'
                  },
                  person_with_significant_control: {
                    description:
                      'The URL of the person with significant control linked to this statement.',
                    type: 'string'
                  }
                }
              }
            },
            type: 'object'
          },
          type: 'array'
        },
        start_index: {
          description:
            'The offset into the entire result set that this page starts.',
          type: 'integer'
        },
        total_results: {
          description:
            'The total number of persons with significant control statements in this result set.',
          type: 'integer'
        },
        active_count: {
          description:
            'The number of active persons with significant control statements in this result set.',
          type: 'integer'
        },
        ceased_count: {
          description:
            'The number of ceased persons with significant control statements in this result set.',
          type: 'integer'
        },
        links: {
          description: 'A set of URLs related to the resource, including self.',
          type: 'object',
          title: 'statementListLinksType',
          required: [],
          properties: {
            self: { description: 'The URL of the resource.', type: 'string' },
            persons_with_significant_control_statements_list: {
              description:
                'The URL of the persons with significant control statements list resource.',
              type: 'string'
            }
          }
        }
      },
      required: [],
      type: 'object'
    }
    await testRequests(TestRequests.listStatementsReqs, schema)
  })

  it('getLegalPersons: /company/{company_number}/persons-with-significant-control/legal-person/{psc_id}', async function () {
    const schema = {
      title: 'legalPerson',
      required: [],
      properties: {
        etag: { description: 'The ETag of the resource.', type: 'string' },
        notified_on: {
          description:
            'The date that Companies House was notified about this person with significant control.',
          type: 'string',
          format: 'date'
        },
        ceased_on: {
          description:
            'The date that Companies House was notified about the cessation of this person with significant control.',
          type: 'string',
          format: 'date'
        },
        kind: {
          enum: ['legal-person-person-with-significant-control'],
          type: 'string'
        },
        name: {
          description: 'Name of the person with significant control.',
          type: 'string'
        },
        links: {
          description: 'A set of URLs related to the resource, including self.',
          type: 'object',
          title: 'pscLinksType',
          required: [],
          properties: {
            self: { description: 'The URL of the resource.', type: 'string' },
            statement: {
              description:
                'The URL of the statement linked to this person with significant control.',
              type: 'string'
            }
          }
        },
        address: {
          description: 'The address of the person with significant control.',
          type: 'object',
          title: 'pscAddress',
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
            care_of: { description: 'Care of name.', type: 'string' },
            country: {
              description: 'The country. For example, UK.',
              type: 'string'
            },
            locality: {
              description: 'The locality. For example London.',
              type: 'string'
            },
            po_box: {
              description: 'The post-officer box number.',
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
        },
        identification: {
          description: '',
          type: 'object',
          title: 'legalPersonIdent',
          properties: {
            legal_authority: {
              description:
                'The legal authority supervising the legal person with significant control.',
              type: 'string'
            },
            legal_form: {
              description:
                'The legal form of the legal person with significant control as defined by its country of registration.',
              type: 'string'
            }
          },
          required: []
        },
        natures_of_control: {
          description:
            'Indicates the nature of control the person with significant control holds.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n',
          type: 'array'
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.getLegalPersonsReqs, schema)
  })

  it('getCorporateEntities: /company/{company_number}/persons-with-significant-control/corporate-entity/{psc_id}', async function () {
    const schema = {
      title: 'corporateEntity',
      required: [],
      properties: {
        etag: { description: 'The ETag of the resource.', type: 'string' },
        notified_on: {
          description:
            'The date that Companies House was notified about this person with significant control.',
          type: 'string',
          format: 'date'
        },
        ceased_on: {
          description:
            'The date that Companies House was notified about the cessation of this person with significant control.',
          type: 'string',
          format: 'date'
        },
        kind: {
          enum: ['corporate-entity-person-with-significant-control'],
          type: 'string'
        },
        name: {
          description: 'Name of the person with significant control.',
          type: 'string'
        },
        links: {
          description: 'A set of URLs related to the resource, including self.',
          type: 'object',
          title: 'pscLinksType',
          required: [],
          properties: {
            self: { description: 'The URL of the resource.', type: 'string' },
            statement: {
              description:
                'The URL of the statement linked to this person with significant control.',
              type: 'string'
            }
          }
        },
        address: {
          description: 'The address of the person with significant control.',
          type: 'object',
          title: 'pscAddress',
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
            care_of: { description: 'Care of name.', type: 'string' },
            country: {
              description: 'The country. For example, UK.',
              type: 'string'
            },
            locality: {
              description: 'The locality. For example London.',
              type: 'string'
            },
            po_box: {
              description: 'The post-officer box number.',
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
        },
        identification: {
          description: '',
          type: 'object',
          title: 'corporateEntityIdent',
          properties: {
            legal_authority: {
              description:
                'The legal authority supervising the corporate entity with significant control.',
              type: 'string'
            },
            legal_form: {
              description:
                'The legal form of the corporate entity with significant control as defined by its country of registration.',
              type: 'string'
            },
            place_registered: {
              description:
                'The place the corporate entity with significant control is registered.',
              type: 'string'
            },
            registration_number: {
              description:
                'The registration number of the corporate entity with significant control.',
              type: 'string'
            },
            country_registered: {
              description:
                'The country or state the corporate entity with significant control is registered in.',
              type: 'string'
            }
          },
          required: []
        },
        natures_of_control: {
          description:
            'Indicates the nature of control the person with significant control holds.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n',
          type: 'array'
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.getCorporateEntitiesReqs, schema)
  })

  it('getIndividual: /company/{company_number}/persons-with-significant-control/individual/{psc_id}', async function () {
    const schema = {
      title: 'individual',
      required: [],
      properties: {
        etag: { description: 'The ETag of the resource.', type: 'string' },
        notified_on: {
          description:
            'The date that Companies House was notified about this person with significant control.',
          type: 'string',
          format: 'date'
        },
        ceased_on: {
          description:
            'The date that Companies House was notified about the cessation of this person with significant control.',
          type: 'string',
          format: 'date'
        },
        kind: {
          enum: ['individual-person-with-significant-control'],
          type: 'string'
        },
        country_of_residence: {
          description:
            'The country of residence of the person with significant control.',
          type: 'string'
        },
        date_of_birth: {
          description:
            'The date of birth of the person with significant control.',
          type: 'object',
          title: 'dateOfBirth',
          properties: {
            day: {
              description: 'The day of the date of birth.',
              type: 'integer'
            },
            month: {
              description: 'The month of date of birth.',
              type: 'integer'
            },
            year: { description: 'The year of date of birth.', type: 'integer' }
          },
          required: []
        },
        name: {
          description: 'Name of the person with significant control.',
          type: 'string'
        },
        name_elements: {
          description:
            "A document encapsulating the seperate elements of a person with significant control's name.",
          type: 'object',
          title: 'nameElements',
          properties: {
            forename: {
              description:
                'The forename of the person with significant control.',
              type: 'string'
            },
            title: {
              description: 'Title of the person with significant control.',
              type: 'string'
            },
            other_forenames: {
              description:
                'Other forenames of the person with significant control.',
              type: 'string'
            },
            surname: {
              description:
                'The surname of the person with significant control.',
              type: 'string'
            }
          },
          required: []
        },
        links: {
          description: 'A set of URLs related to the resource, including self.',
          type: 'object',
          title: 'pscLinksType',
          required: [],
          properties: {
            self: { description: 'The URL of the resource.', type: 'string' },
            statement: {
              description:
                'The URL of the statement linked to this person with significant control.',
              type: 'string'
            }
          }
        },
        nationality: {
          description:
            'The nationality of the person with significant control.',
          type: 'string'
        },
        address: {
          description:
            'The service address of the person with significant control. If given, this address will be shown on the public record instead of the residential address.',
          type: 'object',
          title: 'pscAddress',
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
            care_of: { description: 'Care of name.', type: 'string' },
            country: {
              description: 'The country. For example, UK.',
              type: 'string'
            },
            locality: {
              description: 'The locality. For example London.',
              type: 'string'
            },
            po_box: {
              description: 'The post-officer box number.',
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
        },
        natures_of_control: {
          description:
            'Indicates the nature of control the person with significant control holds.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n',
          type: 'array'
        }
      },
      type: 'object'
    }
    await testRequests(TestRequests.getIndividualReqs, schema)
  })

  it('listPersonsWithSignificantControl: /company/{company_number}/persons-with-significant-control', async function () {
    const schema = {
      title: 'list',
      properties: {
        items_per_page: {
          description:
            'The number of persons with significant control to return per page.',
          type: 'integer'
        },
        items: {
          description: 'The list of persons with significant control.',
          items: {
            title: 'listSummary',
            required: [],
            properties: {
              etag: {
                description: 'The ETag of the resource.',
                type: 'string'
              },
              notified_on: {
                description:
                  'The date that Companies House was notified about this person with significant control.',
                type: 'string',
                format: 'date'
              },
              ceased_on: {
                description:
                  'The date that Companies House was notified about the cessation of this person with significant control.',
                type: 'string',
                format: 'date'
              },
              country_of_residence: {
                description:
                  'The country of residence of the person with significant control.',
                type: 'string'
              },
              date_of_birth: {
                description:
                  'The date of birth of the person with significant control.',
                type: 'object',
                title: 'dateOfBirth',
                properties: {
                  day: {
                    description: 'The day of the date of birth.',
                    type: 'integer'
                  },
                  month: {
                    description: 'The month of date of birth.',
                    type: 'integer'
                  },
                  year: {
                    description: 'The year of date of birth.',
                    type: 'integer'
                  }
                },
                required: []
              },
              name: {
                description: 'Name of the person with significant control.',
                type: 'string'
              },
              name_elements: {
                description:
                  "A document encapsulating the separate elements of a person with significant control's name.",
                type: 'object',
                title: 'nameElements',
                properties: {
                  forename: {
                    description:
                      'The forename of the person with significant control.',
                    type: 'string'
                  },
                  title: {
                    description:
                      'Title of the person with significant control.',
                    type: 'string'
                  },
                  other_forenames: {
                    description:
                      'Other forenames of the person with significant control.',
                    type: 'string'
                  },
                  surname: {
                    description:
                      'The surname of the person with significant control.',
                    type: 'string'
                  }
                },
                required: []
              },
              links: {
                description:
                  'A set of URLs related to the resource, including self.',
                type: 'object',
                title: 'pscLinksType',
                required: [],
                properties: {
                  self: {
                    description: 'The URL of the resource.',
                    type: 'string'
                  },
                  statement: {
                    description:
                      'The URL of the statement linked to this person with significant control.',
                    type: 'string'
                  }
                }
              },
              nationality: {
                description:
                  'The nationality of the person with significant control.',
                type: 'string'
              },
              identification: {
                description: '',
                type: 'object',
                title: 'pscListIdent',
                properties: {
                  legal_authority: {
                    description:
                      'The legal authority supervising the corporate entity or legal person with significant control.',
                    type: 'string'
                  },
                  legal_form: {
                    description:
                      'The legal form of the corporate entity or legal person with significant control as defined by its country of registration.',
                    type: 'string'
                  },
                  place_registered: {
                    description:
                      'The place the corporate entity with significant control is registered.',
                    type: 'string'
                  },
                  registration_number: {
                    description:
                      'The registration number of the corporate entity with significant control.',
                    type: 'string'
                  },
                  country_registered: {
                    description:
                      'The country or state the corporate entity with significant control is registered in.',
                    type: 'string'
                  }
                },
                required: []
              },
              ceased: {
                description:
                  'Presence of that indicator means the super secure person status is ceased <br />',
                type: 'boolean'
              },
              description: {
                description:
                  'Description of the super secure legal statement <br />',
                enum: ['super-secure-persons-with-significant-control'],
                type: 'string'
              },
              kind: {
                enum: [
                  'individual-person-with-significant-control',
                  'corporate-entity-person-with-significant-control',
                  'legal-person-with-significant-control',
                  'super-secure-person-with-significant-control'
                ],
                type: 'string'
              },
              address: {
                description:
                  'The service address of the person with significant control. If given, this address will be shown on the public record instead of the residential address.',
                type: 'object',
                title: 'pscAddress',
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
                  care_of: { description: 'Care of name.', type: 'string' },
                  country: {
                    description: 'The country. For example, UK.',
                    type: 'string'
                  },
                  locality: {
                    description: 'The locality. For example London.',
                    type: 'string'
                  },
                  po_box: {
                    description: 'The post-officer box number.',
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
              },
              natures_of_control: {
                description:
                  'Indicates the nature of control the person with significant control holds.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/psc_descriptions.yml) file. \n',
                type: 'array'
              }
            },
            type: 'object'
          },
          type: 'array'
        },
        start_index: {
          description:
            'The offset into the entire result set that this page starts.',
          type: 'integer'
        },
        total_results: {
          description:
            'The total number of persons with significant control in this result set.',
          type: 'integer'
        },
        active_count: {
          description:
            'The number of active persons with significant control in this result set.',
          type: 'integer'
        },
        ceased_count: {
          description:
            'The number of ceased persons with significant control in this result set.',
          type: 'integer'
        },
        links: {
          description: 'A set of URLs related to the resource, including self.',
          type: 'object',
          title: 'pscListLinksType',
          required: [],
          properties: {
            self: { description: 'The URL of the resource.', type: 'string' },
            persons_with_significant_control_list: {
              description:
                'The URL of the persons with significant control list resource.',
              type: 'string'
            }
          }
        }
      },
      required: [],
      type: 'object'
    }
    await testRequests(
      TestRequests.listPersonsWithSignificantControlReqs,
      schema
    )
  })
})
