import { FromSchema } from 'json-schema-to-ts'

export interface ListFilingHistoryParams {
  /** The company number that the filing history is required for. */
  company_number: string
}

export interface ListFilingHistoryQueryString {
  /** One or more comma-separated categories to filter by (inclusive). */
  category?: string
  /** The number of filing history items to return per page. */
  items_per_page?: number
  /** The index into the entire result set that this result page starts. */
  start_index?: number
}

export const ListFilingHistorySchema = {
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
      properties: {
        category: {
          type: 'string',
        },
        items_per_page: {
          type: 'integer',
        },
        start_index: {
          type: 'integer',
        },
      },
      required: [],
    },
    response: {
      '200': {
        title: 'filingHistoryList',
        required: [
          'etag',
          'items',
          'items_per_page',
          'kind',
          'start_index',
          'total_count',
        ],
        properties: {
          filing_history_status: {
            description: 'The status of this filing history.',
            type: 'string',
            enum: ['filing-history-available'],
          },
          etag: {
            description: 'The ETag of the resource.',
            type: 'string',
          },
          items: {
            description: 'The filing history items.',
            type: 'object',
            title: 'filingHistoryItem',
            required: [
              'category',
              'date',
              'description',
              'type',
              'transaction_id',
            ],
            properties: {
              annotations: {
                description: 'Annotations for the filing',
                items: {
                  title: 'annotation',
                  required: ['date', 'description'],
                  properties: {
                    annotation: {
                      description: 'The annotation text.',
                      type: 'string',
                    },
                    date: {
                      type: 'string',
                      format: 'date',
                      description: 'The date the annotation was added.',
                    },
                    description: {
                      type: 'string',
                      description:
                        'A description of the annotation.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.',
                    },
                  },
                },
                type: 'array',
              },
              associated_filings: {
                description: 'Any filings associated with the current item',
                items: {
                  title: 'associatedFiling',
                  required: ['date', 'description', 'type'],
                  properties: {
                    date: {
                      description:
                        'The date the associated filing was processed.',
                      type: 'string',
                      format: 'date',
                    },
                    description: {
                      type: 'string',
                      description:
                        'A description of the associated filing.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.',
                    },
                    type: {
                      description: 'The type of the associated filing.',
                      type: 'string',
                    },
                  },
                },
                type: 'array',
              },
              barcode: {
                description: 'The barcode of the document.',
                type: 'string',
              },
              transaction_id: {
                description: 'The transaction ID of the filing.',
                type: 'string',
              },
              category: {
                description: 'The category of the document filed.',
                enum: [
                  'accounts',
                  'address',
                  'annual-return',
                  'capital',
                  'change-of-name',
                  'incorporation',
                  'liquidation',
                  'miscellaneous',
                  'mortgage',
                  'officers',
                  'resolution',
                ],
                type: 'string',
              },
              date: {
                description: 'The date the filing was processed.',
                type: 'string',
                format: 'date',
              },
              description: {
                description:
                  'A description of the filing.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.',
                type: 'string',
              },
              links: {
                description:
                  'Links to other resources associated with this filing history item.',
                type: 'object',
                items: {
                  title: 'filingHistoryItemLinks',
                  properties: {
                    self: {
                      description: 'Link to this filing history item.',
                      type: 'string',
                    },
                    document_metadata: {
                      description:
                        'Link to the document metadata associated with this filing history item. See the Document API documentation for more details.',
                      type: 'string',
                    },
                  },
                },
              },
              pages: {
                description:
                  'Number of pages within the PDF document (links.document_metadata)',
                type: 'integer',
              },
              paper_filed: {
                description: 'If true, indicates this is a paper filing.',
                type: 'boolean',
              },
              resolutions: {
                description: 'Resolutions for the filing',
                items: {
                  title: 'resolution',
                  required: [
                    'category',
                    'description',
                    'receive_date',
                    'subcategory',
                    'type',
                  ],
                  properties: {
                    category: {
                      description: 'The category of the resolution filed.',
                      enum: ['miscellaneous'],
                      type: 'string',
                    },
                    description: {
                      description:
                        'A description of the associated filing.\n For enumeration descriptions see `description` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.',
                      type: 'string',
                    },
                    document_id: {
                      description: 'The document id of the resolution.',
                      type: 'string',
                    },
                    receive_date: {
                      description: 'The date the resolution was processed.',
                      type: 'string',
                      format: 'date',
                    },
                    subcategory: {
                      description: 'The sub-category of the document filed.',
                      enum: ['resolution'],
                      type: 'string',
                    },
                    type: {
                      description: 'The type of the associated filing.',
                      type: 'string',
                    },
                  },
                },
                type: 'array',
              },
              subcategory: {
                description: 'The sub-category of the document filed.',
                enum: ['resolution'],
                type: 'string',
              },
              type: {
                description: 'The type of filing.',
                type: 'string',
              },
            },
          },
          items_per_page: {
            description:
              'The number of filing history items returned per page.',
            type: 'integer',
          },
          kind: {
            description: 'Indicates this resource is a filing history.',
            enum: ['filing-history'],
            type: 'string',
          },
          start_index: {
            description:
              'The index into the entire result set that this result page starts.',
            type: 'integer',
          },
          total_count: {
            description:
              'The total number of filing history items for this company.',
            type: 'integer',
          },
        },
        type: 'object',
      },
    },
  },
} as const

export type ListFilingHistoryResponse = FromSchema<
  typeof ListFilingHistorySchema['schema']['response']['200']
>
//export type ListFilingHistoryResponse = any // temporary until schemas can be fixed
