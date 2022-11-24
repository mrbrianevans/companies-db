
const headerSchema = {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "headerIdentifier": {
      "type": "string"
    },
    "runNumber": {
      "type": "integer"
    },
    "productionDate": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "year": {
          "type": "integer"
        },
        "month": {
          "type": "integer"
        },
        "day": {
          "type": "integer"
        }
      },
      "required": [
        "day",
        "month",
        "year"
      ],
      "title": "ProductionDate"
    },
    "recordType": {
      "type": "integer",
      value: 1
    }
  },
  "required": [
    "headerIdentifier",
    "productionDate",
    "recordType",
    "runNumber"
  ],
  "title": "HeaderRecord"
}

const personSchema = {

}
