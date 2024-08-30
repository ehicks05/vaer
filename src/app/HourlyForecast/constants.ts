import type { Hourly } from '@/services/openweathermap/types/oneCall';
import { addHours, formatHours } from '../utils';

export const PLACEHOLDER_DATA = [...new Array(25)].map(
	(_, i) =>
		({
			dt: addHours(new Date(), i).getTime(),
			time: formatHours(new Date(addHours(new Date(), i).toISOString())),
			weather: [{ id: 800, description: 'loading data', icon: 'd', main: '' }],
			temp: 0,
			pressure: 0,
			humidity: 0,
			dew_point: 0,
			feels_like: 0,
			uvi: 0,
			clouds: 0,
			visibility: 0,
			wind_deg: 0,
			wind_speed: 0,
			wind_gust: 0,
			pop: 0,
			rain: { '1h': 0 },
			snow: { '1h': 0 },
		}) as Hourly,
);
