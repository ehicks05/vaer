import type { Geoname } from './types';

export const parseGeoname = (city: Partial<Geoname>) => ({
	city: city.name,
	state: city?.adminCodes1?.ISO3166_2 || '',
	country: city.countryCode === 'US' ? 'US' : city.countryName || '',
});

export const geonameToLabel = (geoname: Partial<Geoname>) => {
	const { city, state, country } = parseGeoname(geoname);
	return `${city}, ${state}, ${country}`;
};
