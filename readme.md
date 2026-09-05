# vaer

## Recent Updates

- Sep 2026 - Replaced windy maps with open meteo + maplibre + openfreemap
- Oct 2024 - Migrated from OpenWeatherMap to Open-Meteo. Alerts now come from weather.gov.

## Prereqs

1. node

## Getting Started

1. Clone repo.
2. Create a GeoNames account [here](https://www.geonames.org/login).
   1. For personal use, add your `username` to `.env`.
   2. To protect your `username`, set up a proxy server that adds the `username` to requests.
3. To install depenencies, run `npm i`.
4. For local dev, run `npm run dev`.

## data source notes

- open-meteo
  - forecasts
  - air quality
- weather.gov
  - alerts
  - geolocation lat,long -> point data (city, state, timezone, etc...)
- geonames
  - search by city name or zip -> geoname data (city, state, timezone, etc...)

## location flow

Flow starts with either the device's geolocation, or a search term.
![location flow](https://github.com/user-attachments/assets/284c1a10-316e-4be6-82c2-6cdcded6e66b)

## Resources

| Description                  | Link                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| Geonames search              | [link](https://www.geonames.org/export/geonames-search.html) |
| Open-meteo api               | [link](https://open-meteo.com/en/docs)                       |
| maplibre-gl-js               | [link](https://github.com/maplibre/maplibre-gl-js/)          |
| react-map-gl                 | [link](https://github.com/visgl/react-map-gl)                |
| open-meteo/weather-map-layer | [link](https://github.com/open-meteo/weather-map-layer)      |
| openfreemap                  | [link](https://openfreemap.org/quick_start/)                 |
