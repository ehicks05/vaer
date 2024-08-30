import { Card } from '@/components';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenWeatherMap } from '@/hooks';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import type { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import type { Hourly as IHourly } from '@/services/openweathermap/types/oneCall';
import { round } from 'lodash-es';
import { useContext } from 'react';
import { WiDirectionUp, WiHumidity } from 'react-icons/wi';
import { getWeatherIcon } from '../constants/weather_icons';
import { Temp } from './PreferredTemperature';
import { addHours, formatHours, formatInTimeZone } from './utils';

const scrollbarClasses =
	'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent group-hover:scrollbar-thumb-slate-800 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg';

const parsePrecipAmount = (forecast: IHourly | ThreeHourForecast) => {
	const { rain, snow } = forecast;
	const rainAmount =
		rain && '1h' in rain ? rain['1h'] : rain && '3h' in rain ? rain['3h'] : 0;
	const snowAmount =
		snow && '1h' in snow ? snow['1h'] : snow && '3h' in snow ? snow['3h'] : 0;

	const totalAmount = rainAmount + snowAmount;
	const rounded = round(totalAmount, 2);
	const precip = rounded ? (
		`${rounded} in`
	) : !totalAmount ? (
		'0 in'
	) : (
		<>&lt; .01 in</>
	);

	return { rainAmount, snowAmount, totalAmount, precip };
};

interface Props {
	hourly: IHourly | ThreeHourForecast;
	tz: string;
}

const HourlyDetail = ({ hourly, tz }: Props) => {
	const temp = 'main' in hourly ? hourly.main.temp : hourly.temp;
	const weather = hourly.weather[0];
	const Icon = getWeatherIcon(weather.id, weather.icon);

	const { precip } = parsePrecipAmount(hourly);
	const { humidity } = 'main' in hourly ? hourly.main : hourly;
	const { wind_deg, wind_speed } =
		'wind' in hourly
			? { wind_deg: hourly.wind.deg, wind_speed: hourly.wind.speed }
			: hourly;
	const time = formatInTimeZone(new Date(hourly.dt), tz, 'h a');

	return (
		<div className="flex flex-col items-center gap-4">
			<Temp temp={temp} />

			<div className="flex flex-col items-center text-center text-xs">
				<Icon size={32} />
				{weather.description}
			</div>

			<div
				className={`whitespace-nowrap ${precip === '0 in' ? 'text-neutral-400' : ''}`}
			>
				{precip}
			</div>
			<div className="flex items-center whitespace-nowrap">
				{`${humidity}`}
				<WiHumidity size={28} className="-ml-1" />
			</div>
			<div className="flex flex-col items-center">
				<WiDirectionUp
					size={32}
					title={`${wind_deg}\u00B0`}
					style={{ transform: `rotate(${180 + wind_deg}deg)` }}
				/>
				<div className="whitespace-nowrap -mt-2">{Math.round(wind_speed)} mph</div>
			</div>
			<div className="whitespace-nowrap">{time}</div>
		</div>
	);
};

const getPlaceholderData = () =>
	[...new Array(25)].map(
		(_, i) =>
			({
				dt: addHours(new Date(), i).getTime(),
				time: formatHours(new Date(addHours(new Date(), i).toISOString())),
				weather: [{ id: 800, description: 'loading data', icon: 'd', main: '' }],
				temp: 0,
				pressure: 0,
				humidity: 0,
				dew_point: 0,
				feels_like: 0,
				uvi: 0,
				clouds: 0,
				visibility: 0,
				wind_deg: 0,
				wind_speed: 0,
				wind_gust: 0,
				pop: 0,
				rain: { '1h': 0 },
				snow: { '1h': 0 },
			}) as IHourly,
	);

const HourlyForecast = () => {
	const { dayIndex } = useContext(DayIndexContext);
	const { oneCallQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();

	if (!oneCallQuery.data) {
		return (
			<div className={`flex gap-6 overflow-auto p-4 ${scrollbarClasses}`}>
				{getPlaceholderData().map((hourly) => (
					<HourlyDetail key={hourly.dt} hourly={hourly} tz="" />
				))}
			</div>
		);
	}

	const dt = dayIndex ? oneCallQuery.data.daily[dayIndex].dt : undefined;
	const tz = oneCallQuery.data.timezone;
	const date = dt ? formatInTimeZone(dt, tz, 'MM-dd') : undefined;

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
		<div
			className={`flex gap-6 overflow-auto p-4 ${
				hourlies.length === 0 ? 'pb-4' : 'pb-2'
			} ${scrollbarClasses}`}
		>
			{hourlies.map((hourly) => (
				<HourlyDetail key={hourly.dt} hourly={hourly} tz={tz} />
			))}
			{hourlies.length === 0 && 'No available data'}
		</div>
	);
};

export const Hourly = () => (
	<div className="flex flex-col group">
		Hourly Forecast
		<Card>
			<HourlyForecast />
		</Card>
	</div>
);
