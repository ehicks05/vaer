import { useActiveLocation, useOpenMeteo, useWeatherGov } from '@/hooks';
import { useUnits } from '@/hooks/useUnits';
import { getWmoWeatherIcon } from '../constants/weather_icons';
import { geonameToLabel } from './utils';

export const Summary = () => {
	const { getTemp } = useUnits();
	const { pointQuery } = useWeatherGov();
	const [activeLocation] = useActiveLocation();
	const { openMeteo } = useOpenMeteo();

	const {
		feelsLike = 0,
		weather: { id, description } = { id: 0, description: 'loading' },
		temp = 0,
		isDay = true,
	} = openMeteo.data?.current || {};

	const { city, state } =
		pointQuery.data?.properties.relativeLocation.properties || {};
	const locationLabel = activeLocation
		? geonameToLabel(activeLocation)
		: city && location
			? `${city}, ${state}`
			: 'loading';

	const Icon = getWmoWeatherIcon(id, isDay);

	return (
		<div className="col-span-2">
			Currently
			<div className="flex flex-col items-center p-4 bg-slate-800 rounded-lg">
				{locationLabel}
				<div className="flex gap-2 items-center text-6xl text-center">
					{getTemp(temp)}
					<div>
						<Icon className="inline" size={64} title={description} />
					</div>
				</div>
				feels like {getTemp(feelsLike)} &middot; {description}
			</div>
		</div>
	);
};
