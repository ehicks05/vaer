import React, { useState } from 'react';
import { Card } from '@/components';
import { format } from 'date-fns';
import { Temp } from './PreferredTemperature';
import { useOpenWeatherMap } from '@/hooks';
import { Hourly, WeatherCondition } from '@/services/openweathermap/types/oneCall';
import { getWeatherIcon } from '../constants/weather_icons';
import { WiDirectionUp } from 'react-icons/wi';
import { degreeToDirection, hPaToInHg } from './utils';
import { round } from 'lodash';

interface OneHourSummaryProps {
	weather: WeatherCondition;
	dt: number;
	temp: number;
}

const OneHourSummary = ({ weather, dt, temp }: OneHourSummaryProps) => {
	const Icon = getWeatherIcon(weather.id, weather.icon);
	return (
		<div className="flex flex-col items-center text-center gap-1" key={dt}>
			<div>
				<Temp temp={temp} />
			</div>
			<div className="flex flex-col gap-1 items-center">
				<Icon size={32} />
			</div>
			<div className="whitespace-nowrap">{format(new Date(dt), 'h a')}</div>
			<div className="text-xs">{weather.description}</div>
		</div>
	);
};

interface OneHourWindProps {
	dt: number;
	wind_deg: number;
	wind_speed: number;
}

const OneHourWind = ({ dt, wind_deg, wind_speed }: OneHourWindProps) => {
	return (
		<div className="flex flex-col items-center text-center gap-1" key={dt}>
			<WiDirectionUp
				size={32}
				title={`${wind_deg}\u00B0`}
				style={{ transform: `rotate(${wind_deg}deg)` }}
			/>
			<div className="whitespace-nowrap">
				{Math.round(wind_speed)} mph {degreeToDirection(wind_deg)}
			</div>
			<div className="whitespace-nowrap">{format(new Date(dt), 'h a')}</div>
		</div>
	);
};

interface OneHourPrecipitationProps {
	dt: number;
	amount: number;
}

const OneHourPrecipitation = ({ dt, amount }: OneHourPrecipitationProps) => {
	return (
		<div className="flex flex-col items-center text-center gap-1" key={dt}>
			<div className="whitespace-nowrap">
				{amount ? `${round(amount, 1)} mm` : '--'}
			</div>
			<div className="whitespace-nowrap">{format(new Date(dt), 'h a')}</div>
		</div>
	);
};

interface OneHourHumidityProps {
	dt: number;
	amount: number;
}

const OneHourHumidity = ({ dt, amount }: OneHourHumidityProps) => {
	return (
		<div className="flex flex-col items-center text-center gap-1" key={dt}>
			<div className="whitespace-nowrap">{`${amount}%`}</div>
			<div className="whitespace-nowrap">{format(new Date(dt), 'h a')}</div>
		</div>
	);
};

interface OneHourPressureProps {
	dt: number;
	inHg: number;
}

const OneHourPressure = ({ dt, inHg }: OneHourPressureProps) => {
	return (
		<div className="flex flex-col items-center text-center gap-1" key={dt}>
			<div className="whitespace-nowrap">{`${round(inHg, 1)}`}</div>
			<div className="whitespace-nowrap">{format(new Date(dt), 'h a')}</div>
		</div>
	);
};

const scrollbarClasses =
	'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent group-hover:scrollbar-thumb-slate-800 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg';

const HOURLY_DETAIL_OPTIONS = [
	'precipitation',
	'humidity',
	'wind',
	'pressure',
] as const;
type HourlyDetailOption = (typeof HOURLY_DETAIL_OPTIONS)[number];

const toTitleCase = (input: string) => input[0].toLocaleUpperCase() + input.slice(1);

const HourlyDetail = ({
	option,
	hourly,
}: { option: HourlyDetailOption; hourly: Hourly }) => {
	return (
		<>
			{option === 'precipitation' && (
				<OneHourPrecipitation dt={hourly.dt} amount={hourly.rain?.['1h'] || 0} />
			)}
			{option === 'humidity' && (
				<OneHourHumidity dt={hourly.dt} amount={hourly.humidity} />
			)}
			{option === 'wind' && (
				<OneHourWind
					dt={hourly.dt}
					wind_deg={hourly.wind_deg}
					wind_speed={hourly.wind_speed}
				/>
			)}
			{option === 'pressure' && (
				<OneHourPressure dt={hourly.dt} inHg={hPaToInHg(hourly.pressure)} />
			)}
		</>
	);
};

const HourlyDetails = () => {
	const [selectedOption, setSelectedOption] =
		useState<HourlyDetailOption>('precipitation');
	const { oneCallQuery } = useOpenWeatherMap();
	if (!oneCallQuery.data) {
		return <div>loading</div>;
	}
	const hourlyForecasts = oneCallQuery.data.hourly.slice(0, 24) || [];

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
				<div className={`flex gap-6 overflow-auto p-4 pb-2 ${scrollbarClasses}`}>
					{hourlyForecasts.map((hourly) => (
						<HourlyDetail key={hourly.dt} option={selectedOption} hourly={hourly} />
					))}
				</div>
			</Card>
		</div>
	);
};

const HourlyForecast = () => {
	const { oneCallQuery } = useOpenWeatherMap();
	if (!oneCallQuery.data) {
		return <div>loading</div>;
	}
	const hourlyForecasts = oneCallQuery.data.hourly.slice(0, 24) || [];

	return (
		<div className="flex flex-col gap-4">
			<div className="group">
				Hourly Forecast
				<Card>
					<div className={`flex gap-6 overflow-auto p-4 pb-2 ${scrollbarClasses}`}>
						{hourlyForecasts.map((hourly) => (
							<OneHourSummary
								key={hourly.dt}
								weather={hourly.weather[0]}
								dt={hourly.dt}
								temp={hourly.temp}
							/>
						))}
					</div>
				</Card>
			</div>

			<HourlyDetails />
		</div>
	);
};

export default HourlyForecast;
