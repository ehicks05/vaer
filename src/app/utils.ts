import { GrStatusPlaceholder } from 'react-icons/gr';
import {
	WiDaySunny,
	WiNightClear,
	WiDayCloudy,
	WiNightCloudy,
	WiDayRain,
	WiNightRain,
} from 'react-icons/wi';

export const shortSummaryToIcon = ({
	shortForecast,
	isDay,
}: { shortForecast: string; isDay: boolean }) => {
	if (shortForecast.includes('Sunny') || shortForecast.includes('Clear')) {
		return isDay ? WiDaySunny : WiNightClear;
	}

	if (shortForecast.includes('Cloud')) {
		return isDay ? WiDayCloudy : WiNightCloudy;
	}
	if (shortForecast.includes('Rain') || shortForecast.includes('Drizzle')) {
		return isDay ? WiDayRain : WiNightRain;
	}

	return GrStatusPlaceholder;
};
