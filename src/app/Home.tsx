import React from 'react';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import { useDayIndex, useOpenWeatherMap } from '@/hooks';
import { Card } from '@/components';
import {
	WiBarometer,
	WiDirectionUp,
	WiHumidity,
	WiMoonrise,
	WiMoonset,
	WiSmoke,
	WiSunrise,
	WiSunset,
} from 'react-icons/wi';
import { degreeToDirection, getPressureDescription, hPaToInHg } from './utils';
import { max, round } from 'lodash';
import { Alert } from './Alert';
import { AQI_DISPLAY_NAMES } from '@/constants/aqi';
import { Summary } from './Summary';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import { dateShort } from '@/constants/fmt';
import { formatInTimeZone } from 'date-fns-tz';
import { getMoonPhaseIcon } from '@/constants/weather_icons';
import WindyMap from './WindyMap';

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

	const { moonrise, moonset, moon_phase } = oneCallQuery.data.daily[dayIndex || 0];
	const { Icon: MoonPhaseIcon, label: moonPhaseLabel } =
		getMoonPhaseIcon(moon_phase);

	const dt = dayIndex ? oneCallQuery.data.daily[dayIndex].dt : undefined;
	const date = dt ? dateShort.format(dt) : undefined;

	const aqi = dayIndex
		? max(
				airPollutionData.forecast.list
					.filter((o) => dateShort.format(o.dt) === date)
					.map((o) => o.main.aqi),
		  )
		: airPollutionData.forecast.list[0].main.aqi;

	return (
		<>
			<div className="col-span-1 h-full">
				Humidity
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<WiHumidity size={32} />
						<div>{Math.round(humidity)}</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full flex flex-col">
				Wind
				<Card className="h-full">
					<div className="flex items-center gap-2 w-full p-4">
						<WiDirectionUp
							size={32}
							title={`${wind_deg}\u00B0`}
							style={{ transform: `rotate(${180 + wind_deg}deg)` }}
						/>
						<div>
							{Math.round(wind_speed)} mph {degreeToDirection(wind_deg)}
						</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Sunrise
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<WiSunrise size={32} />
						<div>{formatInTimeZone(sunrise, data.timezone, 'h:mm a')}</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Sunset
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<WiSunset size={32} />
						<div>{formatInTimeZone(sunset, data.timezone, 'h:mm a')}</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Moonrise
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<WiMoonrise size={32} />
						<div>{formatInTimeZone(moonrise, data.timezone, 'h:mm a')}</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Moonset
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<WiMoonset size={32} />
						<div>{formatInTimeZone(moonset, data.timezone, 'h:mm a')}</div>
					</div>
				</Card>
			</div>

			<div className="col-span-1 h-full">
				Moon Phase
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<MoonPhaseIcon size={32} />
						<div>{moonPhaseLabel}</div>
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
				Air Quality
				<Card>
					<div className="flex items-center gap-2 w-full p-4">
						<WiSmoke size={32} />
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
			<div className="md:hidden">
				<HourlyForecast />
			</div>
			<div className="flex flex-col gap-4 h-full">
				<DailyForecast />
				<WindyMap />
			</div>
			<div className="grid grid-cols-2 gap-4 xl:col-span-2">
				<div className="col-span-2 hidden md:block">
					<Summary />
				</div>
				<div className="col-span-2 hidden md:block">
					<HourlyForecast />
				</div>
				<DayStats />
			</div>
		</div>
	);
};
