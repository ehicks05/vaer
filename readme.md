# vaer

## Prereqs

1. node

## Getting Started

1. clone repo
2. run:
   ```
   npm i
   npm run dev
   ```

## Generating ts from openapi spec

```
npx openapi-typescript https://api.weather.gov/openapi.json -o ./src/generated/schema.d.ts

```

## todo

figure out best way to use generated types, or stick with manually written types

## sample weather.gov endpoints

https://api.weather.gov/gridpoints/PHI/66,106

https://api.weather.gov/gridpoints/PHI/66,106/forecast/hourly

https://api.weather.gov/gridpoints/PHI/66,106

https://api.weather.gov/gridpoints/PHI/66,106/forecast