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
import { max, mean, round } from 'lodash';
import { Alert } from './Alert';
import { AQI_DISPLAY_NAMES } from '@/constants/aqi';
import { Summary } from './Summary';
import { meterFmt } from '@/constants/fmt';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';

export const DayStats = () => {
	const [dayIndex] = useDayIndex();
	const { oneCallQuery, airPollutionQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();
	const { data } = oneCallQuery;
	const { data: airPollutionData } = airPollutionQuery;
	const { data: fiveDayData } = fiveDayQuery;

	if (!data || !airPollutionData || !fiveDayData) {
		return <div>loading</div>;
	}

	const dataSource = dayIndex
		? oneCallQuery.data.daily[dayIndex]
		: oneCallQuery.data.current;
	const { humidity, pressure, sunrise, sunset, wind_speed, wind_deg } = dataSource;

	const inHg = hPaToInHg(pressure);
	const description = getPressureDescription(inHg);

	const dt = dayIndex ? oneCallQuery.data.daily[dayIndex].dt : undefined;
	const date = dt ? format(dt, 'dd') : undefined;

	const visibility =
		'visibility' in dataSource
			? dataSource.visibility
			: mean(
					fiveDayData.list
						.filter((o) => format(o.dt, 'dd') === date)
						.map((o) => o.visibility),
			  );

	const aqi = dayIndex
		? max(
				airPollutionData.forecast.list
					.filter((o) => format(o.dt, 'dd') === date)
					.map((o) => o.main.aqi),
		  )
		: airPollutionData.forecast.list[0].main.aqi;

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
						<div>
							{visibility !== undefined && !Number.isNaN(visibility)
								? `${meterFmt.format(visibility)}m`
								: 'No data'}
						</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Air Quality
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<div>{aqi ? `${aqi}: ${AQI_DISPLAY_NAMES[aqi]}` : 'No data'}</div>
					</div>
				</Card>
			</div>
		</>
	);
};

export const Home = () => {
	return (
		<div className="p-2 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start justify-center gap-4">
			<Alert />
			<div className="md:hidden">
				<Summary />
			</div>
			<div className="h-full">
				<DailyForecast />
			</div>
			<div className="grid grid-cols-2 gap-4 xl:col-span-2">
				<div className="col-span-2 hidden md:block">
					<Summary />
				</div>
				<div className="col-span-2">
					<HourlyForecast />
				</div>
				<DayStats />
			</div>
		</div>
	);
};
