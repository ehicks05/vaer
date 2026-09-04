import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ONE_DAY } from '@/constants/datetime';
import { useWeatherGov } from '@/services/weathergov';
import type { Properties } from '@/services/weathergov/types/alerts';
import { formatInTimeZone } from './utils';

type AlertProps = Partial<
	Pick<
		Properties,
		'event' | 'description' | 'onset' | 'ends' | 'senderName' | 'severity'
	>
>;

const df = 'MMM dd, yyyy, h:mm a';

interface AlertCardProps {
	alert: AlertProps;
	tz: string;
	showTitle?: boolean;
}

export const AlertCard = ({ alert, tz, showTitle = true }: AlertCardProps) => {
	const { event, description, onset, ends, senderName, severity } = alert;
	const tags = severity ? [`severity: ${severity}`] : [];

	return (
		<Card gradient={false} className="max-w-xl overflow-y-auto">
			<div className="flex flex-col gap-4">
				<DialogHeader>
					{showTitle && <DialogTitle>{event}</DialogTitle>}

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

const SAMPLE_ALERTS = [
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
	const { alertsQuery, pointQuery } = useWeatherGov();

	const alerts = SAMPLE_ALERTS;
	const point = pointQuery?.data?.properties;
	if (!alerts || alerts?.length === 0 || !point) {
		return null;
	}

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="outline" size="icon">
						<AlertTriangle />
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Alerts</DialogTitle>
				</DialogHeader>
				{alerts.length === 1 && (
					<AlertCard alert={alerts[0].properties} tz={point.timeZone} />
				)}

				{alerts.length > 1 && (
					<Accordion className="overflow-auto">
						{alerts.map((alert) => (
							<AccordionItem key={alert.id} value={alert.id}>
								<AccordionTrigger>{alert.properties.event}</AccordionTrigger>
								<AccordionContent>
									<AlertCard
										alert={alert.properties}
										tz={point.timeZone}
										showTitle={false}
									/>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				)}

				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
