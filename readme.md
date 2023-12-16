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