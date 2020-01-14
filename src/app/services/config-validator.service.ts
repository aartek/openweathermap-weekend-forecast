import {Injectable} from '@angular/core';
import * as Ajv from 'ajv';

@Injectable({
  providedIn: 'root'
})
export class ConfigValidatorService {
  private ajv: any
  private schema: any = {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "The Root Schema",
    "required": [
      "countries"
    ],
    "properties": {
      "countries": {
        "$id": "#/properties/countries",
        "type": "array",
        "title": "The Countries Schema",
        "items": {
          "$id": "#/properties/countries/items",
          "type": "object",
          "title": "The Items Schema",
          "required": [
            "name",
            "locations"
          ],
          "properties": {
            "name": {
              "$id": "#/properties/countries/items/properties/name",
              "type": "string",
              "title": "The Name Schema",
              "default": "",
              "examples": [
                "Czech Republic"
              ],
              "pattern": "^(.*)$"
            },
            "locations": {
              "$id": "#/properties/countries/items/properties/locations",
              "type": "array",
              "title": "The Locations Schema",
              "items": {
                "$id": "#/properties/countries/items/properties/locations/items",
                "type": "object",
                "title": "The Items Schema",
                "required": [
                  "name",
                  "latitude",
                  "longitude"
                ],
                "properties": {
                  "name": {
                    "$id": "#/properties/countries/items/properties/locations/items/properties/name",
                    "type": "string",
                    "title": "The Name Schema",
                    "default": "",
                    "examples": [
                      "Kouty"
                    ],
                    "pattern": "^(.*)$"
                  },
                  "latitude": {
                    "$id": "#/properties/countries/items/properties/locations/items/properties/latitude",
                    "type": "string",
                    "title": "The Latitude Schema",
                    "default": "",
                    "examples": [
                      "50.101786"
                    ],
                    "pattern": "^(.*)$"
                  },
                  "longitude": {
                    "$id": "#/properties/countries/items/properties/locations/items/properties/longitude",
                    "type": "string",
                    "title": "The Longitude Schema",
                    "default": "",
                    "examples": [
                      "17.116638"
                    ],
                    "pattern": "^(.*)$"
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  constructor() {
    this.ajv = new Ajv()
  }

  isValid(stringifiedConfig: string): boolean {
    try {
      const json = JSON.parse(stringifiedConfig)
      return this.ajv.validate(this.schema, json)
    } catch (e) {
      return false
    }

  }
}
