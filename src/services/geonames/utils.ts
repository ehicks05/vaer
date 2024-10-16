import type { Geoname } from './types';

const toState = (city: Partial<Geoname>) =>
	city.adminCodes1 ? `, ${city.adminCodes1.ISO3166_2}` : '';

const toCountryName = (city: Partial<Geoname>) =>
	city.countryName ? `, ${city.countryName}` : '';

const toCountry = (city: Partial<Geoname>) =>
	`${city.countryCode === 'US' ? `, ${city.countryCode}` : toCountryName(city)}`;

export const geonameToLabel = (city: Partial<Geoname>) =>
	`${city.name}${toState(city)}${toCountry(city)}`;
