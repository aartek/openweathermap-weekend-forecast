import {Forecast} from "./Forecast";

export class Location {
  name: string;
  longitude: number
  latitude: number
  fridayWeather: Forecast[] = []
  saturdayWeather: Forecast[] = []
  sundayWeather: Forecast[] = []


  constructor(name: string, longitude: number, latitude: number) {
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
