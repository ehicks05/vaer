import { Card } from '@/components';
import { useOpenWeatherMap } from '@/hooks';
import { useUnits } from '@/hooks/useUnits';
import type { Minutely } from '@/services/openweathermap/types/oneCall';
import type { ReactNode } from 'react';
import { formatInTimeZone } from './utils';

const INF = Number.POSITIVE_INFINITY;

const INTENSITIES = [
	{ color: 'bg-indigo-500 group-hover:bg-indigo-400', min: 0.0, max: 0.0 },
	{ color: 'bg-indigo-400 group-hover:bg-indigo-300', min: 0.0, max: 0.1 },
	{ color: 'bg-indigo-300 group-hover:bg-indigo-200', min: 0.1, max: 0.2 },
	{ color: 'bg-indigo-200 group-hover:bg-indigo-100', min: 0.2, max: 0.4 },
	{ color: 'bg-indigo-100 group-hover:bg-indigo-50', min: 0.4, max: 1.0 },
	{ color: 'bg-indigo-50 group-hover:bg-indigo-50', min: 1.0, max: INF },
];

const getIntensity = (inPerHour: number) =>
	INTENSITIES.find(({ min, max }) => inPerHour >= min && inPerHour <= max) ||
	INTENSITIES[0];

const getMessage = (minutely: Minutely[], tz: string) => {
	const currentlyPrecipitating = minutely[0].precipitation !== 0;
	const firstPrecip = minutely.find((m) => m.precipitation !== 0);
	const firstZeroPrecip = minutely.find((m) => m.precipitation === 0);
	const message =
		!currentlyPrecipitating && !firstPrecip
			? 'No precipitation in the next hour.'
			: !currentlyPrecipitating && !!firstPrecip
				? `Precipitation starts at ${formatInTimeZone(new Date(firstPrecip.dt), tz, 'h:mm a')}`
				: currentlyPrecipitating && !!firstZeroPrecip
					? `Precipitation ends at ${formatInTimeZone(new Date(firstZeroPrecip.dt), tz, 'h:mm a')}`
					: 'Precipitation throughout the next hour.';
	return message;
};

interface Props {
	max: number;
	minute: Minutely;
	title: string;
}

const Minute = ({ max, minute: { precipitation }, title }: Props) => {
	const intensity = getIntensity(precipitation);
	// a max of 0.5 in/h will fill the chart, anything higher requires scaling down.
	const scaleDownFactor = max > 0.5 ? 0.5 / max : 1;
	const height = precipitation ? precipitation * scaleDownFactor * 160 : 1;
	const style = { height: `${Math.min(height, 80)}px` };
	return (
		<div
			title={title}
			className="group flex items-end px-px rounded-sm h-full hover:bg-indigo-700 w-4"
		>
			<div className={`rounded-sm w-full ${intensity.color}`} style={style} />
		</div>
	);
};

interface ChartProps {
	minutely: Minutely[];
	max: number;
	tz: string;
}

const Chart = ({ minutely, max, tz }: ChartProps) => {
	const { getRate } = useUnits();
	const [start, mid, end] = [0, minutely.length / 2, minutely.length - 1].map(
		(index) => formatInTimeZone(new Date(minutely[index]?.dt || 0), tz, 'h:mm a'),
	);

	return (
		<>
			<div className="flex flex-col gap-1 w-full h-full">
				<div className="flex h-20">
					{minutely.map((minute) => (
						<Minute
							key={minute.dt}
							max={max}
							minute={minute}
							title={`${formatInTimeZone(new Date(minute.dt), tz, 'h:mm a')}: ${getRate(minute.precipitation)}`}
						/>
					))}
				</div>
			</div>
			<div className="flex justify-between w-full text-sm">
				<span>{start}</span>
				<span>{mid}</span>
				<span>{end}</span>
			</div>
		</>
	);
};

const Container = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-col">
		Upcoming Precipitation
		<Card className="p-4 flex flex-col gap-1 justify-end">{children}</Card>
	</div>
);

export const UpcomingPrecipitation = () => {
	const { getRate } = useUnits();
	const { oneCallQuery } = useOpenWeatherMap();
	const { data, dataUpdatedAt } = oneCallQuery;
	if (!data) {
		return null;
	}
	const { minutely, timezone: tz } = data;

	const min = Math.min(...minutely.map(({ precipitation }) => precipitation));
	const max = Math.max(...minutely.map(({ precipitation }) => precipitation));
	const message = getMessage(minutely, tz);

	return (
		<Container>
			<div className="flex flex-col gap-1">
				{message}
				{max > 0 && <Chart minutely={minutely} max={max} tz={tz} />}
			</div>
			<div className="flex justify-between gap-2 w-full text-xs">
				<span className="text-neutral-300">
					checked at {formatInTimeZone(new Date(dataUpdatedAt), tz, 'h:mm a')}
				</span>
				{max > 0 && (
					<span className="text-neutral-300">
						range: {getRate(min)} - {getRate(max)}
					</span>
				)}
			</div>
		</Container>
	);
};
