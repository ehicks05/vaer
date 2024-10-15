import { getWeatherIcon } from '@/constants/weather_icons';
import type { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import type { Hourly } from '@/services/openweathermap/types/oneCall';

interface Props {
	hourly: Hourly | ThreeHourForecast;
}

export const Weather = ({ hourly }: Props) => {
	const weather = hourly.weather[0];
	const Icon = getWeatherIcon(weather.id, weather.icon);

	return (
		<div className="flex flex-col items-center text-center text-xs">
			<Icon size={32} />
			{weather.description}
		</div>
	);
};
