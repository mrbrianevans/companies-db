import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('registers-service', function () {
  // tests for each path
  it('getRegisters: /company/{company_number}/registers', async function () {
    const schema = {
      type: 'object',
      properties: {
        kind: { type: 'string' },
        links: {
          type: 'object',
          properties: { self: { type: 'string' } },
          required: ['self']
        },
        registers: {
          type: 'object',
          properties: {
            members: {
              type: 'object',
              properties: {
                register_type: { type: 'string' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      register_moved_to: { type: 'string' },
                      moved_on: { type: 'string' },
                      links: {
                        type: 'object',
                        properties: { filing: { type: 'string' } },
                        required: ['filing']
                      }
                    },
                    required: ['register_moved_to', 'moved_on']
                  }
                }
              },
              required: ['register_type', 'items']
            },
            directors: {
              type: 'object',
              properties: {
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      moved_on: { type: 'string' },
                      register_moved_to: { type: 'string' },
                      links: {
                        type: 'object',
                        properties: { filing: { type: 'string' } },
                        required: ['filing']
                      }
                    },
                    required: ['moved_on', 'register_moved_to']
                  }
                },
                register_type: { type: 'string' },
                links: {
                  type: 'object',
                  properties: { directors_register: { type: 'string' } },
                  required: ['directors_register']
                }
              },
              required: ['items', 'register_type']
            },
            secretaries: {
              type: 'object',
              properties: {
                register_type: { type: 'string' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      moved_on: { type: 'string' },
                      register_moved_to: { type: 'string' }
                    },
                    required: ['moved_on', 'register_moved_to']
                  }
                },
                links: {
                  type: 'object',
                  properties: { secretaries_register: { type: 'string' } },
                  required: ['secretaries_register']
                }
              },
              required: ['register_type', 'items']
            },
            persons_with_significant_control: {
              type: 'object',
              properties: {
                register_type: { type: 'string' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      moved_on: { type: 'string' },
                      register_moved_to: { type: 'string' },
                      links: {
                        type: 'object',
                        properties: { filing: { type: 'string' } },
                        required: ['filing']
                      }
                    },
                    required: ['moved_on', 'register_moved_to']
                  }
                },
                links: {
                  type: 'object',
                  properties: {
                    persons_with_significant_control_register: {
                      type: 'string'
                    }
                  },
                  required: ['persons_with_significant_control_register']
                }
              },
              required: ['register_type', 'items']
            },
            usual_residential_address: {
              type: 'object',
              properties: {
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      register_moved_to: { type: 'string' },
                      moved_on: { type: 'string' }
                    },
                    required: ['register_moved_to', 'moved_on']
                  }
                },
                register_type: { type: 'string' }
              },
              required: ['items', 'register_type']
            },
            llp_members: {
              type: 'object',
              properties: {
                links: {
                  type: 'object',
                  properties: { llp_members_register: { type: 'string' } },
                  required: ['llp_members_register']
                },
                register_type: { type: 'string' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      moved_on: { type: 'string' },
                      register_moved_to: { type: 'string' }
                    },
                    required: ['moved_on', 'register_moved_to']
                  }
                }
              },
              required: ['register_type', 'items']
            }
          }
        }
      },
      required: ['kind', 'links', 'registers'],
      additionalProperties: false,
      title: 'getCompanyRegister',
      example: {
        kind: 'registers',
        links: { self: '/company/12638402/registers' },
        registers: {
          members: {
            register_type: 'members',
            items: [
              {
                register_moved_to: 'unspecified-location',
                moved_on: '2021-06-11'
              }
            ]
          },
          directors: {
            items: [
              {
                moved_on: '2021-06-11',
                register_moved_to: 'unspecified-location'
              }
            ],
            register_type: 'directors'
          },
          secretaries: {
            register_type: 'secretaries',
            items: [
              {
                moved_on: '2021-06-11',
                register_moved_to: 'unspecified-location'
              }
            ]
          },
          persons_with_significant_control: {
            register_type: 'persons-with-significant-control',
            items: [
              {
                moved_on: '2021-06-11',
                register_moved_to: 'unspecified-location'
              }
            ]
          }
        }
      }
    }
    await testRequests(
      testUrls.getRegisters.map((path) => ({ path })),
      schema
    )
  })
})
