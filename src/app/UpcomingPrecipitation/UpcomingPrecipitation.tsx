import type { ReactNode } from 'react';
import { Card } from '@/components';
import { useOpenMeteo } from '@/hooks';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import type { Minutely15 } from '@/services/openMeteo/types/forecast';
import { formatInTimeZone } from '../utils';
import { HOURS_TO_SHOW } from './constants';
import { getBarColor } from './getBarColor';
import { getBarHeight } from './getBarHeight';
import { getMessage } from './getMessage';

interface Props {
	inchesPerHour: number;
	title: string;
}

const QuarterHour = ({ inchesPerHour, title }: Props) => {
	const color = getBarColor(inchesPerHour);
	const height = getBarHeight(inchesPerHour);

	const style = { height: `${height}px` };
	return (
		<div
			title={title}
			className="group flex items-end px-px rounded-xs h-full hover:bg-indigo-700 w-16"
		>
			<div className={`rounded-xs w-full ${color}`} style={style} />
		</div>
	);
};

interface ChartProps {
	minutely: Minutely15[];
	tz: string;
}

// Minutely15 values are per 15 minutes
const QUARTER_HOURS_PER_HOUR = 4;

const toHourlyRate = (minute: Minutely15) =>
	Math.max(minute.precipitation, minute.snowfall) * QUARTER_HOURS_PER_HOUR;

const Chart = ({ minutely, tz }: ChartProps) => {
	const { getRate } = useUnitSystem();
	const [start, mid, end] = [0, minutely.length / 2, minutely.length - 1].map(
		(index) => formatInTimeZone(new Date(minutely[index]?.time || 0), tz, 'h:mm a'),
	);

	return (
		<>
			<div className="flex h-20">
				{minutely.map((minute) => {
					const inchesPerHour = toHourlyRate(minute);

					return (
						<QuarterHour
							key={minute.time}
							inchesPerHour={inchesPerHour}
							title={`${formatInTimeZone(new Date(minute.time), tz, 'h:mm a')}: ${getRate(inchesPerHour)}`}
						/>
					);
				})}
			</div>
			<div className="flex justify-between w-full text-sm">
				<span>{start}</span>
				<span>{mid}</span>
				<span>{end}</span>
			</div>
		</>
	);
};

const Container = ({ children }: { children?: ReactNode }) => (
	<div className="flex flex-col">
		{/*Upcoming Precipitation*/}
		<Card
			gradient={false}
			className="p-4 flex flex-col gap-1 justify-end h-full bg-slate-800"
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
		return (
			<Container>
				<div>Upcoming precipitation</div>
				<div className="grow" />
				<div className="text-xs text-neutral-300">checked at</div>
			</Container>
		);
	}
	const { timezone: tz } = data;
	const minutely_15 = data.minutely_15
		.filter((minutely) => new Date(minutely.time).getTime() >= Date.now())
		.slice(0, HOURS_TO_SHOW * 4);

	const min = Math.min(
		...minutely_15.map(({ precipitation, snowfall }) =>
			Math.max(precipitation, snowfall),
		),
	);
	const max = Math.max(
		...minutely_15.map(({ precipitation, snowfall }) =>
			Math.max(precipitation, snowfall),
		),
	);
	const message = minutely_15.length > 0 ? getMessage(minutely_15, tz) : '';

	return (
		<Container>
			<div className="flex flex-col gap-1">
				{message}
				{max > 0 && <Chart minutely={minutely_15} tz={tz} />}
			</div>
			<div className="grow" />
			<div className="flex justify-between gap-2 w-full text-xs">
				<span className="text-neutral-300">
					checked at {formatInTimeZone(new Date(dataUpdatedAt), tz, 'h:mm a')}
				</span>
				{max > 0 && (
					<span className="text-neutral-300">
						range: {getRate(min * QUARTER_HOURS_PER_HOUR)} -{' '}
						{getRate(max * QUARTER_HOURS_PER_HOUR)}
					</span>
				)}
			</div>
		</Container>
	);
};
