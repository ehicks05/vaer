import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenWeatherMap } from '@/hooks';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import { useUnits } from '@/hooks/useUnits';
import type { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import type { Hourly as IHourly } from '@/services/openweathermap/types/oneCall';
import { type ReactNode, useContext } from 'react';
import { formatInTimeZone } from '../utils';
import { Humidity } from './Humidity';
import { Precip } from './Precip';
import { ScrollbarContainer } from './ScrollbarContainer';
import { Weather } from './Weather';
import { Wind } from './Wind';
import { PLACEHOLDER_DATA } from './constants';
import { parsePrecip } from './utils';

const Container = ({ children }: { children: ReactNode }) => (
	<div className="flex flex-col group">
		Hourly Forecast
		<ScrollbarContainer>{children}</ScrollbarContainer>
	</div>
);

interface Props {
	hourly: IHourly | ThreeHourForecast;
	tz: string;
}

const HourlyDetail = ({ hourly, tz }: Props) => {
	const { getTemp, getLength, getSpeed } = useUnits();
	const time = formatInTimeZone(new Date(hourly.dt), tz, 'h a');
	const temp = 'main' in hourly ? hourly.main.temp : hourly.temp;
	const humidity = 'main' in hourly ? hourly.main.humidity : hourly.humidity;
	const { totalAmount: precip } = parsePrecip(hourly);

	const { wind_deg, wind_speed } =
		'wind' in hourly
			? { wind_deg: hourly.wind.deg, wind_speed: hourly.wind.speed }
			: hourly;

	return (
		<div className="flex flex-col items-center gap-4 w-12 min-w-12">
			{getTemp(temp)}
			<Weather hourly={hourly} />
			<div className="flex-grow -mt-4" />
			<Precip precip={getLength(precip)} />
			<Humidity humidity={humidity} />
			<Wind windDeg={wind_deg} windSpeed={getSpeed(wind_speed)} />
			<div className="whitespace-nowrap">{time}</div>
		</div>
	);
};

export const HourlyForecast = () => {
	const { dayIndex } = useContext(DayIndexContext);
	const { oneCallQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();

	if (!oneCallQuery.data) {
		return (
			<Container>
				{PLACEHOLDER_DATA.map((hourly) => (
					<HourlyDetail key={hourly.dt} hourly={hourly} tz="" />
				))}
			</Container>
		);
	}

	const dt = dayIndex && oneCallQuery.data.daily[dayIndex].dt;
	const tz = oneCallQuery.data.timezone;
	const date = dt && formatInTimeZone(dt, tz, 'MM-dd');

	const hourlies = !dayIndex
		? oneCallQuery.data.hourly.slice(0, 24) || []
		: dayIndex === 1
			? oneCallQuery.data.hourly
					.filter((h) => formatInTimeZone(h.dt, tz, 'MM-dd') === date)
					.slice(7) || []
			: fiveDayQuery.data?.list.filter(
					(h) => formatInTimeZone(h.dt, tz, 'MM-dd') === date,
				) || [];

	return (
		<Container>
			{hourlies.map((hourly) => (
				<HourlyDetail key={hourly.dt} hourly={hourly} tz={tz} />
			))}
			{hourlies.length === 0 && 'No available data'}
		</Container>
	);
};
