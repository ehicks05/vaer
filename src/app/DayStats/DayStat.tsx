import type { DayStat as IDayStat } from './types';

export const DayStat = ({ stat: { Icon, label, value } }: { stat: IDayStat }) => {
	return (
		<div className="flex items-center gap-2 w-full p-4 bg-slate-800 rounded-lg">
			<Icon size={32} />
			<div>
				<div className="text-xs text-neutral-400">{label}</div>
				<div>{value}</div>
			</div>
		</div>
	);
};
