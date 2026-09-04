interface Props {
	windSpeed: string;
}

export const Wind = ({ windSpeed }: Props) => {
	const [speed, unit] = windSpeed.split(' ');
	return (
		<div className="flex gap-0.5 items-baseline whitespace-nowrap">
			{speed}
			<span className="text-xs">{unit}</span>
		</div>
	);
};
