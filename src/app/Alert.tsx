import { Button, Card } from '@/components';
import { alertFmt } from '@/constants/fmt';
import { useWeatherGov } from '@/hooks';
import type { Properties } from '@/services/weathergov/types/alerts';
import { useState } from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

type AlertProps = Partial<
	Pick<
		Properties,
		'event' | 'description' | 'onset' | 'ends' | 'senderName' | 'severity'
	>
>;

export const AlertCard = ({ alert }: { alert: AlertProps }) => {
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
								ends &&
								`${alertFmt.format(new Date(onset))} to ${alertFmt.format(new Date(ends))}`}
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
	const { alertsQuery } = useWeatherGov();
	const { data } = alertsQuery;

	const alert = data?.features?.[0]?.properties;
	if (!alert) {
		return null;
	}

	return <AlertCard alert={alert} />;
};
