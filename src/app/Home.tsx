import { AQI_DISPLAY_NAMES } from '@/constants/aqi';
import { dateShort } from '@/constants/fmt';
import { getMoonPhaseIcon } from '@/constants/weather_icons';
import { useDayIndex, useOpenWeatherMap } from '@/hooks';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import { formatInTimeZone } from 'date-fns-tz';
import { max, round } from 'lodash';
import React, { ReactNode } from 'react';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
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
import { Alert } from './Alert';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import { Summary } from './Summary';
import WindyMap from './WindyMap';
import { degreeToDirection, getPressureDescription, hPaToInHg } from './utils';

const DayStat = ({
	label,
	value,
	icon,
}: { label: string; value: string | number; icon: ReactNode }) => {
	return (
		<div className="flex items-center gap-2 w-full p-4 bg-slate-800 rounded-lg">
			{icon}
			<div>
				<div className="text-xs text-neutral-400">{label}</div>
				<div>{value}</div>
			</div>
		</div>
	);
};

export const DayStats = () => {
	const [dayIndex] = useDayIndex();
	const { oneCallQuery, airPollutionQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();
	const { data } = oneCallQuery;
	const { data: airPollutionData } = airPollutionQuery;
	const { data: fiveDayData } = fiveDayQuery;

	if (!data || !airPollutionData || !fiveDayData) {
		return (
			<DayStat label="" value="loading" icon={<HiOutlineDotsCircleHorizontal />} />
		);
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

	const stats = [
		{
			label: 'Humidity',
			value: Math.round(humidity),
			icon: <WiHumidity size={32} />,
		},
		{
			label: 'Wind',
			value: `${Math.round(wind_speed)} mph ${degreeToDirection(wind_deg)}`,
			icon: (
				<WiDirectionUp
					size={32}
					title={`${wind_deg}\u00B0`}
					style={{ transform: `rotate(${180 + wind_deg}deg)` }}
				/>
			),
		},
		{
			label: 'Sunrise',
			value: formatInTimeZone(sunrise, data.timezone, 'h:mm a'),
			icon: <WiSunrise size={32} />,
		},
		{
			label: 'Sunset',
			value: formatInTimeZone(sunset, data.timezone, 'h:mm a'),
			icon: <WiSunset size={32} />,
		},
		{
			label: 'Moonrise',
			value: formatInTimeZone(moonrise, data.timezone, 'h:mm a'),
			icon: <WiMoonrise size={32} />,
		},
		{
			label: 'Moonset',
			value: formatInTimeZone(moonset, data.timezone, 'h:mm a'),
			icon: <WiMoonset size={32} />,
		},
		{
			label: 'Moon Phase',
			value: moonPhaseLabel,
			icon: <MoonPhaseIcon size={32} />,
		},
		{
			label: 'Pressure',
			value: `${round(inHg, 1)}: ${description}`,
			icon: <WiBarometer size={32} />,
		},
		{
			label: 'Air Quality',
			value: aqi ? `${aqi}: ${AQI_DISPLAY_NAMES[aqi]}` : 'No data',
			icon: <WiSmoke size={32} />,
		},
	];

	return (
		<>
			<div className="col-span-2 h-full">
				<div className="grid grid-cols-2 lg:grid-cols-2 gap-4 xl:col-span-2">
					{stats.map((stat) => (
						<DayStat label={stat.label} value={stat.value} icon={stat.icon} />
					))}
				</div>
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
