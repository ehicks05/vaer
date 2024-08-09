import { Card } from '@/components';
import { useDayIndex, useOpenWeatherMap } from '@/hooks';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import type { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import type {
	Hourly as IHourly,
	WeatherCondition,
} from '@/services/openweathermap/types/oneCall';
import { round } from 'lodash-es';
import { WiDirectionUp } from 'react-icons/wi';
import { getWeatherIcon } from '../constants/weather_icons';
import { Temp } from './PreferredTemperature';
import { addHours, formatHours, formatInTimeZone } from './utils';

interface OneHourSummaryProps {
	weather: WeatherCondition;
	temp: number;
	time: string;
}

const OneHourSummary = ({ weather, temp, time }: OneHourSummaryProps) => {
	const Icon = getWeatherIcon(weather.id, weather.icon);
	return (
		<div className="flex flex-col items-center text-center gap-1">
			<div>
				<Temp temp={temp} />
			</div>
			<div className="flex flex-col gap-1 items-center">
				<Icon size={32} />
			</div>
			<div className="whitespace-nowrap">{time}</div>
			<div className="text-xs">{weather.description}</div>
		</div>
	);
};

const scrollbarClasses =
	'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent group-hover:scrollbar-thumb-slate-800 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg';

const parsePrecipAmount = (forecast: IHourly | ThreeHourForecast) => {
	const { rain, snow } = forecast;
	const rainAmount =
		rain && '1h' in rain ? rain['1h'] : rain && '3h' in rain ? rain['3h'] : 0;
	const snowAmount =
		snow && '1h' in snow ? snow['1h'] : snow && '3h' in snow ? snow['3h'] : 0;

	return { rainAmount, snowAmount, totalAmount: rainAmount + snowAmount };
};

const HourlyDetail = ({
	hourly,
}: {
	hourly: IHourly | ThreeHourForecast;
}) => {
	const { totalAmount } = parsePrecipAmount(hourly);
	const roundedPrecip = round(totalAmount, 2);
	const precip = roundedPrecip ? (
		`${roundedPrecip} in`
	) : !totalAmount ? (
		'--'
	) : (
		<>&lt; .01 in</>
	);

	const { humidity } = 'main' in hourly ? hourly.main : hourly;
	const { wind_deg, wind_speed } =
		'wind' in hourly
			? { wind_deg: hourly.wind.deg, wind_speed: hourly.wind.speed }
			: hourly;

	return (
		<>
			<div className="whitespace-nowrap">{precip}</div>
			<div className="whitespace-nowrap">{`${humidity}%`}</div>
			<div className="flex flex-col items-center">
				<WiDirectionUp
					size={32}
					title={`${wind_deg}\u00B0`}
					style={{ transform: `rotate(${180 + wind_deg}deg)` }}
				/>
				<div className="whitespace-nowrap -mt-2">{Math.round(wind_speed)} mph</div>
			</div>
		</>
	);
};

const HourlyDetails = () => {
	const [dayIndex] = useDayIndex();
	const { oneCallQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();
	if (!oneCallQuery.data) {
		return <div className="p-4 pb-20">loading</div>;
	}

	const dt = dayIndex ? oneCallQuery.data.daily[dayIndex].dt : undefined;
	const tz = oneCallQuery.data.timezone;
	const date = dt ? formatInTimeZone(dt, tz, 'MM-dd') : undefined;

	const hourlyForecasts = !dayIndex
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
				hourlyForecasts.length === 0 ? 'pb-4' : 'pb-2'
			} ${scrollbarClasses}`}
		>
			{hourlyForecasts.map((hourly) => (
				<div key={hourly.dt} className="flex flex-col items-center gap-4">
					<HourlyDetail hourly={hourly} />
					<div className="whitespace-nowrap">
						{formatInTimeZone(
							new Date(hourly.dt),
							oneCallQuery.data.timezone,
							'h a',
						)}
					</div>
				</div>
			))}
			{hourlyForecasts.length === 0 && 'No available data'}
		</div>
	);
};

const getPlaceholderData = () =>
	[...new Array(25)].map((_, i) => ({
		dt: addHours(new Date(), i).toISOString(),
		time: '',
		temp: 0,
		weather: [{ id: 800, description: 'loading data', icon: 'd', main: '' }],
	}));

const HourlyForecast = () => {
	const [dayIndex] = useDayIndex();
	const { oneCallQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();

	if (!oneCallQuery.data) {
		return (
			<div className={`flex gap-6 overflow-auto p-4 ${scrollbarClasses}`}>
				{getPlaceholderData().map((hourly) => (
					<OneHourSummary
						key={hourly.dt}
						weather={hourly.weather[0]}
						temp={hourly.temp}
						time={formatHours(new Date(hourly.dt))}
					/>
				))}
			</div>
		);
	}

	const dt = dayIndex ? oneCallQuery.data.daily[dayIndex].dt : undefined;
	const tz = oneCallQuery.data.timezone;
	const date = dt ? formatInTimeZone(dt, tz, 'MM-dd') : undefined;

	const hourlyForecasts = !dayIndex
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
				hourlyForecasts.length === 0 ? 'pb-4' : 'pb-2'
			} ${scrollbarClasses}`}
		>
			{hourlyForecasts.map((hourly) => (
				<OneHourSummary
					key={hourly.dt}
					weather={hourly.weather[0]}
					temp={'main' in hourly ? hourly.main.temp : hourly.temp}
					time={formatInTimeZone(
						new Date(hourly.dt),
						oneCallQuery.data.timezone,
						'h a',
					)}
				/>
			))}
			{hourlyForecasts.length === 0 && 'No available data'}
		</div>
	);
};

export const Hourly = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="group">
				Hourly Forecast
				<Card>
					<HourlyForecast />
				</Card>
			</div>

			<div className="group">
				Hourly Details
				<Card>
					<HourlyDetails />
				</Card>
			</div>
		</div>
	);
};
