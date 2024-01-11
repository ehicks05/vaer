import { dateShort } from '@/constants/fmt';
import { SearchResultGeoname } from '@/services/geonames/types';

export const geonameToLabel = (city: Partial<SearchResultGeoname>) =>
	`${city.name}${
		city.countryCode === 'US' && city.adminCode1 ? `, ${city.adminCode1}` : ''
	}${city.countryCode !== 'US' ? `, ${city.countryName}` : ''}`;

export const degreeToDirection = (degree: number) => {
	const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	const index = Math.round(degree / 45) % DIRECTIONS.length;
	return DIRECTIONS[index];
};

export const hPaToInHg = (hpa: number) => 0.02952998057228486 * hpa;

export const getPressureDescription = (inHg: number) => {
	if (inHg < 29.8) return 'Low';
	if (inHg > 30.2) return 'High';
	return 'Normal';
};

export const isToday = (date: Date) =>
	dateShort.format(date) === dateShort.format(new Date());

export const mmToInch = (mm?: number) => (mm ? mm / 25.4 : 0);
