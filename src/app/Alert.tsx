import React, { useState } from 'react';
import { useOpenWeatherMap } from '@/hooks';
import { Button, Card } from '@/components';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { alertFmt } from '@/constants/fmt';

export const Alert = () => {
	const [showDescription, setShowDescription] = useState(false);
	const { oneCallQuery } = useOpenWeatherMap();
	const { data } = oneCallQuery;

	if (!data) {
		return <div>loading</div>;
	}

	const alert = data.alerts?.[0];
	if (!alert) {
		return null;
	}
	const fmt = 'MMM dd h:mma';

	return (
		<Card gradient={false} className="col-span-full p-4 bg-slate-800">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-2xl">
					<HiOutlineExclamationTriangle className="text-red-500" />
					{alert.event}
				</div>
				<Button
					onClick={() => setShowDescription((showDescription) => !showDescription)}
				>
					{showDescription ? 'Hide' : 'Show'} details
				</Button>
				{showDescription && (
					<>
						<div className="text-sm">
							{alertFmt.format(alert.start)} to {alertFmt.format(alert.end)}
						</div>
						<div className="text-sm">{alert.sender_name}</div>
						<div className="text-sm">{alert.description}</div>
					</>
				)}
			</div>
		</Card>
	);
};
