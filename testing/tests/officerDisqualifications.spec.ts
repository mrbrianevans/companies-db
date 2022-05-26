import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('officer-disqualifications-service', function () {
  // tests for each path
  it('getCorporateOfficer: /disqualified-officers/corporate/{officer_id}', async function () {
    const schema = {
      type: 'object',
      properties: {
        disqualifications: {
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
        etag: { type: 'string' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        name: { type: 'string' }
      },
      required: ['disqualifications', 'etag', 'kind', 'links', 'name'],
      additionalProperties: false,
      title: 'getDisqualifiedOfficersCorporate',
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
          type: 'array',
          items: {
            type: 'object',
            properties: {
              heard_on: { type: 'string' },
              reason: {
                type: 'object',
                properties: {
                  act: { type: 'string' },
                  article: { type: 'string' },
                  description_identifier: { type: 'string' },
                  section: { type: 'string' }
                },
                required: ['act', 'description_identifier']
              },
              case_identifier: { type: 'string' },
              disqualification_type: { type: 'string' },
              company_names: { type: 'array', items: { type: 'string' } },
              address: {
                type: 'object',
                properties: {
                  region: { type: 'string' },
                  postal_code: { type: 'string' },
                  address_line_1: { type: 'string' },
                  premises: { type: 'string' },
                  locality: { type: 'string' },
                  country: { type: 'string' },
                  address_line_2: { type: 'string' }
                },
                required: ['locality']
              },
              court_name: { type: 'string' },
              disqualified_from: { type: 'string' },
              disqualified_until: { type: 'string' },
              undertaken_on: { type: 'string' }
            },
            required: [
              'reason',
              'disqualification_type',
              'address',
              'disqualified_from',
              'disqualified_until'
            ]
          }
        },
        etag: { type: 'string' },
        forename: { type: 'string' },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        nationality: { type: 'string' },
        other_forenames: { type: 'string' },
        surname: { type: 'string' },
        title: { type: 'string' },
        permissions_to_act: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              company_names: { type: 'array', items: { type: 'string' } },
              court_name: { type: 'string' },
              granted_on: { type: 'string' },
              expires_on: { type: 'string' }
            },
            required: [
              'company_names',
              'court_name',
              'granted_on',
              'expires_on'
            ]
          }
        },
        honours: { type: 'string' }
      },
      required: [
        'disqualifications',
        'etag',
        'forename',
        'kind',
        'links',
        'surname'
      ],
      additionalProperties: false,
      title: 'getDisqualifiedOfficersNatural',
      example: {
        date_of_birth: '1973-10-03',
        disqualifications: [
          {
            heard_on: '2015-09-15',
            reason: {
              act: 'company-directors-disqualification-northern-ireland-order-2002',
              article: '9',
              description_identifier:
                'high-court-to-disqualify-unfit-directors-of-insolvent-companies'
            },
            case_identifier: '15/33386',
            disqualification_type: 'court-order',
            company_names: ['TRNI LTD'],
            address: {
              region: 'County Antrim',
              postal_code: 'BT28 3RZ',
              address_line_1: 'Barleywood Mill',
              premises: '16',
              locality: 'Lisburn'
            },
            court_name: 'Royal Courts Of Justice',
            disqualified_from: '2015-10-06',
            disqualified_until: '2024-10-05'
          }
        ],
        etag: '36c307da5c634361e4b884f1984b5fd48788f8a1',
        forename: 'Perpetua',
        kind: 'natural-disqualification',
        links: {
          self: '/disqualified-officers/natural/_EmiRjOva2SxcAmYhL8nDM-ccPg'
        },
        nationality: 'Irish',
        other_forenames: 'Teresa',
        surname: 'HUGHES',
        title: 'Ms'
      }
    }
    await testRequests(
      testUrls.getNaturalOfficer.map((path) => ({ path })),
      schema
    )
  })
})
