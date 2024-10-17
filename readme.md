# vaer

## Recent Updates

Oct 2024 - Migrated from OpenWeatherMap to Open-Meteo. Alerts now come from weather.gov.

## Prereqs

1. node

## Getting Started

1. Clone repo.
2. Create a GeoNames account [here](https://www.geonames.org/login). 
   1. For personal use, add your `username` to `.env`.
   2. To protect your `username`, set up a proxy server that adds the `username` to requests.
3. To install depenencies, run `npm i`.
4. For local dev, run `npm run dev`.

### Setting up a proxy server

Example: https://github.com/ehicks05/vaer-api

The idea is:
1. someone visits vaer
2. requests to 3rd party services that require auth are sent to vaer-api
3. vaer-api takes the request, adds auth info, and sends it to the 3rd party
4. vaer-api takes the response, and sends it back to the original requester

## data source notes

* open-meteo provides weather data
* weather.gov provides alerts and geolocation lat,long -> point data (city, state, timezone, etc...)
* geonames provides search by city name or zip -> geoname data (city, state, timezone, etc...)
* windy.com provides the map. would prefer something lighter that doesn't make so many requests
    * openweather has basic maps that don't appear to include a base layer (land outlines, political names)
    * NWS has maps, but menu ui takes up too much space when you embed it as a small widget.

## links

 More info on Geonames search api [here](https://www.geonames.org/export/geonames-search.html).

 Open-meteo api [here](https://open-meteo.com/en/docs).

 ~~OpenWeather OneCall api [here](https://openweathermap.org/api/one-call-3).~~