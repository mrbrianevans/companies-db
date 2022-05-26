import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('search-service', function () {
  // tests for each path
  it('advancedCompanySearch: /advanced-search/companies', async function () {
    const schema = { title: 'A list of companies', type: 'object' }
    await testRequests(
      testUrls.advancedCompanySearch.map((path) => ({ path })),
      schema
    )
  })

  it('searchCompaniesAlphabetically: /alphabetic-search/companies', async function () {
    const schema = { title: 'List of companies', type: 'object' }
    await testRequests(
      testUrls.searchCompaniesAlphabetically.map((path) => ({ path })),
      schema
    )
  })

  it('searchDissolvedCompanies: /dissolved-search/companies', async function () {
    const schema = {
      type: 'object',
      properties: {
        etag: { type: 'string' },
        hits: { type: 'integer' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              company_name: { type: 'string' },
              company_number: { type: 'string' },
              company_status: { type: 'string' },
              ordered_alpha_key_with_id: { type: 'string' },
              kind: { type: 'string' },
              date_of_cessation: { type: 'string' },
              date_of_creation: { type: 'string' },
              previous_company_names: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    ceased_on: { type: 'string' },
                    effective_from: { type: 'string' },
                    name: { type: 'string' },
                    company_number: { type: 'string' }
                  },
                  required: [
                    'ceased_on',
                    'effective_from',
                    'name',
                    'company_number'
                  ]
                }
              },
              registered_office_address: {
                type: 'object',
                properties: {
                  address_line_1: { type: 'string' },
                  address_line_2: { type: 'string' },
                  locality: { type: 'string' },
                  postal_code: { type: 'string' }
                },
                required: ['address_line_1']
              }
            },
            required: [
              'company_name',
              'company_number',
              'company_status',
              'ordered_alpha_key_with_id',
              'kind',
              'date_of_cessation',
              'date_of_creation'
            ]
          }
        },
        kind: { type: 'string' },
        top_hit: {
          type: 'object',
          properties: {
            company_name: { type: 'string' },
            company_number: { type: 'string' },
            company_status: { type: 'string' },
            ordered_alpha_key_with_id: { type: 'string' },
            kind: { type: 'string' },
            date_of_cessation: { type: 'string' },
            date_of_creation: { type: 'string' },
            previous_company_names: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  ceased_on: { type: 'string' },
                  effective_from: { type: 'string' },
                  name: { type: 'string' },
                  company_number: { type: 'string' }
                },
                required: [
                  'ceased_on',
                  'effective_from',
                  'name',
                  'company_number'
                ]
              }
            },
            registered_office_address: {
              type: 'object',
              properties: {
                address_line_1: { type: 'string' },
                address_line_2: { type: 'string' },
                locality: { type: 'string' },
                postal_code: { type: 'string' }
              },
              required: ['address_line_1', 'address_line_2', 'postal_code']
            }
          },
          required: [
            'company_name',
            'company_number',
            'company_status',
            'ordered_alpha_key_with_id',
            'kind',
            'date_of_cessation',
            'date_of_creation'
          ]
        }
      },
      required: ['etag', 'hits', 'items', 'kind', 'top_hit'],
      additionalProperties: false,
      title: 'searchDissolved',
      example: {
        etag: '78835bd666832e4114a1b454ad1d2bc9fd1100c4',
        hits: 3978,
        items: [
          {
            company_name: 'CADMIUM COURT LIMITED',
            company_number: '02032259',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'CADMIUMCOURT:02032259',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1993-10-12',
            date_of_creation: '1986-06-27',
            previous_company_names: [
              {
                ceased_on: '1988-06-27',
                effective_from: '1986-06-27',
                name: 'LAWCOURT LIMITED',
                company_number: '02032259'
              }
            ]
          },
          {
            company_name: 'FANS COURT LIMITED',
            company_number: '06268400',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'FANSCOURT:06268400',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2009-04-07',
            date_of_creation: '2007-06-04',
            registered_office_address: {
              address_line_1: '3 Queens Gardens',
              address_line_2: 'Dartford',
              locality: 'Kent',
              postal_code: 'DA2 6HZ'
            }
          },
          {
            company_name: 'HIGHFIELD COURT LIMITED',
            company_number: '02639105',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'HIGHFIELDCOURT:02639105',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1993-05-25',
            date_of_creation: '1991-08-19'
          },
          {
            company_name: 'STERLING COURT LIMITED',
            company_number: '03312049',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'STERLINGCOURT:03312049',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2005-11-15',
            date_of_creation: '1997-02-03',
            registered_office_address: {
              address_line_1: 'Sterling House',
              address_line_2: '2-6 Market Place',
              locality: 'Atherton',
              postal_code: 'M46 0EG'
            },
            previous_company_names: [
              {
                ceased_on: '2000-12-22',
                effective_from: '1997-02-03',
                name: 'GRANGE GREEN MANOR DEVELOPMENTS LIMITED',
                company_number: '03312049'
              }
            ]
          },
          {
            company_name: 'OAKFIELD COURT LIMITED',
            company_number: '02370283',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'OAKFIELDCOURT:02370283',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2001-03-27',
            date_of_creation: '1989-04-10'
          },
          {
            company_name: 'WOODSTOCK COURT LIMITED',
            company_number: '06238747',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'WOODSTOCKCOURT:06238747',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2008-02-05',
            date_of_creation: '2007-05-08',
            registered_office_address: {
              address_line_1: '788-790 Finchley Road',
              address_line_2: 'Temple Fortune',
              locality: 'London',
              postal_code: 'NW11 7TJ'
            },
            previous_company_names: [
              {
                ceased_on: '2007-05-23',
                effective_from: '2007-05-08',
                name: 'WOODSTOCK COURT (TOTON) MANAGEMENT COMPANY LIMITED',
                company_number: '06238747'
              }
            ]
          },
          {
            company_name: 'GARDEN COURT LIMITED',
            company_number: '02189069',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'GARDENCOURT:02189069',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1990-10-23',
            date_of_creation: '1987-11-05'
          },
          {
            company_name: 'GREEMOUNT COURT LIMITED',
            company_number: '00292032',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'GREEMOUNTCOURT:00292032',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2007-06-26',
            date_of_creation: '1934-09-13',
            registered_office_address: {
              address_line_1: '2 Heap Bridge',
              address_line_2: 'Bury',
              locality: 'Lancashire',
              postal_code: 'BL9 7HR'
            },
            previous_company_names: [
              {
                ceased_on: '2001-07-17',
                effective_from: '1992-05-18',
                name: 'DETAILVALUE LIMITED',
                company_number: '00292032'
              },
              {
                ceased_on: '1992-05-18',
                effective_from: '1987-05-08',
                name: 'BYSON PLASTICS LIMITED',
                company_number: '00292032'
              },
              {
                ceased_on: '1987-05-08',
                effective_from: '1934-09-13',
                name: 'BYSON APPLIANCE CO.LIMITED',
                company_number: '00292032'
              }
            ]
          },
          {
            company_name: 'HIGHNAM COURT LIMITED',
            company_number: '01959999',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'HIGHNAMCOURT:01959999',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1995-05-02',
            date_of_creation: '1985-11-15',
            previous_company_names: [
              {
                ceased_on: '1986-09-18',
                effective_from: '1985-11-15',
                name: 'SWIFT 790 LIMITED',
                company_number: '01959999'
              }
            ]
          },
          {
            company_name: 'HOLLIN COURT LIMITED',
            company_number: '02815658',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'HOLLINCOURT:02815658',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2000-01-18',
            date_of_creation: '1993-05-06'
          },
          {
            company_name: 'COURT LION LIMITED',
            company_number: '03143234',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'COURTLION:03143234',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1999-09-07',
            date_of_creation: '1996-01-03',
            previous_company_names: [
              {
                ceased_on: '1996-07-03',
                effective_from: '1996-01-03',
                name: 'HOLAW (355) LIMITED',
                company_number: '03143234'
              }
            ]
          },
          {
            company_name: 'ELDON COURT PLC',
            company_number: 'SC127518',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'ELDONCOURT:SC127518',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1994-05-20',
            date_of_creation: '1990-09-25'
          },
          {
            company_name: 'VICTORIA COURT LIMITED',
            company_number: '00721507',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'VICTORIACOURT:00721507',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1994-07-05',
            date_of_creation: '1962-04-13'
          },
          {
            company_name: 'HEADWAY COURT LIMITED',
            company_number: '02471912',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'HEADWAYCOURT:02471912',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1995-08-01',
            date_of_creation: '1990-02-20'
          },
          {
            company_name: "FRIDAY'S COURT LIMITED",
            company_number: '01946707',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'FRIDAYSCOURT:01946707',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2005-04-05',
            date_of_creation: '1985-09-12',
            registered_office_address: {
              address_line_1: '3 Durrant Road',
              address_line_2: 'Bournemouth',
              locality: 'Dorset',
              postal_code: 'BH2 6NE'
            }
          },
          {
            company_name: 'BARRACK COURT LIMITED',
            company_number: '02268063',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'BARRACKCOURT:02268063',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1991-02-12',
            date_of_creation: '1988-06-16'
          },
          {
            company_name: 'COURT PERSONNEL LIMITED',
            company_number: '01807372',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'COURTPERSONNEL:01807372',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1990-11-27',
            date_of_creation: '1984-04-10'
          },
          {
            company_name: 'COURT EXPERIENCE LIMITED',
            company_number: '03498419',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'COURTEXPERIENCE:03498419',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1999-07-06',
            date_of_creation: '1998-01-23'
          },
          {
            company_name: 'COURT CONSULTANTS LIMITED',
            company_number: '04437406',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'COURTCONSULTANTS:04437406',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2009-06-30',
            date_of_creation: '2002-05-13',
            registered_office_address: {
              address_line_1: 'Eastgate House',
              address_line_2: '11 Cheyne Walk',
              locality: 'Northampton',
              postal_code: 'NN1 5PT'
            }
          },
          {
            company_name: 'CHARNWOOD COURT LIMITED',
            company_number: '02818345',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'CHARNWOODCOURT:02818345',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2009-10-13',
            date_of_creation: '1993-05-17',
            registered_office_address: {
              address_line_1: 'Flat 6, Charnwood Court',
              address_line_2: 'Leighton Street',
              locality: 'South Shields',
              postal_code: 'NE33 3BF'
            }
          }
        ],
        kind: 'search#dissolved',
        top_hit: {
          company_name: 'CADMIUM COURT LIMITED',
          company_number: '02032259',
          company_status: 'dissolved',
          ordered_alpha_key_with_id: 'CADMIUMCOURT:02032259',
          kind: 'searchresults#dissolved-company',
          date_of_cessation: '1993-10-12',
          date_of_creation: '1986-06-27',
          previous_company_names: [
            {
              ceased_on: '1988-06-27',
              effective_from: '1986-06-27',
              name: 'LAWCOURT LIMITED',
              company_number: '02032259'
            }
          ]
        }
      }
    }
    await testRequests(
      testUrls.searchDissolvedCompanies.map((path) => ({ path })),
      schema
    )
  })

  it('searchDisqualifiedOfficers: /search/disqualified-officers', async function () {
    const schema = {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              description_identifiers: {
                type: 'array',
                items: { type: 'string' }
              },
              description: { type: 'string' },
              snippet: { type: 'string' },
              address_snippet: { type: 'string' },
              date_of_birth: { type: 'string' },
              title: { type: 'string' },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              address: {
                type: 'object',
                properties: {
                  country: { type: 'string' },
                  premises: { type: 'string' },
                  locality: { type: 'string' },
                  postal_code: { type: 'string' },
                  address_line_1: { type: 'string' },
                  address_line_2: { type: 'string' },
                  region: { type: 'string' }
                },
                required: ['locality']
              },
              matches: {
                type: 'object',
                properties: {
                  snippet: { type: 'array' },
                  title: { type: 'array', items: { type: 'integer' } }
                },
                required: ['snippet', 'title']
              },
              kind: { type: 'string' }
            },
            required: [
              'description',
              'address_snippet',
              'title',
              'links',
              'address',
              'kind'
            ]
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        page_number: { type: 'integer' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'items',
        'items_per_page',
        'kind',
        'page_number',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'searchDisqualifiedOfficers',
      example: {
        items: [],
        items_per_page: 20,
        kind: 'search#disqualified-officers',
        page_number: 1,
        start_index: 0,
        total_results: 0
      }
    }
    await testRequests(
      testUrls.searchDisqualifiedOfficers.map((path) => ({ path })),
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
              address: {
                type: 'object',
                properties: {
                  locality: { type: 'string' },
                  country: { type: 'string' },
                  premises: { type: 'string' },
                  address_line_1: { type: 'string' },
                  postal_code: { type: 'string' },
                  address_line_2: { type: 'string' },
                  region: { type: 'string' },
                  care_of: { type: 'string' },
                  po_box: { type: 'string' }
                }
              },
              description_identifiers: {
                type: 'array',
                items: { type: 'string' }
              },
              kind: { type: 'string' },
              address_snippet: { type: 'string' },
              title: { type: 'string' },
              snippet: { type: 'string' },
              appointment_count: { type: 'integer' },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              description: { type: 'string' },
              matches: {
                type: 'object',
                properties: {
                  title: { type: 'array', items: { type: 'integer' } },
                  snippet: { type: 'array', items: { type: 'integer' } }
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
              'address',
              'description_identifiers',
              'kind',
              'address_snippet',
              'title',
              'appointment_count',
              'links',
              'description'
            ]
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        page_number: { type: 'integer' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'items',
        'items_per_page',
        'kind',
        'page_number',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'searchOfficers',
      example: {
        items: [
          {
            address: {
              locality: 'Alton',
              country: 'United Kingdom',
              premises: 'The Elkolet Centre',
              address_line_1: 'Mill Lane',
              postal_code: 'GU34 2QG'
            },
            description_identifiers: ['appointment-count'],
            kind: 'searchresults#officer',
            address_snippet:
              'The Elkolet Centre, Mill Lane, Alton, United Kingdom, GU34 2QG',
            title: 'KNOWLES INDUSTRIES (UK) LIMITED',
            snippet: '',
            appointment_count: 5,
            links: {
              self: '/officers/4thsnQuBqNP0opyNEarG4afJTP8/appointments'
            },
            description: 'Total number of appointments 5',
            matches: { title: [1, 7], snippet: [] }
          },
          {
            address_snippet:
              'The Elkolet Centre, Mill Lane, Alton, England, GU34 2QG',
            title: 'KNOWLES INDUSTRIES (UK) LIMITED',
            appointment_count: 1,
            links: {
              self: '/officers/WY2Q_jh9LKon6dcIgnhFrNX2OhY/appointments'
            },
            snippet: '',
            matches: { title: [1, 7], snippet: [] },
            description: 'Total number of appointments 1',
            address: {
              locality: 'Alton',
              country: 'England',
              premises: 'The Elkolet Centre',
              address_line_1: 'Mill Lane',
              postal_code: 'GU34 2QG'
            },
            description_identifiers: ['appointment-count'],
            kind: 'searchresults#officer'
          },
          {
            appointment_count: 1,
            snippet: '',
            links: {
              self: '/officers/ty6wRGrba6xBXU8Mzu6n5FNGGhQ/appointments'
            },
            description: 'Total number of appointments 1',
            matches: { title: [1, 7], snippet: [] },
            title: 'KNOWLES INDUSTRIES (UK) LIMITED',
            address_snippet:
              'The Elkolet Centre, Mill Lane, Alton, United Kingdom, GU34 2QG',
            kind: 'searchresults#officer',
            address: {
              postal_code: 'GU34 2QG',
              address_line_1: 'Mill Lane',
              premises: 'The Elkolet Centre',
              locality: 'Alton',
              country: 'United Kingdom'
            },
            description_identifiers: ['appointment-count']
          },
          {
            address_snippet: '183 Fraser Road, Sheffield, England, S8 0JP',
            title: 'KNOWLES WARWICK LIMITED',
            matches: { title: [1, 7], snippet: [] },
            description: 'Total number of appointments 1',
            appointment_count: 1,
            snippet: '',
            links: {
              self: '/officers/MBhY8mfEG33AY-0exjb_UI4X94w/appointments'
            },
            description_identifiers: ['appointment-count'],
            address: {
              premises: '183',
              postal_code: 'S8 0JP',
              address_line_1: 'Fraser Road',
              country: 'England',
              locality: 'Sheffield'
            },
            kind: 'searchresults#officer'
          },
          {
            title: 'KNOWLES & ASSOCIATES LIMITED',
            address_snippet:
              '3 Kitsmead Lane, Longcross, Chertsey, Surrey, England, KT16 0EF',
            matches: { snippet: [], title: [1, 7] },
            description: 'Total number of appointments 1',
            links: {
              self: '/officers/_8Po1f0PRp9jQszDFuo_qUPl7Ek/appointments'
            },
            appointment_count: 1,
            snippet: '',
            kind: 'searchresults#officer',
            description_identifiers: ['appointment-count'],
            address: {
              locality: 'Chertsey',
              country: 'England',
              address_line_2: 'Longcross',
              postal_code: 'KT16 0EF',
              address_line_1: 'Kitsmead Lane',
              region: 'Surrey',
              premises: '3'
            }
          },
          {
            appointment_count: 1,
            links: {
              self: '/officers/mmsqLoaH8wwdkmDnNCnZnI5veJA/appointments'
            },
            snippet: '',
            description: 'Total number of appointments 1',
            matches: { snippet: [], title: [1, 7] },
            title: 'KNOWLES HOLDING COMPANY LTD',
            address_snippet:
              '252a Grantham Road, Sleaford, Lincolnshire, England, NG34 7NX',
            kind: 'searchresults#officer',
            address: {
              region: 'Lincolnshire',
              premises: '252a',
              postal_code: 'NG34 7NX',
              address_line_1: 'Grantham Road',
              country: 'England',
              locality: 'Sleaford'
            },
            description_identifiers: ['appointment-count']
          },
          {
            address_snippet:
              'Belgrave Hall, Belgrave Street, Leeds, England, LS2 8DD',
            title: 'KNOWLES IP LIMITED',
            matches: { title: [1, 7], snippet: [] },
            description: 'Total number of appointments 1',
            appointment_count: 1,
            snippet: '',
            links: {
              self: '/officers/2luMjijrb3zKXx5BqtVDaUdNy64/appointments'
            },
            kind: 'searchresults#officer',
            description_identifiers: ['appointment-count'],
            address: {
              premises: 'Belgrave Hall',
              address_line_1: 'Belgrave Street',
              postal_code: 'LS2 8DD',
              country: 'England',
              locality: 'Leeds'
            }
          },
          {
            address: {
              locality: 'Stockton Heath',
              postal_code: 'WA4 6BH',
              address_line_1: 'Walton Road',
              region: 'Cheshire',
              premises: 'Apartment 2 Village Terrace'
            },
            description_identifiers: ['appointment-count'],
            kind: 'searchresults#officer',
            title: 'KNOWLES COMPUTER SERVICES LTD',
            address_snippet:
              'Apartment 2 Village Terrace Walton Road, Stockton Heath, Cheshire, WA4 6BH',
            snippet: '',
            appointment_count: 1,
            links: {
              self: '/officers/1zmHlQOFqy4JMVhbUTNsLw2Ut0E/appointments'
            },
            matches: { snippet: [], title: [1, 7] },
            description: 'Total number of appointments 1'
          },
          {
            address_snippet: '96 Church Street, Brighton, England, BN1 1UJ',
            title: 'KNOWLES EUROPE',
            matches: { snippet: [], title: [1, 7] },
            description: 'Total number of appointments 1',
            snippet: '',
            appointment_count: 1,
            links: {
              self: '/officers/5NDxCRTWq61i5pDPpPprWsZiE50/appointments'
            },
            kind: 'searchresults#officer',
            description_identifiers: ['appointment-count'],
            address: {
              address_line_1: 'Church Street',
              postal_code: 'BN1 1UJ',
              premises: '96',
              locality: 'Brighton',
              country: 'England'
            }
          },
          {
            description: 'Total number of appointments 5',
            matches: { title: [1, 7], snippet: [] },
            snippet: '',
            appointment_count: 5,
            links: {
              self: '/officers/N_mOug62gW01dfVw8y7nDH6xUxs/appointments'
            },
            address_snippet:
              'Trust Company Complex, Ajeltake Island, Majuro, Marshall Islands, MH96960',
            title: 'KNOWLES SECRETARY INC ',
            description_identifiers: ['appointment-count'],
            address: {
              address_line_1: 'Trust Company Complex',
              postal_code: 'MH96960',
              address_line_2: 'Ajeltake Island',
              country: 'Marshall Islands',
              locality: 'Majuro'
            },
            kind: 'searchresults#officer'
          },
          {
            description: 'Total number of appointments 5',
            matches: { title: [1, 7], snippet: [] },
            snippet: '',
            appointment_count: 5,
            links: {
              self: '/officers/T5EkJr4PCYRNLI8vcCr39-GjaOY/appointments'
            },
            title: 'KNOWLES DIRECTOR INC ',
            address_snippet:
              'Trust Company Complex, Ajeltake Road, Ajeltake Island, Majuro, Mh 96960, Marshall Islands',
            kind: 'searchresults#officer',
            description_identifiers: ['appointment-count'],
            address: {
              region: 'Mh 96960',
              address_line_1: 'Trust Company Complex',
              address_line_2: 'Ajeltake Road, Ajeltake Island',
              country: 'Marshall Islands',
              locality: 'Majuro'
            }
          },
          {
            address_snippet:
              'Union Pension Trustees Ltd, 18-21 Queen Square, Bristol, United Kingdom, BS1 4NH',
            title: 'SIPP SIR NIGEL KNOWLES ',
            description: 'Total number of appointments 1',
            matches: { snippet: [], title: [16, 22] },
            appointment_count: 1,
            snippet: '',
            links: {
              self: '/officers/MzkIto38dPVQv_96eXKHC-NgdQk/appointments'
            },
            description_identifiers: ['appointment-count'],
            address: {
              postal_code: 'BS1 4NH',
              address_line_1: '18-21 Queen Square',
              premises: 'Union Pension Trustees Ltd',
              country: 'United Kingdom',
              locality: 'Bristol'
            },
            kind: 'searchresults#officer'
          },
          {
            description: 'Total number of appointments 1',
            matches: { title: [34, 40], snippet: [] },
            snippet: '',
            appointment_count: 1,
            links: {
              self: '/officers/yJDtY9jrr0EVE_dFQNPbJyUCkhk/appointments'
            },
            title:
              'TRUSTEES OF THE RODNEY GILCHRIST KNOWLES LIFE INTEREST TRUST ',
            address_snippet:
              'Flat 1 Delph Court, 27a Taptonville Road, Sheffield, England, S10 5DH',
            description_identifiers: ['appointment-count'],
            address: {
              premises: 'Flat 1 Delph Court',
              postal_code: 'S10 5DH',
              address_line_1: '27a Taptonville Road',
              country: 'England',
              locality: 'Sheffield'
            },
            kind: 'searchresults#officer'
          },
          {
            description: 'Total number of appointments 1',
            matches: { title: [3, 9], snippet: [] },
            appointment_count: 1,
            links: {
              self: '/officers/wxQE4U8T_Dn_AK3Ompf8oNLOhY8/appointments'
            },
            snippet: '',
            address_snippet:
              'Clough Willu Cottage, Tosaby Road, St. Marks, Ballasalla, Isle Of Man, IM9 3AN',
            title: 'T KNOWLES ',
            description_identifiers: ['appointment-count'],
            address: {
              locality: 'Isle Of Man',
              postal_code: 'IM9 3AN',
              address_line_1: 'Tosaby Road',
              premises: 'Clough Willu Cottage',
              address_line_2: 'St. Marks, Ballasalla'
            },
            kind: 'searchresults#officer'
          },
          {
            title: 'DICKON KNOWLES LIMITED',
            address_snippet:
              'Mariners, Penwerris Lane, Falmouth, Cornwall, United Kingdom, TR11 2PF',
            matches: { title: [8, 14], snippet: [] },
            description: 'Total number of appointments 0',
            appointment_count: 0,
            links: {
              self: '/officers/doHyGk0dvE4TjvWK8qPb3P3cZnM/appointments'
            },
            snippet: '',
            kind: 'searchresults#officer',
            description_identifiers: ['appointment-count'],
            address: {
              country: 'United Kingdom',
              locality: 'Falmouth',
              address_line_1: 'Penwerris Lane',
              postal_code: 'TR11 2PF',
              premises: 'Mariners',
              region: 'Cornwall'
            }
          },
          {
            address_snippet: '23 Chestergate, Macclesfield, England, SK11 6BX',
            title: 'CARTER KNOWLES LTD',
            links: {
              self: '/officers/yFjV2g3Q5tFcRdx3Q344MRf-dpU/appointments'
            },
            appointment_count: 7,
            snippet: '',
            description: 'Total number of appointments 7',
            matches: { snippet: [], title: [8, 14] },
            kind: 'searchresults#officer',
            address: {
              country: 'England',
              locality: 'Macclesfield',
              premises: '23',
              postal_code: 'SK11 6BX',
              address_line_1: 'Chestergate'
            },
            description_identifiers: ['appointment-count']
          },
          {
            address: {
              premises: '5',
              postal_code: 'PE19 5SD',
              address_line_1: 'Copes Close',
              address_line_2: 'Buckden',
              care_of: 'STEPHEN KNOWLES',
              country: 'United Kingdom',
              locality: 'St. Neots'
            },
            description_identifiers: ['appointment-count'],
            kind: 'searchresults#officer',
            snippet: '',
            appointment_count: 1,
            links: {
              self: '/officers/FgituhsNjt1Avgh8CrarT3u2sUY/appointments'
            },
            description: 'Total number of appointments 1',
            matches: { snippet: [], title: [4, 10] },
            title: 'SJ KNOWLES IT LTD',
            address_snippet:
              'STEPHEN KNOWLES, 5 Copes Close, Buckden, St. Neots, United Kingdom, PE19 5SD'
          },
          {
            appointment_count: 1,
            snippet: '',
            links: {
              self: '/officers/GXuHHnkV0dNM-snBJ9S6-hPu4F0/appointments'
            },
            description: 'Total number of appointments 1',
            matches: { title: [16, 22], snippet: [] },
            title: 'SIPP SIR NIGEL KNOWLES',
            address_snippet:
              'Union Pension Trustees Ltd, 18-21 Queen Square, Bristol, United Kingdom, BS1 4NH',
            kind: 'searchresults#officer',
            address: {
              country: 'United Kingdom',
              locality: 'Bristol',
              address_line_1: '18-21 Queen Square',
              postal_code: 'BS1 4NH',
              premises: 'Union Pension Trustees Ltd'
            },
            description_identifiers: ['appointment-count']
          },
          {
            appointment_count: 0,
            snippet: 'Marisa Julie KNOWLES ',
            links: {
              self: '/officers/Em028n6eJpEZ5qqbwpIZ39JFXWo/appointments'
            },
            matches: { snippet: [14, 20], title: [21, 27] },
            description: 'Total number of appointments 0 - Born October 1972',
            address_snippet: '49 Rushmore Drive, Widnes, England, WA8 9QB',
            title: 'Marisa Julie AUSTIN KNOWLES',
            date_of_birth: { year: 1972, month: 10 },
            address: {
              premises: '49',
              postal_code: 'WA8 9QB',
              address_line_1: 'Rushmore Drive',
              country: 'England',
              locality: 'Widnes'
            },
            description_identifiers: ['appointment-count', 'born-on'],
            kind: 'searchresults#officer'
          },
          {
            description_identifiers: ['appointment-count', 'born-on'],
            address: {
              premises: 'Palladium House',
              address_line_1: '1-4 Argyll Street',
              postal_code: 'W1F 7LD',
              country: 'Uk',
              locality: 'London'
            },
            kind: 'searchresults#officer',
            description: 'Total number of appointments 0 - Born July 1967',
            matches: { snippet: [], title: [17, 23] },
            snippet: '',
            appointment_count: 0,
            links: {
              self: '/officers/IIplC4iD2qTzZw00ZkVracGmvr0/appointments'
            },
            address_snippet:
              'Palladium House, 1-4 Argyll Street, London, Uk, W1F 7LD',
            title: 'Marianne CELINE KNOWLES',
            date_of_birth: { month: 7, year: 1967 }
          }
        ],
        items_per_page: 20,
        kind: 'search#officers',
        page_number: 1,
        start_index: 0,
        total_results: 5074
      }
    }
    await testRequests(
      testUrls.searchOfficers.map((path) => ({ path })),
      schema
    )
  })

  it('searchCompanies: /search/companies', async function () {
    const schema = {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              snippet: { type: 'string' },
              description: { type: 'string' },
              company_status: { type: ['null', 'string'] },
              address_snippet: { type: ['null', 'string'] },
              description_identifier: {
                type: 'array',
                items: { type: ['null', 'string'] }
              },
              address: {
                anyOf: [
                  { type: 'null' },
                  {
                    type: 'object',
                    properties: {
                      address_line_1: { type: 'string' },
                      locality: { type: 'string' },
                      postal_code: { type: 'string' },
                      country: { type: 'string' },
                      premises: { type: 'string' },
                      address_line_2: { type: 'string' },
                      region: { type: 'string' },
                      po_box: { type: 'string' },
                      care_of_name: { type: 'string' }
                    }
                  }
                ]
              },
              date_of_creation: { type: ['null', 'string'] },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              company_type: { type: 'string' },
              title: { type: 'string' },
              matches: {
                type: 'object',
                properties: {
                  title: { type: 'array', items: { type: 'integer' } },
                  snippet: { type: 'array', items: { type: 'integer' } }
                },
                required: ['snippet']
              },
              kind: { type: 'string' },
              company_number: { type: 'string' },
              date_of_cessation: { type: 'string' },
              external_registration_number: { type: 'string' }
            },
            required: [
              'description',
              'company_status',
              'address_snippet',
              'description_identifier',
              'address',
              'links',
              'company_type',
              'title',
              'kind',
              'company_number'
            ]
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        page_number: { type: 'integer' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'items',
        'items_per_page',
        'kind',
        'page_number',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'searchCompanies',
      example: {
        items: [
          {
            snippet: '',
            description: '03914936 - Incorporated on 27 January 2000',
            company_status: 'active',
            address_snippet: '310 High Road, London, England, N22 8JR',
            description_identifier: ['incorporated-on'],
            address: {
              address_line_1: 'High Road',
              locality: 'London',
              postal_code: 'N22 8JR',
              country: 'England',
              premises: '310'
            },
            date_of_creation: '2000-01-27',
            links: { self: '/company/03914936' },
            company_type: 'ltd',
            title: 'INTEREST LTD',
            matches: { title: [1, 8], snippet: [] },
            kind: 'searchresults#company',
            company_number: '03914936'
          },
          {
            address: {
              address_line_1: '12 Newport Avenue',
              locality: 'London',
              country: 'United Kingdom',
              postal_code: 'E14 2DN',
              premises: 'Flat32 Adventures Court'
            },
            description_identifier: ['incorporated-on'],
            date_of_creation: '2019-10-09',
            snippet: '',
            description: '12253244 - Incorporated on  9 October 2019',
            company_status: 'active',
            address_snippet:
              'Flat32 Adventures Court, 12 Newport Avenue, London, United Kingdom, E14 2DN',
            company_number: '12253244',
            company_type: 'ltd',
            links: { self: '/company/12253244' },
            title: 'INTEREST ARBITRAGE LIMITED',
            kind: 'searchresults#company',
            matches: { snippet: [], title: [1, 8] }
          },
          {
            description: '13382138 - Incorporated on  7 May 2021',
            snippet: '',
            address_snippet:
              '6 Hanson Close, Kimberley, Nottingham, England, NG16 2NS',
            company_status: 'active',
            description_identifier: ['incorporated-on'],
            address: {
              address_line_2: 'Kimberley',
              country: 'England',
              postal_code: 'NG16 2NS',
              premises: '6',
              locality: 'Nottingham',
              address_line_1: 'Hanson Close'
            },
            date_of_creation: '2021-05-07',
            company_type: 'ltd',
            links: { self: '/company/13382138' },
            kind: 'searchresults#company',
            matches: { snippet: [], title: [1, 8] },
            title: 'INTEREST FREE LTD',
            company_number: '13382138'
          },
          {
            company_number: '12515217',
            title: 'INTEREST FX LTD',
            kind: 'searchresults#company',
            matches: { title: [1, 8], snippet: [] },
            company_type: 'ltd',
            date_of_cessation: '2021-08-03',
            links: { self: '/company/12515217' },
            date_of_creation: '2020-03-12',
            address: {
              address_line_1: 'Greenway',
              locality: 'London',
              postal_code: 'N20 8EJ',
              premises: '64',
              country: 'England'
            },
            description_identifier: ['dissolved-on'],
            company_status: 'dissolved',
            address_snippet: '64 Greenway, London, England, N20 8EJ',
            snippet: '',
            description: '12515217 - Dissolved on  3 August 2021'
          },
          {
            matches: { title: [1, 8], snippet: [] },
            kind: 'searchresults#company',
            title: 'INTEREST IN PEOPLE LTD',
            links: { self: '/company/12962916' },
            company_type: 'ltd',
            company_number: '12962916',
            company_status: 'active',
            address_snippet:
              'Unit 1b Denby Dale Business Park, Denby Dale, Huddersield, West Yorkshire, England, HD8 8QH',
            description: '12962916 - Incorporated on 20 October 2020',
            snippet: '',
            date_of_creation: '2020-10-20',
            address: {
              address_line_2: 'Denby Dale',
              country: 'England',
              postal_code: 'HD8 8QH',
              premises: 'Unit 1b',
              address_line_1: 'Denby Dale Business Park',
              region: 'West Yorkshire',
              locality: 'Huddersield'
            },
            description_identifier: ['incorporated-on']
          },
          {
            company_type: 'ltd',
            links: { self: '/company/09165477' },
            title: 'INTEREST LABS (UK) LIMITED',
            kind: 'searchresults#company',
            matches: { snippet: [], title: [1, 8] },
            company_number: '09165477',
            snippet: '',
            description: '09165477 - Incorporated on  7 August 2014',
            address_snippet: '86-90 Paul Street, London, England, EC2A 4NE',
            company_status: 'active',
            address: {
              postal_code: 'EC2A 4NE',
              country: 'England',
              premises: '86-90',
              locality: 'London',
              address_line_1: 'Paul Street'
            },
            description_identifier: ['incorporated-on'],
            date_of_creation: '2014-08-07'
          },
          {
            company_number: 'SC297772',
            matches: { title: [1, 8], snippet: [] },
            kind: 'searchresults#company',
            title: 'INTEREST LINK BORDERS',
            company_type: 'private-limited-guarant-nsc-limited-exemption',
            links: { self: '/company/SC297772' },
            date_of_creation: '2006-02-24',
            address: {
              postal_code: 'TD11 3AF',
              country: 'Scotland',
              premises: 'Volunteer Hall',
              region: 'Berwickshire',
              address_line_1: 'Langtongate',
              locality: 'Duns'
            },
            description_identifier: ['incorporated-on'],
            address_snippet:
              'Volunteer Hall, Langtongate, Duns, Berwickshire, Scotland, TD11 3AF',
            company_status: 'active',
            description: 'SC297772 - Incorporated on 24 February 2006',
            snippet: ''
          },
          {
            snippet: '',
            description: '03890049 - Incorporated on  7 December 1999',
            company_status: 'active',
            address_snippet:
              'Cumbria House, 16-20 Hockliffe Street, Leighton Buzzard, Bedfordshire, LU7 1HJ',
            address: {
              premises: 'Cumbria House',
              postal_code: 'LU7 1HJ',
              region: 'Bedfordshire',
              address_line_1: '16-20 Hockliffe Street',
              locality: 'Leighton Buzzard'
            },
            description_identifier: ['incorporated-on'],
            date_of_creation: '1999-12-07',
            company_type: 'ltd',
            links: { self: '/company/03890049' },
            title: 'INTEREST ONLY SOLUTIONS LIMITED',
            matches: { snippet: [], title: [1, 8] },
            kind: 'searchresults#company',
            company_number: '03890049'
          },
          {
            description_identifier: ['incorporated-on'],
            address: {
              postal_code: 'CV1 2NT',
              country: 'England',
              premises: 'Union House',
              locality: 'Coventry',
              address_line_1: '111 New Union Street'
            },
            date_of_creation: '2006-11-23',
            description: '06007993 - Incorporated on 23 November 2006',
            snippet: '',
            address_snippet:
              'Union House, 111 New Union Street, Coventry, England, CV1 2NT',
            company_status: 'active',
            company_number: '06007993',
            links: { self: '/company/06007993' },
            company_type: 'ltd',
            kind: 'searchresults#company',
            matches: { snippet: [], title: [1, 8] },
            title: 'INTEREST RATE SOLUTIONS LTD'
          },
          {
            date_of_creation: '2014-02-24',
            address: {
              region: 'Surrey',
              locality: 'Woking',
              address_line_1: 'South Road',
              premises: 'Tiverton',
              postal_code: 'GU21 4JS'
            },
            description_identifier: ['incorporated-on'],
            company_status: 'active',
            address_snippet: 'Tiverton, South Road, Woking, Surrey, GU21 4JS',
            snippet: '',
            description: '08908109 - Incorporated on 24 February 2014',
            company_number: '08908109',
            title: 'INTERESTS MEDIA LTD',
            kind: 'searchresults#company',
            matches: { snippet: [], title: [1, 9] },
            links: { self: '/company/08908109' },
            company_type: 'ltd'
          },
          {
            description_identifier: ['incorporated-on'],
            address: {
              premises: 'Dept 2,',
              postal_code: 'DN6 8DA',
              country: 'United Kingdom',
              locality: 'Doncaster',
              address_line_1: '43 Owston Road',
              address_line_2: 'Carcroft'
            },
            date_of_creation: '2021-12-15',
            description: '13802020 - Incorporated on 15 December 2021',
            snippet: '',
            company_status: 'active',
            address_snippet:
              'Dept 2, 43 Owston Road, Carcroft, Doncaster, United Kingdom, DN6 8DA',
            company_number: '13802020',
            company_type: 'ltd',
            links: { self: '/company/13802020' },
            kind: 'searchresults#company',
            matches: { snippet: [], title: [1, 8] },
            title: 'INTEREST SUPPORT LTD'
          },
          {
            company_number: '12646582',
            title: 'IPS PROPRIETARY CAPITAL LTD LTD',
            kind: 'searchresults#company',
            matches: { snippet: [1, 8] },
            links: { self: '/company/12646582' },
            company_type: 'ltd',
            date_of_cessation: '2022-04-12',
            date_of_creation: '2020-06-04',
            description_identifier: ['dissolved-on'],
            address: {
              address_line_1: 'Wenlock Road',
              locality: 'London',
              country: 'England',
              postal_code: 'N1 7GU',
              premises: '20-22'
            },
            address_snippet: '20-22 Wenlock Road, London, England, N1 7GU',
            company_status: 'dissolved',
            snippet: 'INTEREST PAYMENTS SOLUTIONS ',
            description: '12646582 - Dissolved on 12 April 2022'
          },
          {
            company_number: '08748063',
            date_of_cessation: '2020-11-17',
            company_type: 'ltd',
            links: { self: '/company/08748063' },
            title: 'INTEREST COLLECTIONS LIMITED',
            kind: 'searchresults#company',
            matches: { title: [1, 8], snippet: [] },
            description_identifier: ['dissolved-on'],
            address: {
              address_line_1: 'King Cross Road',
              region: 'West Yorkshire',
              locality: 'Halifax',
              postal_code: 'HX1 1EB',
              premises: 'West House'
            },
            date_of_creation: '2013-10-25',
            snippet: '',
            description: '08748063 - Dissolved on 17 November 2020',
            address_snippet:
              'West House, King Cross Road, Halifax, West Yorkshire, HX1 1EB',
            company_status: 'dissolved'
          },
          {
            company_number: '11063682',
            links: { self: '/company/11063682' },
            company_type: 'ltd',
            title: 'MAGNESIUM HEALTHCARE LIMITED',
            matches: { snippet: [1, 8] },
            kind: 'searchresults#company',
            address: {
              address_line_2: 'Fulham',
              address_line_1: '.1 Coda Studios 189 Munster Road',
              locality: 'London',
              postal_code: 'SW6 6AW',
              country: 'England',
              premises: '21'
            },
            description_identifier: ['incorporated-on'],
            date_of_creation: '2017-11-14',
            snippet: 'INTEREST IN QUESTION ',
            description: '11063682 - Incorporated on 14 November 2017',
            company_status: 'active',
            address_snippet:
              '21.1 Coda Studios 189 Munster Road, Fulham, London, England, SW6 6AW'
          },
          {
            company_number: '12592369',
            kind: 'searchresults#company',
            matches: { snippet: [1, 9] },
            title: 'HILL TOP MACHINERY LIMITED',
            links: { self: '/company/12592369' },
            company_type: 'ltd',
            date_of_creation: '2020-05-07',
            address: {
              country: 'England',
              postal_code: 'DN18 5BW',
              premises: 'Hill Top Machinery Ltd',
              address_line_1: 'Humber Road',
              region: 'North Lincolnshire',
              locality: 'Barton-Upon-Humber'
            },
            description_identifier: ['incorporated-on'],
            company_status: 'active',
            address_snippet:
              'Hill Top Machinery Ltd, Humber Road, Barton-Upon-Humber, North Lincolnshire, England, DN18 5BW',
            description: '12592369 - Incorporated on  7 May 2020',
            snippet: 'INTERESTS BUSINESS '
          },
          {
            date_of_creation: '2019-10-21',
            address: {
              locality: 'Poole',
              region: 'Dorset',
              address_line_1: 'Wareham Road',
              postal_code: 'BH16 6FA',
              country: 'United Kingdom',
              premises: 'Lytchett House 13 Freeland Park'
            },
            description_identifier: ['dissolved-on'],
            address_snippet:
              'Lytchett House 13 Freeland Park, Wareham Road, Poole, Dorset, United Kingdom, BH16 6FA',
            company_status: 'dissolved',
            description: '12273494 - Dissolved on 28 September 2021',
            snippet: 'INTEREST BUSINESS ',
            company_number: '12273494',
            matches: { snippet: [1, 8] },
            kind: 'searchresults#company',
            title: 'CK PROPERTY HOLCO LTD',
            company_type: 'ltd',
            links: { self: '/company/12273494' },
            date_of_cessation: '2021-09-28'
          },
          {
            date_of_creation: '2003-10-02',
            address: {
              address_line_1: 'Floor, Regent House',
              locality: 'Wolverhampton',
              country: 'England',
              premises: '3rd ',
              postal_code: 'WV1 4EG',
              address_line_2: 'Bath Avenue'
            },
            description_identifier: ['dissolved-on'],
            company_status: 'dissolved',
            address_snippet:
              '3rd  Floor, Regent House, Bath Avenue, Wolverhampton, England, WV1 4EG',
            description: '04918758 - Dissolved on 10 December 2019',
            snippet: '',
            company_number: '04918758',
            matches: { title: [1, 8], snippet: [] },
            kind: 'searchresults#company',
            title: 'INTEREST IN WINE LIMITED',
            company_type: 'ltd',
            date_of_cessation: '2019-12-10',
            links: { self: '/company/04918758' }
          },
          {
            company_status: 'dissolved',
            address_snippet:
              '17  Ambleside Avenue, Heaton, Bradford, United Kingdom, BD9 5HX',
            description: '11401582 - Dissolved on 12 November 2019',
            snippet: '',
            date_of_creation: '2018-06-06',
            description_identifier: ['dissolved-on'],
            address: {
              address_line_1: 'Ambleside Avenue',
              locality: 'Bradford',
              premises: '17 ',
              country: 'United Kingdom',
              postal_code: 'BD9 5HX',
              address_line_2: 'Heaton'
            },
            matches: { title: [1, 8], snippet: [] },
            kind: 'searchresults#company',
            title: 'INTEREST FREE LOANS LTD',
            links: { self: '/company/11401582' },
            company_type: 'ltd',
            date_of_cessation: '2019-11-12',
            company_number: '11401582'
          },
          {
            title: 'INTEREST RATE BROKERS LIMITED',
            kind: 'searchresults#company',
            matches: { title: [1, 8], snippet: [] },
            links: { self: '/company/10536540' },
            company_type: 'ltd',
            date_of_cessation: '2018-05-29',
            company_number: '10536540',
            company_status: 'dissolved',
            address_snippet:
              'Office 3,  Unit R, Penfold Works, Imperial Way, Watford, United Kingdom, WD24 4YY',
            snippet: '',
            description: '10536540 - Dissolved on 29 May 2018',
            date_of_creation: '2016-12-22',
            address: {
              address_line_2: 'Penfold Works, Imperial Way',
              country: 'United Kingdom',
              premises: 'Office 3, ',
              postal_code: 'WD24 4YY',
              address_line_1: 'Unit R',
              locality: 'Watford'
            },
            description_identifier: ['dissolved-on']
          },
          {
            date_of_creation: '2016-12-22',
            address: {
              locality: 'Watford',
              address_line_1: 'Unit R',
              postal_code: 'WD24 4YY',
              premises: 'Office 3, ',
              country: 'United Kingdom',
              address_line_2: 'Penfold Works, Imperial Way'
            },
            description_identifier: ['dissolved-on'],
            address_snippet:
              'Office 3,  Unit R, Penfold Works, Imperial Way, Watford, United Kingdom, WD24 4YY',
            company_status: 'dissolved',
            description: '10537965 - Dissolved on 29 May 2018',
            snippet: '',
            company_number: '10537965',
            kind: 'searchresults#company',
            matches: { snippet: [], title: [1, 8] },
            title: 'INTEREST RATE REDUCER LIMITED',
            date_of_cessation: '2018-05-29',
            company_type: 'ltd',
            links: { self: '/company/10537965' }
          }
        ],
        items_per_page: 20,
        kind: 'search#companies',
        page_number: 1,
        start_index: 0,
        total_results: 858
      }
    }
    await testRequests(
      testUrls.searchCompanies.map((path) => ({ path })),
      schema
    )
  })

  it('searchAll: /search', async function () {
    const schema = {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date_of_cessation: { type: 'string' },
              company_type: { type: 'string' },
              description_identifier: {
                type: 'array',
                items: { type: ['null', 'string'] }
              },
              matches: {
                type: 'object',
                properties: {
                  snippet: { type: 'array', items: { type: 'integer' } },
                  title: { type: 'array', items: { type: 'integer' } }
                },
                required: ['snippet']
              },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              kind: { type: 'string' },
              description: { type: 'string' },
              company_number: { type: 'string' },
              company_status: { type: ['null', 'string'] },
              date_of_creation: { type: ['null', 'string'] },
              snippet: { type: 'string' },
              address_snippet: { type: ['null', 'string'] },
              title: { type: 'string' },
              address: {
                anyOf: [
                  { type: 'null' },
                  {
                    type: 'object',
                    properties: {
                      address_line_1: { type: 'string' },
                      locality: { type: 'string' },
                      postal_code: { type: 'string' },
                      premises: { type: 'string' },
                      region: { type: 'string' },
                      country: { type: 'string' },
                      address_line_2: { type: 'string' },
                      po_box: { type: 'string' },
                      care_of: { type: 'string' },
                      care_of_name: { type: 'string' }
                    }
                  }
                ]
              },
              appointment_count: { type: 'integer' },
              description_identifiers: {
                type: 'array',
                items: { type: 'string' }
              },
              date_of_birth: {
                type: 'object',
                properties: {
                  year: { type: 'integer' },
                  month: { type: 'integer' }
                },
                required: ['year', 'month']
              },
              external_registration_number: { type: 'string' }
            },
            required: [
              'links',
              'kind',
              'description',
              'address_snippet',
              'title',
              'address'
            ]
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        page_number: { type: 'integer' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      required: [
        'items',
        'items_per_page',
        'kind',
        'page_number',
        'start_index',
        'total_results'
      ],
      additionalProperties: false,
      title: 'searchAll',
      example: {
        items: [
          {
            date_of_cessation: '2021-06-01',
            company_type: 'ltd',
            description_identifier: ['dissolved-on'],
            matches: { snippet: [], title: [1, 3] },
            links: { self: '/company/06061086' },
            kind: 'searchresults#company',
            description: '06061086 - Dissolved on  1 June 2021',
            company_number: '06061086',
            company_status: 'dissolved',
            date_of_creation: '2007-01-22',
            snippet: '',
            address_snippet:
              'Gable House, 239 Regents Park Road, London, N3 3LF',
            title: 'AND LIMITED',
            address: {
              address_line_1: '239 Regents Park Road',
              locality: 'London',
              postal_code: 'N3 3LF',
              premises: 'Gable House'
            }
          },
          {
            title: 'ANDREW RUSSELL & CO LIMITED',
            address: {
              locality: 'Doncaster',
              region: 'South Yorkshire',
              address_line_1: 'Wood Street',
              premises: 'Cussins House',
              postal_code: 'DN1 3LW'
            },
            address_snippet:
              'Cussins House, Wood Street, Doncaster, South Yorkshire, DN1 3LW',
            snippet: '',
            description: 'Disqualified',
            matches: { snippet: [], title: [1, 6] },
            links: {
              self: '/disqualified-officers/corporate/Rm2f9Cmvp8WkJzQxZA6RY_P7oeE'
            },
            kind: 'searchresults#disqualified-officer'
          },
          {
            appointment_count: 1,
            matches: { title: [1, 12], snippet: [] },
            kind: 'searchresults#officer',
            links: {
              self: '/officers/_MjQFReNjY0N97nbVHv5Oeq4b2s/appointments'
            },
            description: 'Total number of appointments 1',
            description_identifiers: ['appointment-count'],
            address_snippet:
              '10 Thistle Street, Aberdeen, Aberdeenshire, United Kingdom, AB10 1XZ',
            snippet: '',
            address: {
              premises: '10',
              country: 'United Kingdom',
              postal_code: 'AB10 1XZ',
              region: 'Aberdeenshire',
              locality: 'Aberdeen',
              address_line_1: 'Thistle Street'
            },
            title: 'ANDERSONBAIN & COMPANY '
          },
          {
            description: 'Total number of appointments 0',
            matches: { title: [1, 6], snippet: [] },
            kind: 'searchresults#officer',
            links: {
              self: '/officers/D2p31o5ygP4Z1i0ZSlqPWPECDgM/appointments'
            },
            title: 'ANDREW CROSS & CO ',
            address: {
              address_line_1: 'Lee High Road',
              locality: 'London',
              postal_code: 'SE13 5PT',
              country: 'United Kingdom',
              premises: 'Plaza Building'
            },
            address_snippet:
              'Plaza Building, Lee High Road, London, United Kingdom, SE13 5PT',
            description_identifiers: ['appointment-count'],
            snippet: '',
            appointment_count: 0
          },
          {
            appointment_count: 1,
            matches: { snippet: [], title: [1, 8] },
            links: {
              self: '/officers/DB87ZL8ptGjdrLqthaqXCjy59Nk/appointments'
            },
            kind: 'searchresults#officer',
            description: 'Total number of appointments 1',
            snippet: '',
            description_identifiers: ['appointment-count'],
            address_snippet:
              'Springfield Lodge, Colchester Road, Springfield, Chelmsford, Essex, United Kingdom, CM2 5PW',
            address: {
              address_line_2: 'Springfield',
              country: 'United Kingdom',
              premises: 'Springfield Lodge',
              postal_code: 'CM2 5PW',
              locality: 'Chelmsford',
              region: 'Essex',
              address_line_1: 'Colchester Road'
            },
            title: 'ANDERSON DESIGN & BUILD LIMITED'
          },
          {
            description_identifiers: ['appointment-count'],
            snippet: '',
            address_snippet: '10 Thistle Street, Aberdeen, AB10 1XZ',
            title: 'ANDERSONBAIN & CO ',
            address: {
              address_line_1: 'Thistle Street',
              locality: 'Aberdeen',
              postal_code: 'AB10 1XZ',
              premises: '10'
            },
            links: {
              self: '/officers/ktkAWC0opp5RI7n1ed4aFkhxtv0/appointments'
            },
            matches: { title: [1, 12], snippet: [] },
            kind: 'searchresults#officer',
            description: 'Total number of appointments 1',
            appointment_count: 1
          },
          {
            description_identifiers: ['appointment-count'],
            snippet: '',
            address_snippet:
              '24 Old Burlington Street, Mayfair, London, United Kingdom, W1S 3AW',
            title: 'ANDREWS &  BOYD PROJECTS LIMITED',
            address: {
              postal_code: 'W1S 3AW',
              country: 'United Kingdom',
              premises: '24',
              address_line_1: 'Old Burlington Street',
              region: 'London',
              locality: 'Mayfair'
            },
            kind: 'searchresults#officer',
            matches: { snippet: [], title: [1, 7] },
            links: {
              self: '/officers/5M_MzpyknWc-UGB903KAZuA2Mt0/appointments'
            },
            description: 'Total number of appointments 1',
            appointment_count: 1
          },
          {
            description: 'Total number of appointments 2',
            matches: { title: [1, 6], snippet: [] },
            links: {
              self: '/officers/9k3GFMs8ETsEsHVqXrilOPRJBus/appointments'
            },
            kind: 'searchresults#officer',
            title: 'ANDREW PURNELL & CO ',
            address: {
              premises: '3 The Pavement',
              country: 'England',
              postal_code: 'SW19 4DA',
              locality: 'London',
              address_line_1: 'Worple Road'
            },
            description_identifiers: ['appointment-count'],
            address_snippet:
              '3 The Pavement, Worple Road, London, England, SW19 4DA',
            snippet: '',
            appointment_count: 2
          },
          {
            description_identifiers: ['appointment-count'],
            address_snippet:
              'The Clockhouse, Bath Hill, Keynsham, Bristol, England, BS31 1HL',
            snippet: '',
            address: {
              address_line_1: 'Bath Hill',
              locality: 'Bristol',
              postal_code: 'BS31 1HL',
              address_line_2: 'Keynsham',
              country: 'England',
              premises: 'The Clockhouse'
            },
            title: 'ANDREWS LETTING AND MANAGEMENT LIMITED',
            matches: { snippet: [], title: [1, 7, 17, 19] },
            links: {
              self: '/officers/dVfam3K1K7hCyomFTlajLiW4p3o/appointments'
            },
            kind: 'searchresults#officer',
            description: 'Total number of appointments 1',
            appointment_count: 1
          },
          {
            description: 'Total number of appointments 3',
            matches: { snippet: [], title: [1, 3] },
            links: {
              self: '/officers/cMc1CWZaKMkmiQN7r7RilVNZ2bc/appointments'
            },
            kind: 'searchresults#officer',
            title: 'AND FINANCE FOR ALL SRL ',
            address: {
              postal_code: '1400',
              country: 'Belgium',
              premises: 'Rue Du Happart 11',
              locality: 'Nivelles'
            },
            description_identifiers: ['appointment-count'],
            address_snippet: 'Rue Du Happart 11, Nivelles, Belgium, 1400',
            snippet: '',
            appointment_count: 3
          },
          {
            kind: 'searchresults#officer',
            matches: { title: [1, 6], snippet: [] },
            links: {
              self: '/officers/hIkZ9zBrP3_poq4fM2orqRVpQoY/appointments'
            },
            description: 'Total number of appointments 0',
            description_identifiers: ['appointment-count'],
            snippet: '',
            address_snippet: 'School Lane, Auckley, Doncaster, DN9 3JR',
            address: {
              address_line_1: 'School Lane',
              locality: 'Doncaster',
              postal_code: 'DN9 3JR',
              address_line_2: 'Auckley'
            },
            title: 'ANDREW RUSSEL & CO LTD',
            appointment_count: 0
          },
          {
            appointment_count: 0,
            snippet: '',
            description_identifiers: ['appointment-count'],
            address_snippet:
              'Lathrisk Lane, Newton Of Falkland, Fife, United Kingdom, KY15 7RZ',
            address: {
              locality: 'Newton Of Falkland',
              region: 'Fife',
              country: 'United Kingdom',
              premises: 'Lathrisk Lane',
              postal_code: 'KY15 7RZ'
            },
            title: 'ANDERSON VEITCH & COMPANY LIMITED',
            kind: 'searchresults#officer',
            matches: { snippet: [], title: [1, 8] },
            links: {
              self: '/officers/hF8wixpBviuCQyPjXxHQ93DrI7M/appointments'
            },
            description: 'Total number of appointments 0'
          },
          {
            appointment_count: 1,
            description: 'Total number of appointments 1',
            matches: { title: [1, 8], snippet: [] },
            links: {
              self: '/officers/FxJFXV0fU0EzO39BMekGa7A7E2A/appointments'
            },
            kind: 'searchresults#officer',
            address: {
              postal_code: 'ME13 9EJ',
              country: 'United Kingdom',
              address_line_2: 'Highstreet Road Hernhill',
              premises: 'Unit 1',
              address_line_1: 'Waterham Ind Park',
              locality: 'Faversham',
              region: 'Kent'
            },
            title: 'ANDERSON SECURITIES & INVESTMENT LTD',
            address_snippet:
              'Unit 1, Waterham Ind Park, Highstreet Road Hernhill, Faversham, Kent, United Kingdom, ME13 9EJ',
            description_identifiers: ['appointment-count'],
            snippet: ''
          },
          {
            links: {
              self: '/officers/OVE0lyHGFJG_qnsRQd-Utt-V5d0/appointments'
            },
            matches: { snippet: [], title: [1, 9] },
            kind: 'searchresults#officer',
            description: 'Total number of appointments 2',
            snippet: '',
            description_identifiers: ['appointment-count'],
            address_snippet: '25 Filmer Road, London, United Kingdom, SW6 7BP',
            address: {
              address_line_1: 'Filmer Road',
              locality: 'London',
              postal_code: 'SW6 7BP',
              premises: '25',
              country: 'United Kingdom'
            },
            title: 'ANDERSONS & SONS LIMITED',
            appointment_count: 2
          },
          {
            appointment_count: 5,
            address: {
              address_line_1: 'High Street',
              locality: 'Cheriton',
              postal_code: 'CT19 4ET',
              country: 'England',
              premises: '30'
            },
            title: 'ANDREW & CO ESTATE AGENTS LIMITED',
            description_identifiers: ['appointment-count'],
            address_snippet: '30 High Street, Cheriton, England, CT19 4ET',
            snippet: '',
            description: 'Total number of appointments 5',
            links: {
              self: '/officers/nI5G5kivxzCi_05rI7S1HvMyAc8/appointments'
            },
            matches: { title: [1, 6], snippet: [] },
            kind: 'searchresults#officer'
          },
          {
            links: {
              self: '/officers/AEPECRpmoI8UFVdRIItbUz0LkWE/appointments'
            },
            matches: { snippet: [], title: [1, 6] },
            kind: 'searchresults#officer',
            description: 'Total number of appointments 1',
            snippet: '',
            description_identifiers: ['appointment-count'],
            address_snippet:
              'West Hill House, Allerton Hill, Chapel Allerton, Leeds, West Yorkshire, United Kingdom, LS7 3QB',
            address: {
              postal_code: 'LS7 3QB',
              premises: 'West Hill House',
              address_line_2: 'Chapel Allerton',
              country: 'United Kingdom',
              address_line_1: 'Allerton Hill',
              region: 'West Yorkshire',
              locality: 'Leeds'
            },
            title: 'ANDREW BOON & ASSOCIATES LIMITED',
            appointment_count: 1
          },
          {
            address_snippet:
              '6547 N Academy Blvd, Colorado Springs, United States, CO 80918',
            description_identifiers: ['appointment-count'],
            snippet: '',
            title: 'ANDERSON & SONS - BUSINESS SOLUTIONS LLC ',
            address: {
              address_line_1: 'N Academy Blvd',
              locality: 'Colorado Springs',
              postal_code: 'CO 80918',
              country: 'United States',
              premises: '6547'
            },
            links: {
              self: '/officers/s-Rd6YSrpXGBsiEU-AzrOsmrIiI/appointments'
            },
            matches: { title: [1, 8], snippet: [] },
            kind: 'searchresults#officer',
            description: 'Total number of appointments 1',
            appointment_count: 1
          },
          {
            appointment_count: 0,
            title: 'ANDREW HAMILTON AND COMPANY ',
            address: {
              address_line_1: 'Dean Park Mews',
              locality: 'Edinburgh',
              postal_code: 'EH4 1ED',
              country: 'Scotland',
              premises: '38'
            },
            description_identifiers: ['appointment-count'],
            snippet: '',
            address_snippet: '38 Dean Park Mews, Edinburgh, Scotland, EH4 1ED',
            description: 'Total number of appointments 0',
            matches: { title: [1, 6, 17, 19], snippet: [] },
            links: {
              self: '/officers/QQl3jNktQX4oNWTtjna9UPJO4A8/appointments'
            },
            kind: 'searchresults#officer'
          },
          {
            appointment_count: 1,
            address_snippet:
              '139-141 Watling Street, Gillingham, Kent, England, ME7 2YY',
            description_identifiers: ['appointment-count'],
            snippet: '',
            address: {
              premises: '139-141 Watling Street',
              country: 'England',
              postal_code: 'ME7 2YY',
              region: 'Kent',
              locality: 'Gillingham'
            },
            title: 'ANDREW WELLS ARCHITECTURAL PLANNING & DESIGN LTD',
            matches: { snippet: [], title: [1, 6] },
            kind: 'searchresults#officer',
            links: {
              self: '/officers/Ads7xi7pK5rhLZbtie_9oeX0eUA/appointments'
            },
            description: 'Total number of appointments 1'
          },
          {
            address: {
              locality: 'Tavistock',
              address_line_1: 'West Devon Business Park',
              country: 'England',
              premises: 'Suite 26, Atlas House',
              postal_code: 'PL19 9DP'
            },
            title: 'ANDREW & SARAH PORTER LTD',
            address_snippet:
              'Suite 26, Atlas House, West Devon Business Park, Tavistock, England, PL19 9DP',
            description_identifiers: ['appointment-count'],
            snippet: '',
            description: 'Total number of appointments 1',
            matches: { snippet: [], title: [1, 6] },
            links: {
              self: '/officers/e53bzbU34xgNWu7SLuoayDXibnU/appointments'
            },
            kind: 'searchresults#officer',
            appointment_count: 1
          }
        ],
        items_per_page: 20,
        kind: 'search#all',
        page_number: 1,
        start_index: 0,
        total_results: 1235324
      }
    }
    await testRequests(
      testUrls.searchAll.map((path) => ({ path })),
      schema
    )
  })
})
