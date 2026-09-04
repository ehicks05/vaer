import { useUnitSystem } from '@/features/UnitSystem/useUnitSystem';
import { useOpenMeteo } from '@/hooks';
import { useResolvedLocation } from '@/hooks/useResolvedLocation';
import { getWmoWeatherIcon } from '../constants/weather_icons';

export const Summary = () => {
	const { getTemp } = useUnitSystem();
	const { openMeteo } = useOpenMeteo();

	const {
		apparent_temperature = 0,
		weather: { id, description } = { id: -1, description: 'loading' },
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
		<div className="flex flex-col h-full w-full">
			{/*Currently*/}
			<div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg h-full">
				{city || 'city'}, {state || 'state'}
				<div className="flex gap-2 items-center text-6xl text-center">
					{getTemp(temperature_2m)}
					<div>
						<Icon className="inline" size={64} title={description} />
					</div>
				</div>
				<div className="flex items-center gap-1">
					feels like {getTemp(apparent_temperature)} &middot; {description} &middot;{' '}
					<span
						className={
							us_aqi && us_aqi <= 50
								? 'text-green-500'
								: us_aqi && us_aqi <= 100
									? 'text-yellow-600'
									: 'text-red-500'
						}
					>
						{us_aqi}
					</span>
					AQI
				</div>
			</div>
		</div>
	);
};
