import { Button, Card } from '@/components';
import { alertFmt } from '@/constants/fmt';
import { useWeatherGov } from '@/hooks';
import { useState } from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

export const Alert = () => {
	const [showDescription, setShowDescription] = useState(false);
	const { alertsQuery } = useWeatherGov();
	const { data } = alertsQuery;

	const alert = data?.features?.[0]?.properties;
	if (!alert) {
		return null;
	}

	const { event, description, onset, ends, senderName, severity, certainty } = alert;
	const tags = [`severity: ${severity}`, `certainty: ${certainty}`];

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
							{alertFmt.format(new Date(onset))} to {alertFmt.format(new Date(ends))}
						</div>
						{description && (
							<div className="flex flex-col gap-2">
								{description.split('\n\n').map((p) => (
									<p key={p}>{p}</p>
								))}
							</div>
						)}
						{tags.length && (
							<div className="text-sm text-neutral-400">
								Tags: {tags.join(', ').toLocaleLowerCase()}
							</div>
						)}
					</>
				)}
			</div>
		</Card>
	);
};
