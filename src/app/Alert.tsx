import { Button, Card } from '@/components';
import { alertFmt } from '@/constants/fmt';
import { useOpenWeatherMap } from '@/hooks';
import { useState } from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

export const Alert = () => {
	const [showDescription, setShowDescription] = useState(false);
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;

	const alert = data?.alerts?.[0];
	if (!alert) {
		return null;
	}

	return (
		<Card gradient={false} className="col-span-full p-4 bg-slate-800">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-2xl">
					<HiOutlineExclamationTriangle className="text-red-500 mt-1" />
					{alert.event}
				</div>
				<Button
					onClick={() => setShowDescription((showDescription) => !showDescription)}
				>
					{showDescription ? 'Hide' : 'Show'} details
				</Button>
				{showDescription && (
					<>
						<div className="text-sm text-neutral-400">{alert.sender_name}</div>
						<div className="text-sm">
							{alertFmt.format(alert.start)} to {alertFmt.format(alert.end)}
						</div>
						{alert.description && <div>{alert.description}</div>}
						{alert.tags.length && (
							<div className="text-sm text-neutral-400">
								Tags: {alert.tags.join(', ')}
							</div>
						)}
					</>
				)}
			</div>
		</Card>
	);
};
