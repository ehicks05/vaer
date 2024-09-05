# vaer

## Prereqs

1. node

## Getting Started

1. Clone repo.
2. Create a GeoNames account [here](https://www.geonames.org/login). 
   1. For personal use, add your `username` to `.env`.
   2. To protect your `username`, set up a proxy server that adds the `username` to requests.
3. Create an OpenWeather account [here](https://openweathermap.org/) and subscript to the OneCall API. To keep it free, manage your sub [here](https://home.openweathermap.org/subscriptions) and limit your calls to 1,000 per day. 
   1. For personal use, add `app_id` to `.env`. [not tested]
   2. To protect your `app_id`, set up a proxy server that adds the `app_id` to requests.
4. To install depenencies, run `npm i`.
5. For local dev, run `npm run dev`.

### Setting up a proxy server

[todo]

## research

* keep an eye on weather.gov 2.0 or open-meteo to get around OWM limitations. Such as 1000 requests per day, and only 48 hours worth of hourly forecasts.
* research map alternatives. mainly one that makes fewer requests and seems more lightweight.
  * openweather has basic maps, but don't appear to include a base layer (land outlines, political names)
  * NWS has maps, but menu ui takes up too much space.

## links

 More info on Geonames search api [here](https://www.geonames.org/export/geonames-search.html).

 OpenWeather OneCall api [here](https://openweathermap.org/api/one-call-3).