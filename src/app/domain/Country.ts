import {Location} from './Location'

export class Country {
  name: string
  locations: Location[]

  constructor(name: string, locations: Location[] = []) {
    this.name = name;
    this.locations = locations;
  }
}
