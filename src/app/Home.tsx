import React from 'react';
import { shortSummaryToIcon } from './utils';
import { useWeather } from '@/hooks/useWeather';
import { PreferredTempToggle, Temp } from './PreferredTemperature';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';

const CurrentConditions = () => {
	const { pointQuery, stationLatestObservationQuery } = useWeather();
	const currentConditions = stationLatestObservationQuery.data?.properties || {};
	const { temperature, textDescription, icon } = currentConditions;
	const { city, state } =
		pointQuery.data?.properties.relativeLocation.properties || {};
	const friendlyLocation = city && location ? `${city}, ${state}` : '';

	const temp = Object.fromEntries(
		Object.entries(currentConditions).filter(([k, v]) => v.value !== null),
	);

	const Icon = shortSummaryToIcon({
		shortForecast: textDescription || '',
		isDay: !!icon?.includes('/day'),
	});

	return (
		<div className="flex flex-col items-center">
			{friendlyLocation}
			<div className="text-6xl">
				<Temp temp={temperature?.value || 0} />
				<PreferredTempToggle />
				{/* <pre className="text-xs">{JSON.stringify({ temp }, null, 2)}</pre> */}
			</div>
			<Icon className="inline" size={64} />
		</div>
	);
};

export const Home = () => {
	return (
		<div className="flex flex-col flex-grow items-center justify-center gap-4">
			<CurrentConditions />
			<HourlyForecast />
			<DailyForecast />
			{/* <pre className="p-2 bg-neutral-700 whitespace-pre-wrap text-white text-xs">
				{JSON.stringify(gridpointQuery.data?.properties.temperature, null, 2)}
			</pre> */}
		</div>
	);
};
