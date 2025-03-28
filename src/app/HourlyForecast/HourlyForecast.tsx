import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenMeteo } from '@/hooks';
import { useUnits } from '@/hooks/useUnits';
import type { Hourly } from '@/services/openMeteo/types/forecast';
import { type ReactNode, useContext } from 'react';
import { formatInTimeZone } from '../utils';
import { Humidity } from './Humidity';
import { Precip } from './Precip';
import { ScrollbarContainer } from './ScrollbarContainer';
import { Weather } from './Weather';
import { Wind } from './Wind';
import { PLACEHOLDER_DATA } from './constants';

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
	const { getTemp, getLength, getSpeed } = useUnits();
	const time = formatInTimeZone(new Date(hourly.time), tz, 'h a');

	const {
		relative_humidity_2m,
		precipitation,
		temperature_2m,
		wind_direction_10m,
		wind_speed_10m,
		weather_code,
		is_day,
	} = hourly;

	return (
		<div className="flex flex-col items-center gap-4 w-12 min-w-12">
			{getTemp(temperature_2m)}
			<Weather code={weather_code} isDay={is_day === 1} />
			<div className="grow -mt-4" />
			<Precip precip={getLength(precipitation)} />
			<Humidity humidity={relative_humidity_2m} />
			<Wind windDeg={wind_direction_10m} windSpeed={getSpeed(wind_speed_10m)} />
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
		.filter(
			(hourly) =>
				!!dayIndex || new Date(hourly.time).getTime() >= new Date().getTime(),
		)
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
