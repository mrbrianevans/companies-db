import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('persons-with-significant-control-service', function () {
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
        }
      },
      required: ['description', 'etag', 'kind', 'links'],
      additionalProperties: false,
      title: 'getPersonsWithSignificantControlSuperSecure',
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
        etag: { type: 'string' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        notified_on: { type: 'string' },
        statement: { type: 'string' },
        ceased_on: { type: 'string' }
      },
      required: ['etag', 'kind', 'links', 'notified_on', 'statement'],
      additionalProperties: false,
      title: 'getPersonsWithSignificantControlStatement',
      example: {
        etag: '628debfa978bce7728190507ad12f08cbd247f7c',
        kind: 'persons-with-significant-control-statement',
        links: {
          self: '/company/11206460/persons-with-significant-control-statements/i42dMhzIfCQBO8XjRpRH9i76u0Y'
        },
        notified_on: '2018-02-14',
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
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              statement: { type: 'string' },
              notified_on: { type: 'string' },
              etag: { type: 'string' },
              kind: { type: 'string' },
              ceased_on: { type: 'string' }
            },
            required: ['links', 'statement', 'notified_on', 'etag', 'kind']
          }
        },
        items_per_page: { type: 'integer' },
        links: {
          type: 'object',
          properties: {
            persons_with_significant_control: { type: 'string' },
            self: { type: 'string' }
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
      title: 'listPersonsWithSignificantControlStatements',
      example: {
        active_count: 0,
        ceased_count: 1,
        items: [
          {
            links: {
              self: '/company/OC401231/persons-with-significant-control-statements/J3aA7nNxlxiLA_SN3OC_f46soBA'
            },
            statement: 'psc-details-not-confirmed',
            notified_on: '2016-08-10',
            etag: '1378b459e7084aa462031cc68d93fb6462f212ee',
            kind: 'persons-with-significant-control-statement',
            ceased_on: '2017-08-17'
          }
        ],
        items_per_page: 25,
        links: {
          persons_with_significant_control:
            '/company/OC401231/persons-with-significant-control',
          self: '/company/OC401231/persons-with-significant-control-statements'
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
            locality: { type: 'string' },
            postal_code: { type: 'string' },
            premises: { type: 'string' },
            country: { type: 'string' },
            address_line_1: { type: 'string' },
            region: { type: 'string' },
            address_line_2: { type: 'string' }
          },
          required: ['locality', 'premises']
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
          properties: { self: { type: 'string' } },
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
      title: 'getPersonWithSignificantControlLegal',
      example: {
        address: {
          locality: 'London',
          postal_code: 'NW7 3TD',
          premises: 'Athene House, Suite Q',
          country: 'United Kingdom',
          address_line_1: '86 The Broadway'
        },
        etag: '63f99bcd12bc08cb1600bbda3ea24f07b56c7430',
        identification: {
          legal_authority: 'England & Wales',
          legal_form: 'Limited'
        },
        kind: 'legal-person-person-with-significant-control',
        links: {
          self: '/company/14057310/persons-with-significant-control/legal-person/2kNo5j4tFSkn4WfnKaO5VZXphXw'
        },
        name: 'Qa Directors Limited',
        natures_of_control: [
          'ownership-of-shares-75-to-100-percent',
          'voting-rights-75-to-100-percent',
          'right-to-appoint-and-remove-directors'
        ],
        notified_on: '2022-04-20'
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
            locality: { type: 'string' },
            premises: { type: 'string' },
            country: { type: 'string' },
            postal_code: { type: 'string' },
            address_line_1: { type: 'string' },
            address_line_2: { type: 'string' },
            region: { type: 'string' },
            po_box: { type: 'string' }
          },
          required: ['locality', 'premises']
        },
        etag: { type: 'string' },
        identification: {
          type: 'object',
          properties: {
            legal_form: { type: 'string' },
            legal_authority: { type: 'string' },
            place_registered: { type: 'string' },
            country_registered: { type: 'string' },
            registration_number: { type: 'string' }
          },
          required: ['legal_form', 'legal_authority']
        },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
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
      title: 'getPersonWithSignificantControlCorporate',
      example: {
        address: {
          locality: 'London',
          premises: '2',
          country: 'United Kingdom',
          postal_code: 'EC3R 7PD',
          address_line_1: 'Minster Court',
          address_line_2: 'Mincing Lane'
        },
        etag: '5f4f9cc06849e26ca46628f85f3db8a5db6af386',
        identification: {
          legal_form: 'Private Limited Company',
          legal_authority: 'Companies Act 2006'
        },
        kind: 'corporate-entity-person-with-significant-control',
        links: {
          self: '/company/10735116/persons-with-significant-control/corporate-entity/mnfMD38W4O5vKK9tjos-uyd5bXc'
        },
        name: 'Ardonagh Midco 2 Plc',
        natures_of_control: [
          'ownership-of-shares-75-to-100-percent',
          'voting-rights-75-to-100-percent',
          'right-to-appoint-and-remove-directors'
        ],
        notified_on: '2017-04-21'
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
            country: { type: 'string' },
            premises: { type: 'string' },
            region: { type: 'string' },
            locality: { type: 'string' },
            postal_code: { type: 'string' },
            address_line_1: { type: 'string' },
            address_line_2: { type: 'string' },
            care_of: { type: 'string' },
            po_box: { type: 'string' }
          }
        },
        country_of_residence: { type: 'string' },
        date_of_birth: {
          type: 'object',
          properties: { month: { type: 'integer' }, year: { type: 'integer' } },
          required: ['month', 'year']
        },
        etag: { type: 'string' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        name: { type: 'string' },
        name_elements: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            middle_name: { type: 'string' },
            surname: { type: 'string' },
            forename: { type: 'string' }
          },
          required: ['surname', 'forename']
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
      title: 'getPersonWithSignificantControlIndividual',
      example: {
        address: {
          country: 'United Kingdom',
          premises: '42 Glebe Street',
          region: 'Leicestershire',
          locality: 'Loughborough',
          postal_code: 'LE11 1JR'
        },
        country_of_residence: 'United Kingdom',
        date_of_birth: { month: 3, year: 1967 },
        etag: '814acb77d25049624b14c0fa88af7d09fcbf7e39',
        kind: 'individual-person-with-significant-control',
        links: {
          self: '/company/11370252/persons-with-significant-control/individual/tw_J6Owb0RS9lglUle6hoxVwAqI'
        },
        name: 'Mr Richard Anthony Smith',
        name_elements: {
          title: 'Mr',
          middle_name: 'Anthony',
          surname: 'Smith',
          forename: 'Richard'
        },
        nationality: 'British',
        natures_of_control: ['ownership-of-shares-75-to-100-percent'],
        notified_on: '2018-05-18'
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
              country_of_residence: { type: 'string' },
              etag: { type: 'string' },
              date_of_birth: {
                type: 'object',
                properties: {
                  year: { type: 'integer' },
                  month: { type: 'integer' }
                },
                required: ['year', 'month']
              },
              notified_on: { type: 'string' },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              natures_of_control: { type: 'array', items: { type: 'string' } },
              nationality: { type: 'string' },
              name_elements: {
                type: 'object',
                properties: {
                  forename: { type: 'string' },
                  title: { type: 'string' },
                  surname: { type: 'string' },
                  middle_name: { type: 'string' }
                },
                required: ['surname']
              },
              name: { type: 'string' },
              address: {
                type: 'object',
                properties: {
                  locality: { type: 'string' },
                  premises: { type: 'string' },
                  country: { type: 'string' },
                  region: { type: 'string' },
                  address_line_1: { type: 'string' },
                  postal_code: { type: 'string' },
                  address_line_2: { type: 'string' },
                  care_of: { type: 'string' },
                  po_box: { type: 'string' }
                }
              },
              kind: { type: 'string' },
              ceased_on: { type: 'string' },
              identification: {
                type: 'object',
                properties: {
                  legal_authority: { type: 'string' },
                  country_registered: { type: 'string' },
                  legal_form: { type: 'string' },
                  registration_number: { type: 'string' },
                  place_registered: { type: 'string' }
                },
                required: ['legal_authority', 'legal_form']
              },
              description: { type: 'string' }
            },
            required: ['etag', 'links', 'kind']
          }
        },
        items_per_page: { type: 'integer' },
        links: {
          type: 'object',
          properties: {
            self: { type: 'string' },
            persons_with_significant_control_statements: { type: 'string' },
            exemptions: { type: 'string' }
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
            country_of_residence: 'England',
            etag: '09dda16a85bbd90be915ea4d1bc0938c141d5006',
            date_of_birth: { year: 1958, month: 12 },
            notified_on: '2020-10-26',
            links: {
              self: '/company/04277636/persons-with-significant-control/individual/OXRcen646dCFlhc7SCl3D2KAxZ0'
            },
            natures_of_control: ['ownership-of-shares-75-to-100-percent'],
            nationality: 'British',
            name_elements: {
              forename: 'Asmita',
              title: 'Mrs',
              surname: 'Saujani',
              middle_name: 'Nitinchandra'
            },
            name: 'Mrs Asmita Nitinchandra Saujani',
            address: {
              locality: 'Rickmansworth',
              premises: '50 Grovewood Close',
              country: 'England',
              region: 'Hertfordshire',
              address_line_1: 'Chorleywood',
              postal_code: 'WD3 5PX'
            },
            kind: 'individual-person-with-significant-control'
          },
          {
            ceased_on: '2020-10-26',
            etag: 'a3f86f7fde9af31b046343300aeb6ea470dd1a29',
            country_of_residence: 'United Arab Emirates',
            notified_on: '2016-08-01',
            date_of_birth: { year: 1966, month: 7 },
            name: 'Mrs Falguni Sanjiv Patel',
            name_elements: {
              title: 'Mrs',
              forename: 'Falguni',
              middle_name: 'Sanjiv',
              surname: 'Patel'
            },
            nationality: 'British',
            links: {
              self: '/company/04277636/persons-with-significant-control/individual/VqdFpT8mO1_olhlkbz49WQ8FI84'
            },
            natures_of_control: ['ownership-of-shares-25-to-50-percent'],
            kind: 'individual-person-with-significant-control',
            address: {
              locality: 'Middlesex',
              address_line_2: 'Northwood',
              address_line_1: '41 The Broadway, Joel Street',
              postal_code: 'HA6 1NZ'
            }
          }
        ],
        items_per_page: 25,
        links: { self: '/company/04277636/persons-with-significant-control' },
        start_index: 0,
        total_results: 2
      }
    }
    await testRequests(
      testUrls.listPersonsWithSignificantControl.map((path) => ({ path })),
      schema
    )
  })
})
