import { AQI_DISPLAY_NAMES } from '@/constants/aqi';
import { dateShort } from '@/constants/fmt';
import { getMoonPhaseIcon } from '@/constants/weather_icons';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenWeatherMap } from '@/hooks';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
import { max, round } from 'lodash-es';
import { type ReactNode, useContext } from 'react';
import {
	WiBarometer,
	WiMoonNew,
	WiMoonrise,
	WiMoonset,
	WiRaindrop,
	WiSmoke,
	WiSunrise,
	WiSunset,
} from 'react-icons/wi';
import { formatInTimeZone, getPressureDescription, hPaToInHg } from './utils';

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
		label: 'Precipitation',
		icon: <WiRaindrop size={32} />,
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
	const { dayIndex } = useContext(DayIndexContext);
	const { oneCallQuery, airPollutionQuery } = useOpenWeatherMap();
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();
	const { data: oneCallData } = oneCallQuery;
	const { data: airPollutionData } = airPollutionQuery;
	const { data: fiveDayData } = fiveDayQuery;

	if (!oneCallData || !airPollutionData || !fiveDayData) {
		return DAY_STATS.map((stat) => (
			<DayStat
				key={stat.label}
				label={stat.label}
				value={stat.value}
				icon={stat.icon}
			/>
		));
	}

	const tz = oneCallData.timezone;
	const { pressure, sunrise, sunset, rain, snow } = oneCallData.daily[dayIndex || 0];

	const dailyPrecip = `${round(rain + snow, 2)} in`;
	const inHg = hPaToInHg(pressure);
	const description = getPressureDescription(inHg);

	const { moonrise, moonset, moon_phase } = oneCallData.daily[dayIndex || 0];
	const { Icon: MoonPhaseIcon, label: moonPhaseLabel } =
		getMoonPhaseIcon(moon_phase);

	const dt = dayIndex ? oneCallData.daily[dayIndex].dt : undefined;
	const date = dt ? dateShort.format(dt) : undefined;

	const aqi = dayIndex
		? max(
				airPollutionData.forecast.list
					.filter((o) => dateShort.format(o.dt) === date)
					.map((o) => o.main.aqi),
			)
		: airPollutionData.current.list[0]?.main.aqi;

	const stats = [
		{
			label: 'Precipitation',
			value: dailyPrecip,
		},
		{
			label: 'Sunrise',
			value: formatInTimeZone(sunrise, tz, 'h:mm a'),
		},
		{
			label: 'Sunset',
			value: formatInTimeZone(sunset, tz, 'h:mm a'),
		},
		{
			label: 'Moonrise',
			value: formatInTimeZone(moonrise, tz, 'h:mm a'),
		},
		{
			label: 'Moonset',
			value: formatInTimeZone(moonset, tz, 'h:mm a'),
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
			key={stat.label}
			label={stat.label}
			value={stat.value}
			icon={stat.icon || DAY_STATS[i].icon}
		/>
	));
};
