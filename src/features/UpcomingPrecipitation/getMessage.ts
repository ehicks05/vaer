import type { Minutely15 } from '@/services/openMeteo/types/forecast';
import { formatInTimeZone } from '../utils';
import { HOURS_TO_SHOW } from './constants';

export const getMessage = (minutely: Minutely15[], tz: string) => {
	const currentlyPrecipitating = minutely[0].precipitation !== 0;
	const firstPrecip = minutely.find((m) => m.precipitation !== 0);
	const firstZeroPrecip = minutely.find((m) => m.precipitation === 0);

	if (!currentlyPrecipitating && !firstPrecip) {
		return `No precipitation in the next ${HOURS_TO_SHOW} hours.`;
	}
	if (!currentlyPrecipitating && !!firstPrecip) {
		const startsAt = formatInTimeZone(new Date(firstPrecip.time), tz, 'h:mm a');
		return `Precipitation starts at ${startsAt}`;
	}
	if (currentlyPrecipitating && !!firstZeroPrecip) {
		const endsAt = formatInTimeZone(new Date(firstZeroPrecip.time), tz, 'h:mm a');
		return `Precipitation ends at ${endsAt}`;
	}

	return `Precipitation throughout the next ${HOURS_TO_SHOW} hours.`;
};
