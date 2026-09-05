import { useUnitSystem } from '@/features/UnitSystem/useUnitSystem';
import { formatInTimeZone } from '@/lib/utils';
import type { Minutely15 } from '@/services/openMeteo/types/forecast';
import { ChartBar } from './ChartBar';

// Minutely15 values are per 15 minutes
export const QUARTER_HOURS_PER_HOUR = 4;

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

	// find the higher of precip/snow in each of the minutely_15s
	const higherForm = minutely.map((o) => Math.max(o.precipitation, o.snowfall));

	// find min/max across all minutely_15s
	const min = Math.min(...higherForm);
	const max = Math.max(...higherForm);

	return (
		<div className="flex flex-col gap-1">
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

			<div className="grow" />
			<div className="flex justify-end gap-2 w-full text-xs">
				<span className="text-muted-foreground">
					range: {getRate(min * QUARTER_HOURS_PER_HOUR)} -{' '}
					{getRate(max * QUARTER_HOURS_PER_HOUR)}
				</span>
			</div>
		</div>
	);
};
