import { Card } from '@/components';
import { useOpenWeatherMap } from '@/hooks';
import type { Minutely } from '@/services/openweathermap/types/oneCall';
import { round } from 'lodash-es';

const hmm = new Intl.DateTimeFormat('en-US', {
	hour: 'numeric',
	minute: '2-digit',
});

const Minute = ({ minute: { precipitation } }: { minute: Minutely }) => {
	const color =
		precipitation === 0
			? 'bg-indigo-600'
			: precipitation < 1
				? 'bg-indigo-400'
				: precipitation < 5
					? 'bg-indigo-200'
					: precipitation < 10
						? 'bg-indigo-100'
						: precipitation < 20
							? 'bg-indigo-50'
							: '';

	const style = { height: `${(precipitation || 0.01) * 32}px` };
	return <div className={`rounded-sm w-4 ${color}`} style={style} />;
};

export const UpcomingPrecipitation = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;
	if (!data) {
		return null;
	}
	const { minutely } = data;

	const min = Math.min(...minutely.map(({ precipitation }) => precipitation));
	const max = Math.max(...minutely.map(({ precipitation }) => precipitation));
	if (max === 0) {
		return null;
	}

	const [start, mid, end] = [0, minutely.length / 2, minutely.length - 1].map(
		(index) => hmm.format(new Date(minutely[index]?.dt || 0)),
	);

	return (
		<div className="flex flex-col">
			Upcoming Precipitation [experimental]
			<Card className="p-4 flex flex-col gap-1 h-36 justify-end">
				<div className="flex flex-col gap-1 w-full">
					<div className="flex items-end gap-0.5">
						{minutely.map((minute) => (
							<Minute key={minute.dt} minute={minute} />
						))}
					</div>
					<div className="flex justify-between w-full text-sm">
						<span>{start}</span>
						<span>{mid}</span>
						<span>{end}</span>
					</div>
				</div>
				<div className="flex gap-2 w-full text-xs">
					<span>
						range: {round(min, 2)} - {round(max, 2)} mm/h
					</span>
				</div>
			</Card>
		</div>
	);
};
