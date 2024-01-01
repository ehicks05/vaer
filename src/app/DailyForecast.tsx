import React from 'react';
import { Card } from '@/components';
import { format, isToday } from 'date-fns';
import { Temp } from './PreferredTemperature';
import { useDayIndex, useOpenWeatherMap } from '@/hooks';
import { getWeatherIcon } from '../constants/weather_icons';
import { WeatherCondition } from '@/services/openweathermap/types/oneCall';

interface OneDaySummaryProps {
	weather: WeatherCondition;
	dt: number;
	min: number;
	max: number;
	onClick: () => void;
	isSelected: boolean;
}

const OneDaySummary = ({
	weather,
	dt,
	min,
	max,
	onClick,
	isSelected,
}: OneDaySummaryProps) => {
	const Icon = getWeatherIcon(weather.id, weather.icon);

	const day = isToday(new Date(dt)) ? 'Today' : format(new Date(dt), 'eee');

	return (
		<div
			onClick={onClick}
			onKeyUp={onClick}
			className={`py-2 sm:py-4 px-4 first:rounded-t-lg last:pb-4 last:rounded-b-lg cursor-pointer ${
				isSelected ? 'bg-slate-800' : 'hover:brightness-110'
			}`}
		>
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
	const [dayIndex, setDayIndex] = useDayIndex();

	const { oneCallQuery } = useOpenWeatherMap();
	if (!oneCallQuery.data) {
		return <div>loading</div>;
	}
	const { daily: dailies } = oneCallQuery.data;

	return (
		<div className="w-full">
			Daily Forecast
			<Card>
				<div className="flex flex-col w-full">
					{dailies.map((daily, id) => {
						const { min, max } = daily.temp;

						return (
							<OneDaySummary
								key={daily.dt}
								weather={daily.weather[0]}
								dt={daily.dt}
								min={min}
								max={max}
								onClick={() => setDayIndex(id === dayIndex ? undefined : id)}
								isSelected={id === dayIndex}
							/>
						);
					})}
				</div>
			</Card>
		</div>
	);
};

export default DailyForecast;
