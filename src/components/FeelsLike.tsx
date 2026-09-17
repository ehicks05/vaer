import { useUnitSystem } from '../features/UnitSystem';

const FEELS_LIKE_RANGES = [
	{ from: -120, to: 32, color: 'text-sky-400' },
	{ from: 32, to: 47, color: 'text-cyan-400' },
	{ from: 47, to: 55, color: 'text-teal-400' },
	{ from: 55, to: 72, color: 'text-green-400' },
	{ from: 72, to: 78, color: 'text-lime-400' },
	{ from: 78, to: 87, color: 'text-amber-500' },
	{ from: 87, to: 94, color: 'text-orange-500' },
	{ from: 94, to: 200, color: 'text-red-500' },
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
