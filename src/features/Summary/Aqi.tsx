const AQI_RANGES = [
	{ from: 0, to: 51, color: 'text-green-500', label: 'Good' },
	{
		from: 51,
		to: 101,
		color: 'text-yellow-500 dark:text-yellow-400',
		label: 'Moderate',
	},
	{
		from: 101,
		to: 151,
		color: 'text-orange-500',
		label: 'Unhealthy for sensitive groups',
	},
	{ from: 151, to: 201, color: 'text-red-500', label: 'Unhealthy' },
	{
		from: 201,
		to: 301,
		color: 'text-purple-500 dark:text-purple-400',
		label: 'Very unhealthy',
	},
	{
		from: 301,
		to: 501,
		color: 'text-rose-950 dark:text-rose-600',
		label: 'Hazardous',
	},
];

export const Aqi = ({ us_aqi = 0 }: { us_aqi?: number }) => {
	const aqiRange =
		AQI_RANGES.find(({ from, to }) => us_aqi >= from && us_aqi <= to) ||
		AQI_RANGES[0];

	return (
		<div className="flex items-baseline gap-0.5" title={aqiRange.label}>
			<span className={aqiRange.color}>{us_aqi}</span>
			<span className="text-xs">AQI</span>
		</div>
	);
};
