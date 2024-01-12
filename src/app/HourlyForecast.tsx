import React, { useState } from 'react';
import { Card } from '@/components';
import { Temp } from './PreferredTemperature';
import { useDayIndex, useOpenWeatherMap } from '@/hooks';
import { Hourly, WeatherCondition } from '@/services/openweathermap/types/oneCall';
import { getWeatherIcon } from '../constants/weather_icons';
import { WiDirectionUp } from 'react-icons/wi';
import { degreeToDirection } from './utils';
import { round, sum } from 'lodash';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import { formatInTimeZone } from 'date-fns-tz';

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

const parsePrecipAmount = (forecast: Hourly | ThreeHourForecast) => {
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
	hourly: Hourly | ThreeHourForecast;
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

const HourlyDetails = () => {
	const [selectedOption, setSelectedOption] =
		useState<HourlyDetailOption>('precipitation');
	const [dayIndex] = useDayIndex();
	const { oneCallQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();
	if (!oneCallQuery.data) {
		return <div>loading</div>;
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
		<div className="group">
			Hourly Details
			<Card>
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
			</Card>
		</div>
	);
};

const HourlyForecast = () => {
	const [dayIndex] = useDayIndex();
	const { oneCallQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();
	if (!oneCallQuery.data) {
		return <div>loading</div>;
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
		<div className="flex flex-col gap-4">
			<div className="group">
				Hourly Forecast
				<Card>
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
				</Card>
			</div>

			<HourlyDetails />
		</div>
	);
};

export default HourlyForecast;
