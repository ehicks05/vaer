import type { ReactNode } from 'react';
import { Card } from '@/components';
import { useOpenMeteo } from '@/hooks';
import { formatInTimeZone } from '@/lib/utils';
import type { Minutely15 } from '@/services/openMeteo/types/forecast';
import { Chart } from './Chart';

export const HOURS_TO_SHOW = 4;

const getMessage = (minutely: Minutely15[], tz: string) => {
	const currentlyPrecipitating = minutely[0].precipitation !== 0;
	const firstPrecip = minutely.find((m) => m.precipitation !== 0);
	const firstZeroPrecip = minutely.find((m) => m.precipitation === 0);

	if (!currentlyPrecipitating && !firstPrecip) {
		return `No precipitation in the next ${HOURS_TO_SHOW} hours.`;
	}
	if (!currentlyPrecipitating && firstPrecip) {
		const startsAt = formatInTimeZone(new Date(firstPrecip.time), tz, 'h:mm a');
		return `Precipitation starts at ${startsAt}`;
	}
	if (currentlyPrecipitating && firstZeroPrecip) {
		const endsAt = formatInTimeZone(new Date(firstZeroPrecip.time), tz, 'h:mm a');
		return `Precipitation ends at ${endsAt}`;
	}

	return `Precipitation throughout the next ${HOURS_TO_SHOW} hours.`;
};

const Container = ({ children }: { children?: ReactNode }) => (
	<Card gradient={false} className="p-4 flex flex-col gap-1 bg-muted">
		{children}
	</Card>
);

export const UpcomingPrecipitation = () => {
	const { openMeteo } = useOpenMeteo();
	const { data } = openMeteo;
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

	const hasPrecip = minutely_15.some((o) => o.precipitation !== 0);

	const message = minutely_15.length > 0 ? getMessage(minutely_15, tz) : '';

	return (
		<Container>
			<div
				className={
					hasPrecip ? '' : 'h-full flex flex-col items-center justify-center'
				}
			>
				{message}
			</div>
			{hasPrecip && <Chart minutely={minutely_15} tz={tz} />}
		</Container>
	);
};
