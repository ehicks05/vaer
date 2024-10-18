import { Button, Card } from '@/components';
import { useWeatherGov } from '@/hooks';
import type { Properties } from '@/services/weathergov/types/alerts';
import { useState } from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { formatInTimeZone } from './utils';

type AlertProps = Partial<
	Pick<
		Properties,
		'event' | 'description' | 'onset' | 'ends' | 'senderName' | 'severity'
	>
>;

export const AlertCard = ({ alert, tz }: { alert: AlertProps; tz: string }) => {
	const [showDescription, setShowDescription] = useState(false);
	const { event, description, onset, ends, senderName, severity } = alert;
	const tags = severity ? [`severity: ${severity}`] : [];

	return (
		<Card gradient={false} className="p-4 bg-slate-800">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-2xl">
					<HiOutlineExclamationTriangle className="text-red-500 mt-1" />
					{event}
				</div>
				<Button
					onClick={() => setShowDescription((showDescription) => !showDescription)}
				>
					{showDescription ? 'Hide' : 'Show'} details
				</Button>
				{showDescription && (
					<>
						<div className="text-sm text-neutral-400">{senderName}</div>
						<div className="text-sm">
							{onset &&
								`Onset: ${formatInTimeZone(new Date(onset), tz, 'MMM dd, yyyy, h:mm a')}`}
						</div>
						<div className="text-sm">
							{ends &&
								`Ends: ${formatInTimeZone(new Date(ends), tz, 'MMM dd, yyyy, h:mm a')}`}
						</div>
						{description && (
							<div className="flex flex-col gap-2">
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
					</>
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

	return <AlertCard alert={alert} tz={point.timeZone} />;
};
