# openweather-weekend-forecast
Openweather.org client app displaying weekend weather forecast for the specified locations

## Demo
https://aartek.github.io/openweather-weekend-forecast/

## Get api key
Sign up to openweather.org and get the appId: https://openweathermap.org/appid

## Use api key
Set the retrieved `appId` in the file `src/assets/weather.json` under the `apiKey` property

## Specifying locations
Locations can be specified in the `src/assets/weather.json` file. There is a dictionary of countries. Each country entry contains the dictionary of locations and a human readable name. Each location should have a human readable name, latitude and longitude. Countries and locations dictionary keys are just their identifiers - they're not displayed anywhere. 

```
{
  "apiKey": "xxxxxxx",
  "countries": {
    "Czech": {
      "name": "Czech Republic",
      "locations": {
        "Kouty": {
          "name": "Kouty",
          "latitude": "50.101786",
          "longitude": "17.116638"
        },
        "Koprivna": {
          "name": "Koprivna",
          "latitude": "50.034173",
          "longitude": "17.308676"
        }
      }
    },
    "Slovakia": {
      "name": "Slovakia",
      "locations": {
        "Ruzomberok": {
          "name": "Ruzomberok",
          "latitude": "49.072713",
          "longitude": "19.284158"
        }
      }
    }
  }
}

```

## Install dependencies
```
npm install
```

## Run app
```
npm start
```

Go to http://localhost:4200

## Build for prod env
```
npm run build
``` 

Code which you should host will be generated in the `dist` directory
