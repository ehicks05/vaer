import React from 'react';
import { Card } from '@/components';
import { format, isToday } from 'date-fns';
import { Temp } from './PreferredTemperature';
import { useOpenWeatherMap } from '@/hooks';
import { getWeatherIcon } from './weather_icons';
import { WeatherCondition } from '@/services/openweathermap/types';

interface OneDaySummaryProps {
	weather: WeatherCondition;
	dt: number;
	min: number;
	max: number;
}

const OneDaySummary = ({ weather, dt, min, max }: OneDaySummaryProps) => {
	const Icon = getWeatherIcon(weather.id, weather.icon);

	const day = isToday(new Date(dt)) ? 'Today' : format(new Date(dt), 'eee');

	return (
		<div>
			<div className="flex items-center justify-between gap-1">
				<div className="flex gap-4 items-center">
					<div className="flex flex-col gap-1 items-center">
						<Icon size={32} />
					</div>
					<div className="whitespace-nowrap">
						{day}
						<div className="text-xs opacity-75">{weather.description}</div>
					</div>
				</div>
				<div className="whitespace-nowrap flex flex-col">
					<span>
						<Temp temp={max} />
					</span>
					<span className="opacity-75">
						<Temp temp={min} />
					</span>
				</div>
			</div>
		</div>
	);
};

const DailyForecast = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	if (!oneCallQuery.data) {
		return <div>loading</div>;
	}
	const { daily: dailies } = oneCallQuery.data;

	return (
		<div className="w-full">
			Daily Forecast
			<Card>
				<div className="flex flex-col gap-4 w-full p-4">
					{dailies
						.map((o) => ({ ...o, dt: o.dt * 1000 }))
						.map((daily) => {
							const { min, max } = daily.temp;

							return (
								<OneDaySummary
									key={daily.dt}
									weather={daily.weather[0]}
									dt={daily.dt}
									min={min}
									max={max}
								/>
							);
						})}
				</div>
			</Card>
		</div>
	);
};

export default DailyForecast;
