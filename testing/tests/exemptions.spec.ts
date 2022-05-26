import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('exemptions-service', function () {
  // tests for each path
  it('getExemptions: /company/{company_number}/exemptions', async function () {
    const schema = {
      type: 'object',
      properties: {
        etag: { type: 'string' },
        exemptions: {
          type: 'object',
          properties: {
            psc_exempt_as_trading_on_regulated_market: {
              type: 'object',
              properties: {
                exemption_type: { type: 'string' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      exempt_to: { type: 'string' },
                      exempt_from: { type: 'string' }
                    },
                    required: ['exempt_to', 'exempt_from']
                  }
                }
              },
              required: ['exemption_type', 'items']
            },
            disclosure_transparency_rules_chapter_five_applies: {
              type: 'object',
              properties: {
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      exempt_from: { type: 'string' },
                      exempt_to: { type: 'string' }
                    },
                    required: ['exempt_from', 'exempt_to']
                  }
                },
                exemption_type: { type: 'string' }
              },
              required: ['items', 'exemption_type']
            },
            psc_exempt_as_trading_on_uk_regulated_market: {
              type: 'object',
              properties: {
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      exempt_from: { type: 'string' },
                      exempt_to: { type: 'string' }
                    },
                    required: ['exempt_from']
                  }
                },
                exemption_type: { type: 'string' }
              },
              required: ['items', 'exemption_type']
            },
            psc_exempt_as_trading_on_eu_regulated_market: {
              type: 'object',
              properties: {
                exemption_type: { type: 'string' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      exempt_from: { type: 'string' },
                      exempt_to: { type: 'string' }
                    },
                    required: ['exempt_from', 'exempt_to']
                  }
                }
              },
              required: ['exemption_type', 'items']
            }
          }
        },
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        }
      },
      required: ['etag', 'exemptions', 'kind', 'links'],
      additionalProperties: false,
      title: 'getExemptions',
      example: {
        etag: 'd427c6d903475de1b7d15e352ece0b1e0ac99554',
        exemptions: {
          psc_exempt_as_trading_on_regulated_market: {
            exemption_type: 'psc-exempt-as-trading-on-regulated-market',
            items: [{ exempt_to: '2021-08-13', exempt_from: '2017-08-13' }]
          },
          disclosure_transparency_rules_chapter_five_applies: {
            items: [{ exempt_from: '2016-08-13', exempt_to: '2021-08-24' }],
            exemption_type: 'disclosure-transparency-rules-chapter-five-applies'
          },
          psc_exempt_as_trading_on_uk_regulated_market: {
            items: [{ exempt_from: '2021-08-13' }],
            exemption_type: 'psc-exempt-as-trading-on-uk-regulated-market'
          }
        },
        kind: 'exemptions',
        links: { self: '/company/00084492/exemptions' }
      }
    }
    await testRequests(
      testUrls.getExemptions.map((path) => ({ path })),
      schema
    )
  })
})
