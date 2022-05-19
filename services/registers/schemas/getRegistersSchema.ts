import { FromSchema } from 'json-schema-to-ts'

export interface GetRegistersParams {
  /** The company number of the register information to return. */
  company_number: string
}

export interface GetRegistersQueryString {}

export const GetRegistersSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string',
        },
      },
      required: ['company_number'],
    },
    querystring: {
      type: 'object',
      properties: {},
      required: [],
    },
    response: {
      '200': {
        title: 'companyRegister',
        type: 'object',
        required: ['links', 'company_number', 'kind', 'registers'],
        properties: {
          links: {
            type: 'object',
            description:
              'A set of URLs related to the resource, including self.',
            title: 'linksType',
            required: ['self'],
            properties: {
              self: {
                description: 'The URL of the resource.',
                type: 'string',
              },
            },
          },
          company_number: {
            type: 'string',
            description: 'The number of the company.',
          },
          kind: {
            enum: ['registers'],
            type: 'string',
          },
          registers: {
            description: 'company registers information.',
            items: {
              title: 'registers',
              description: 'Registered company information',
              type: 'object',
              required: [
                'directors',
                'secretaries',
                'persons_with_significant_control',
                'usual_residential_address',
                'members',
              ],
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
                      type: 'string',
                    },
                    items: {
                      type: 'object',
                      title: 'registeredItems',
                      required: ['register_moved_to', 'moved_on', 'links'],
                      properties: {
                        moved_on: {
                          description: 'The date registered on',
                          type: 'string',
                          format: 'date',
                        },
                        register_moved_to: {
                          description: 'Location of registration',
                          type: 'string',
                          enum: [
                            'public-register',
                            'registered-office',
                            'single-alternative-inspection-location',
                            'unspecified-location',
                          ],
                        },
                        links: {
                          description: 'A set of URLs related to the resource.',
                          items: {
                            title: 'linksItems',
                            required: ['filing'],
                            properties: {
                              filing: {
                                description:
                                  'The URL of the transaction for the resource.',
                                type: 'string',
                              },
                            },
                          },
                          type: 'object',
                        },
                      },
                    },
                    links: {
                      description: 'A set of URLs related to the resource.',
                      type: 'object',
                      items: {
                        title: 'linksDirectorsRegister',
                        properties: {
                          directors_register: {
                            description: 'The URL for the resource.',
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
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
                      type: 'string',
                    },
                    items: {
                      type: 'object',
                      title: 'registeredItems',
                      required: ['register_moved_to', 'moved_on', 'links'],
                      properties: {
                        moved_on: {
                          description: 'The date registered on',
                          type: 'string',
                          format: 'date',
                        },
                        register_moved_to: {
                          description: 'Location of registration',
                          type: 'string',
                          enum: [
                            'public-register',
                            'registered-office',
                            'single-alternative-inspection-location',
                            'unspecified-location',
                          ],
                        },
                        links: {
                          description: 'A set of URLs related to the resource.',
                          items: {
                            title: 'linksItems',
                            required: ['filing'],
                            properties: {
                              filing: {
                                description:
                                  'The URL of the transaction for the resource.',
                                type: 'string',
                              },
                            },
                          },
                          type: 'object',
                        },
                      },
                    },
                    links: {
                      description: 'A set of URLs related to the resource.',
                      type: 'object',
                      items: {
                        title: 'linksSecretaryRegister',
                        properties: {
                          secretaries_register: {
                            description: 'The URL for the resource.',
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
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
                      type: 'string',
                    },
                    items: {
                      type: 'object',
                      title: 'registeredItems',
                      required: ['register_moved_to', 'moved_on', 'links'],
                      properties: {
                        moved_on: {
                          description: 'The date registered on',
                          type: 'string',
                          format: 'date',
                        },
                        register_moved_to: {
                          description: 'Location of registration',
                          type: 'string',
                          enum: [
                            'public-register',
                            'registered-office',
                            'single-alternative-inspection-location',
                            'unspecified-location',
                          ],
                        },
                        links: {
                          description: 'A set of URLs related to the resource.',
                          items: {
                            title: 'linksItems',
                            required: ['filing'],
                            properties: {
                              filing: {
                                description:
                                  'The URL of the transaction for the resource.',
                                type: 'string',
                              },
                            },
                          },
                          type: 'object',
                        },
                      },
                    },
                    links: {
                      description: 'A set of URLs related to the resource.',
                      type: 'object',
                      items: {
                        title: 'linksPersonsWithSignificantControlRegister',
                        properties: {
                          persons_with_significant_control_register: {
                            description: 'The URL for the resource.',
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
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
                      type: 'string',
                    },
                    items: {
                      type: 'object',
                      title: 'registeredItems',
                      required: ['register_moved_to', 'moved_on', 'links'],
                      properties: {
                        moved_on: {
                          description: 'The date registered on',
                          type: 'string',
                          format: 'date',
                        },
                        register_moved_to: {
                          description: 'Location of registration',
                          type: 'string',
                          enum: [
                            'public-register',
                            'registered-office',
                            'single-alternative-inspection-location',
                            'unspecified-location',
                          ],
                        },
                        links: {
                          description: 'A set of URLs related to the resource.',
                          items: {
                            title: 'linksItems',
                            required: ['filing'],
                            properties: {
                              filing: {
                                description:
                                  'The URL of the transaction for the resource.',
                                type: 'string',
                              },
                            },
                          },
                          type: 'object',
                        },
                      },
                    },
                    links: {
                      description: 'A set of URLs related to the resource.',
                      type: 'object',
                      items: {
                        title: 'linksListUsualResidentialAddress',
                        properties: {
                          usual_residential_address: {
                            description: 'The URL for the resource.',
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
                },
                llp_usual_residential_address: {
                  description: 'List of register addresses.',
                  type: 'object',
                  title: 'registerListLLPUsualResidentialAddress',
                  properties: {
                    register_type: {
                      description: 'The register type.',
                      enum: ['llp-usual-residential-address'],
                      type: 'string',
                    },
                    items: {
                      type: 'object',
                      title: 'registeredItems',
                      required: ['register_moved_to', 'moved_on', 'links'],
                      properties: {
                        moved_on: {
                          description: 'The date registered on',
                          type: 'string',
                          format: 'date',
                        },
                        register_moved_to: {
                          description: 'Location of registration',
                          type: 'string',
                          enum: [
                            'public-register',
                            'registered-office',
                            'single-alternative-inspection-location',
                            'unspecified-location',
                          ],
                        },
                        links: {
                          description: 'A set of URLs related to the resource.',
                          items: {
                            title: 'linksItems',
                            required: ['filing'],
                            properties: {
                              filing: {
                                description:
                                  'The URL of the transaction for the resource.',
                                type: 'string',
                              },
                            },
                          },
                          type: 'object',
                        },
                      },
                    },
                    links: {
                      description: 'A set of URLs related to the resource.',
                      items: {
                        title: 'linksListLLPUsualResidentialAddress',
                        properties: {
                          llp_usual_residential_address: {
                            description: 'The URL for the resource.',
                            type: 'string',
                          },
                        },
                      },
                      type: 'object',
                    },
                  },
                  required: ['register_type', 'items'],
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
                      type: 'string',
                    },
                    items: {
                      type: 'object',
                      title: 'registeredItems',
                      required: ['register_moved_to', 'moved_on', 'links'],
                      properties: {
                        moved_on: {
                          description: 'The date registered on',
                          type: 'string',
                          format: 'date',
                        },
                        register_moved_to: {
                          description: 'Location of registration',
                          type: 'string',
                          enum: [
                            'public-register',
                            'registered-office',
                            'single-alternative-inspection-location',
                            'unspecified-location',
                          ],
                        },
                        links: {
                          description: 'A set of URLs related to the resource.',
                          items: {
                            title: 'linksItems',
                            required: ['filing'],
                            properties: {
                              filing: {
                                description:
                                  'The URL of the transaction for the resource.',
                                type: 'string',
                              },
                            },
                          },
                          type: 'object',
                        },
                      },
                    },
                    links: {
                      description: 'A set of URLs related to the resource.',
                      type: 'object',
                      items: {
                        title: 'linksListMembers',
                        properties: {
                          members: {
                            description: 'The URL for the resource.',
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
                },
                llp_members: {
                  description: 'List of registered llp members.',
                  type: 'object',
                  title: 'registerListLLPMembers',
                  properties: {
                    register_type: {
                      description: 'The register type.',
                      enum: ['llp-members'],
                      type: 'string',
                    },
                    items: {
                      type: 'object',
                      title: 'registeredItems',
                      required: ['register_moved_to', 'moved_on', 'links'],
                      properties: {
                        moved_on: {
                          description: 'The date registered on',
                          type: 'string',
                          format: 'date',
                        },
                        register_moved_to: {
                          description: 'Location of registration',
                          type: 'string',
                          enum: [
                            'public-register',
                            'registered-office',
                            'single-alternative-inspection-location',
                            'unspecified-location',
                          ],
                        },
                        links: {
                          description: 'A set of URLs related to the resource.',
                          items: {
                            title: 'linksItems',
                            required: ['filing'],
                            properties: {
                              filing: {
                                description:
                                  'The URL of the transaction for the resource.',
                                type: 'string',
                              },
                            },
                          },
                          type: 'object',
                        },
                      },
                    },
                    links: {
                      description: 'A set of URLs related to the resource.',
                      items: {
                        title: 'linksListLLPMembers',
                        properties: {
                          llp_members: {
                            description: 'The URL for the resource.',
                            type: 'string',
                          },
                        },
                      },
                      type: 'object',
                    },
                  },
                  required: ['register_type', 'items'],
                },
              },
            },
          },
          etag: {
            description: 'The ETag of the resource.',
            type: 'string',
          },
        },
      },
    },
  },
} as const

export type GetRegistersResponse = FromSchema<
  typeof GetRegistersSchema['schema']['response']['200']
>
//export type GetRegistersResponse = any // temporary until schemas can be fixed
