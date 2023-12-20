import React from 'react';
import { Card } from '@/components';
import { format, isAfter } from 'date-fns';
import { shortSummaryToIcon } from './utils';
import { useWeather } from './hooks';
import { Temp } from './PreferredTemperature';

interface OneHourSummaryProps {
	shortForecast?: string;
	isDaytime?: boolean;
	startTime?: string;
	temperature?: number;
}

const OneHourSummary = ({
	shortForecast = '',
	isDaytime = true,
	startTime = '',
	temperature = 0,
}: OneHourSummaryProps) => {
	const Icon = shortSummaryToIcon({
		shortForecast: shortForecast,
		isDay: isDaytime,
	});
	return (
		<div className="flex flex-col items-center text-center gap-1" key={startTime}>
			<div>
				<Temp temp={temperature} />
			</div>
			<div className="flex flex-col gap-1 items-center">
				<Icon size={32} />
			</div>
			<div className="whitespace-nowrap">{format(new Date(startTime), 'h a')}</div>
			<div className="text-xs">{shortForecast}</div>
		</div>
	);
};

const scrollbarClasses =
	'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent group-hover:scrollbar-thumb-slate-800 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg';

const HourlyForecast = () => {
	const { hourlyForecastQuery } = useWeather();
	const { periods } = hourlyForecastQuery.data?.properties || {};
	const filtered =
		periods
			?.filter((p) => isAfter(new Date(p?.endTime || 0), new Date()))
			?.slice(0, 24) || [];

	return (
		<div className="group">
			Hourly Forecast
			<Card>
				<div
					className={`flex gap-6 max-w-xs sm:max-w-lg md:max-w-2xl overflow-auto p-4 pb-2 ${scrollbarClasses}`}
				>
					{filtered.map((period) => (
						<OneHourSummary
							key={period.startTime}
							shortForecast={period.shortForecast}
							isDaytime={period.isDaytime}
							startTime={period.startTime}
							temperature={
								typeof period.temperature === 'number'
									? period.temperature
									: period.temperature?.value || undefined
							}
						/>
					))}
				</div>
			</Card>
		</div>
	);
};

export default HourlyForecast;
