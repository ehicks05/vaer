import { Card } from '@/components';
import { useOpenWeatherMap } from '@/hooks';

const hmm = new Intl.DateTimeFormat('en-US', {
	hour: 'numeric',
	minute: '2-digit',
});

export const UpcomingPrecipitation = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;
	if (!data) {
		return null;
	}
	const { minutely } = data;
	if (minutely.every((minute) => minute.precipitation === 0)) {
		return null;
	}

	const [start, mid, end] = [0, minutely.length / 2, minutely.length - 1].map(
		(index) => hmm.format(new Date(minutely[index]?.dt || 0)),
	);

	return (
		<div className="flex flex-col mt-4">
			Upcoming Precipitation [experimental]
			<Card className="p-4 flex flex-col gap-1">
				<div className="flex items-end gap-0.5 md:gap-1">
					{minutely.map(({ dt, precipitation }) => {
						const height = `h-[${precipitation}px]`;
						return (
							<div
								key={dt}
								className={`w-4 ${height} bg-neutral-300`}
								style={{ height: `${(precipitation || 0.01) * 128}px` }}
							/>
						);
					})}
				</div>
				<div className="flex justify-between w-full text-sm">
					<span>{start}</span>
					<span>{mid}</span>
					<span>{end}</span>
				</div>
			</Card>
		</div>
	);
};
