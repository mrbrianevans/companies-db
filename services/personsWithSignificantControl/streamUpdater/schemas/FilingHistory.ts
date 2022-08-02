
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
            "description": {
              "type": "string"
            },
            "notification_date": {
              "type": "string"
            },
            "psc_name": {
              "type": "string"
            },
            "charge_creation_date": {
              "type": "string"
            },
            "charge_number": {
              "type": "string"
            },
            "change_date": {
              "type": "string"
            },
            "new_address": {
              "type": "string"
            },
            "old_address": {
              "type": "string"
            },
            "appointment_date": {
              "type": "string"
            },
            "officer_name": {
              "type": "string"
            },
            "termination_date": {
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
            "brought_down_date": {
              "type": "string"
            },
            "new_date": {
              "type": "string"
            },
            "cessation_date": {
              "type": "string"
            },
            "branch_number": {
              "type": "string"
            },
            "officer_address": {
              "type": "string"
            },
            "close_date": {
              "type": "string"
            },
            "company_number": {
              "type": "string"
            },
            "default_address": {
              "type": "string"
            },
            "original_description": {
              "type": "string"
            },
            "withdrawal_date": {
              "type": "string"
            },
            "change_details": {
              "type": "string"
            },
            "change_type": {
              "type": "string"
            },
            "representative_details": {
              "type": "string"
            },
            "change_address": {
              "type": "string"
            }
          }
        },
        "links": {
          "type": "object",
          "properties": {
            "document_metadata": {
              "type": "string"
            },
            "self": {
              "type": "string"
            }
          },
          "required": [
            "self"
          ]
        },
        "pages": {
          "type": "integer"
        },
        "transaction_id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "paper_filed": {
          "type": [
            "boolean",
            "string"
          ]
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
                  },
                  "change_date": {
                    "type": "integer"
                  }
                }
              },
              "type": {
                "type": "string"
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
                  "res_type": {
                    "type": "string"
                  },
                  "case_start_date": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "resolution_date": {
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
        },
        "action_date": {
          "type": "string"
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
  