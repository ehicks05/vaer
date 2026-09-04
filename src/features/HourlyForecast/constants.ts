import type { Hourly } from '@/services/openMeteo/types/forecast';
import { addHours } from '../utils';

export const PLACEHOLDER_DATA = [...new Array(25)].map(
	(_, i) =>
		({
			time: addHours(new Date(), i).getTime(),
			relative_humidity_2m: 0,
			precipitation: 0,
			temperature_2m: 0,
			wind_direction_10m: 0,
			wind_speed_10m: 0,
			weather_code: 0,
			is_day: 1,
		}) as Hourly,
);
