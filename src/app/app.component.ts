import {Component} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {Country} from "./domain/Country"
import {Location} from "./domain/Location"
import {Forecast} from "./domain/Forecast"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  countries: Country[] = []
  nextFriday: Date
  nextSaturday: Date
  nextSunday: Date
  apiKey: string


  getDate(dayIndex) {
    var today = new Date()
    if (today.getDay() == dayIndex) {
      return today
    }
    today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1)
    return today
  }

  constructor(private httpClient: HttpClient) {
    this.loadConfig()

    this.nextFriday = this.getDate(5)
    this.nextSaturday = this.getDate(6)
    this.nextSunday = this.getDate(0)
  }

  async loadConfig() {
    this.httpClient.get('assets/weather.json').subscribe((data: any) => {
      this.apiKey = data.apiKey
      this.loadCountries(data.countries)
    })
  }

  loadCountries(countries: any) {
    Object.entries(countries).forEach(
      ([key, countryEntry]) => {
        let country = new Country(countryEntry['name'])
        Object.entries(countryEntry['locations']).forEach(([key, location]) =>
          country.locations.push(new Location(location['name'], location['longitude'], location['latitude'])))
        this.countries.push(country)
      })

    this.countries.forEach((country: Country) => {
      country.locations.forEach((location: Location) => {
        this.loadWeather(location)
      })
    })
  }

  loadWeather(location: Location) {
    const apiKey = this.apiKey

    const url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${location.latitude}&lon=${location.longitude}&APPID=${apiKey}`
    this.httpClient.get(url)
      .subscribe((data: any) => {
        const grouped = this.groupBy(data.list, (forecast: any) => {
          return new Date(forecast.dt * 1000).getDay()
        })


        grouped['5'] = grouped['5'] || []
        grouped['6'] = grouped['6'] || []
        grouped['0'] = grouped['0'] || []

        grouped['5'].forEach((forecast) => {
          location.fridayWeather.push(this.prepareWeather(forecast))
        })
        grouped['6'].forEach((forecast) => {
          location.saturdayWeather.push(this.prepareWeather(forecast))
        })
        grouped['0'].forEach((forecast) => {
          location.sundayWeather.push(this.prepareWeather(forecast))
        })

      })
  }

  prepareWeather(forecast: any): Forecast {
    const weather = new Forecast()
    weather.datetime = forecast.dt * 1000
    weather.weather = forecast.weather[0].main
    weather.weatherDesc = forecast.weather[0].description
    weather.temperature = forecast.main.temp
    weather.rain = forecast.rain ? forecast.rain['3h'] : 0
    weather.icon = forecast.weather[0].icon
    return weather
  }

  groupBy(array: any, predicate: (prop) => any) {
    return array.reduce(function (groups, item) {
      const val = predicate(item)
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
  }

}
