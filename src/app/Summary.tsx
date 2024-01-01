import React from 'react';
import { Temp } from './PreferredTemperature';
import { useActiveLocation, useOpenWeatherMap, useWeatherGov } from '@/hooks';
import { getWeatherIcon } from '../constants/weather_icons';
import { Card } from '@/components';

export const Summary = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { pointQuery } = useWeatherGov();
	const { data } = oneCallQuery;

	const [activeLocation] = useActiveLocation();

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { temp, feels_like, weather },
	} = oneCallQuery.data;
	const { id, icon, description } = weather[0];

	const { city, state } =
		pointQuery.data?.properties.relativeLocation.properties || {};
	const locationLabel = activeLocation
		? `${activeLocation.name}${
				activeLocation.adminCode1 ? `, ${activeLocation.adminCode1}` : ''
		  }`
		: city && location
		  ? `${city}, ${state}`
		  : '';

	const Icon = getWeatherIcon(id, icon);

	return (
		<div className="flex flex-col items-center p-4 bg-slate-800 rounded-lg">
			{locationLabel}
			<div className="flex gap-2 items-center text-6xl text-center">
				<Temp temp={temp} />
				<div>
					<Icon className="inline" size={64} title={description} />
				</div>
			</div>
			feels like <Temp temp={feels_like} /> &middot; {description}
		</div>
	);
};
