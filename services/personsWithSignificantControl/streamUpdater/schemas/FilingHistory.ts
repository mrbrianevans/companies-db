
  import {FromSchema} from "json-schema-to-ts";
  
  export const FilingHistorySchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "filing-history"
    },
    "resource_uri": {
      "type": "string"
    },
    "resource_id": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "barcode": {
          "type": "string"
        },
        "category": {
          "type": "string"
        },
        "date": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "description_values": {
          "type": "object",
          "properties": {
            "made_up_date": {
              "type": "string"
            },
            "capital": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "currency": {
                    "type": "string"
                  },
                  "figure": {
                    "type": "string"
                  },
                  "date": {
                    "type": "string"
                  }
                },
                "required": [
                  "currency",
                  "figure"
                ]
              }
            },
            "date": {
              "type": "string"
            },
            "new_date": {
              "type": "string"
            },
            "change_date": {
              "type": "string"
            },
            "officer_name": {
              "type": "string"
            },
            "charge_number": {
              "type": "string"
            },
            "new_address": {
              "type": "string"
            },
            "old_address": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "notification_date": {
              "type": "string"
            },
            "psc_name": {
              "type": "string"
            },
            "termination_date": {
              "type": "string"
            },
            "appointment_date": {
              "type": "string"
            },
            "cessation_date": {
              "type": "string"
            },
            "charge_creation_date": {
              "type": "string"
            },
            "brought_down_date": {
              "type": "string"
            },
            "default_address": {
              "type": "string"
            },
            "branch_number": {
              "type": "string"
            },
            "close_date": {
              "type": "string"
            },
            "company_number": {
              "type": "string"
            },
            "withdrawal_date": {
              "type": "string"
            },
            "change_address": {
              "type": "string"
            },
            "change_details": {
              "type": "string"
            },
            "change_type": {
              "type": "string"
            },
            "original_description": {
              "type": "string"
            },
            "representative_details": {
              "type": "string"
            },
            "new_jurisdiction": {
              "type": "string"
            },
            "old_jurisdiction": {
              "type": "string"
            }
          }
        },
        "links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string"
            },
            "document_metadata": {
              "type": "string"
            }
          },
          "required": [
            "self"
          ]
        },
        "paper_filed": {
          "type": "boolean"
        },
        "transaction_id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "associated_filings": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "category": {
                "type": "string"
              },
              "date": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "type": {
                "type": "string"
              },
              "description_values": {
                "type": "object",
                "properties": {
                  "capital": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "currency": {
                          "type": "string"
                        },
                        "figure": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "currency",
                        "figure"
                      ]
                    }
                  },
                  "date": {
                    "type": "string"
                  }
                },
                "required": [
                  "capital",
                  "date"
                ]
              }
            },
            "required": [
              "category",
              "date",
              "description",
              "type"
            ]
          }
        },
        "pages": {
          "type": "integer"
        },
        "subcategory": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          ]
        },
        "resolutions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "category": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "description_values": {
                "type": "object",
                "properties": {
                  "resolution_date": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "res_type": {
                    "type": "string"
                  },
                  "case_start_date": {
                    "type": "string"
                  }
                }
              },
              "subcategory": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                ]
              },
              "type": {
                "type": "string"
              }
            },
            "required": [
              "category",
              "description",
              "subcategory",
              "type"
            ]
          }
        },
        "annotations": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "annotation": {
                "type": "string"
              },
              "category": {
                "type": "string"
              },
              "date": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "description_values": {
                "type": "object",
                "properties": {
                  "description": {
                    "type": "string"
                  }
                },
                "required": [
                  "description"
                ]
              },
              "type": {
                "type": "string"
              }
            },
            "required": [
              "annotation",
              "category",
              "date",
              "description",
              "description_values",
              "type"
            ]
          }
        }
      },
      "required": [
        "links",
        "transaction_id"
      ]
    },
    "event": {
      "type": "object",
      "properties": {
        "timepoint": {
          "type": "integer"
        },
        "published_at": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "fields_changed": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "timepoint",
        "published_at",
        "type"
      ]
    },
    "received": {
      "type": "number"
    }
  },
  "required": [
    "resource_kind",
    "resource_uri",
    "resource_id",
    "data",
    "event",
    "received"
  ],
  "additionalProperties": false
} as const
  
  export type FilingHistory = FromSchema<typeof FilingHistorySchema>
  
  const sampleFilingHistory: FilingHistory = {
  "resource_kind": "filing-history",
  "resource_uri": "/company/02154654/filing-history/MzM0NzUyNDMxNGFkaXF6a2N4",
  "resource_id": "MzM0NzUyNDMxNGFkaXF6a2N4",
  "data": {
    "barcode": "AB99WIMX",
    "category": "accounts",
    "date": "2022-08-02",
    "description": "accounts-with-accounts-type-full",
    "description_values": {
      "made_up_date": "2021-10-31"
    },
    "links": {
      "self": "/company/02154654/filing-history/MzM0NzUyNDMxNGFkaXF6a2N4"
    },
    "paper_filed": true,
    "transaction_id": "MzM0NzUyNDMxNGFkaXF6a2N4",
    "type": "AA"
  },
  "event": {
    "timepoint": 99061051,
    "published_at": "2022-08-02T16:17:02",
    "type": "changed"
  },
  "received": 1659456297087.7168
}
  