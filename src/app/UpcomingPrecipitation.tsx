import type { ReactNode } from 'react';
import { Card } from '@/components';
import { useOpenMeteo } from '@/hooks';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import type { Minutely15 } from '@/services/openMeteo/types/forecast';
import { formatInTimeZone } from './utils';

const INF = Number.POSITIVE_INFINITY;
const HOURS = 4;

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

const getMessage = (minutely: Minutely15[], tz: string) => {
	const currentlyPrecipitating = minutely[0].precipitation !== 0;
	const firstPrecip = minutely.find((m) => m.precipitation !== 0);
	const firstZeroPrecip = minutely.find((m) => m.precipitation === 0);

	if (!currentlyPrecipitating && !firstPrecip) {
		return `No precipitation in the next ${HOURS} hours.`;
	}
	if (!currentlyPrecipitating && !!firstPrecip) {
		const startsAt = formatInTimeZone(new Date(firstPrecip.time), tz, 'h:mm a');
		return `Precipitation starts at ${startsAt}`;
	}
	if (currentlyPrecipitating && !!firstZeroPrecip) {
		const endsAt = formatInTimeZone(new Date(firstZeroPrecip.time), tz, 'h:mm a');
		return `Precipitation ends at ${endsAt}`;
	}

	return `Precipitation throughout the next ${HOURS} hours.`;
};

interface Props {
	max: number;
	minute: Minutely15;
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
			className="group flex items-end px-px rounded-xs h-full hover:bg-indigo-700 w-16"
		>
			<div className={`rounded-xs w-full ${intensity.color}`} style={style} />
		</div>
	);
};

interface ChartProps {
	minutely: Minutely15[];
	max: number;
	tz: string;
}

const Chart = ({ minutely, max, tz }: ChartProps) => {
	const { getRate } = useUnitSystem();
	const [start, mid, end] = [0, minutely.length / 2, minutely.length - 1].map(
		(index) => formatInTimeZone(new Date(minutely[index]?.time || 0), tz, 'h:mm a'),
	);

	return (
		<>
			<div className="flex h-20">
				{minutely.map((minute) => (
					<Minute
						key={minute.time}
						max={max}
						minute={minute}
						title={`${formatInTimeZone(new Date(minute.time), tz, 'h:mm a')}: ${getRate(minute.precipitation)}`}
					/>
				))}
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
		<Card
			gradient={false}
			className="p-4 flex flex-col gap-1 justify-end bg-slate-800"
		>
			{children}
		</Card>
	</div>
);

export const UpcomingPrecipitation = () => {
	const { getRate } = useUnitSystem();
	const { openMeteo } = useOpenMeteo();
	const { data, dataUpdatedAt } = openMeteo;
	if (!data) {
		return null;
	}
	const { timezone: tz } = data;
	const minutely_15 = data.minutely_15
		.filter((minutely) => new Date(minutely.time).getTime() >= Date.now())
		.slice(0, HOURS * 4);

	const min = Math.min(...minutely_15.map(({ precipitation }) => precipitation));
	const max = Math.max(...minutely_15.map(({ precipitation }) => precipitation));
	const message = minutely_15.length > 0 ? getMessage(minutely_15, tz) : '';

	return (
		<Container>
			<div className="flex flex-col gap-1">
				{message}
				{max > 0 && <Chart minutely={minutely_15} max={max} tz={tz} />}
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
