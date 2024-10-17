import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenMeteo, useSunAndMoon, useUnits } from '@/hooks';
import { useContext } from 'react';
import { WiRaindrop, WiSmoke } from 'react-icons/wi';
import { DayStatCard } from './DayStatCard';
import { getAqiLabel, getMoonTimeStats, getSunTimeStats } from './utils';

export const DayStats = () => {
	const { getLength } = useUnits();
	const { dayIndex } = useContext(DayIndexContext);
	const {
		openMeteo: { data: openMeteo },
	} = useOpenMeteo();

	const tz = openMeteo?.timezone || '';
	const { precipitation_sum } = openMeteo?.daily[dayIndex || 0] || {};

	const hourlies =
		openMeteo?.hourly.slice((dayIndex || 0) * 24, (dayIndex || 0) * 24 + 24) || [];
	const aqis = hourlies.map((o) => o.us_aqi);
	const aqiLabel = getAqiLabel(aqis);

	const { sunrise, sunset, moonrise, moonset, MoonPhaseIcon, moonPhaseLabel } =
		useSunAndMoon(new Date(hourlies[0]?.time || new Date()), tz);

	const sunTimeStats = getSunTimeStats(tz, sunrise, sunset);
	const moonTimeStats = getMoonTimeStats(tz, moonrise, moonset);
	const precipLabel = getLength(precipitation_sum || 0);

	const stats = [
		...sunTimeStats,
		...moonTimeStats,
		{ Icon: MoonPhaseIcon, label: 'Moon Phase', value: moonPhaseLabel || '0' },
		{ Icon: WiRaindrop, label: 'Precipitation', value: precipLabel },
		{ Icon: WiSmoke, label: 'Air Quality', value: aqiLabel || 'No data' },
	];

	return stats.map((stat) => <DayStatCard key={stat.label} stat={stat} />);
};
