import { AlertTriangle } from 'lucide-react';
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
import { useResolvedLocation } from '@/hooks';
import { formatInTimeZone } from '@/lib/utils';
import { useWeatherGov } from '@/services/weathergov';
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
	showTitle?: boolean;
}

export const AlertCard = ({
	alert,
	tz = Intl.DateTimeFormat().resolvedOptions().timeZone,
	showTitle = true,
}: AlertCardProps) => {
	const { event, description, onset, ends, senderName, severity } = alert;
	const tags = severity ? [`severity: ${severity}`] : [];

	return (
		<div className="flex flex-col gap-4">
			<DialogHeader>
				{showTitle && <DialogTitle>{event}</DialogTitle>}

				<DialogDescription className="text-sm text-muted-foreground">
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
				<div className="text-sm text-muted-foreground">
					{tags.join(', ').toLocaleLowerCase()}
				</div>
			)}
		</div>
	);
};

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

				<div className="max-h-[50vh] overflow-y-auto">
					{alerts.length === 1 && <AlertCard alert={alerts[0].properties} tz={tz} />}

					{alerts.length > 1 && (
						<Accordion className="overflow-auto">
							{alerts.map((alert) => (
								<AccordionItem key={alert.id} value={alert.id}>
									<AccordionTrigger>{alert.properties.event}</AccordionTrigger>
									<AccordionContent>
										<AlertCard alert={alert.properties} tz={tz} showTitle={false} />
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)}
				</div>

				<DialogFooter>
					<DialogClose render={<Button variant="outline">Close</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
