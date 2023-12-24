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

* what format do owm's icons come in? svg? can we customize colors? do they look ok with our color scheme?
* what does daily summary look like vs weather[0].description?

## sample weather.gov endpoints
