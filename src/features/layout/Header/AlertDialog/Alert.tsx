import { formatInTimeZone } from '@/lib/utils';
import type { Properties } from '@/services/weathergov/types';

type AlertProps = Partial<
	Pick<
		Properties,
		'event' | 'description' | 'onset' | 'ends' | 'senderName' | 'severity'
	>
>;

const df = 'MMM dd, yyyy, h:mm a';

interface AlertCardProps {
	alert: AlertProps;
	tz?: string;
}

export const AlertCard = ({
	alert,
	tz = Intl.DateTimeFormat().resolvedOptions().timeZone,
}: AlertCardProps) => {
	const { event, description, onset, ends, senderName, severity } = alert;

	return (
		<div className="flex flex-col gap-4">
			<div>
				<div className="font-medium">{event}</div>

				<div className="text-sm text-muted-foreground">
					{senderName}
					{onset && <div>Onset: {formatInTimeZone(new Date(onset), tz, df)}</div>}
					{ends && <div>Ends: {formatInTimeZone(new Date(ends), tz, df)}</div>}
					{severity && <div>Severity: {severity}</div>}
				</div>
			</div>

			{description && (
				<div className="flex flex-col gap-4">
					{description.split('\n\n').map((p) => (
						<p key={p}>{p}</p>
					))}
				</div>
			)}
		</div>
	);
};
