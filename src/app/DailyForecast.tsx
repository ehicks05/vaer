import { Card } from '@/components';
import { useDayIndex, useOpenWeatherMap } from '@/hooks';
import { WeatherCondition } from '@/services/openweathermap/types/oneCall';
import { addDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import React from 'react';
import { getWeatherIcon } from '../constants/weather_icons';
import { Temp } from './PreferredTemperature';
import { isToday } from './utils';

interface OneDaySummaryProps {
	weather: Omit<WeatherCondition, 'main'>;
	day: string;
	min: number;
	max: number;
	onClick?: () => void;
	isSelected?: boolean;
}

const OneDaySummary = ({
	weather,
	day,
	min,
	max,
	onClick,
	isSelected,
}: OneDaySummaryProps) => {
	const Icon = getWeatherIcon(weather.id, weather.icon);

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
				<div className="whitespace-nowrap flex flex-col text-right">
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

const getPlaceholderData = () => ({
	daily: [...new Array(8)].map((_, i) => ({
		dt: addDays(new Date(), i).toISOString(),
		temp: { min: 0, max: 0 },
		weather: [{ id: 800, description: 'loading', icon: 'd' }],
	})),
	timezone: '',
});

const DailyForecast = () => {
	const [dayIndex, setDayIndex] = useDayIndex();

	const { oneCallQuery } = useOpenWeatherMap();
	const { daily: dailies, timezone } = oneCallQuery.data || getPlaceholderData();

	return (
		<div className="w-full">
			Daily Forecast
			<Card>
				<div className="flex flex-col w-full">
					{dailies?.map((daily, id) => {
						const { min, max } = daily.temp;
						const day = isToday(new Date(daily.dt))
							? 'Today'
							: formatInTimeZone(daily.dt, timezone || '', 'EEE');

						return (
							<OneDaySummary
								key={daily.dt}
								weather={daily.weather[0]}
								day={day}
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
