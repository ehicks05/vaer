import { round } from 'es-toolkit';

const PRECISION = 2;

export const roundCoords = (geolocationCoordinates: GeolocationCoordinates) => ({
	...geolocationCoordinates,
	latitude: round(geolocationCoordinates.latitude, PRECISION),
	longitude: round(geolocationCoordinates.longitude, PRECISION),
});
