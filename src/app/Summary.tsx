import { useOpenMeteo } from '@/hooks';
import { useResolvedLocation } from '@/hooks/useResolvedLocation';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { getWmoWeatherIcon } from '../constants/weather_icons';

export const Summary = () => {
	const { getTemp } = useUnitSystem();
	const { openMeteo } = useOpenMeteo();

	const {
		apparent_temperature = 0,
		weather: { id, description } = { id: 0, description: 'loading' },
		temperature_2m = 0,
		isDay = true,
	} = openMeteo.data?.current || {};
	const { us_aqi } =
		openMeteo.data?.hourly.filter(
			(hourly) => new Date(hourly.time).getTime() >= Date.now(),
		)[0] || {};

	const { city, state } = useResolvedLocation();

	const Icon = getWmoWeatherIcon(id, isDay);

	return (
		<div className="col-span-2">
			Currently
			<div className="flex flex-col items-center p-4 bg-slate-800 rounded-lg">
				{city}, {state}
				<div className="flex gap-2 items-center text-6xl text-center">
					{getTemp(temperature_2m)}
					<div>
						<Icon className="inline" size={64} title={description} />
					</div>
				</div>
				feels like {getTemp(apparent_temperature)} &middot; {description} &middot;{' '}
				{us_aqi} AQI
			</div>
		</div>
	);
};
