import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('search-service', function () {
  this.timeout(50000)
  // tests for each path
  it('advancedCompanySearch: /advanced-search/companies', async function () {
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
              company_type: { type: 'string' },
              kind: { type: 'string' },
              links: {
                type: 'object',
                properties: { company_profile: { type: 'string' } },
                required: ['company_profile']
              },
              date_of_cessation: { type: 'string' },
              date_of_creation: { type: 'string' },
              registered_office_address: {
                type: 'object',
                properties: {
                  address_line_1: { type: 'string' },
                  address_line_2: { type: 'string' },
                  locality: { type: 'string' },
                  postal_code: { type: 'string' },
                  region: { type: 'string' },
                  country: { type: 'string' }
                }
              },
              sic_codes: { type: 'array', items: { type: 'string' } },
              company_subtype: { type: 'string' }
            },
            required: [
              'company_name',
              'company_number',
              'company_status',
              'company_type',
              'kind',
              'links',
              'date_of_creation',
              'registered_office_address',
              'sic_codes'
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
            company_type: { type: 'string' },
            kind: { type: 'string' },
            links: {
              type: 'object',
              properties: { company_profile: { type: 'string' } },
              required: ['company_profile']
            },
            date_of_cessation: { type: 'string' },
            date_of_creation: { type: 'string' },
            registered_office_address: {
              type: 'object',
              properties: {
                address_line_1: { type: 'string' },
                address_line_2: { type: 'string' },
                locality: { type: 'string' },
                postal_code: { type: 'string' },
                region: { type: 'string' },
                country: { type: 'string' }
              },
              required: ['address_line_1']
            },
            sic_codes: { type: 'array', items: { type: 'string' } }
          },
          required: [
            'company_name',
            'company_number',
            'company_status',
            'company_type',
            'kind',
            'links',
            'date_of_creation',
            'registered_office_address',
            'sic_codes'
          ]
        }
      },
      required: ['hits', 'items', 'kind', 'top_hit'],
      additionalProperties: false,
      title: 'advancedCompanySearch',
      example: {
        etag: '425f6d9a46dcc54ffc185ed3d4311dc22f2accef',
        hits: 25966,
        items: [
          {
            company_name: 'SOUTHDOWN RADIO COMMUNICATIONS LIMITED',
            company_number: '02308661',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02308661' },
            date_of_cessation: '2016-06-07',
            date_of_creation: '1988-10-25',
            registered_office_address: {
              address_line_1: 'Sussex House',
              address_line_2: '190 South Coast Road',
              locality: 'Peacehaven',
              postal_code: 'BN10 8JJ',
              region: 'East Sussex'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'ORANGE CORPORATE SERVICES LIMITED',
            company_number: '02330298',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02330298' },
            date_of_cessation: '2019-07-02',
            date_of_creation: '1988-12-21',
            registered_office_address: {
              address_line_1: '3 More London Riverside',
              locality: 'London',
              postal_code: 'SE1 2AQ',
              region: 'England'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'EVOLVING SYSTEMS LIMITED',
            company_number: '02325854',
            company_status: 'active',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02325854' },
            date_of_creation: '1988-12-07',
            registered_office_address: {
              address_line_1: '4th Floor 2 City Approach Albert Street',
              address_line_2: 'Eccles',
              locality: 'Manchester',
              postal_code: 'M30 0BL',
              country: 'England'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'VANCO UK LIMITED',
            company_number: '02296733',
            company_status: 'active',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02296733' },
            date_of_creation: '1988-09-15',
            registered_office_address: {
              address_line_1: 'World Business Centre 2',
              address_line_2: 'Newall Road',
              locality: 'Middlesex',
              postal_code: 'TW6 2SF',
              country: 'United Kingdom'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'THE BUSINESS ORGANISATION LIMITED',
            company_number: '02371977',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02371977' },
            date_of_cessation: '2016-09-27',
            date_of_creation: '1989-04-13',
            registered_office_address: {
              address_line_1: 'The Cott',
              address_line_2: 'The Dell Anderby Creek',
              locality: 'Lincolnshire',
              postal_code: 'PE24 5XT'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'NTL CABLECOMMS CHESHIRE',
            company_number: '02379804',
            company_status: 'dissolved',
            company_type: 'private-unlimited',
            kind: 'search-results#company',
            links: { company_profile: '/company/02379804' },
            date_of_cessation: '2020-02-28',
            date_of_creation: '1989-05-04',
            registered_office_address: {
              address_line_1: '1 More London Place',
              locality: 'London',
              postal_code: 'SE1 2AF'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'TELEWEST COMMUNICATIONS (TELFORD) LIMITED',
            company_number: '02389377',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02389377' },
            date_of_cessation: '2018-08-28',
            date_of_creation: '1989-05-25',
            registered_office_address: {
              address_line_1: 'Media House',
              address_line_2: 'Bartley Wood Business Park',
              locality: 'Hook',
              postal_code: 'RG27 9UP',
              region: 'Hampshire'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'NTL CABLECOMMS DERBY',
            company_number: '02387713',
            company_status: 'dissolved',
            company_type: 'private-unlimited',
            kind: 'search-results#company',
            links: { company_profile: '/company/02387713' },
            date_of_cessation: '2019-08-25',
            date_of_creation: '1989-05-22',
            registered_office_address: {
              address_line_1: '1 More London Place',
              locality: 'London',
              postal_code: 'SE1 2AF'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'TELEWEST COMMUNICATIONS (TYNESIDE) LIMITED',
            company_number: '02407676',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02407676' },
            date_of_cessation: '2021-03-16',
            date_of_creation: '1989-07-25',
            registered_office_address: {
              address_line_1: '500 Brook Drive',
              locality: 'Reading',
              postal_code: 'RG2 6UU',
              country: 'United Kingdom'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'BT GLOBAL SERVICES LIMITED',
            company_number: '02410810',
            company_status: 'active',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02410810' },
            date_of_creation: '1989-08-03',
            registered_office_address: {
              address_line_1: '1 Braham Street',
              locality: 'London',
              postal_code: 'E1 8EE',
              country: 'United Kingdom'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'FREEDOM COMMUNICATIONS (U.K.) LIMITED',
            company_number: '02443243',
            company_status: 'active',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02443243' },
            date_of_creation: '1989-11-15',
            registered_office_address: {
              address_line_1: '19-25 Nuffield Road',
              locality: 'Poole',
              postal_code: 'BH17 0RU',
              region: 'Dorset',
              country: 'England'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'NTL CABLECOMMS BURY AND ROCHDALE',
            company_number: '02446183',
            company_status: 'dissolved',
            company_type: 'private-unlimited',
            kind: 'search-results#company',
            links: { company_profile: '/company/02446183' },
            date_of_cessation: '2018-11-13',
            date_of_creation: '1989-11-24',
            registered_office_address: {
              address_line_1: '1 More London Place',
              locality: 'London',
              postal_code: 'SE1 2AF'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'DIGITAL EXCHANGE PRODUCTS LIMITED',
            company_number: '02446759',
            company_status: 'active',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02446759' },
            date_of_creation: '1989-11-27',
            registered_office_address: {
              address_line_1: 'Gate House 5 Chapel Place',
              address_line_2: 'Rivington Street',
              locality: 'London',
              postal_code: 'EC2A 3SB',
              country: 'England'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'MIDDLESEX CABLE LIMITED',
            company_number: '02460325',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02460325' },
            date_of_cessation: '2018-04-18',
            date_of_creation: '1990-01-17',
            registered_office_address: {
              address_line_1: '1 More London Place',
              locality: 'London',
              postal_code: 'SE1 2AF'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'CABLE ENFIELD LIMITED',
            company_number: '02466511',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02466511' },
            date_of_cessation: '2018-04-18',
            date_of_creation: '1990-02-02',
            registered_office_address: {
              address_line_1: '1 More London Place',
              locality: 'London',
              postal_code: 'SE1 2AF'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'SHEFFIELD CABLE COMMUNICATIONS LIMITED',
            company_number: '02465953',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02465953' },
            date_of_cessation: '2019-08-25',
            date_of_creation: '1990-02-01',
            registered_office_address: {
              address_line_1: '1 More London Place',
              locality: 'London',
              postal_code: 'SE1 2AF'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'ALL POINTS NORTH PUBLICATIONS LIMITED',
            company_number: '02524607',
            company_status: 'active',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02524607' },
            date_of_creation: '1990-07-23',
            registered_office_address: {
              address_line_1: '12 Heatons Court Heatons Court',
              locality: 'Leeds',
              postal_code: 'LS1 4LJ',
              country: 'England'
            },
            sic_codes: ['56302', '61900']
          },
          {
            company_name: 'THE BUSH TELEGRAPH COMPANY (UK) LIMITED',
            company_number: '02534698',
            company_status: 'dissolved',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02534698' },
            date_of_cessation: '2018-04-10',
            date_of_creation: '1990-08-28',
            registered_office_address: {
              address_line_1: '53 Fore Street',
              locality: 'Ivybridge',
              postal_code: 'PL21 9AE',
              region: 'Devon'
            },
            sic_codes: ['61100', '61200', '61900']
          },
          {
            company_name: 'NETCOM (U.K.) LIMITED',
            company_number: '02532785',
            company_status: 'active',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02532785' },
            date_of_creation: '1990-08-20',
            registered_office_address: {
              address_line_1: 'Langton',
              address_line_2: 'Gorelands Lane',
              locality: 'Chalfont St. Giles',
              postal_code: 'HP8 4HQ',
              region: 'Buckinghamshire'
            },
            sic_codes: ['61900']
          },
          {
            company_name: 'WIZANER LIMITED',
            company_number: '02530183',
            company_status: 'active',
            company_type: 'ltd',
            kind: 'search-results#company',
            links: { company_profile: '/company/02530183' },
            date_of_creation: '1990-08-13',
            registered_office_address: {
              address_line_1: '61 Charlotte Street',
              address_line_2: 'Birmingham',
              locality: 'West Midlands',
              postal_code: 'B3 1PX'
            },
            sic_codes: ['61900', '62020']
          }
        ],
        kind: 'search#advanced-search',
        top_hit: {
          company_name: 'SOUTHDOWN RADIO COMMUNICATIONS LIMITED',
          company_number: '02308661',
          company_status: 'dissolved',
          company_type: 'ltd',
          kind: 'search-results#company',
          links: { company_profile: '/company/02308661' },
          date_of_cessation: '2016-06-07',
          date_of_creation: '1988-10-25',
          registered_office_address: {
            address_line_1: 'Sussex House',
            address_line_2: '190 South Coast Road',
            locality: 'Peacehaven',
            postal_code: 'BN10 8JJ',
            region: 'East Sussex'
          },
          sic_codes: ['61900']
        }
      }
    }
    await testRequests(
      testUrls.advancedCompanySearch.map((path) => ({ path })),
      schema
    )
  })

  it('searchCompaniesAlphabetically: /alphabetical-search/companies', async function () {
    const schema = {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              company_name: { type: 'string' },
              company_number: { type: 'string' },
              company_status: { type: 'string' },
              company_type: { type: 'string' },
              ordered_alpha_key_with_id: { type: 'string' },
              kind: { type: 'string' },
              links: {
                type: 'object',
                properties: { company_profile: { type: 'string' } },
                required: ['company_profile']
              }
            },
            required: [
              'company_name',
              'company_number',
              'company_type',
              'ordered_alpha_key_with_id',
              'kind',
              'links'
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
            company_type: { type: 'string' },
            ordered_alpha_key_with_id: { type: 'string' },
            kind: { type: 'string' },
            links: {
              type: 'object',
              properties: { company_profile: { type: 'string' } },
              required: ['company_profile']
            }
          },
          required: [
            'company_name',
            'company_number',
            'company_type',
            'ordered_alpha_key_with_id',
            'kind',
            'links'
          ]
        }
      },
      required: ['items', 'kind', 'top_hit'],
      additionalProperties: false,
      title: 'searchCompaniesAlphabetically',
      example: {
        items: [
          {
            company_name: 'DAVICO INDUSTRIAL LIMITED',
            company_number: '00900196',
            company_status: 'liquidation',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICOINDUSTRIAL:00900196',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/00900196' }
          },
          {
            company_name: 'DAVICOL COMMUNICATIONS LIMITED',
            company_number: '07676777',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICOLCOMMUNICATIONS:07676777',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/07676777' }
          },
          {
            company_name: 'DAVICON LTD',
            company_number: '05848804',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICON:05848804',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/05848804' }
          },
          {
            company_name: 'DAVICON ENGINEERING LIMITED',
            company_number: '06498788',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICONENGINEERING:06498788',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/06498788' }
          },
          {
            company_name: 'DAVICON GROUP LIMITED',
            company_number: '13019633',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICONGROUP:13019633',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/13019633' }
          },
          {
            company_name: 'DAVICON HOLDINGS LIMITED',
            company_number: '10891479',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICONHOLDINGS:10891479',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/10891479' }
          },
          {
            company_name: 'DAVICON MEZZANINE FLOORS LIMITED',
            company_number: '07014080',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICONMEZZANINEFLOORS:07014080',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/07014080' }
          },
          {
            company_name: 'DAVICO (NORTHERN) LIMITED',
            company_number: '01617227',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICONORTHERN:01617227',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/01617227' }
          },
          {
            company_name: 'DAVICO (PRODUCTS) LIMITED',
            company_number: '01615355',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICOPRODUCTS:01615355',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/01615355' }
          },
          {
            company_name: 'DAVICO PROPERTIES U.K. LIMITED',
            company_number: '03095731',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICOPROPERTIESUK:03095731',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/03095731' }
          },
          {
            company_name: 'DAVICO TIES & TERMINALS LIMITED',
            company_number: '10413229',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICOTIESANDTERMINALS:10413229',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/10413229' }
          },
          {
            company_name: 'DAVIC PRODUCTS LTD',
            company_number: '11550004',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICPRODUCTS:11550004',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/11550004' }
          },
          {
            company_name: 'DAVIC (PROPERTIES) LIMITED',
            company_number: '09337441',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICPROPERTIES:09337441',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/09337441' }
          },
          {
            company_name: 'DAVIC PROPERTY LTD',
            company_number: '09053287',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICPROPERTY:09053287',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/09053287' }
          },
          {
            company_name: 'DAVIC PUBCO LIMITED',
            company_number: 'SC287483',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICPUBCO:SC287483',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/SC287483' }
          },
          {
            company_name: 'DAVICS CONSTRUCTION LIMITED',
            company_number: '03373711',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICSCONSTRUCTION:03373711',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/03373711' }
          },
          {
            company_name: 'DAVICS PROPERTY LTD',
            company_number: '12805716',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICSPROPERTY:12805716',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/12805716' }
          },
          {
            company_name: 'DAVICS TECHNOLOGIES LTD',
            company_number: '13947120',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICSTECHNOLOGIES:13947120',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/13947120' }
          },
          {
            company_name: 'DAVIC TECH LIMITED',
            company_number: '08437758',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICTECH:08437758',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/08437758' }
          },
          {
            company_name: 'DAVICTOR LIMITED',
            company_number: '07401500',
            company_status: 'liquidation',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVICTOR:07401500',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/07401500' }
          },
          {
            company_name: 'DAVID LIMITED',
            company_number: '03403744',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:03403744',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/03403744' }
          },
          {
            company_name: 'DAVID & AARONS PAPERWORKS LTD',
            company_number: '06999775',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:06999775',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/06999775' }
          },
          {
            company_name: 'DAVID & COMPANY LIMITED',
            company_number: '08305500',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:08305500',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/08305500' }
          },
          {
            company_name: 'DAVID & CRIS LTD',
            company_number: '09129719',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:09129719',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/09129719' }
          },
          {
            company_name: 'DAVID & CO LTD',
            company_number: '09394851',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:09394851',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/09394851' }
          },
          {
            company_name: 'DAVID & BELL LIMITED',
            company_number: '09549021',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:09549021',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/09549021' }
          },
          {
            company_name: 'DAVID&M LIMITED',
            company_number: '10498991',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:10498991',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/10498991' }
          },
          {
            company_name: 'DAVID&CRISTIAN. LIMITED',
            company_number: '11206225',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:11206225',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/11206225' }
          },
          {
            company_name: 'DAVID & DANIEL LTD',
            company_number: '11541478',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:11541478',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/11541478' }
          },
          {
            company_name: 'DAVID&ANDI LTD',
            company_number: '11720085',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:11720085',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/11720085' }
          },
          {
            company_name: 'DAVID & POLO LIMITED',
            company_number: '11858774',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:11858774',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/11858774' }
          },
          {
            company_name: 'DAVID&ALEXANDRU LTD',
            company_number: '11946800',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:11946800',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/11946800' }
          },
          {
            company_name: 'DAVID & CO. LTD',
            company_number: '13481075',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVID:13481075',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/13481075' }
          },
          {
            company_name: 'DAVID A LIMITED',
            company_number: '09408113',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVIDA:09408113',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/09408113' }
          },
          {
            company_name: 'DAVIDA LIMITED',
            company_number: 'SC313857',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVIDA:SC313857',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/SC313857' }
          },
          {
            company_name: 'DAVIDAARMSTRONG LIMITED',
            company_number: '07199382',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVIDAARMSTRONG:07199382',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/07199382' }
          },
          {
            company_name: 'DAVID AARON LIMITED',
            company_number: '09435505',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVIDAARON:09435505',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/09435505' }
          },
          {
            company_name: 'DAVID ABBOTT & PARTNERS LIMITED',
            company_number: '02310410',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVIDABBOTTANDPARTNERS:02310410',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/02310410' }
          },
          {
            company_name: 'DAVID ABBOTT PROJECTS LTD.',
            company_number: '07231357',
            company_status: 'active',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVIDABBOTTPROJECTS:07231357',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/07231357' }
          },
          {
            company_name: 'DAVID ABBOTTS CONSULTING LTD',
            company_number: '12946947',
            company_status: 'dissolved',
            company_type: 'ltd',
            ordered_alpha_key_with_id: 'DAVIDABBOTTSCONSULTING:12946947',
            kind: 'searchresults#alphabetical-search',
            links: { company_profile: '/company/12946947' }
          }
        ],
        kind: 'search#alphabetical-search',
        top_hit: {
          company_name: 'DAVID LIMITED',
          company_number: '03403744',
          company_status: 'active',
          company_type: 'ltd',
          ordered_alpha_key_with_id: 'DAVID:03403744',
          kind: 'searchresults#alphabetical-search',
          links: { company_profile: '/company/03403744' }
        }
      }
    }
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
              registered_office_address: {
                type: 'object',
                properties: {
                  address_line_1: { type: 'string' },
                  address_line_2: { type: 'string' },
                  postal_code: { type: 'string' },
                  locality: { type: 'string' }
                },
                required: ['address_line_1']
              },
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
            registered_office_address: {
              type: 'object',
              properties: {
                address_line_1: { type: 'string' },
                address_line_2: { type: 'string' },
                locality: { type: 'string' },
                postal_code: { type: 'string' }
              },
              required: ['address_line_1', 'address_line_2', 'postal_code']
            },
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
      additionalProperties: false,
      title: 'searchDissolvedCompanies',
      example: {
        etag: '267d2874b33c3e24ea04257f8b271fce6bddb1c1',
        hits: 4306,
        items: [
          {
            company_name: 'ENERGY LIMITED',
            company_number: '02364353',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'ENERGY:02364353',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1993-10-12',
            date_of_creation: '1989-03-22'
          },
          {
            company_name: 'ENERGY LIMITED',
            company_number: '02886665',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'ENERGY:02886665',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1997-07-15',
            date_of_creation: '1994-01-12'
          },
          {
            company_name: 'ENERGY SKATEPARK LIMITED',
            company_number: '05298758',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'ENERGYSKATEPARK:05298758',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2007-06-02',
            date_of_creation: '2004-11-29',
            registered_office_address: {
              address_line_1: '1 Brassey Road',
              address_line_2: 'Old Potts Way Shrewsbury',
              postal_code: 'SY3 7FA'
            }
          },
          {
            company_name: 'POSITIVE ENERGY LIMITED',
            company_number: '02991454',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'POSITIVEENERGY:02991454',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2002-04-02',
            date_of_creation: '1994-11-17'
          },
          {
            company_name: 'ENERGY ADVOCATES LIMITED',
            company_number: '02672143',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'ENERGYADVOCATES:02672143',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1995-03-28',
            date_of_creation: '1991-12-17'
          },
          {
            company_name: 'EUROPA ENERGY PLC',
            company_number: '01513904',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'EUROPAENERGY:01513904',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2007-03-20',
            date_of_creation: '1980-08-22',
            registered_office_address: {
              address_line_1: 'Hill House',
              address_line_2: '1 Little New Street',
              locality: 'London',
              postal_code: 'EC4A 3TR'
            },
            previous_company_names: [
              {
                ceased_on: '1990-04-25',
                effective_from: '1980-12-31',
                name: 'TR ENERGY PUBLIC LIMITED COMPANY',
                company_number: '01513904'
              },
              {
                ceased_on: '1980-12-31',
                effective_from: '1980-08-22',
                name: 'KESTVILLE LIMITED',
                company_number: '01513904'
              }
            ]
          },
          {
            company_name: 'PARKWOOD ENERGY LIMITED',
            company_number: '06190542',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'PARKWOODENERGY:06190542',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2009-03-10',
            date_of_creation: '2007-03-28',
            registered_office_address: {
              address_line_1: '240 Hawthorne Road',
              address_line_2: 'Liverpool',
              postal_code: 'L20 3AS'
            }
          },
          {
            company_name: 'VENTURE ENERGY LIMITED',
            company_number: '03624888',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'VENTUREENERGY:03624888',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2009-01-20',
            date_of_creation: '1998-09-01',
            registered_office_address: {
              address_line_1: '10 Ranelagh Grove',
              address_line_2: 'London',
              postal_code: 'SW1W 8PD'
            }
          },
          {
            company_name: 'WIGHT ENERGY PLC',
            company_number: '02836906',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'WIGHTENERGY:02836906',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1995-06-20',
            date_of_creation: '1993-07-16'
          },
          {
            company_name: 'ENERGY ANGLIA LIMITED',
            company_number: '01442374',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'ENERGYANGLIA:01442374',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1991-07-09',
            date_of_creation: '1979-08-07',
            previous_company_names: [
              {
                ceased_on: '1988-03-09',
                effective_from: '1979-08-07',
                name: 'DISAB (U.K.) LIMITED',
                company_number: '01442374'
              }
            ]
          },
          {
            company_name: 'ENERGY LINE LIMITED',
            company_number: '03168329',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'ENERGYLINE:03168329',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2000-08-22',
            date_of_creation: '1996-03-06'
          },
          {
            company_name: 'CLAYTON ENERGY LIMITED',
            company_number: '03151028',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'CLAYTONENERGY:03151028',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2003-04-15',
            date_of_creation: '1996-01-25',
            registered_office_address: {
              address_line_1: 'Yorkshire House',
              address_line_2: '7 South Lane',
              locality: 'Holmfirth Huddersfield',
              postal_code: 'HD9 1HN'
            }
          },
          {
            company_name: 'FREEDOM ENERGY LIMITED',
            company_number: '05665927',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'FREEDOMENERGY:05665927',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2008-06-18',
            date_of_creation: '2006-01-04',
            registered_office_address: {
              address_line_1: '2nd Floor',
              address_line_2: '145-157 St.John Street',
              locality: 'London',
              postal_code: 'EC1V 4PY'
            }
          },
          {
            company_name: 'CREATIVE ENERGY LIMITED',
            company_number: '04915887',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'CREATIVEENERGY:04915887',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2005-06-28',
            date_of_creation: '2003-09-30',
            registered_office_address: {
              address_line_1: '11 Coronation Avenue',
              address_line_2: 'Rushwick',
              locality: 'Worcester',
              postal_code: 'WR2 5TF'
            }
          },
          {
            company_name: 'EXXCO ENERGY LIMITED',
            company_number: 'SC158854',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'EXXCOENERGY:SC158854',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1998-09-18',
            date_of_creation: '1995-06-27',
            previous_company_names: [
              {
                ceased_on: '1995-08-21',
                effective_from: '1995-06-27',
                name: 'LEDGE 233 LIMITED',
                company_number: 'SC158854'
              }
            ]
          },
          {
            company_name: 'OMEGA ENERGY LIMITED',
            company_number: '06314478',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'OMEGAENERGY:06314478',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2009-04-07',
            date_of_creation: '2007-07-16',
            registered_office_address: {
              address_line_1: '24 Grangewood',
              address_line_2: 'Potters Bar',
              locality: 'Herts',
              postal_code: 'EN6 1SH'
            }
          },
          {
            company_name: 'HANSEN ENERGY LIMITED',
            company_number: '04336907',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'HANSENENERGY:04336907',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2009-08-11',
            date_of_creation: '2001-12-10',
            registered_office_address: {
              address_line_1: 'C/O BREBNERS',
              address_line_2: '6th Floor Tubs Hill House North London Road',
              locality: 'Sevenoaks',
              postal_code: 'TN13 1BL'
            }
          },
          {
            company_name: 'WORLDWIDE ENERGY LIMITED',
            company_number: '03112802',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'WORLDWIDEENERGY:03112802',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '1997-07-29',
            date_of_creation: '1995-10-12'
          },
          {
            company_name: 'ROWLEY ENERGY LIMITED',
            company_number: '02763442',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'ROWLEYENERGY:02763442',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2007-10-02',
            date_of_creation: '1992-11-10',
            registered_office_address: {
              address_line_1: '20-22 Queen Street',
              address_line_2: 'Mayfair',
              locality: 'London',
              postal_code: 'W1J 5PR'
            },
            previous_company_names: [
              {
                ceased_on: '1993-01-15',
                effective_from: '1992-11-10',
                name: 'IBIS (214) LIMITED',
                company_number: '02763442'
              }
            ]
          },
          {
            company_name: 'MCC ENERGY LIMITED',
            company_number: '05570203',
            company_status: 'dissolved',
            ordered_alpha_key_with_id: 'MCCENERGY:05570203',
            kind: 'searchresults#dissolved-company',
            date_of_cessation: '2009-08-18',
            date_of_creation: '2005-09-21',
            registered_office_address: {
              address_line_1: '344 Linen Hall 162 - 168 Regent Street',
              locality: 'London',
              postal_code: 'W1B 5TD'
            },
            previous_company_names: [
              {
                ceased_on: '2009-01-16',
                effective_from: '2005-11-01',
                name: 'MCC ENERGY PLC',
                company_number: '05570203'
              },
              {
                ceased_on: '2005-11-01',
                effective_from: '2005-09-21',
                name: 'TERSUS ENERGY PLC',
                company_number: '05570203'
              }
            ]
          }
        ],
        kind: 'search#dissolved',
        top_hit: {
          company_name: 'ENERGY LIMITED',
          company_number: '02364353',
          company_status: 'dissolved',
          ordered_alpha_key_with_id: 'ENERGY:02364353',
          kind: 'searchresults#dissolved-company',
          date_of_cessation: '1993-10-12',
          date_of_creation: '1989-03-22'
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
              kind: { type: 'string' },
              address: {
                type: 'object',
                properties: {
                  locality: { type: 'string' },
                  country: { type: 'string' },
                  premises: { type: 'string' },
                  address_line_1: { type: 'string' },
                  postal_code: { type: 'string' },
                  address_line_2: { type: 'string' },
                  region: { type: 'string' }
                }
              },
              description_identifiers: {
                anyOf: [
                  {
                    type: 'string',
                    description:
                      'An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations.',
                    enum: ['born-on']
                  },
                  { type: 'array', items: { type: 'string' } }
                ]
              },
              date_of_birth: { type: 'string' },
              title: { type: 'string' },
              address_snippet: { type: 'string' },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              description: { type: 'string' },
              matches: {
                type: 'object',
                properties: {
                  snippet: { type: 'array' },
                  title: { type: 'array', items: { type: 'integer' } }
                },
                required: ['snippet', 'title']
              },
              snippet: { type: 'string' }
            },
            required: [
              'kind',
              'address',
              'title',
              'address_snippet',
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
      required: ['items_per_page', 'kind', 'start_index', 'total_results'],
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

  it('searchCompanies: /search/companies', async function () {
    const schema = {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              company_status: { type: ['null', 'string'] },
              company_number: { type: 'string' },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              description: { type: 'string' },
              description_identifier: {
                anyOf: [
                  {
                    type: 'string',
                    description:
                      'An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations',
                    enum: [
                      'incorporated-on',
                      'registered-on',
                      'formed-on',
                      'dissolved-on',
                      'converted-closed-on',
                      'closed-on',
                      'closed',
                      'first-uk-establishment-opened-on',
                      'opened-on',
                      'voluntary-arrangement',
                      'receivership',
                      'insolvency-proceedings',
                      'liquidation',
                      'administration'
                    ]
                  },
                  { type: 'array', items: { type: ['null', 'string'] } }
                ]
              },
              kind: { type: 'string' },
              address: {
                anyOf: [
                  { type: 'null' },
                  {
                    type: 'object',
                    properties: {
                      postal_code: { type: 'string' },
                      address_line_1: { type: 'string' },
                      premises: { type: 'string' },
                      country: { type: 'string' },
                      locality: { type: 'string' },
                      address_line_2: { type: 'string' },
                      care_of_name: { type: 'string' },
                      region: { type: 'string' },
                      po_box: { type: 'string' },
                      care_of: {
                        description: 'The care of name.',
                        type: 'string'
                      }
                    }
                  }
                ]
              },
              address_snippet: { type: ['null', 'string'] },
              date_of_creation: { type: ['null', 'string'] },
              matches: {
                type: 'object',
                properties: {
                  title: { type: 'array', items: { type: 'integer' } },
                  snippet: { type: 'array', items: { type: 'integer' } }
                },
                required: ['snippet']
              },
              snippet: { type: 'string' },
              company_type: { type: 'string' },
              title: { type: 'string' },
              date_of_cessation: { type: 'string' },
              external_registration_number: { type: 'string' }
            },
            required: [
              'company_status',
              'company_number',
              'links',
              'kind',
              'address',
              'address_snippet',
              'company_type',
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
      additionalProperties: false,
      title: 'searchCompanies',
      example: {
        items: [
          {
            company_status: 'active',
            company_number: '05660276',
            links: { self: '/company/05660276' },
            description: '05660276 - Incorporated on 21 December 2005',
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            address: {
              postal_code: 'W1W 7LT',
              address_line_1: 'Great Portland Street',
              premises: '85',
              country: 'England',
              locality: 'London'
            },
            address_snippet:
              '85 Great Portland Street, London, England, W1W 7LT',
            date_of_creation: '2005-12-21',
            matches: { title: [1, 6], snippet: [] },
            snippet: '',
            company_type: 'ltd',
            title: 'CENTRE LTD'
          },
          {
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            description: '09962235 - Incorporated on 21 January 2016',
            company_status: 'active',
            links: { self: '/company/09962235' },
            company_number: '09962235',
            title: 'ACCESS MEDIATION SERVICES LIMITED',
            matches: { snippet: [1, 6] },
            date_of_creation: '2016-01-21',
            company_type: 'ltd',
            snippet: 'CENTRE FOR RESOLUTION ',
            address: {
              address_line_1: 'Barbourne Road',
              premises: '73',
              country: 'England',
              locality: 'Worcester',
              postal_code: 'WR1 1SB'
            },
            address_snippet: '73 Barbourne Road, Worcester, England, WR1 1SB'
          },
          {
            description: '13252127 - Incorporated on  8 March 2021',
            company_number: '13252127',
            company_status: 'active',
            links: { self: '/company/13252127' },
            kind: 'searchresults#company',
            description_identifier: ['incorporated-on'],
            snippet: 'CENTRE FOR ENERGY EQUALITY ',
            company_type: 'private-limited-guarant-nsc',
            date_of_creation: '2021-03-08',
            matches: { snippet: [1, 6] },
            address: {
              address_line_2: 'Cuddington',
              postal_code: 'CW8 2QH',
              premises: '10',
              country: 'England',
              address_line_1: 'Farndon Close',
              locality: 'Northwich'
            },
            address_snippet:
              '10 Farndon Close, Cuddington, Northwich, England, CW8 2QH',
            title: 'CEE OUTREACH CIC'
          },
          {
            description: '02844232 - Incorporated on 11 August 1993',
            company_number: '02844232',
            company_status: 'active',
            links: { self: '/company/02844232' },
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            date_of_creation: '1993-08-11',
            matches: { snippet: [], title: [1, 6] },
            company_type: 'ltd',
            snippet: '',
            address: {
              care_of_name: 'CM EASY LIMITED',
              region: 'Middlesex',
              postal_code: 'HA8 7EB',
              address_line_1: 'Spring Villa Road',
              premises: 'Anglodal House',
              locality: 'Edgware'
            },
            address_snippet:
              'CM EASY LIMITED, Anglodal House, Spring Villa Road, Edgware, Middlesex, HA8 7EB',
            title: 'CENTRE ACADEMY LONDON LIMITED'
          },
          {
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            links: { self: '/company/09773755' },
            company_status: 'active',
            company_number: '09773755',
            description: '09773755 - Incorporated on 11 September 2015',
            title: 'CENTRE ALIGN LIMITED',
            address: {
              postal_code: 'W1B 3HH',
              premises: 'Third Floor',
              country: 'United Kingdom',
              address_line_1: '207 Regent Street',
              locality: 'London'
            },
            address_snippet:
              'Third Floor, 207 Regent Street, London, United Kingdom, W1B 3HH',
            matches: { snippet: [], title: [1, 6] },
            date_of_creation: '2015-09-11',
            company_type: 'ltd',
            snippet: ''
          },
          {
            description: '12457926 - Incorporated on 12 February 2020',
            company_status: 'active',
            links: { self: '/company/12457926' },
            company_number: '12457926',
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            date_of_creation: '2020-02-12',
            matches: { title: [1, 6], snippet: [] },
            snippet: '',
            company_type: 'ltd',
            address_snippet: '91 High Street, Chatham, England, ME4 4DL',
            address: {
              premises: '91',
              country: 'England',
              address_line_1: 'High Street',
              locality: 'Chatham',
              postal_code: 'ME4 4DL'
            },
            title: 'CENTRE ANAHATA LTD'
          },
          {
            title: 'CENTRE ARTS LTD',
            matches: { snippet: [], title: [1, 6] },
            date_of_creation: '2021-12-03',
            company_type: 'ltd',
            snippet: '',
            address_snippet: '125 Watling Street, Gillingham, England, ME7 2YY',
            address: {
              country: 'England',
              premises: '125',
              address_line_1: 'Watling Street',
              locality: 'Gillingham',
              postal_code: 'ME7 2YY'
            },
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            description: '13781488 - Incorporated on  3 December 2021',
            company_status: 'active',
            company_number: '13781488',
            links: { self: '/company/13781488' }
          },
          {
            kind: 'searchresults#company',
            description_identifier: ['incorporated-on'],
            description: '11045549 - Incorporated on  3 November 2017',
            links: { self: '/company/11045549' },
            company_status: 'active',
            company_number: '11045549',
            title: 'CENTRE ASSOCIATES LIMITED',
            snippet: '',
            company_type: 'ltd',
            matches: { snippet: [], title: [1, 6] },
            date_of_creation: '2017-11-03',
            address: {
              postal_code: 'KT2 6ND',
              region: 'Surrey',
              locality: 'Kingston Upon Thames',
              address_line_1: 'Old London Road',
              premises: '29',
              country: 'England'
            },
            address_snippet:
              '29 Old London Road, Kingston Upon Thames, Surrey, England, KT2 6ND'
          },
          {
            title: 'CENTRE AT THREE WAYS',
            address_snippet:
              'Mill 2  St Pegs Mill C/O Am Insolvency Limited, Thornhills Beck Lane, Brighouse, West Yorkshire, HD6 4AH',
            address: {
              region: 'West Yorkshire',
              address_line_2: 'Thornhills Beck Lane',
              postal_code: 'HD6 4AH',
              premises: 'Mill 2 ',
              address_line_1: 'St Pegs Mill C/O Am Insolvency Limited',
              locality: 'Brighouse'
            },
            date_of_creation: '2011-04-13',
            matches: { snippet: [], title: [1, 6] },
            company_type: 'private-limited-guarant-nsc-limited-exemption',
            snippet: '',
            description_identifier: ['incorporated-on', 'liquidation'],
            kind: 'searchresults#company',
            company_number: '07602848',
            company_status: 'liquidation',
            links: { self: '/company/07602848' },
            description:
              '07602848 - Incorporated on 13 April 2011 - Liquidation'
          },
          {
            company_status: 'active',
            company_number: '06675759',
            links: { self: '/company/06675759' },
            description: '06675759 - Incorporated on 18 August 2008',
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            address_snippet:
              '95 Greendale Road, Port Sunlight, Wirral, CH62 4XE',
            address: {
              locality: 'Wirral',
              premises: '95',
              address_line_1: 'Greendale Road',
              postal_code: 'CH62 4XE',
              address_line_2: 'Port Sunlight'
            },
            matches: { snippet: [], title: [1, 6] },
            date_of_creation: '2008-08-18',
            snippet: '',
            company_type: 'ltd',
            title: 'CENTRE ATTRACTION LIVERPOOL LTD'
          },
          {
            description: '02979011 - Incorporated on 14 October 1994',
            company_number: '02979011',
            company_status: 'active',
            links: { self: '/company/02979011' },
            kind: 'searchresults#company',
            description_identifier: ['incorporated-on'],
            company_type: 'ltd',
            snippet: '',
            date_of_creation: '1994-10-14',
            matches: { snippet: [], title: [1, 6] },
            address: {
              postal_code: 'BR7 6AA',
              premises: '29',
              country: 'England',
              address_line_1: 'The Meadow',
              locality: 'Chislehurst'
            },
            address_snippet: '29 The Meadow, Chislehurst, England, BR7 6AA',
            title: 'CENTRE ATTRACTIONS LTD'
          },
          {
            description: '10084321 - Incorporated on 24 March 2016',
            company_status: 'active',
            company_number: '10084321',
            links: { self: '/company/10084321' },
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            date_of_creation: '2016-03-24',
            matches: { title: [1, 6], snippet: [] },
            snippet: '',
            company_type: 'ltd',
            address_snippet:
              'Hollinwood Business Centre, Albert St, Oldham, Lancs, England, OL8 3QL',
            address: {
              postal_code: 'OL8 3QL',
              region: 'Lancs',
              locality: 'Oldham',
              address_line_1: 'Albert St',
              country: 'England',
              premises: 'Hollinwood Business Centre'
            },
            title: 'CENTRE BAR LTD'
          },
          {
            title: 'CENTRE BARBERS LIMITED',
            address: {
              postal_code: 'PA5 8AN',
              address_line_2: 'Johnstone',
              locality: 'Renfrewshire',
              address_line_1: 'High Street',
              premises: '54'
            },
            address_snippet: '54 High Street, Johnstone, Renfrewshire, PA5 8AN',
            company_type: 'ltd',
            snippet: '',
            matches: { title: [1, 6], snippet: [] },
            date_of_creation: '2003-08-26',
            kind: 'searchresults#company',
            description_identifier: ['incorporated-on'],
            company_status: 'active',
            company_number: 'SC254774',
            links: { self: '/company/SC254774' },
            description: 'SC254774 - Incorporated on 26 August 2003'
          },
          {
            title: 'CENTRE BARCS LTD',
            address_snippet:
              'Forbes Watson Ltd, The Old Bakery, Green Street, Lytham St. Annes, United Kingdom, FY8 5LG',
            address: {
              postal_code: 'FY8 5LG',
              country: 'United Kingdom',
              premises: 'Forbes Watson Ltd',
              address_line_1: 'The Old Bakery, Green Street',
              locality: 'Lytham St. Annes'
            },
            date_of_creation: '2022-03-16',
            matches: { title: [1, 6], snippet: [] },
            snippet: '',
            company_type: 'ltd',
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            company_status: 'active',
            links: { self: '/company/13981081' },
            company_number: '13981081',
            description: '13981081 - Incorporated on 16 March 2022'
          },
          {
            description_identifier: ['dissolved-on'],
            kind: 'searchresults#company',
            date_of_cessation: '2021-06-15',
            company_number: '06091884',
            company_status: 'dissolved',
            links: { self: '/company/06091884' },
            description: '06091884 - Dissolved on 15 June 2021',
            title: 'CENTRE BARKS LIMITED',
            address_snippet:
              'Foxhill House, Clench Common, Marlborough, England, SN8 4DR',
            address: {
              postal_code: 'SN8 4DR',
              locality: 'Marlborough',
              address_line_1: 'Clench Common',
              country: 'England',
              premises: 'Foxhill House'
            },
            date_of_creation: '2007-02-08',
            matches: { snippet: [1, 11], title: [1, 6] },
            snippet: 'CENTREBARCS ',
            company_type: 'ltd'
          },
          {
            description: '13850394 - Incorporated on 14 January 2022',
            company_number: '13850394',
            company_status: 'active',
            links: { self: '/company/13850394' },
            kind: 'searchresults#company',
            description_identifier: ['incorporated-on'],
            company_type: 'ltd',
            snippet: '',
            date_of_creation: '2022-01-14',
            matches: { snippet: [], title: [1, 6] },
            address: {
              country: 'United Kingdom',
              premises: '67',
              address_line_1: 'Duke Street',
              locality: 'Darlington',
              region: 'County Durham',
              postal_code: 'DL3 7SD'
            },
            address_snippet:
              '67 Duke Street, Darlington, County Durham, United Kingdom, DL3 7SD',
            title: 'CENTRE BARKS LIMITED'
          },
          {
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            company_number: '10871180',
            company_status: 'active',
            links: { self: '/company/10871180' },
            description: '10871180 - Incorporated on 18 July 2017',
            title: 'CENTRE BARKS @ MOSCAR LTD',
            address: {
              postal_code: 'S8 7FE',
              locality: 'Sheffield',
              premises: '158',
              country: 'England',
              address_line_1: 'Hemper Lane'
            },
            address_snippet: '158 Hemper Lane, Sheffield, England, S8 7FE',
            date_of_creation: '2017-07-18',
            matches: { snippet: [], title: [1, 6] },
            company_type: 'ltd',
            snippet: ''
          },
          {
            date_of_cessation: 'Unknown',
            kind: 'searchresults#company',
            description_identifier: ['converted-closed-on'],
            description: 'IP25252R - Converted/Closed',
            company_number: 'IP25252R',
            company_status: 'converted-closed',
            links: { self: '/company/IP25252R' },
            title: 'CENTRE BAR SOCIAL CLUB LIMITED',
            company_type: 'industrial-and-provident-society',
            snippet: '',
            matches: { snippet: [], title: [1, 6] },
            address_snippet: '',
            address: {}
          },
          {
            date_of_cessation: '2021-11-30',
            kind: 'searchresults#company',
            description_identifier: ['dissolved-on'],
            description: '13276589 - Dissolved on 30 November 2021',
            links: { self: '/company/13276589' },
            company_status: 'dissolved',
            company_number: '13276589',
            title: 'CENTRE BRANDS LTD',
            company_type: 'ltd',
            snippet: '',
            matches: { snippet: [], title: [1, 6] },
            date_of_creation: '2021-03-18',
            address_snippet:
              'Kemp House 152-160 City Road, London, England, EC1V 2NX',
            address: {
              postal_code: 'EC1V 2NX',
              country: 'England',
              premises: 'Kemp House 152-160 City Road',
              locality: 'London'
            }
          },
          {
            title: 'CENTRE BROADCASTING LIMITED',
            company_type: 'ltd',
            snippet: '',
            date_of_creation: '1996-12-19',
            matches: { snippet: [], title: [1, 6] },
            address_snippet: '30 Leicester Square, London, England, WC2H 7LA',
            address: {
              postal_code: 'WC2H 7LA',
              address_line_1: 'Leicester Square',
              country: 'England',
              premises: '30',
              locality: 'London'
            },
            kind: 'searchresults#company',
            description_identifier: ['incorporated-on'],
            description: '03294814 - Incorporated on 19 December 1996',
            company_number: '03294814',
            company_status: 'active',
            links: { self: '/company/03294814' }
          }
        ],
        items_per_page: 20,
        kind: 'search#companies',
        page_number: 1,
        start_index: 0,
        total_results: 47437
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
              kind: { type: 'string' },
              address_snippet: { type: ['null', 'string'] },
              description_identifier: {
                anyOf: [
                  {
                    type: 'string',
                    description:
                      'An array of enumeration types that make up the search description. See search_descriptions_raw.yaml in api-enumerations',
                    enum: [
                      'incorporated-on',
                      'registered-on',
                      'formed-on',
                      'dissolved-on',
                      'converted-closed-on',
                      'closed-on',
                      'closed',
                      'first-uk-establishment-opened-on',
                      'opened-on',
                      'voluntary-arrangement',
                      'receivership',
                      'insolvency-proceedings',
                      'liquidation',
                      'administration',
                      'appointment-count',
                      'born-on'
                    ]
                  },
                  { type: 'array', items: { type: ['null', 'string'] } }
                ]
              },
              address: {
                anyOf: [
                  { type: 'null' },
                  {
                    type: 'object',
                    properties: {
                      address_line_1: { type: 'string' },
                      postal_code: { type: 'string' },
                      premises: { type: 'string' },
                      address_line_2: { type: 'string' },
                      region: { type: 'string' },
                      locality: { type: 'string' },
                      country: { type: 'string' },
                      care_of_name: { type: 'string' },
                      po_box: { type: 'string' },
                      care_of: { type: 'string' }
                    }
                  }
                ]
              },
              company_type: { type: 'string' },
              snippet: { type: 'string' },
              links: {
                type: 'object',
                properties: { self: { type: 'string' } },
                required: ['self']
              },
              company_number: { type: 'string' },
              title: { type: 'string' },
              company_status: { type: ['null', 'string'] },
              date_of_creation: { type: ['null', 'string'] },
              description: { type: 'string' },
              matches: {
                type: 'object',
                properties: {
                  title: { type: 'array', items: { type: 'integer' } },
                  snippet: { type: 'array', items: { type: 'integer' } }
                },
                required: ['snippet']
              },
              description_identifiers: {
                type: 'array',
                items: { type: 'string' }
              },
              appointment_count: { type: 'integer' },
              date_of_cessation: { type: 'string' },
              external_registration_number: { type: 'string' },
              date_of_birth: {
                type: 'object',
                properties: {
                  year: { type: 'integer' },
                  month: { type: 'integer' }
                },
                required: ['year', 'month']
              }
            },
            required: ['kind', 'address_snippet', 'address', 'links', 'title']
          }
        },
        items_per_page: { type: 'integer' },
        kind: { type: 'string' },
        page_number: { type: 'integer' },
        start_index: { type: 'integer' },
        total_results: { type: 'integer' }
      },
      additionalProperties: false,
      title: 'searchAll',
      example: {
        items: [
          {
            kind: 'searchresults#company',
            address_snippet: '177  Preston Road, Brighton, BN1 6BS',
            description_identifier: ['registered-on'],
            address: {
              address_line_1: 'Preston Road',
              postal_code: 'BN1 6BS',
              premises: '177 ',
              address_line_2: 'Brighton'
            },
            company_type: 'limited-partnership',
            snippet: '',
            links: { self: '/company/LP004730' },
            company_number: 'LP004730',
            title: 'ELITE L.P.',
            company_status: 'active',
            date_of_creation: '1994-10-11',
            description: 'LP004730 - Registered on 11 October 1994',
            matches: { title: [1, 5], snippet: [] }
          },
          {
            company_status: 'active',
            title: 'ELITE LIMITED',
            matches: { snippet: [], title: [1, 5] },
            description: '03759064 - Incorporated on 26 April 1999',
            date_of_creation: '1999-04-26',
            address_snippet:
              'Unit 8 Acorn Business Park, Northarbour Road, Portsmouth, Hampshire, PO6 3TH',
            description_identifier: ['incorporated-on'],
            kind: 'searchresults#company',
            company_number: '03759064',
            company_type: 'ltd',
            links: { self: '/company/03759064' },
            snippet: '',
            address: {
              postal_code: 'PO6 3TH',
              region: 'Hampshire',
              premises: 'Unit 8',
              locality: 'Portsmouth',
              address_line_2: 'Northarbour Road',
              address_line_1: 'Acorn Business Park'
            }
          },
          {
            snippet: '',
            links: {
              self: '/officers/c02SW1uRHkTSjfjwxZ7Gvu6WNvc/appointments'
            },
            description_identifiers: ['appointment-count'],
            address: {
              premises: '36',
              postal_code: 'N12 0PS',
              region: '06210055',
              locality: 'London',
              address_line_1: 'Woodgrange Avenue'
            },
            address_snippet: '36 Woodgrange Avenue, London, 06210055, N12 0PS',
            kind: 'searchresults#officer',
            description: 'Total number of appointments 0',
            matches: { snippet: [], title: [1, 5] },
            appointment_count: 0,
            title: 'ELITE HOMECARE & PROPERTIES LIMITED'
          },
          {
            address: {
              address_line_1: 'Sperry Way',
              country: 'England',
              locality: 'Stonehouse',
              postal_code: 'GL10 3UT',
              premises: '701 Stonehouse Park'
            },
            description_identifiers: ['appointment-count'],
            snippet: '',
            links: {
              self: '/officers/DB17-4TJAGLDvUSRJBa-s3BS5OI/appointments'
            },
            kind: 'searchresults#officer',
            address_snippet:
              '701 Stonehouse Park, Sperry Way, Stonehouse, England, GL10 3UT',
            description: 'Total number of appointments 1',
            matches: { title: [1, 5], snippet: [] },
            title: 'ELITE SPORT PHYSIOTHERAPY LTD',
            appointment_count: 1
          },
          {
            address: {
              premises: '4',
              postal_code: 'IP8 3ER',
              locality: 'Ipswich',
              country: 'United Kingdom',
              address_line_1: 'Kenney Close'
            },
            description_identifiers: ['appointment-count'],
            snippet: '',
            links: {
              self: '/officers/5LA3v-W3mhOZrZ6bbzVTHK5W0BM/appointments'
            },
            kind: 'searchresults#officer',
            address_snippet: '4 Kenney Close, Ipswich, United Kingdom, IP8 3ER',
            description: 'Total number of appointments 1',
            matches: { title: [1, 5], snippet: [] },
            title: 'ELITE CATERING BREAKDOWNS LTD',
            appointment_count: 1
          },
          {
            title: 'ELITE SURGEONS LTD',
            appointment_count: 1,
            description: 'Total number of appointments 1',
            matches: { title: [1, 5], snippet: [] },
            kind: 'searchresults#officer',
            address_snippet:
              '33 Washington Apartments, 5 Lexington Gardens, Birmingham, England, B15 2DR',
            description_identifiers: ['appointment-count'],
            address: {
              locality: 'Birmingham',
              postal_code: 'B15 2DR',
              premises: '33 Washington Apartments',
              address_line_1: '5 Lexington Gardens',
              country: 'England'
            },
            links: {
              self: '/officers/d931-sswWLMP4yMq9i36NqmxTeg/appointments'
            },
            snippet: ''
          },
          {
            matches: { title: [1, 5], snippet: [] },
            description: 'Total number of appointments 0',
            title: 'ELITE SOLUTIONS LONDON LTD',
            appointment_count: 0,
            address: {
              address_line_1: '22 Warrington Road',
              postal_code: 'HA1 1SY',
              region: 'Middlesex',
              locality: 'Harrow'
            },
            description_identifiers: ['appointment-count'],
            snippet: '',
            links: {
              self: '/officers/WULFP3L3OrAHL-5F3r6AvmuqCJA/appointments'
            },
            kind: 'searchresults#officer',
            address_snippet: '22 Warrington Road, Harrow, Middlesex, HA1 1SY'
          },
          {
            title: 'ELITE LIMOUSINES VIP PROTECTION SERVICES LTD',
            appointment_count: 0,
            matches: { title: [1, 5], snippet: [] },
            description: 'Total number of appointments 0',
            kind: 'searchresults#officer',
            address_snippet: '55 Daresbury Street, Manchester, M8 9LW',
            description_identifiers: ['appointment-count'],
            address: {
              postal_code: 'M8 9LW',
              premises: '55',
              locality: 'Manchester',
              address_line_1: 'Daresbury Street'
            },
            links: {
              self: '/officers/LILVK5J1dJkM9BBcO0YhrLg-BZI/appointments'
            },
            snippet: ''
          },
          {
            address: {
              postal_code: 'WA1 1PG',
              premises: 'Halton View Villas',
              locality: 'Warrington',
              country: 'United Kingdom',
              address_line_1: '3-5 Wilson Patten Street'
            },
            description_identifiers: ['appointment-count'],
            links: {
              self: '/officers/pWtg9w3wPYwzl3z1hSJEB8WKS58/appointments'
            },
            snippet: 'ELITE EXECUTIVE DEVELOPMENTS ',
            kind: 'searchresults#officer',
            address_snippet:
              'Halton View Villas, 3-5 Wilson Patten Street, Warrington, United Kingdom, WA1 1PG',
            matches: { snippet: [1, 5] },
            description: 'Total number of appointments 1',
            title: 'JC & NB DEVELOPMENTS LTD',
            appointment_count: 1
          },
          {
            appointment_count: 1,
            title: 'ELITE STEWARTBY LIMITED',
            description: 'Total number of appointments 1',
            matches: { title: [1, 5], snippet: [] },
            address_snippet:
              'E3, The Premier Centre, Abbey Park, Romsey, England, SO51 9DG',
            kind: 'searchresults#officer',
            snippet: '',
            links: {
              self: '/officers/8v1E0K4774JvWrhJXLidQfevFkM/appointments'
            },
            description_identifiers: ['appointment-count'],
            address: {
              address_line_1: 'The Premier Centre',
              country: 'England',
              locality: 'Romsey',
              address_line_2: 'Abbey Park',
              postal_code: 'SO51 9DG',
              premises: 'E3'
            }
          },
          {
            description_identifiers: ['appointment-count'],
            address: {
              country: 'England',
              address_line_1: 'Mitton Road',
              premises: 'Unit 23 Mitton Road Business Park',
              postal_code: 'BB7 9YE',
              address_line_2: 'Whalley',
              locality: 'Clitheroe'
            },
            links: {
              self: '/officers/UvYcFPdrW3VQdzqcWHKUMOIECck/appointments'
            },
            snippet: '',
            kind: 'searchresults#officer',
            address_snippet:
              'Unit 23 Mitton Road Business Park, Mitton Road, Whalley, Clitheroe, England, BB7 9YE',
            matches: { title: [1, 5], snippet: [] },
            description: 'Total number of appointments 1',
            title: 'ELITE BALUSTRADE SYSTEMS LTD',
            appointment_count: 1
          },
          {
            snippet: '',
            links: {
              self: '/officers/OxtUkv3nUJ4bFBjZhrMc0IbVqoI/appointments'
            },
            address: {
              address_line_1: 'Ruttonjee House',
              country: 'China',
              address_line_2: '11 Duddell Street, Central',
              locality: 'Hong Kong',
              premises: 'Suite 1203, 12th Floor,'
            },
            description_identifiers: ['appointment-count'],
            address_snippet:
              'Suite 1203, 12th Floor,, Ruttonjee House, 11 Duddell Street, Central, Hong Kong, China',
            kind: 'searchresults#officer',
            matches: { title: [1, 5], snippet: [] },
            description: 'Total number of appointments 1',
            appointment_count: 1,
            title: 'ELITE GLOBAL SECRETARIES LIMITED'
          },
          {
            title: 'ELITE EXPORTS INC. S.A. ',
            appointment_count: 1,
            matches: { title: [1, 5], snippet: [] },
            description: 'Total number of appointments 1',
            kind: 'searchresults#officer',
            address_snippet:
              'Calle Aquilino De La Guardia No. 8, Edificio Igra, Panama, Panama',
            description_identifiers: ['appointment-count'],
            address: {
              address_line_1: 'Edificio Igra',
              country: 'Panama',
              locality: 'Panama',
              premises: 'Calle Aquilino De La Guardia No. 8'
            },
            snippet: '',
            links: {
              self: '/officers/sZGZIY8_hDkxiV4T3LUsaM3S_NE/appointments'
            }
          },
          {
            description: 'Total number of appointments 1',
            matches: { title: [1, 5], snippet: [] },
            appointment_count: 1,
            title: 'ELITE KOM KONSULTS LIMITED',
            snippet: '',
            links: {
              self: '/officers/oH_zk7iqQAm7O26ZZjVfPlINvYI/appointments'
            },
            description_identifiers: ['appointment-count'],
            address: {
              country: 'England',
              address_line_1: 'Oxlip Close',
              postal_code: 'CV23 0JQ',
              premises: '17',
              locality: 'Rugby'
            },
            address_snippet: '17 Oxlip Close, Rugby, England, CV23 0JQ',
            kind: 'searchresults#officer'
          },
          {
            kind: 'searchresults#officer',
            address_snippet:
              'Trevear House, Old County Court, Alverton Terrace, Penzance, Cornwall, United Kingdom, TR18 4GH',
            description_identifiers: ['appointment-count'],
            address: {
              address_line_1: 'Old County Court',
              country: 'United Kingdom',
              address_line_2: 'Alverton Terrace',
              locality: 'Penzance',
              premises: 'Trevear House',
              postal_code: 'TR18 4GH',
              region: 'Cornwall'
            },
            snippet: '',
            links: {
              self: '/officers/gkQ9e_xmNMQ6OukcE_jFyFDUDv4/appointments'
            },
            title: 'ELITE ESTATES HOLDINGS LIMITED',
            appointment_count: 1,
            matches: { snippet: [], title: [1, 5] },
            description: 'Total number of appointments 1'
          },
          {
            appointment_count: 2,
            title: 'ELITE ORTHOPAEDIC SERVICES LIMITED',
            matches: { title: [1, 5], snippet: [] },
            description: 'Total number of appointments 2',
            address_snippet:
              'Khamillah House, Dawbers Lane, Euxton, Chorley, Lancs, England, PR7 6EQ',
            kind: 'searchresults#officer',
            snippet: '',
            links: {
              self: '/officers/Da7R__qergsTf9Il4SBEpCt5TBk/appointments'
            },
            address: {
              address_line_2: 'Euxton',
              locality: 'Chorley',
              premises: 'Khamillah House',
              postal_code: 'PR7 6EQ',
              region: 'Lancs',
              address_line_1: 'Dawbers Lane',
              country: 'England'
            },
            description_identifiers: ['appointment-count']
          },
          {
            address_snippet: '1 Hatherwood, Leatherhead, England, KT22 8TT',
            kind: 'searchresults#officer',
            links: {
              self: '/officers/hbyLd2Woid57OklADqKNJ3Qzn4Y/appointments'
            },
            snippet: '',
            description_identifiers: ['appointment-count'],
            address: {
              locality: 'Leatherhead',
              postal_code: 'KT22 8TT',
              premises: '1',
              address_line_1: 'Hatherwood',
              country: 'England'
            },
            appointment_count: 2,
            title: 'ELITES GLOBAL GROUP LTD',
            matches: { title: [1, 6], snippet: [] },
            description: 'Total number of appointments 2'
          },
          {
            description_identifiers: ['appointment-count'],
            address: {
              address_line_1: 'Highfield Road',
              country: 'United Kingdom',
              locality: 'Dartford',
              premises: '43',
              postal_code: 'DA1 2JS'
            },
            snippet: '',
            links: {
              self: '/officers/iQ2Yo64S43Dfa0SUL3RaRg8B5Sk/appointments'
            },
            kind: 'searchresults#officer',
            address_snippet:
              '43 Highfield Road, Dartford, United Kingdom, DA1 2JS',
            description: 'Total number of appointments 0',
            matches: { snippet: [], title: [1, 5] },
            title: 'ELITE OFFICE CLEANING SERVICES LIMITED',
            appointment_count: 0
          },
          {
            snippet: '',
            links: {
              self: '/officers/SKpD2gaV35Zh4BSB0OiJsFvJMg0/appointments'
            },
            description_identifiers: ['appointment-count'],
            address: {
              locality: 'London',
              postal_code: 'N11 2BJ',
              premises: '71',
              address_line_1: 'Brownlow Road'
            },
            address_snippet: '71 Brownlow Road, London, N11 2BJ',
            kind: 'searchresults#officer',
            matches: { title: [1, 5], snippet: [] },
            description: 'Total number of appointments 0',
            appointment_count: 0,
            title: 'ELITE HOMECARE & PROPERTIES LIMITED'
          },
          {
            description: 'Total number of appointments 1',
            matches: { snippet: [], title: [1, 5] },
            appointment_count: 1,
            title: 'ELITE CARDIOLOGY LIMITED',
            snippet: '',
            links: {
              self: '/officers/Qh8p3eqUHDJgan9JZERxHYN3Xu0/appointments'
            },
            address: {
              locality: 'Wilmslow',
              premises: 'Rex Buildings',
              postal_code: 'SK9 1HY',
              region: 'Cheshire',
              address_line_1: 'Alderley Road',
              country: 'United Kingdom'
            },
            description_identifiers: ['appointment-count'],
            address_snippet:
              'Rex Buildings, Alderley Road, Wilmslow, Cheshire, United Kingdom, SK9 1HY',
            kind: 'searchresults#officer'
          }
        ],
        items_per_page: 20,
        kind: 'search#all',
        page_number: 1,
        start_index: 0,
        total_results: 14028
      }
    }
    await testRequests(
      testUrls.searchAll.map((path) => ({ path })),
      schema
    )
  })
})
