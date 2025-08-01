import type { IconType } from 'react-icons';

interface DayStat {
	Icon: IconType;
	label: string;
	value: string;
}

export const DayStatCard = ({ stat: { Icon, label, value } }: { stat: DayStat }) => (
	<div className="flex items-center gap-2 w-full p-4 bg-slate-800 rounded-lg">
		<Icon size={32} className="shrink-0" />
		<div>
			<div className="text-xs text-neutral-400">{label}</div>
			<div>{value}</div>
		</div>
	</div>
);
