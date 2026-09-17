import { round } from 'es-toolkit';
import { type ReactNode, useContext } from 'react';
import { Card, EmbeddedTitle, FeelsLike } from '@/components';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useUnitSystem } from '@/features/UnitSystem/useUnitSystem';
import { useOpenMeteo } from '@/hooks';
import { formatInTimeZone } from '@/lib/utils';
import type { Hourly } from '@/services/openMeteo/types/forecast';
import { Precip } from './Precip';
import { Weather } from './Weather';
import { Wind } from './Wind';

const Container = ({ children }: { children?: ReactNode }) => (
	<div className="relative">
		<EmbeddedTitle title="Hourly Forecast" />
		<Card className="min-h-94 flex gap-6 p-4 mt-2 xl:mt-0 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground scroll-fade-TODO">
			{children}
		</Card>
	</div>
);

interface Props {
	hourly: Hourly;
	tz: string;
}

const HourlyDetail = ({ hourly, tz }: Props) => {
	const { getTemp, getLength, getSpeed } = useUnitSystem();
	const time = formatInTimeZone(new Date(hourly.time), tz, 'h a');

	const {
		dew_point_2m,
		precipitation,
		precipitation_probability,
		snowfall,
		temperature_2m,
		apparent_temperature,
		wind_speed_10m,
		weather_code,
		is_day,
	} = hourly;

	return (
		<div className="flex flex-col items-center gap-4 w-12 min-w-12">
			<Weather code={weather_code} isDay={is_day === 1} />
			<div className="grow -mt-4" />
			{getTemp(temperature_2m)}
			<FeelsLike apparent_temperature={apparent_temperature} />
			<div
				className={`flex items-baseline gap-0.5 whitespace-nowrap ${precipitation_probability < 20 ? 'text-muted-foreground' : ''}`}
			>
				{`${round(Math.floor(precipitation_probability / 5)) * 5}`}
				<span className="text-xs">%P</span>
			</div>
			<Precip precip={getLength(Math.max(precipitation, snowfall))} />
			<div className="flex items-baseline gap-0.5 whitespace-nowrap">
				<span
					className={
						dew_point_2m <= 60 || apparent_temperature <= 72
							? 'text-muted-foreground'
							: dew_point_2m <= 64
								? 'text-yellow-500'
								: 'text-red-500'
					}
				>{`${getTemp(dew_point_2m)}`}</span>
				<span className="text-xs">DP</span>
			</div>
			<Wind windSpeed={getSpeed(wind_speed_10m)} />
			<div className="whitespace-nowrap">{time}</div>
		</div>
	);
};

export const HourlyForecast = () => {
	const { dayIndex } = useContext(DayIndexContext);
  const { openMeteo } = useOpenMeteo();

  if (!openMeteo.data) {
    return <Container />
  }

	const tz = openMeteo.data?.timezone || 'utc';
	const hourlies =
		openMeteo.data?.hourly
			.filter((hourly) => !!dayIndex || hourly.time >= Date.now())
			.slice((dayIndex || 0) * 24, (dayIndex || 0) * 24 + 24) || [];

	return (
		<Container>
			{hourlies.map((hourly) => (
				<HourlyDetail key={hourly.time} hourly={hourly} tz={tz} />
			))}
		</Container>
	);
};
