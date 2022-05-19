import * as TestRequests from '../getTestRequests'
import { testRequests } from '../testRequests'
fetch('http://localhost:3000').catch() //to remove warning about fetch being experimental from test results

describe('registers-service', function () {
  // tests for each path
  it('getRegisters: /company/{company_number}/registers', async function () {
    const schema = {
      title: 'companyRegister',
      type: 'object',
      required: [],
      properties: {
        links: {
          type: 'object',
          description: 'A set of URLs related to the resource, including self.',
          title: 'linksType',
          required: [],
          properties: {
            self: { description: 'The URL of the resource.', type: 'string' }
          }
        },
        company_number: {
          type: 'string',
          description: 'The number of the company.'
        },
        kind: { enum: ['registers'], type: 'string' },
        registers: {
          description: 'company registers information.',
          items: {
            title: 'registers',
            description: 'Registered company information',
            type: 'object',
            required: [],
            properties: {
              directors: {
                description: 'List of registered company directors.',
                type: 'object',
                title: 'registerListDirectors',
                required: [],
                properties: {
                  register_type: {
                    description: 'The register type.',
                    enum: ['directors'],
                    type: 'string'
                  },
                  items: {
                    items: {
                      title: 'registeredItems',
                      required: [],
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
                          description: 'A set of URLs related to the resource.',
                          type: 'object',
                          title: 'linksItems',
                          required: [],
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
                required: [],
                properties: {
                  register_type: {
                    description: 'The register type.',
                    enum: ['secretaries'],
                    type: 'string'
                  },
                  items: {
                    items: {
                      title: 'registeredItems',
                      required: [],
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
                          description: 'A set of URLs related to the resource.',
                          type: 'object',
                          title: 'linksItems',
                          required: [],
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
                required: [],
                properties: {
                  register_type: {
                    description: 'The register type.',
                    enum: ['persons-with-significant-control'],
                    type: 'string'
                  },
                  items: {
                    items: {
                      title: 'registeredItems',
                      required: [],
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
                          description: 'A set of URLs related to the resource.',
                          type: 'object',
                          title: 'linksItems',
                          required: [],
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
                required: [],
                properties: {
                  register_type: {
                    description: 'The register type.',
                    enum: ['usual-residential-address'],
                    type: 'string'
                  },
                  items: {
                    items: {
                      title: 'registeredItems',
                      required: [],
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
                          description: 'A set of URLs related to the resource.',
                          type: 'object',
                          title: 'linksItems',
                          required: [],
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
                      required: [],
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
                          description: 'A set of URLs related to the resource.',
                          type: 'object',
                          title: 'linksItems',
                          required: [],
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
                required: []
              },
              members: {
                description: 'List of registered company members..',
                type: 'object',
                title: 'registerListMembers',
                required: [],
                properties: {
                  register_type: {
                    description: 'The register type.',
                    enum: ['members'],
                    type: 'string'
                  },
                  items: {
                    items: {
                      title: 'registeredItems',
                      required: [],
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
                          description: 'A set of URLs related to the resource.',
                          type: 'object',
                          title: 'linksItems',
                          required: [],
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
                      required: [],
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
                          description: 'A set of URLs related to the resource.',
                          type: 'object',
                          title: 'linksItems',
                          required: [],
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
                required: []
              }
            }
          },
          type: 'array'
        },
        etag: { description: 'The ETag of the resource.', type: 'string' }
      }
    }
    await testRequests(TestRequests.getRegistersReqs, schema)
  })
})
