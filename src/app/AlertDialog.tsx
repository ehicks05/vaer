import { Card } from '@/components';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { NAV_BAR_BUTTON_STYLES } from '@/constants/classes';
import { useWeatherGov } from '@/services/weathergov';
import type { Properties } from '@/services/weathergov/types/alerts';
import { AlertTriangle } from 'lucide-react';
import { formatInTimeZone } from './utils';

type AlertProps = Partial<
	Pick<
		Properties,
		'event' | 'description' | 'onset' | 'ends' | 'senderName' | 'severity'
	>
>;

const df = 'MMM dd, yyyy, h:mm a';

export const AlertCard = ({ alert, tz }: { alert: AlertProps; tz: string }) => {
	const { event, description, onset, ends, senderName, severity } = alert;
	const tags = severity ? [`severity: ${severity}`] : [];

	return (
		<Card gradient={false} className="max-w-xl overflow-y-auto">
			<div className="flex flex-col gap-4">
				<DialogHeader>
					<DialogTitle>{event}</DialogTitle>

					<DialogDescription className="text-sm text-neutral-400">
						{senderName}
						{onset && <div>Onset: {formatInTimeZone(new Date(onset), tz, df)}</div>}
						{ends && <div>Ends: {formatInTimeZone(new Date(ends), tz, df)}</div>}
					</DialogDescription>
				</DialogHeader>

				{description && (
					<div className="flex flex-col gap-4">
						{description.split('\n\n').map((p) => (
							<p key={p}>{p}</p>
						))}
					</div>
				)}
				{tags.length !== 0 && (
					<div className="text-sm text-neutral-400">
						{tags.join(', ').toLocaleLowerCase()}
					</div>
				)}
			</div>
		</Card>
	);
};

export const Alert = () => {
	const { alertsQuery, pointQuery } = useWeatherGov();

	const alert = alertsQuery?.data?.features?.[0]?.properties;
	const point = pointQuery?.data?.properties;
	if (!alert || !point) {
		return null;
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
					type="button"
					className={`flex items-center justify-center ${NAV_BAR_BUTTON_STYLES}`}
				>
					<AlertTriangle size={20} className="m-1" />
				</button>
			</DialogTrigger>
			<DialogPortal>
				<DialogOverlay />
				<DialogContent className="bg-slate-800 h-fit">
					<AlertCard alert={alert} tz={point.timeZone} />
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};
