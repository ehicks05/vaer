import { Card } from '@/components';
import { useUnitSystem } from '@/features/UnitSystem/useUnitSystem';
import { useOpenMeteo } from '@/hooks';
import { useResolvedLocation } from '@/hooks/useResolvedLocation';
import { getWmoWeatherIcon } from '../../constants/weather_icons';
import { Aqi } from './Aqi';

export const Summary = () => {
	const { city, state } = useResolvedLocation();
	const { getTemp } = useUnitSystem();
	const { openMeteo } = useOpenMeteo();

	if (!openMeteo.data) {
		return <Card className="min-h-36" gradient={false} />;
	}

	const { current, hourly } = openMeteo.data;
	const { apparent_temperature, weather, temperature_2m, isDay } = current;
	const { us_aqi } = hourly.find((hourly) => hourly.time >= Date.now()) || {};

	const Icon = getWmoWeatherIcon(weather.id, isDay);

	return (
		<Card
			className="flex flex-col items-center justify-center p-4 w-full"
			gradient={false}
		>
			{city || 'city'}, {state || 'state'}
			<div className="flex gap-2 items-center text-6xl text-center">
				{getTemp(temperature_2m)}
				<Icon className="inline" size={64} title={weather.description} />
			</div>
			<div className="flex items-center gap-1">
				<div className="flex items-baseline gap-0.5">
					{getTemp(apparent_temperature)}
					<span className="text-xs text-muted-foreground">FL</span>
				</div>
				&middot;
				<div>{weather.description}</div>
				&middot;
				<Aqi us_aqi={us_aqi} />
			</div>
		</Card>
	);
};
