import { weekdayLong } from '@/constants/fmt';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useActiveLocation, useOpenWeatherMap, useWeatherGov } from '@/hooks';
import { useUnits } from '@/hooks/useUnits';
import { useContext } from 'react';
import { getWeatherIcon } from '../constants/weather_icons';
import { geonameToLabel } from './utils';

const PLACEHOLDER = {
	dt: new Date(),
	temp: 0,
	feels_like: 0,
	weather: [{ id: 800, icon: '', description: 'loading' }],
};

export const Summary = () => {
	const { getTemp } = useUnits();
	const { dayIndex } = useContext(DayIndexContext);
	const { oneCallQuery } = useOpenWeatherMap();
	const { pointQuery } = useWeatherGov();
	const [activeLocation] = useActiveLocation();

	const dataSource = dayIndex
		? oneCallQuery.data?.daily[dayIndex]
		: oneCallQuery.data?.current;
	const { dt, feels_like, weather, temp } = dataSource || PLACEHOLDER;
	const { id, icon, description } = weather[0];
	const dayLabel = dayIndex ? weekdayLong.format(dt) : 'Currently';

	const { city, state } =
		pointQuery.data?.properties.relativeLocation.properties || {};
	const locationLabel = activeLocation
		? geonameToLabel(activeLocation)
		: city && location
			? `${city}, ${state}`
			: 'loading';

	const Icon = getWeatherIcon(id, icon);

	return (
		<div className="col-span-2">
			{dayLabel}
			<div className="flex flex-col items-center p-4 bg-slate-800 rounded-lg">
				{locationLabel}
				<div className="flex gap-2 items-center text-6xl text-center">
					{typeof temp === 'object' && (
						<div>
							{getTemp(temp.max)}/
							<span className="text-neutral-400">{getTemp(temp.min)}</span>
						</div>
					)}
					{typeof temp === 'number' && getTemp(temp)}
					<div>
						<Icon className="inline" size={64} title={description} />
					</div>
				</div>
				{typeof feels_like === 'number' && (
					<>feels like {getTemp(feels_like)} &middot; </>
				)}
				{description}
			</div>
		</div>
	);
};
