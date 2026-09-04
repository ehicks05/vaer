import type { ReactNode } from 'react';
import { Card } from '@/components';
import { useUnitSystem } from '@/features/UnitSystem/useUnitSystem';
import { useOpenMeteo } from '@/hooks';
import { formatInTimeZone } from '@/lib/utils';
import { Chart } from './Chart';
import { HOURS_TO_SHOW, QUARTER_HOURS_PER_HOUR } from './constants';
import { getMessage } from './getMessage';

const Container = ({ children }: { children?: ReactNode }) => (
	<Card gradient={false} className="p-4 flex flex-col gap-1 h-full bg-muted">
		{children}
	</Card>
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
				<div className="text-xs text-muted-foreground">checked at</div>
			</Container>
		);
	}
	const { timezone: tz } = data;
	const minutely_15 = data.minutely_15
		.filter((minutely) => new Date(minutely.time).getTime() >= Date.now())
		.slice(0, HOURS_TO_SHOW * 4);

	// find the higher of precip/snow in each of the minutely_15s
	const higherForm = minutely_15.map((o) => Math.max(o.precipitation, o.snowfall));

  // find min/max across all minutely_15s
	const min = Math.min(...higherForm);
	const max = Math.max(...higherForm);
	const message = minutely_15.length > 0 ? getMessage(minutely_15, tz) : '';

	return (
		<Container>
			<div className="flex flex-col gap-1">
				{message}
				{max > 0 && <Chart minutely={minutely_15} tz={tz} />}
			</div>
			<div className="grow" />
			<div className="flex justify-between gap-2 w-full text-xs">
				<span className="text-muted-foreground">
					checked at {formatInTimeZone(new Date(dataUpdatedAt), tz, 'h:mm a')}
				</span>
				{max > 0 && (
					<span className="text-muted-foreground">
						range: {getRate(min * QUARTER_HOURS_PER_HOUR)} -{' '}
						{getRate(max * QUARTER_HOURS_PER_HOUR)}
					</span>
				)}
			</div>
		</Container>
	);
};
