import { round } from 'es-toolkit';
import { type ReactNode, useContext } from 'react';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenMeteo } from '@/hooks';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import type { Hourly } from '@/services/openMeteo/types/forecast';
import { formatInTimeZone } from '../utils';
import { PLACEHOLDER_DATA } from './constants';
import { Precip } from './Precip';
import { ScrollbarContainer } from './ScrollbarContainer';
import { Weather } from './Weather';
import { Wind } from './Wind';

const Container = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-col group">
		Hourly Forecast
		<ScrollbarContainer>{children}</ScrollbarContainer>
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
		wind_speed_10m,
		weather_code,
		is_day,
	} = hourly;

	return (
		<div className="flex flex-col items-center gap-4 w-12 min-w-12">
			{getTemp(temperature_2m)}
			<Weather code={weather_code} isDay={is_day === 1} />
			<div className="grow -mt-4" />
			<div
				className={`flex items-baseline gap-0.5 whitespace-nowrap ${precipitation_probability < 20 ? 'text-neutral-400' : ''}`}
			>
				{`${round(Math.floor(precipitation_probability / 5)) * 5}`}
				<span className="text-xs">%P</span>
			</div>
			<Precip precip={getLength(Math.max(precipitation, snowfall))} />
			<div className="flex items-baseline gap-0.5 whitespace-nowrap">
				<span
					className={
						dew_point_2m <= 55
							? 'text-green-500'
							: dew_point_2m <= 60
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
		return (
			<Container>
				{PLACEHOLDER_DATA.map((hourly) => (
					<HourlyDetail key={hourly.time} hourly={hourly} tz="" />
				))}
			</Container>
		);
	}

	const tz = openMeteo.data.timezone;
	const hourlies = openMeteo.data.hourly
		.filter((hourly) => !!dayIndex || new Date(hourly.time).getTime() >= Date.now())
		.slice((dayIndex || 0) * 24, (dayIndex || 0) * 24 + 24);

	return (
		<Container>
			{hourlies.map((hourly) => (
				<HourlyDetail key={hourly.time} hourly={hourly} tz={tz} />
			))}
			{hourlies.length === 0 && 'No available data'}
		</Container>
	);
};
