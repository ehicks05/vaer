import { weekdayLong } from '@/constants/fmt';
import {
	useActiveLocation,
	useDayIndex,
	useOpenWeatherMap,
	useWeatherGov,
} from '@/hooks';
import { getWeatherIcon } from '../constants/weather_icons';
import { Temp } from './PreferredTemperature';
import { geonameToLabel } from './utils';

const PLACEHOLDER = {
	dt: new Date(),
	temp: 0,
	feels_like: 0,
	weather: [{ id: 800, icon: '', description: 'loading' }],
};

export const Summary = () => {
	const [dayIndex] = useDayIndex();
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
		  : '';

	const Icon = getWeatherIcon(id, icon);

	return (
		<div className="col-span-2">
			{dayLabel}
			<div className="flex flex-col items-center p-4 bg-slate-800 rounded-lg">
				{locationLabel}
				<div className="flex gap-2 items-center text-6xl text-center">
					{typeof temp === 'object' && (
						<div>
							<Temp temp={temp.max} />/
							<span className="text-neutral-400">
								<Temp temp={temp.min} />
							</span>
						</div>
					)}
					{typeof temp === 'number' && <Temp temp={temp} />}
					<div>
						<Icon className="inline" size={64} title={description} />
					</div>
				</div>
				{typeof feels_like === 'number' && (
					<>
						feels like <Temp temp={feels_like} /> &middot;{' '}
					</>
				)}
				{description}
			</div>
		</div>
	);
};
