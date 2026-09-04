import { clamp } from 'es-toolkit';

const MIN_HEIGHT = 6;
const MAX_HEIGHT = 80;
const POWER = 0.88;
const PIXELS_PER_INCHES_PER_HOUR = 200;

export const getBarHeight = (inchesPerHour: number) => {
	const rawPixelHeight = MIN_HEIGHT + inchesPerHour * PIXELS_PER_INCHES_PER_HOUR;

	const compressedPixelHeight = Math.round(rawPixelHeight ** POWER);

	const clampedHeight = inchesPerHour
		? clamp(compressedPixelHeight, MIN_HEIGHT, MAX_HEIGHT)
		: 1;

	return clampedHeight;
};

const BAR_COLORS = [
	{
		color:
			'bg-indigo-100 group-hover:bg-indigo-200 dark:bg-indigo-500 dark:group-hover:bg-indigo-400',
		max: 0.0,
	},
	{
		color:
			'bg-indigo-200 group-hover:bg-indigo-300 dark:bg-indigo-400 dark:group-hover:bg-indigo-300',
		max: 0.1,
	},
	{
		color:
			'bg-indigo-300 group-hover:bg-indigo-400 dark:bg-indigo-300 dark:group-hover:bg-indigo-200',
		max: 0.3,
	},
	{
		color:
			'bg-indigo-400 group-hover:bg-indigo-500 dark:bg-indigo-200 dark:group-hover:bg-indigo-100',
		max: 0.5,
	},
	{
		color:
			'bg-indigo-500 group-hover:bg-indigo-600 dark:bg-indigo-100 dark:group-hover:bg-indigo-50 ',
		max: 1.0,
	},
	{
		color:
			'bg-indigo-600 group-hover:bg-indigo-700 dark:bg-indigo-50  dark:group-hover:bg-white     ',
		max: 1000,
	},
];

interface Props {
	inchesPerHour: number;
	title: string;
}

export const ChartBar = ({ inchesPerHour, title }: Props) => {
	const color =
		BAR_COLORS.find(({ max }) => inchesPerHour <= max)?.color || BAR_COLORS[0].color;
	const height = getBarHeight(inchesPerHour);

	const style = { height: `${height}px` };

	return (
		<div
			title={title}
			className="group flex items-end px-px rounded-xs h-full hover:bg-neutral-200 dark:hover:bg-neutral-700 w-16"
		>
			<div className={`rounded-xs w-full ${color}`} style={style} />
		</div>
	);
};
