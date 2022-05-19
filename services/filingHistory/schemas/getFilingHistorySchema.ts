import { FromSchema } from 'json-schema-to-ts'

export interface GetFilingHistoryParams {
  /** The company number that the single filing is required for. */
  company_number: string
  /** The transaction id that the filing history is required for. */
  transaction_id: string
}

export interface GetFilingHistoryQueryString {}

export const GetFilingHistorySchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        company_number: {
          type: 'string'
        },
        transaction_id: {
          type: 'string'
        }
      },
      required: ['company_number', 'transaction_id']
    },
    querystring: {
      type: 'object',
      properties: {},
      required: []
    },
    response: {
      '200': {
        title: 'filingHistoryItem',
        required: [],
        properties: {
          annotations: {
            description: 'Annotations for the filing',
            type: 'object',
            title: 'annotation',
            required: [],
            properties: {
              annotation: {
                description: 'The annotation text.',
                type: 'string'
              },
              date: {
                type: 'string',
                format: 'date',
                description: 'The date the annotation was added.'
              },
              description: {
                type: 'string',
                description:
                  'A description of the annotation.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.'
              }
            }
          },
          associated_filings: {
            description: 'Any filings associated with the current item',
            type: 'object',
            title: 'associatedFiling',
            required: [],
            properties: {
              date: {
                description: 'The date the associated filing was processed.',
                type: 'string',
                format: 'date'
              },
              description: {
                type: 'string',
                description:
                  'A description of the associated filing.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.'
              },
              type: {
                description: 'The type of the associated filing.',
                type: 'string'
              }
            }
          },
          barcode: {
            description: 'The barcode of the document.',
            type: 'string'
          },
          transaction_id: {
            description: 'The transaction ID of the filing.',
            type: 'string'
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
              'resolution'
            ],
            type: 'string'
          },
          date: {
            description: 'The date the filing was processed.',
            type: 'string',
            format: 'date'
          },
          description: {
            description:
              'A description of the filing.\n For enumeration descriptions see `description` section in the [enumeration mappings](https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.',
            type: 'string'
          },
          links: {
            description:
              'Links to other resources associated with this filing history item.',
            type: 'object',
            title: 'filingHistoryItemLinks',
            properties: {
              self: {
                description: 'Link to this filing history item.',
                type: 'string'
              },
              document_metadata: {
                description:
                  'Link to the document metadata associated with this filing history item. See the Document API documentation for more details.',
                type: 'string'
              }
            }
          },
          pages: {
            description:
              'Number of pages within the PDF document (links.document_metadata)',
            type: 'integer'
          },
          paper_filed: {
            description: 'If true, indicates this is a paper filing.',
            type: 'boolean'
          },
          resolutions: {
            description: 'Resolutions for the filing',
            type: 'object',
            title: 'resolution',
            required: [],
            properties: {
              category: {
                description: 'The category of the resolution filed.',
                enum: ['miscellaneous'],
                type: 'string'
              },
              description: {
                description:
                  'A description of the associated filing.\n For enumeration descriptions see `description` section in the [enumeration mappings] (https://github.com/companieshouse/api-enumerations/blob/master/filing_history_descriptions.yml) file.',
                type: 'string'
              },
              document_id: {
                description: 'The document id of the resolution.',
                type: 'string'
              },
              receive_date: {
                description: 'The date the resolution was processed.',
                type: 'string',
                format: 'date'
              },
              subcategory: {
                description: 'The sub-category of the document filed.',
                enum: ['resolution'],
                type: 'string'
              },
              type: {
                description: 'The type of the associated filing.',
                type: 'string'
              }
            }
          },
          subcategory: {
            description: 'The sub-category of the document filed.',
            enum: ['resolution'],
            type: 'string'
          },
          type: {
            description: 'The type of filing.',
            type: 'string'
          }
        },
        type: 'object'
      }
    }
  }
} as const

export type GetFilingHistoryResponse = FromSchema<
  typeof GetFilingHistorySchema['schema']['response']['200']
>
//export type GetFilingHistoryResponse = any // temporary until schemas can be fixed
