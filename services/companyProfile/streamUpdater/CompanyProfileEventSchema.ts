
import {FromSchema} from "json-schema-to-ts";

export const CompanyProfileEventSchema = {
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
        "jurisdiction": {
          "type": "string"
        },
        "links": {
          "type": "object",
          "properties": {
            "filing_history": {
              "type": "string"
            },
            "officers": {
              "type": "string"
            },
            "persons_with_significant_control": {
              "type": "string"
            },
            "self": {
              "type": "string"
            },
            "persons_with_significant_control_statements": {
              "type": "string"
            },
            "charges": {
              "type": "string"
            },
            "insolvency": {
              "type": "string"
            },
            "registers": {
              "type": "string"
            }
          },
          "required": [
            "self"
          ]
        },
        "registered_office_address": {
          "type": "object",
          "properties": {
            "address_line_1": {
              "type": "string"
            },
            "address_line_2": {
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
            "region": {
              "type": "string"
            },
            "care_of": {
              "type": "string"
            },
            "po_box": {
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
        "last_full_members_list_date": {
          "type": "string"
        },
        "date_of_cessation": {
          "type": "string"
        },
        "has_charges": {
          "type": "boolean"
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
        "company_status_detail": {
          "type": "string"
        },
        "has_insolvency_history": {
          "type": "boolean"
        },
        "is_community_interest_company": {
          "type": "boolean"
        },
        "subtype": {
          "type": "string"
        },
        "registered_office_is_in_dispute": {
          "type": "boolean"
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
            }
          },
          "required": [
            "governed_by",
            "legal_form",
            "originating_registry",
            "registration_number"
          ]
        },
        "service_address": {
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
            }
          },
          "required": [
            "address_line_1",
            "country",
            "locality",
            "postal_code"
          ]
        },
        "super_secure_managing_officer_count": {
          "type": "integer"
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
    }
  },
  "required": [
    "resource_kind",
    "resource_uri",
    "resource_id",
    "data",
    "event"
  ],
  "additionalProperties": false
} as const

export type CompanyProfileEvent = FromSchema<typeof CompanyProfileEventSchema>

const sampleCompanyProfile: CompanyProfileEvent = {
  "resource_kind": "company-profile",
  "resource_uri": "/company/SC571653",
  "resource_id": "SC571653",
  "data": {
    "accounts": {
      "accounting_reference_date": {
        "day": "31",
        "month": "07"
      },
      "last_accounts": {
        "made_up_to": "2021-07-31",
        "period_end_on": "2021-07-31",
        "period_start_on": "2020-08-01",
        "type": "total-exemption-full"
      },
      "next_accounts": {
        "due_on": "2023-04-30",
        "period_end_on": "2022-07-31",
        "period_start_on": "2021-08-01"
      },
      "next_due": "2023-04-30",
      "next_made_up_to": "2022-07-31"
    },
    "can_file": true,
    "company_name": "FC KIOSKS LTD",
    "company_number": "SC571653",
    "company_status": "active",
    "confirmation_statement": {
      "last_made_up_to": "2022-07-19",
      "next_due": "2023-08-02",
      "next_made_up_to": "2023-07-19"
    },
    "date_of_creation": "2017-07-20",
    "etag": "e861f92b4d7814ad3bbae90536c5ff4c1ac238bb",
    "jurisdiction": "scotland",
    "links": {
      "filing_history": "/company/SC571653/filing-history",
      "officers": "/company/SC571653/officers",
      "persons_with_significant_control": "/company/SC571653/persons-with-significant-control",
      "self": "/company/SC571653"
    },
    "registered_office_address": {
      "address_line_1": "Suite 4f, Ingram House",
      "address_line_2": "227 Ingram Street",
      "country": "Scotland",
      "locality": "Glasgow",
      "postal_code": "G1 1DA"
    },
    "sic_codes": [
      "56290"
    ],
    "type": "ltd"
  },
  "event": {
    "timepoint": 47695461,
    "published_at": "2022-08-02T15:21:06",
    "type": "changed"
  }
}
