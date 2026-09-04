import { About } from '@/features/About';
import { useOpenMeteo } from '@/hooks';
import { formatInTimeZone } from '@/lib/utils';
import { Debug } from '../Debug';

export const UpdatedAt = () => {
	const { openMeteo } = useOpenMeteo();
	const { data, dataUpdatedAt } = openMeteo;
	const tz = data?.timezone;

	if (!tz) {
		return null;
	}

	return (
		<span className="text-sm text-muted-foreground">
			updated {formatInTimeZone(new Date(dataUpdatedAt), tz, 'h:mm a z')}
		</span>
	);
};

export const Footer = () => {
	return (
		<footer className="flex items-center justify-between gap-4 p-4 max-w-7xl w-full">
			<UpdatedAt />
			<div className="grow" />
			<About />
			<Debug />
		</footer>
	);
};
