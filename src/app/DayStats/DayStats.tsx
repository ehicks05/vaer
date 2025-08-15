import { useContext } from 'react';
import { WiRaindrop, WiSmoke } from 'react-icons/wi';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenMeteo, useSunAndMoon } from '@/hooks';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { DayStatCard } from './DayStatCard';
import { getAqiLabel, getMoonTimeStats, getSunTimeStats } from './utils';

export const DayStats = () => {
	const { getLength } = useUnitSystem();
	const { dayIndex } = useContext(DayIndexContext);
	const {
		openMeteo: { data: openMeteo },
	} = useOpenMeteo();

	const tz = openMeteo?.timezone || 'utc';
	const { precipitation_sum } = openMeteo?.daily[dayIndex || 0] || {};

	const hourlies =
		openMeteo?.hourly.slice((dayIndex || 0) * 24, (dayIndex || 0) * 24 + 24) || [];
	const aqis = hourlies.map((o) => o.us_aqi);
	const aqiLabel = getAqiLabel(aqis);

	const startOfDay = hourlies[0] ? new Date(hourlies[0]?.time) : new Date();

	const { sunrise, sunset, moonrise, moonset, MoonPhaseIcon, moonPhaseLabel } =
		useSunAndMoon(startOfDay, tz);

	const sunTimeStats = getSunTimeStats(tz, sunrise, sunset);
	const moonTimeStats = getMoonTimeStats(tz, moonrise, moonset);
	const precipLabel = getLength(precipitation_sum || 0);

	const stats = [
		...sunTimeStats,
		...moonTimeStats,
		{ Icon: MoonPhaseIcon, label: 'Moon', value: moonPhaseLabel || '0' },
		{ Icon: WiRaindrop, label: 'Precip', value: precipLabel },
		{ Icon: WiSmoke, label: 'AQI', value: aqiLabel || 'No data' },
	];

	return (
		<div className="flex flex-col">
			Day Stats
			<div className="grid grid-cols-2 gap-2 lg:gap-4">
				{stats.slice(0, 4).map((stat) => (
					<DayStatCard key={stat.label} stat={stat} />
				))}
			</div>
			<div className="grid grid-cols-3 gap-2 mt-2 lg:mt-4 lg:gap-4">
				{stats.slice(4).map((stat) => (
					<DayStatCard key={stat.label} stat={stat} />
				))}
			</div>
		</div>
	);
};
