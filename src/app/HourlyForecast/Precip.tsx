export const Precip = ({ precip }: { precip: string }) => (
	<div className={`whitespace-nowrap ${precip === '0' ? 'text-neutral-400' : ''}`}>
		{precip}
	</div>
);
