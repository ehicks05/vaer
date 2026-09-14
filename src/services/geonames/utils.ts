import type { Geoname } from './types';

export const parseGeoname = (city: Partial<Geoname>) => ({
	city: city.name,
	state:
		city.countryCode === 'US' ? city?.adminCodes1?.ISO3166_2 || '' : city.adminName1,
	country: city.countryCode === 'US' ? 'US' : city.countryName || '',
});

export const geonameToLabel = (geoname: Partial<Geoname>) => {
	const { city, state, country } = parseGeoname(geoname);
	return `${state}, ${country}`;
};
