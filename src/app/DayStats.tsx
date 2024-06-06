import { AQI_DISPLAY_NAMES } from '@/constants/aqi';
import { dateShort } from '@/constants/fmt';
import { getMoonPhaseIcon } from '@/constants/weather_icons';
import { useDayIndex, useOpenWeatherMap } from '@/hooks';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import { formatInTimeZone } from 'date-fns-tz';
import { max, round } from 'lodash';
import React, { ReactNode } from 'react';
import {
	WiBarometer,
	WiDirectionUp,
	WiHumidity,
	WiMoonNew,
	WiMoonrise,
	WiMoonset,
	WiSmoke,
	WiSunrise,
	WiSunset,
} from 'react-icons/wi';
import { degreeToDirection, getPressureDescription, hPaToInHg } from './utils';

const DayStat = ({
	label,
	value,
	icon,
}: { label: string; value?: string | number; icon: ReactNode }) => {
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

const DAY_STATS = [
	{
		label: 'Humidity',
		icon: <WiHumidity size={32} />,
		value: 0,
	},
	{
		label: 'Wind',
		icon: (
			<WiDirectionUp
				size={32}
				title={`${0}\u00B0`}
				style={{ transform: `rotate(${180}deg)` }}
			/>
		),
		value: 0,
	},
	{
		label: 'Sunrise',
		icon: <WiSunrise size={32} />,
		value: 0,
	},
	{
		label: 'Sunset',
		icon: <WiSunset size={32} />,
		value: 0,
	},
	{
		label: 'Moonrise',
		icon: <WiMoonrise size={32} />,
		value: 0,
	},
	{
		label: 'Moonset',
		icon: <WiMoonset size={32} />,
		value: 0,
	},
	{
		label: 'Moon Phase',
		icon: <WiMoonNew size={32} />,
		value: 0,
	},
	{
		label: 'Pressure',
		icon: <WiBarometer size={32} />,
		value: 0,
	},
	{
		label: 'Air Quality',
		icon: <WiSmoke size={32} />,
		value: 0,
	},
];

export const DayStats = () => {
	const [dayIndex] = useDayIndex();
	const { oneCallQuery, airPollutionQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();
	const { data } = oneCallQuery;
	const { data: airPollutionData } = airPollutionQuery;
	const { data: fiveDayData } = fiveDayQuery;

	if (!data || !airPollutionData || !fiveDayData) {
		return DAY_STATS.map((stat) => (
			<DayStat label={stat.label} value={stat.value} icon={stat.icon} />
		));
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
		},
		{
			label: 'Sunset',
			value: formatInTimeZone(sunset, data.timezone, 'h:mm a'),
		},
		{
			label: 'Moonrise',
			value: formatInTimeZone(moonrise, data.timezone, 'h:mm a'),
		},
		{
			label: 'Moonset',
			value: formatInTimeZone(moonset, data.timezone, 'h:mm a'),
		},
		{
			label: 'Moon Phase',
			value: moonPhaseLabel,
			icon: <MoonPhaseIcon size={32} />,
		},
		{
			label: 'Pressure',
			value: `${round(inHg, 1)}: ${description}`,
		},
		{
			label: 'Air Quality',
			value: aqi ? `${aqi}: ${AQI_DISPLAY_NAMES[aqi]}` : 'No data',
		},
	];

	return stats.map((stat, i) => (
		<DayStat
			label={stat.label}
			value={stat.value}
			icon={stat.icon || DAY_STATS[i].icon}
		/>
	));
};
