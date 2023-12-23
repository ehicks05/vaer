import React from 'react';
import { shortSummaryToIcon } from './utils';
import { PreferredTempToggle, Temp } from './PreferredTemperature';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import { useOpenWeatherMap, useWeatherGov } from '@/hooks';
import { getWeatherIcon } from './weather_icons';

const CurrentConditions = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { pointQuery } = useWeatherGov();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { temp, feels_like, weather },
	} = oneCallQuery.data;
	const { id, icon } = weather[0];

	const { city, state } =
		pointQuery.data?.properties.relativeLocation.properties || {};
	const friendlyLocation = city && location ? `${city}, ${state}` : '';

	const Icon = getWeatherIcon(id, icon);

	return (
		<div className="flex flex-col items-center">
			{friendlyLocation}
			<div className="text-6xl">
				<Temp temp={temp} />
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
		</div>
	);
};
