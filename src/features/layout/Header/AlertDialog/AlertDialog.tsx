import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ONE_DAY } from '@/constants/datetime';
import { useResolvedLocation } from '@/hooks';
import { useWeatherGov } from '@/services/weathergov';
import { AlertCard } from './Alert';

const _SAMPLE_ALERTS = [
	{
		id: 'tsu',
		properties: {
			event: 'Tsunami',
			description: 'This is a description.',
			onset: new Date().toISOString(),
			ends: new Date(Date.now() + ONE_DAY).toISOString(),
			senderName: 'EWS - Emergency Weather Services',
			severity: 'Wumbo',
		},
	},
	{
		id: 'ast',
		properties: {
			event: 'Giant Asteroid',
			description: 'This is a description.',
			onset: new Date().toISOString(),
			ends: new Date(Date.now() + ONE_DAY).toISOString(),
			senderName: 'EWS - Emergency Weather Services',
			severity: 'Wumbo',
		},
	},
];

export const Alert = () => {
	const { alertsQuery } = useWeatherGov();
	const { tz } = useResolvedLocation();

	const alerts = alertsQuery.data?.features;
	if (!alerts || alerts?.length === 0) {
		return null;
	}

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="outline" className="text-muted-foreground" size="icon">
						<AlertTriangle />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Alerts</DialogTitle>
				</DialogHeader>

				<div className="max-h-[50vh] overflow-y-auto flex flex-col gap-8">
					{alerts.map((alert) => (
						<AlertCard key={alert.id} alert={alert.properties} tz={tz} />
					))}
				</div>

				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
