import type { IconType } from 'react-icons';

interface DayStat {
	Icon: IconType;
	label: string;
	value: string;
	title?: string;
}

interface Props {
	stat: DayStat;
}

export const DayStatCard = ({ stat: { Icon, label, value, title } }: Props) => (
	<div className="flex items-center gap-1 lg:gap-2 p-2" title={title}>
		<Icon size={32} className="shrink-0" />
		<div>
			<div className="text-xs text-muted-foreground">{label}</div>
			<div className="text-sm lg:text-base">{value}</div>
		</div>
	</div>
);
