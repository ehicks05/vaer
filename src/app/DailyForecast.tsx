import React from 'react';
import { Card } from '@/components';
import { format, isToday } from 'date-fns';
import { shortSummaryToIcon } from './utils';
import { useWeather } from '@/hooks/useWeather';
import { groupBy } from 'lodash';
import { Temp } from './PreferredTemperature';

interface OneDaySummaryProps {
	shortForecast?: string;
	startTime?: string;
	t1?: number;
	t2?: number;
}

const OneDaySummary = ({
	shortForecast = '',
	startTime = '',
	t1 = 0,
	t2 = 0,
}: OneDaySummaryProps) => {
	const Icon = shortSummaryToIcon({ shortForecast: shortForecast, isDay: true });
	const minTemperature = Math.min(t1, t2);
	const maxTemperature = Math.max(t1, t2);

	const day = isToday(new Date(startTime))
		? 'Today'
		: format(new Date(startTime), 'eee');

	return (
		<div>
			<div className="flex items-center justify-between gap-1" key={startTime}>
				<div className="flex gap-4 items-center">
					<div className="flex flex-col gap-1 items-center">
						<Icon size={32} />
					</div>
					<div className="whitespace-nowrap">
						{day}
						<div className="text-xs opacity-75">{shortForecast}</div>
					</div>
				</div>
				<div className="whitespace-nowrap flex flex-col">
					<span>
						<Temp temp={maxTemperature} />
					</span>
					<span className="opacity-75">
						<Temp temp={minTemperature} />
					</span>
				</div>
			</div>
		</div>
	);
};

const DailyForecast = () => {
	const { forecastQuery } = useWeather();
	const periods = forecastQuery.data?.properties?.periods || [];
	const days = Object.values(
		groupBy(periods, (p) => format(new Date(p.startTime || 0), 'dd')),
	);

	return (
		<div className="max-w-xs sm:max-w-lg md:max-w-2xl w-full">
			Daily Forecast
			<Card>
				<div className="flex flex-col gap-4 w-full p-4">
					{days.map((period) => {
						const t1 = period[0].temperature;
						const t2 =
							period.length > 1 ? period[1].temperature : period[0].temperature;

						return (
							<OneDaySummary
								key={period[0].startTime}
								shortForecast={period[0].shortForecast}
								startTime={period[0].startTime}
								t1={typeof t1 === 'number' ? t1 : t1?.value || undefined}
								t2={typeof t2 === 'number' ? t2 : t2?.value || undefined}
							/>
						);
					})}
				</div>
			</Card>
		</div>
	);
};

export default DailyForecast;
