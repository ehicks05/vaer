import { useUnitSystem } from '../features/UnitSystem';

const FEELS_LIKE_RANGES = [
	{ from: -99, to: 32, color: 'text-blue-600' },
	{ from: 32, to: 55, color: 'text-blue-400' },
	{ from: 55, to: 72, color: 'text-green-500' },
	{ from: 72, to: 80, color: 'text-yellow-500' },
	{ from: 80, to: 140, color: 'text-red-500' },
];

interface Props {
	apparent_temperature: number;
}

export const FeelsLike = ({ apparent_temperature }: Props) => {
	const { getTemp } = useUnitSystem();
	const { color } =
		FEELS_LIKE_RANGES.find(
			(o) => apparent_temperature >= o.from && apparent_temperature < o.to,
		) || FEELS_LIKE_RANGES[0];

	return (
		<div className="flex items-baseline gap-0.5">
			<span className={color}>{getTemp(apparent_temperature)}</span>
			<span className="text-xs">FL</span>
		</div>
	);
};
