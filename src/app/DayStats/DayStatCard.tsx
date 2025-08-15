import type { IconType } from 'react-icons';
import { Card } from '@/components';

interface DayStat {
	Icon: IconType;
	label: string;
	value: string;
}

export const DayStatCard = ({ stat: { Icon, label, value } }: { stat: DayStat }) => (
	<Card className="flex items-center gap-2 p-4">
		<Icon size={32} className="shrink-0" />
		<div>
			<div className="text-xs text-neutral-400">{label}</div>
			<div>{value}</div>
		</div>
	</Card>
);
