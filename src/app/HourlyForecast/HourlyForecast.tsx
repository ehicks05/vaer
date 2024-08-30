import { Card } from '@/components';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenWeatherMap } from '@/hooks';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import type { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import type { Hourly as IHourly } from '@/services/openweathermap/types/oneCall';
import { useContext } from 'react';
import { Temp } from '../PreferredTemperature';
import { formatInTimeZone } from '../utils';
import { Humidity } from './Humidity';
import { Precip } from './Precip';
import { ScrollbarContainer } from './ScrollbarContainer';
import { Weather } from './Weather';
import { Wind } from './Wind';
import { PLACEHOLDER_DATA } from './constants';

interface Props {
	hourly: IHourly | ThreeHourForecast;
	tz: string;
}

const HourlyDetail = ({ hourly, tz }: Props) => {
	const temp = 'main' in hourly ? hourly.main.temp : hourly.temp;
	const time = formatInTimeZone(new Date(hourly.dt), tz, 'h a');

	return (
		<div className="flex flex-col items-center gap-4">
			<Temp temp={temp} />
			<Weather hourly={hourly} />
			<Precip hourly={hourly} />
			<Humidity hourly={hourly} />
			<Wind hourly={hourly} />
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
			<ScrollbarContainer>
				{PLACEHOLDER_DATA.map((hourly) => (
					<HourlyDetail key={hourly.dt} hourly={hourly} tz="" />
				))}
			</ScrollbarContainer>
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
		<div className="flex flex-col group">
			Hourly Forecast
			<Card>
				<ScrollbarContainer>
					{hourlies.map((hourly) => (
						<HourlyDetail key={hourly.dt} hourly={hourly} tz={tz} />
					))}
					{hourlies.length === 0 && 'No available data'}
				</ScrollbarContainer>
			</Card>
		</div>
	);
};
