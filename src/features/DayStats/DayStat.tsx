import type { IconType } from 'react-icons';

interface DayStat {
	Icon: IconType;
	label: string;
	value: string;
	title?: string;
	isLucide?: boolean;
}

interface Props {
	stat: DayStat;
}

export const DayStat1 = ({
	stat: { Icon, isLucide, label, value, title },
}: Props) => (
	<div className="flex items-center gap-1 lg:gap-2 p-2" title={title}>
		<Icon size={isLucide ? 24 : 32} className="shrink-0" />
		<div>
			<div className="text-xs text-muted-foreground">{label}</div>
			<div className="text-sm lg:text-base">{value}</div>
		</div>
	</div>
);

export const DayStat = ({
	stat: { Icon, isLucide, label, value, title },
}: Props) => (
	<div className="flex flex-col items-center justify-center py-2" title={title}>
		<div className="flex items-center gap-1 text-xs text-muted-foreground">
			<Icon size={isLucide ? 18 : 24} className="shrink-0" />
			{label}
		</div>
		<div className="text-sm lg:text-base">{value}</div>
	</div>
);
