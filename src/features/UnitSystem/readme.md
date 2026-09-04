# useUnitSystem

These hooks are designed to make it easy to toggle between imperial and metric
units throughout an app.

## Details

`useUnitSystemToggle` manages the selected system.

`UnitSystemToggle` renders the ui toggle.

`useUnitSystem` reads the selected unit system and returns functions like 
`getSpeed(mph: number) => string`. This function displays values in the selected system.

## Minimal Example

Assuming you're rendering `UnitSystemToggle` somewhere already...

```tsx
// MyComponent.tsx	
import { useUnitSystem } from '@/hooks/useUnitSystem';

const MyComponent = () => {
  const { getSpeed } = useUnitSystem();
  const speedInMph = getSpeedFromSomeApi();

  // Depending on the system, this will render as `88 mph` or `142 kph`
  return <div>Speed in preferred unit: {getSpeed(speedInMph)}</div>;
}
```
