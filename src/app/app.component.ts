import {Component} from '@angular/core'
import {HttpClient} from "@angular/common/http"
import {Country} from "./domain/Country"
import {Location} from "./domain/Location"
import {Forecast} from "./domain/Forecast"
import {ModalService} from "@fundamental-ngx/core";
import {ConfigModalComponent} from "./components/config-modal/config-modal.component";
import {AppLoaderService} from "./services/app-loader.service";
import {ConfigValidatorService} from "./services/config-validator.service";
import {from, Observable, of} from "rxjs";
import {flatMap, map} from "rxjs/operators";

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
  defaultConfig: any
  config: any
  db: any
  userId: string
  isAuthorized: boolean
  private static WEATHER_API_KEY: string = 'a5420fb705a75e4664d8947a4c0ad443';

  constructor(private httpClient: HttpClient, private modalService: ModalService,
              private appLoaderService: AppLoaderService, private configValidator: ConfigValidatorService) {

    this.db = appLoaderService.database
    this.userId = appLoaderService.userId
    this.isAuthorized = this.appLoaderService.isAuthorized

    this.nextFriday = this.getDate(5)
    this.nextSaturday = this.getDate(6)
    this.nextSunday = this.getDate(0)

    this.loadConfig()

  }

  async loadConfig() {
    const defaultConfigRequest: Observable<any> = this.httpClient.get('assets/weather.json');

    defaultConfigRequest.pipe(
      map(defaultConfig => {
        this.defaultConfig = defaultConfig
        return defaultConfig
      }),

      flatMap(defaultConfig => {
        if (this.appLoaderService.isAuthorized) {
          const promise: Promise<any> = this.db.ref(`users/${this.userId}/weather`).once('value')
          return from(promise)
            .pipe(
              map(res => this.configValidator.isValid(res.val()) ? JSON.parse(res.val()) : defaultConfig)
            )
        } else {
          return of(defaultConfig)
        }
      }),
    ).subscribe((config) => {
      this.config = config
      this.loadCountries(config.countries)

    })
  }

  loadCountries(countries: any) {
    this.countries = countries.map(countryEntry => {
      const locations = countryEntry['locations'].map(location =>
        new Location(location['name'], location['longitude'], location['latitude']))

      return new Country(countryEntry['name'], locations)
    })

    this.countries.forEach((country: Country) => {
      country.locations.forEach((location: Location) => {
        this.loadWeather(location)
      })
    })
  }

  loadWeather(location: Location) {
    const apiKey = AppComponent.WEATHER_API_KEY

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

  openModal(): void {
    const modalRef = this.modalService.open(ConfigModalComponent, {
      data: {
        defaultConfig: this.defaultConfig,
        config: this.config
      },
      width: '800px',
    });


    modalRef.afterClosed.subscribe(async result => {
      if (this.appLoaderService.isAuthorized) {
        await this.appLoaderService.database.ref(`users/${this.userId}/weather`).set(result)
        this.config = JSON.parse(result)
        this.loadCountries(this.config.countries)
      }
    }, error => {
      // this.closeReason = 'Modal dismissed with result: ' + error;
    });
  }

  getDate(dayIndex) {
    const today = new Date()
    if (today.getDay() == dayIndex) {
      return today
    }
    today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1)
    return today
  }


}
