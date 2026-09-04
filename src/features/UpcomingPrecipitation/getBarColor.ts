const BAR_COLORS = [
	{ color: 'bg-indigo-500 group-hover:bg-indigo-400', max: 0.0 },
	{ color: 'bg-indigo-400 group-hover:bg-indigo-300', max: 0.1 },
	{ color: 'bg-indigo-300 group-hover:bg-indigo-200', max: 0.3 },
	{ color: 'bg-indigo-200 group-hover:bg-indigo-100', max: 0.5 },
	{ color: 'bg-indigo-100 group-hover:bg-indigo-50', max: 1.0 },
	{ color: 'bg-indigo-50 group-hover:bg-white', max: 1000 },
];

export const getBarColor = (inPerHour: number) =>
	BAR_COLORS.find(({ max }) => inPerHour <= max)?.color || BAR_COLORS[0].color;
