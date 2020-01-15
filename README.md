# openweathermap-weekend-forecast
Openweathermap.org client app displaying weekend weather forecast for the specified locations

## Demo
https://aartek.github.io/openweathermap-weekend-forecast/

## Get api key
Sign up to openweathermap.org and get the appId: https://openweathermap.org/appid

## Use api key
Set the retrieved `appId` in the file `src/assets/weather.json` under the `apiKey` property

## Specifying locations
Locations can be specified in the `src/assets/weather.json` file. There is a dictionary of countries. Each country entry contains the dictionary of locations and a human readable name. Each location should have a human readable name, latitude and longitude. Countries and locations dictionary keys are just their identifiers - they're not displayed anywhere. 

```
{
  {
    "countries": [
      {
        "name": "Czech Republic",
        "locations": [
          {
            "name": "Kouty",
            "latitude": "50.101786",
            "longitude": "17.116638"
          },
          {
            "name": "Rychlebske Stezky",
            "latitude": "50.301901",
            "longitude": "17.158454"
          }
        ]
      },
      {
        "name": "Poland",
        "locations": [
          {
            "name": "Rybnik",
            "latitude": "50.108968",
            "longitude": "18.545072"
          },
          {
            "name": "Międzybrodzie Żywieckie",
            "latitude": "49.787449",
            "longitude": "19.225976"
          },
          {
            "name": "Bielsko-Biała",
            "latitude": "49.779385",
            "longitude": "19.055338"
          }
        ]
      }
    ]
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
