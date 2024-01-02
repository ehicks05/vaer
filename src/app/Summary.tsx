import React from 'react';
import { Temp } from './PreferredTemperature';
import {
	useActiveLocation,
	useDayIndex,
	useOpenWeatherMap,
	useWeatherGov,
} from '@/hooks';
import { getWeatherIcon } from '../constants/weather_icons';
import { weekdayLong } from '@/constants/fmt';
import { geonameToLabel } from './utils';

export const Summary = () => {
	const [dayIndex] = useDayIndex();
	const { oneCallQuery } = useOpenWeatherMap();
	const { pointQuery } = useWeatherGov();
	const { data } = oneCallQuery;

	const [activeLocation] = useActiveLocation();

	if (!data) {
		return <div>loading</div>;
	}

	const dataSource = dayIndex
		? oneCallQuery.data.daily[dayIndex]
		: oneCallQuery.data.current;
	const { dt, feels_like, weather } = dataSource;
	const { id, icon, description } = weather[0];
	const dayLabel = dayIndex ? weekdayLong.format(dt) : 'Currently';

	const { city, state } =
		pointQuery.data?.properties.relativeLocation.properties || {};
	const locationLabel = activeLocation
		? geonameToLabel(activeLocation)
		: city && location
		  ? `${city}, ${state}`
		  : '';

	const Icon = getWeatherIcon(id, icon);
	const feelsLike =
		typeof feels_like === 'object' ? null : (
			<>
				feels like <Temp temp={feels_like} /> &middot;
			</>
		);

	return (
		<div className="col-span-2">
			{dayLabel}
			<div className="flex flex-col items-center p-4 bg-slate-800 rounded-lg">
				{locationLabel}
				<div className="flex gap-2 items-center text-6xl text-center">
					{typeof dataSource.temp === 'object' && (
						<>
							<Temp temp={dataSource.temp.max} />/
							<span className="text-neutral-400">
								<Temp temp={dataSource.temp.min} />
							</span>
						</>
					)}
					{typeof dataSource.temp === 'number' && <Temp temp={dataSource.temp} />}
					<div>
						<Icon className="inline" size={64} title={description} />
					</div>
				</div>
				{feelsLike} {description}
			</div>
		</div>
	);
};
