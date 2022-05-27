import testUrls from '../testUrls.json' assert { type: 'json' }
import { testRequests } from '../testRequests'
fetch('https://httpbin.org/get').catch((e) => e) //to remove warning about fetch being experimental from test results

describe('registers-service', function () {
  this.timeout(50000)
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
          anyOf: [
            {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  directors: {
                    description: 'List of registered company directors.',
                    type: 'object',
                    title: 'registerListDirectors',
                    required: ['register_type', 'items'],
                    properties: {
                      register_type: {
                        description: 'The register type.',
                        enum: ['directors'],
                        type: 'string'
                      },
                      items: {
                        items: {
                          title: 'registeredItems',
                          required: ['register_moved_to', 'moved_on', 'links'],
                          properties: {
                            moved_on: {
                              description: 'The date registered on',
                              type: 'string',
                              format: 'date'
                            },
                            register_moved_to: {
                              description: 'Location of registration',
                              type: 'string',
                              enum: [
                                'public-register',
                                'registered-office',
                                'single-alternative-inspection-location',
                                'unspecified-location'
                              ]
                            },
                            links: {
                              description:
                                'A set of URLs related to the resource.',
                              type: 'object',
                              title: 'linksItems',
                              required: ['filing'],
                              properties: {
                                filing: {
                                  description:
                                    'The URL of the transaction for the resource.',
                                  type: 'string'
                                }
                              }
                            }
                          },
                          type: 'object'
                        },
                        type: 'array'
                      },
                      links: {
                        description: 'A set of URLs related to the resource.',
                        type: 'object',
                        title: 'linksDirectorsRegister',
                        properties: {
                          directors_register: {
                            description: 'The URL for the resource.',
                            type: 'string'
                          }
                        }
                      }
                    }
                  },
                  secretaries: {
                    description: 'List of registered company secretaries.',
                    type: 'object',
                    title: 'registerListSecretaries',
                    required: ['register_type', 'items'],
                    properties: {
                      register_type: {
                        description: 'The register type.',
                        enum: ['secretaries'],
                        type: 'string'
                      },
                      items: {
                        items: {
                          title: 'registeredItems',
                          required: ['register_moved_to', 'moved_on', 'links'],
                          properties: {
                            moved_on: {
                              description: 'The date registered on',
                              type: 'string',
                              format: 'date'
                            },
                            register_moved_to: {
                              description: 'Location of registration',
                              type: 'string',
                              enum: [
                                'public-register',
                                'registered-office',
                                'single-alternative-inspection-location',
                                'unspecified-location'
                              ]
                            },
                            links: {
                              description:
                                'A set of URLs related to the resource.',
                              type: 'object',
                              title: 'linksItems',
                              required: ['filing'],
                              properties: {
                                filing: {
                                  description:
                                    'The URL of the transaction for the resource.',
                                  type: 'string'
                                }
                              }
                            }
                          },
                          type: 'object'
                        },
                        type: 'array'
                      },
                      links: {
                        description: 'A set of URLs related to the resource.',
                        type: 'object',
                        title: 'linksSecretaryRegister',
                        properties: {
                          secretaries_register: {
                            description: 'The URL for the resource.',
                            type: 'string'
                          }
                        }
                      }
                    }
                  },
                  persons_with_significant_control: {
                    description:
                      'List of registered company persons with significant control.',
                    type: 'object',
                    title: 'registerListPersonsWithSignificantControl',
                    required: ['register_type', 'items'],
                    properties: {
                      register_type: {
                        description: 'The register type.',
                        enum: ['persons-with-significant-control'],
                        type: 'string'
                      },
                      items: {
                        items: {
                          title: 'registeredItems',
                          required: ['register_moved_to', 'moved_on', 'links'],
                          properties: {
                            moved_on: {
                              description: 'The date registered on',
                              type: 'string',
                              format: 'date'
                            },
                            register_moved_to: {
                              description: 'Location of registration',
                              type: 'string',
                              enum: [
                                'public-register',
                                'registered-office',
                                'single-alternative-inspection-location',
                                'unspecified-location'
                              ]
                            },
                            links: {
                              description:
                                'A set of URLs related to the resource.',
                              type: 'object',
                              title: 'linksItems',
                              required: ['filing'],
                              properties: {
                                filing: {
                                  description:
                                    'The URL of the transaction for the resource.',
                                  type: 'string'
                                }
                              }
                            }
                          },
                          type: 'object'
                        },
                        type: 'array'
                      },
                      links: {
                        description: 'A set of URLs related to the resource.',
                        type: 'object',
                        title: 'linksPersonsWithSignificantControlRegister',
                        properties: {
                          persons_with_significant_control_register: {
                            description: 'The URL for the resource.',
                            type: 'string'
                          }
                        }
                      }
                    }
                  },
                  usual_residential_address: {
                    description: 'List of register addresses.',
                    type: 'object',
                    title: 'registerListUsualResidentialAddress',
                    required: ['register_type', 'items'],
                    properties: {
                      register_type: {
                        description: 'The register type.',
                        enum: ['usual-residential-address'],
                        type: 'string'
                      },
                      items: {
                        items: {
                          title: 'registeredItems',
                          required: ['register_moved_to', 'moved_on', 'links'],
                          properties: {
                            moved_on: {
                              description: 'The date registered on',
                              type: 'string',
                              format: 'date'
                            },
                            register_moved_to: {
                              description: 'Location of registration',
                              type: 'string',
                              enum: [
                                'public-register',
                                'registered-office',
                                'single-alternative-inspection-location',
                                'unspecified-location'
                              ]
                            },
                            links: {
                              description:
                                'A set of URLs related to the resource.',
                              type: 'object',
                              title: 'linksItems',
                              required: ['filing'],
                              properties: {
                                filing: {
                                  description:
                                    'The URL of the transaction for the resource.',
                                  type: 'string'
                                }
                              }
                            }
                          },
                          type: 'object'
                        },
                        type: 'array'
                      },
                      links: {
                        description: 'A set of URLs related to the resource.',
                        type: 'object',
                        title: 'linksListUsualResidentialAddress',
                        properties: {
                          usual_residential_address: {
                            description: 'The URL for the resource.',
                            type: 'string'
                          }
                        }
                      }
                    }
                  },
                  llp_usual_residential_address: {
                    description: 'List of register addresses.',
                    type: 'object',
                    title: 'registerListLLPUsualResidentialAddress',
                    properties: {
                      register_type: {
                        description: 'The register type.',
                        enum: ['llp-usual-residential-address'],
                        type: 'string'
                      },
                      items: {
                        items: {
                          title: 'registeredItems',
                          required: ['register_moved_to', 'moved_on', 'links'],
                          properties: {
                            moved_on: {
                              description: 'The date registered on',
                              type: 'string',
                              format: 'date'
                            },
                            register_moved_to: {
                              description: 'Location of registration',
                              type: 'string',
                              enum: [
                                'public-register',
                                'registered-office',
                                'single-alternative-inspection-location',
                                'unspecified-location'
                              ]
                            },
                            links: {
                              description:
                                'A set of URLs related to the resource.',
                              type: 'object',
                              title: 'linksItems',
                              required: ['filing'],
                              properties: {
                                filing: {
                                  description:
                                    'The URL of the transaction for the resource.',
                                  type: 'string'
                                }
                              }
                            }
                          },
                          type: 'object'
                        },
                        type: 'array'
                      },
                      links: {
                        description: 'A set of URLs related to the resource.',
                        type: 'object',
                        title: 'linksListLLPUsualResidentialAddress',
                        properties: {
                          llp_usual_residential_address: {
                            description: 'The URL for the resource.',
                            type: 'string'
                          }
                        }
                      }
                    },
                    required: ['register_type', 'items']
                  },
                  members: {
                    description: 'List of registered company members..',
                    type: 'object',
                    title: 'registerListMembers',
                    required: ['register_type', 'items'],
                    properties: {
                      register_type: {
                        description: 'The register type.',
                        enum: ['members'],
                        type: 'string'
                      },
                      items: {
                        items: {
                          title: 'registeredItems',
                          required: ['register_moved_to', 'moved_on', 'links'],
                          properties: {
                            moved_on: {
                              description: 'The date registered on',
                              type: 'string',
                              format: 'date'
                            },
                            register_moved_to: {
                              description: 'Location of registration',
                              type: 'string',
                              enum: [
                                'public-register',
                                'registered-office',
                                'single-alternative-inspection-location',
                                'unspecified-location'
                              ]
                            },
                            links: {
                              description:
                                'A set of URLs related to the resource.',
                              type: 'object',
                              title: 'linksItems',
                              required: ['filing'],
                              properties: {
                                filing: {
                                  description:
                                    'The URL of the transaction for the resource.',
                                  type: 'string'
                                }
                              }
                            }
                          },
                          type: 'object'
                        },
                        type: 'array'
                      },
                      links: {
                        description: 'A set of URLs related to the resource.',
                        type: 'object',
                        title: 'linksListMembers',
                        properties: {
                          members: {
                            description: 'The URL for the resource.',
                            type: 'string'
                          }
                        }
                      }
                    }
                  },
                  llp_members: {
                    description: 'List of registered llp members.',
                    type: 'object',
                    title: 'registerListLLPMembers',
                    properties: {
                      register_type: {
                        description: 'The register type.',
                        enum: ['llp-members'],
                        type: 'string'
                      },
                      items: {
                        items: {
                          title: 'registeredItems',
                          required: ['register_moved_to', 'moved_on', 'links'],
                          properties: {
                            moved_on: {
                              description: 'The date registered on',
                              type: 'string',
                              format: 'date'
                            },
                            register_moved_to: {
                              description: 'Location of registration',
                              type: 'string',
                              enum: [
                                'public-register',
                                'registered-office',
                                'single-alternative-inspection-location',
                                'unspecified-location'
                              ]
                            },
                            links: {
                              description:
                                'A set of URLs related to the resource.',
                              type: 'object',
                              title: 'linksItems',
                              required: ['filing'],
                              properties: {
                                filing: {
                                  description:
                                    'The URL of the transaction for the resource.',
                                  type: 'string'
                                }
                              }
                            }
                          },
                          type: 'object'
                        },
                        type: 'array'
                      },
                      links: {
                        description: 'A set of URLs related to the resource.',
                        type: 'object',
                        title: 'linksListLLPMembers',
                        properties: {
                          llp_members: {
                            description: 'The URL for the resource.',
                            type: 'string'
                          }
                        }
                      }
                    },
                    required: ['register_type', 'items']
                  }
                },
                required: [
                  'directors',
                  'secretaries',
                  'persons_with_significant_control',
                  'usual_residential_address',
                  'members'
                ]
              }
            },
            {
              type: 'object',
              properties: {
                members: {
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
                    register_type: { type: 'string' }
                  },
                  required: ['items', 'register_type']
                },
                directors: {
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
                    },
                    links: {
                      type: 'object',
                      properties: { directors_register: { type: 'string' } },
                      required: ['directors_register']
                    }
                  },
                  required: ['register_type', 'items']
                },
                secretaries: {
                  type: 'object',
                  properties: {
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
                    register_type: { type: 'string' },
                    links: {
                      type: 'object',
                      properties: { secretaries_register: { type: 'string' } },
                      required: ['secretaries_register']
                    }
                  },
                  required: ['items', 'register_type']
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
                    register_type: { type: 'string' },
                    links: {
                      type: 'object',
                      properties: { llp_members_register: { type: 'string' } },
                      required: ['llp_members_register']
                    }
                  },
                  required: ['items', 'register_type']
                }
              }
            }
          ]
        },
        company_number: {
          type: 'string',
          description: 'The number of the company.'
        },
        etag: { description: 'The ETag of the resource.', type: 'string' }
      },
      required: ['kind', 'links', 'registers'],
      additionalProperties: false,
      title: 'getRegisters',
      example: {
        kind: 'registers',
        links: { self: '/company/13258899/registers' },
        registers: {
          members: {
            items: [
              {
                moved_on: '2021-07-31',
                register_moved_to: 'unspecified-location'
              }
            ],
            register_type: 'members'
          },
          directors: {
            register_type: 'directors',
            items: [
              {
                register_moved_to: 'unspecified-location',
                moved_on: '2021-07-31'
              }
            ]
          },
          secretaries: {
            items: [
              {
                moved_on: '2021-07-31',
                register_moved_to: 'unspecified-location'
              }
            ],
            register_type: 'secretaries'
          },
          persons_with_significant_control: {
            register_type: 'persons-with-significant-control',
            items: [
              {
                moved_on: '2021-07-31',
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
