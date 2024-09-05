import { Card } from '@/components';
import { useOpenWeatherMap } from '@/hooks';
import { useUnits } from '@/hooks/useUnits';
import type { Minutely } from '@/services/openweathermap/types/oneCall';
import type { ReactNode } from 'react';

const hmm = new Intl.DateTimeFormat('en-US', {
	hour: 'numeric',
	minute: '2-digit',
});

const INTENSITIES = [
	{ color: 'bg-indigo-500', min: 0.0, max: 0.0 },
	{ color: 'bg-indigo-400', min: 0.0, max: 0.1 },
	{ color: 'bg-indigo-300', min: 0.1, max: 0.2 },
	{ color: 'bg-indigo-200', min: 0.2, max: 0.4 },
	{ color: 'bg-indigo-100', min: 0.4, max: 1.0 },
	{ color: 'bg-indigo-50', min: 1.0, max: Number.POSITIVE_INFINITY },
];

const getIntensity = (inPerHour: number) =>
	INTENSITIES.find(({ min, max }) => inPerHour >= min && inPerHour <= max) ||
	INTENSITIES[0];

interface Props {
	max: number;
	minute: Minutely;
}

const Minute = ({ max, minute: { precipitation } }: Props) => {
	const intensity = getIntensity(precipitation);
	const normalized = precipitation / max;
	const style = { height: `${(normalized || 0.01) * 100}%` };
	return <div className={`rounded-sm w-4 ${intensity.color}`} style={style} />;
};

export const UpcomingPrecipitation = () => {
	const { getRate } = useUnits();
	const { oneCallQuery } = useOpenWeatherMap();
	const { data, dataUpdatedAt } = oneCallQuery;
	if (!data) {
		return null;
	}
	const { minutely } = data;

	const min = Math.min(...minutely.map(({ precipitation }) => precipitation));
	const max = Math.max(...minutely.map(({ precipitation }) => precipitation));
	const [start, mid, end] = [0, minutely.length / 2, minutely.length - 1].map(
		(index) => hmm.format(new Date(minutely[index]?.dt || 0)),
	);

	if (max === 0) {
		return <Container>No precipitation until at least {end}</Container>;
	}

	return (
		<Container>
			<div className="h-36 flex flex-col gap-1">
				<div className="flex justify-between gap-2 w-full text-xs">
					<span>checked at {hmm.format(new Date(dataUpdatedAt))}</span>
					<span>
						range: {getRate(min)} - {getRate(max)}
					</span>
				</div>
				<div className="flex flex-col gap-1 w-full h-full">
					<div className="flex items-end gap-[2px] h-full">
						{minutely.map((minute) => (
							<Minute key={minute.dt} max={max} minute={minute} />
						))}
					</div>
				</div>
				<div className="flex justify-between w-full text-sm">
					<span>{start}</span>
					<span>{mid}</span>
					<span>{end}</span>
				</div>
			</div>
		</Container>
	);
};

const Container = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-col">
		Upcoming Precipitation [experimental]
		<Card className="p-4 flex flex-col gap-1 justify-end">{children}</Card>
	</div>
);
