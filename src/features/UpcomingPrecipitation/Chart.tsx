import { useUnitSystem } from '@/features/UnitSystem/useUnitSystem';
import { formatInTimeZone } from '@/lib/utils';
import type { Minutely15 } from '@/services/openMeteo/types/forecast';
import { ChartBar } from './ChartBar';
import { QUARTER_HOURS_PER_HOUR } from './constants';

const toHourlyRate = (minute: Minutely15) =>
	Math.max(minute.precipitation, minute.snowfall) * QUARTER_HOURS_PER_HOUR;

interface Props {
	minutely: Minutely15[];
	tz: string;
}

export const Chart = ({ minutely, tz }: Props) => {
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
						<ChartBar
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
