
  import {FromSchema} from "json-schema-to-ts";
  
  export const CompanyProfileSchema = {
  "type": "object",
  "properties": {
    "resource_kind": {
      "const": "company-profile"
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
        "accounts": {
          "type": "object",
          "properties": {
            "accounting_reference_date": {
              "type": "object",
              "properties": {
                "day": {
                  "type": "string"
                },
                "month": {
                  "type": "string"
                }
              },
              "required": [
                "day",
                "month"
              ]
            },
            "last_accounts": {
              "type": "object",
              "properties": {
                "made_up_to": {
                  "type": "string"
                },
                "period_end_on": {
                  "type": "string"
                },
                "period_start_on": {
                  "type": "string"
                },
                "type": {
                  "type": "string"
                }
              },
              "required": [
                "type"
              ]
            },
            "next_accounts": {
              "type": "object",
              "properties": {
                "due_on": {
                  "type": "string"
                },
                "period_end_on": {
                  "type": "string"
                },
                "period_start_on": {
                  "type": "string"
                },
                "overdue": {
                  "type": "boolean"
                }
              },
              "required": [
                "period_end_on"
              ]
            },
            "next_due": {
              "type": "string"
            },
            "next_made_up_to": {
              "type": "string"
            },
            "overdue": {
              "type": "boolean"
            }
          },
          "required": [
            "last_accounts"
          ]
        },
        "can_file": {
          "type": "boolean"
        },
        "company_name": {
          "type": "string"
        },
        "company_number": {
          "type": "string"
        },
        "company_status": {
          "type": "string"
        },
        "confirmation_statement": {
          "type": "object",
          "properties": {
            "last_made_up_to": {
              "type": "string"
            },
            "next_due": {
              "type": "string"
            },
            "next_made_up_to": {
              "type": "string"
            },
            "overdue": {
              "type": "boolean"
            }
          }
        },
        "date_of_creation": {
          "type": "string"
        },
        "etag": {
          "type": "string"
        },
        "has_charges": {
          "type": "boolean"
        },
        "jurisdiction": {
          "type": "string"
        },
        "last_full_members_list_date": {
          "type": "string"
        },
        "links": {
          "type": "object",
          "properties": {
            "charges": {
              "type": "string"
            },
            "filing_history": {
              "type": "string"
            },
            "officers": {
              "type": "string"
            },
            "persons_with_significant_control": {
              "type": "string"
            },
            "persons_with_significant_control_statements": {
              "type": "string"
            },
            "registers": {
              "type": "string"
            },
            "self": {
              "type": "string"
            },
            "insolvency": {
              "type": "string"
            }
          },
          "required": [
            "self"
          ]
        },
        "previous_company_names": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "ceased_on": {
                "type": "string"
              },
              "effective_from": {
                "type": "string"
              },
              "name": {
                "type": "string"
              }
            },
            "required": [
              "ceased_on",
              "effective_from",
              "name"
            ]
          }
        },
        "registered_office_address": {
          "type": "object",
          "properties": {
            "address_line_1": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "locality": {
              "type": "string"
            },
            "postal_code": {
              "type": "string"
            },
            "address_line_2": {
              "type": "string"
            },
            "region": {
              "type": "string"
            },
            "po_box": {
              "type": "string"
            },
            "care_of": {
              "type": "string"
            }
          }
        },
        "sic_codes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "type": {
          "type": "string"
        },
        "registered_office_is_in_dispute": {
          "type": "boolean"
        },
        "date_of_cessation": {
          "type": "string"
        },
        "is_community_interest_company": {
          "type": "boolean"
        },
        "subtype": {
          "type": "string"
        },
        "has_insolvency_history": {
          "type": "boolean"
        },
        "company_status_detail": {
          "type": "string"
        },
        "external_registration_number": {
          "type": "string"
        },
        "foreign_company_details": {
          "type": "object",
          "properties": {
            "accounting_requirement": {
              "type": "object",
              "properties": {
                "foreign_account_type": {
                  "type": "string"
                },
                "terms_of_account_publication": {
                  "type": "string"
                }
              },
              "required": [
                "foreign_account_type",
                "terms_of_account_publication"
              ]
            },
            "business_activity": {
              "type": "string"
            },
            "governed_by": {
              "type": "string"
            },
            "legal_form": {
              "type": "string"
            },
            "originating_registry": {
              "type": "object",
              "properties": {
                "country": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                }
              },
              "required": [
                "country",
                "name"
              ]
            },
            "registration_number": {
              "type": "string"
            },
            "accounts": {
              "type": "object",
              "properties": {
                "account_period_from": {
                  "type": "object",
                  "properties": {
                    "day": {
                      "type": "string"
                    },
                    "month": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "day",
                    "month"
                  ]
                },
                "account_period_to": {
                  "type": "object",
                  "properties": {
                    "day": {
                      "type": "string"
                    },
                    "month": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "day",
                    "month"
                  ]
                },
                "must_file_within": {
                  "type": "object",
                  "properties": {
                    "months": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "months"
                  ]
                }
              },
              "required": [
                "account_period_from",
                "account_period_to",
                "must_file_within"
              ]
            }
          },
          "required": [
            "accounting_requirement",
            "legal_form",
            "originating_registry",
            "registration_number"
          ]
        },
        "has_been_liquidated": {
          "type": "boolean"
        },
        "annual_return": {
          "type": "object",
          "properties": {
            "last_made_up_to": {
              "type": "string"
            },
            "overdue": {
              "type": "boolean"
            }
          },
          "required": [
            "last_made_up_to"
          ]
        },
        "has_super_secure_pscs": {
          "type": "boolean"
        }
      },
      "required": [
        "company_name",
        "company_number",
        "company_status",
        "etag",
        "links",
        "registered_office_address",
        "type"
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
  
  export type CompanyProfile = FromSchema<typeof CompanyProfileSchema>
  