import { Card } from '@/components';
import { useDayIndex, useOpenWeatherMap } from '@/hooks';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import {
	Hourly as IHourly,
	WeatherCondition,
} from '@/services/openweathermap/types/oneCall';
import { addHours, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { round } from 'lodash';
import React, { useState } from 'react';
import { WiDirectionUp } from 'react-icons/wi';
import { getWeatherIcon } from '../constants/weather_icons';
import { Temp } from './PreferredTemperature';
import { degreeToDirection } from './utils';

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

interface OneHourWindProps {
	time: string;
	wind_deg: number;
	wind_speed: number;
}

const OneHourWind = ({ time, wind_deg, wind_speed }: OneHourWindProps) => {
	return (
		<div className="flex flex-col items-center text-center gap-1">
			<WiDirectionUp
				size={32}
				title={`${wind_deg}\u00B0`}
				style={{ transform: `rotate(${180 + wind_deg}deg)` }}
			/>
			<div className="whitespace-nowrap">
				{Math.round(wind_speed)} mph {degreeToDirection(wind_deg)}
			</div>
			<div className="whitespace-nowrap">{time}</div>
		</div>
	);
};

interface OneHourPrecipitationProps {
	time: string;
	amount: number;
}

const OneHourPrecipitation = ({ time, amount }: OneHourPrecipitationProps) => {
	return (
		<div className="flex flex-col items-center text-center gap-1">
			<div className="whitespace-nowrap">
				{amount ? `${round(amount, 2)} in` : '--'}
			</div>
			<div className="whitespace-nowrap">{time}</div>
		</div>
	);
};

interface OneHourHumidityProps {
	time: string;
	amount: number;
}

const OneHourHumidity = ({ time, amount }: OneHourHumidityProps) => {
	return (
		<div className="flex flex-col items-center text-center gap-1">
			<div className="whitespace-nowrap">{`${amount}%`}</div>
			<div className="whitespace-nowrap">{time}</div>
		</div>
	);
};

const scrollbarClasses =
	'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent group-hover:scrollbar-thumb-slate-800 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg';

const HOURLY_DETAIL_OPTIONS = ['precipitation', 'humidity', 'wind'] as const;
type HourlyDetailOption = (typeof HOURLY_DETAIL_OPTIONS)[number];

const toTitleCase = (input: string) => input[0].toLocaleUpperCase() + input.slice(1);

const parsePrecipAmount = (forecast: IHourly | ThreeHourForecast) => {
	const { rain, snow } = forecast;
	const rainAmount =
		rain && '1h' in rain ? rain['1h'] : rain && '3h' in rain ? rain['3h'] : 0;
	const snowAmount =
		snow && '1h' in snow ? snow['1h'] : snow && '3h' in snow ? snow['3h'] : 0;

	return { rainAmount, snowAmount, totalAmount: rainAmount + snowAmount };
};

const HourlyDetail = ({
	option,
	hourly,
	time,
}: {
	option: HourlyDetailOption;
	hourly: IHourly | ThreeHourForecast;
	time: string;
}) => {
	const { totalAmount } = parsePrecipAmount(hourly);
	const { humidity } = 'main' in hourly ? hourly.main : hourly;
	const { wind_deg, wind_speed } =
		'wind' in hourly
			? { wind_deg: hourly.wind.deg, wind_speed: hourly.wind.speed }
			: hourly;

	return (
		<>
			{option === 'precipitation' && (
				<OneHourPrecipitation time={time} amount={totalAmount} />
			)}
			{option === 'humidity' && <OneHourHumidity time={time} amount={humidity} />}
			{option === 'wind' && (
				<OneHourWind time={time} wind_deg={wind_deg} wind_speed={wind_speed} />
			)}
		</>
	);
};

const HourlyDetails = ({
	selectedOption,
}: { selectedOption: HourlyDetailOption }) => {
	const [dayIndex] = useDayIndex();
	const { oneCallQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();
	if (!oneCallQuery.data) {
		return <div className="p-4">loading</div>;
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
		<>
			{selectedOption === 'precipitation' && (
				<div className="p-4 pb-0">
					Daily amount:{' '}
					{round(
						oneCallQuery.data.daily[dayIndex || 0].rain +
							oneCallQuery.data.daily[dayIndex || 0].snow,
						2,
					)}{' '}
					in
				</div>
			)}

			<div
				className={`flex gap-6 overflow-auto p-4 ${
					hourlyForecasts.length === 0 ? 'pb-4' : 'pb-2'
				} ${scrollbarClasses}`}
			>
				{hourlyForecasts.map((hourly) => (
					<HourlyDetail
						key={hourly.dt}
						option={selectedOption}
						hourly={hourly}
						time={formatInTimeZone(
							new Date(hourly.dt),
							oneCallQuery.data.timezone,
							'h a',
						)}
					/>
				))}
				{hourlyForecasts.length === 0 && 'No available data'}
			</div>
		</>
	);
};

const getPlaceholderData = () =>
	[...new Array(25)].map((_, i) => ({
		dt: addHours(new Date(), i).toISOString(),
		time: '',
		temp: 0,
		weather: [{ id: 800, description: 'loading', icon: 'd', main: '' }],
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
						time={format(new Date(hourly.dt), 'h a')}
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

const HourlyDetailsWrapper = () => {
	const [selectedOption, setSelectedOption] =
		useState<HourlyDetailOption>('precipitation');

	return (
		<div>
			<div className="flex gap-2 p-2 pb-0">
				{HOURLY_DETAIL_OPTIONS.map((option) => (
					<button
						key={option}
						type="button"
						className={`p-2 rounded-lg ${
							option === selectedOption ? 'bg-slate-800' : ''
						}`}
						onClick={() => setSelectedOption(option)}
					>
						{toTitleCase(option)}
					</button>
				))}
			</div>

			<HourlyDetails selectedOption={selectedOption} />
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
					<HourlyDetailsWrapper />
				</Card>
			</div>
		</div>
	);
};
