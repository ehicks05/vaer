export const Precip = ({ precip }: { precip: string }) => {
	const [amount, unit] = precip.split(' ');

	return (
		<div
			className={`flex gap-0.5 items-baseline whitespace-nowrap ${amount === '0' ? 'text-neutral-400' : ''}`}
		>
			{amount}
			<span className="text-xs">{unit}</span>
		</div>
	);
};
