import React from 'react';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import { useDayIndex, useOpenWeatherMap } from '@/hooks';
import { Card } from '@/components';
import {
	WiBarometer,
	WiDirectionUp,
	WiHumidity,
	WiSunrise,
	WiSunset,
} from 'react-icons/wi';
import { MdOutlineVisibility } from 'react-icons/md';
import { format } from 'date-fns';
import { degreeToDirection, getPressureDescription, hPaToInHg } from './utils';
import { round } from 'lodash';
import { Alert } from './Alert';
import { AQI_DISPLAY_NAMES } from '@/constants/aqi';
import { Summary } from './Summary';
import { meterFmt } from '@/constants/fmt';

const AirPollution = () => {
	const { airPollutionQuery } = useOpenWeatherMap();
	const { data } = airPollutionQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const {
		current: { list },
	} = airPollutionQuery.data;
	const { aqi } = list[0].main;

	return (
		<div className="col-span-1 h-full">
			Air Quality
			<Card>
				<div className="flex items-center gap-2 w-full p-4">
					<div>
						{aqi}: {AQI_DISPLAY_NAMES[aqi]}
					</div>
				</div>
			</Card>
		</div>
	);
};

export const DayStats = () => {
	const [dayIndex] = useDayIndex();
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const dataSource = dayIndex
		? oneCallQuery.data.daily[dayIndex]
		: oneCallQuery.data.current;
	const { humidity, pressure, sunrise, sunset, visibility, wind_speed, wind_deg } =
		dataSource;

	const inHg = hPaToInHg(pressure);
	const description = getPressureDescription(inHg);

	return (
		<>
			<div className="col-span-1 h-full flex flex-col">
				Wind
				<Card className="h-full">
					<div className="flex items-center gap-2 w-full p-4">
						<WiDirectionUp
							size={32}
							title={`${wind_deg}\u00B0`}
							style={{ transform: `rotate(${wind_deg}deg)` }}
						/>
						<div>
							{Math.round(wind_speed)} mph {degreeToDirection(wind_deg)}
						</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Sunrise / Sunset
				<Card>
					<div className="flex flex-col gap-2 p-4">
						<div className="flex items-center gap-2 w-full">
							<WiSunrise size={32} />
							<div>{format(sunrise, 'h:mm a')}</div>
						</div>
						<div className="flex items-center gap-2 w-full">
							<WiSunset size={32} />
							<div>{format(sunset, 'h:mm a')}</div>
						</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Humidity
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<WiHumidity size={32} />
						<div>{Math.round(humidity)}</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Pressure
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<WiBarometer size={32} />
						<div>
							{round(inHg, 1)}: {description}
						</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Visibility
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<MdOutlineVisibility size={24} />
						<div>{meterFmt.format(visibility)}m</div>
					</div>
				</Card>
			</div>
		</>
	);
};

export const Home = () => {
	const currentConditions = (
		<div className="col-span-2">
			Currently
			<Summary />
		</div>
	);

	return (
		<div className="p-2 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start justify-center gap-4">
			<Alert />
			<div className="md:hidden">{currentConditions}</div>
			<div className="h-full">
				<DailyForecast />
			</div>
			<div className="grid grid-cols-2 gap-4 xl:col-span-2">
				<div className="col-span-2 hidden md:block">
					Currently
					<Summary />
				</div>
				<div className="col-span-2">
					<HourlyForecast />
				</div>
				<DayStats />
				<AirPollution />
			</div>
		</div>
	);
};
