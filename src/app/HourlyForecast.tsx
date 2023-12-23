import React from 'react';
import { Card } from '@/components';
import { format, isAfter } from 'date-fns';
import { shortSummaryToIcon } from './utils';
import { Temp } from './PreferredTemperature';
import { useOpenWeatherMap } from '@/hooks';
import { WeatherCondition } from '@/services/openweathermap/types';
import { getWeatherIcon } from './weather_icons';

interface OneHourSummaryProps {
	weather: WeatherCondition;
	dt: number;
	temp: number;
}

const OneHourSummary = ({ weather, dt, temp }: OneHourSummaryProps) => {
	const Icon = getWeatherIcon(weather.id, weather.icon);
	return (
		<div className="flex flex-col items-center text-center gap-1" key={dt}>
			<div>
				<Temp temp={temp} />
			</div>
			<div className="flex flex-col gap-1 items-center">
				<Icon size={32} />
			</div>
			<div className="whitespace-nowrap">{format(new Date(dt), 'h a')}</div>
			<div className="text-xs">{weather.description}</div>
		</div>
	);
};

const scrollbarClasses =
	'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent group-hover:scrollbar-thumb-slate-800 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg';

const HourlyForecast = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	if (!oneCallQuery.data) {
		return <div>loading</div>;
	}
	const hourlyForecasts =
		oneCallQuery.data.hourly
			.map((o) => ({ ...o, dt: o.dt * 1000 }))
			.filter((o) => isAfter(new Date(o.dt), new Date()))
			.slice(0, 24) || [];

	return (
		<div className="group">
			Hourly Forecast
			<Card>
				<div
					className={`flex gap-6 max-w-xs sm:max-w-lg md:max-w-2xl overflow-auto p-4 pb-2 ${scrollbarClasses}`}
				>
					{hourlyForecasts.map((hourly) => (
						<OneHourSummary
							key={hourly.dt}
							weather={hourly.weather[0]}
							dt={hourly.dt}
							temp={hourly.temp}
						/>
					))}
				</div>
			</Card>
		</div>
	);
};

export default HourlyForecast;
