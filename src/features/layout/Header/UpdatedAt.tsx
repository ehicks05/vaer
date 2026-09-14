import { useOpenMeteo } from '@/hooks';
import { formatInTimeZone } from '@/lib/utils';

export const UpdatedAt = () => {
	const { openMeteo } = useOpenMeteo();
	const { data, dataUpdatedAt } = openMeteo;
	const tz = data?.timezone;

	return (
		<span className="text-sm text-muted-foreground">
			{tz && formatInTimeZone(new Date(dataUpdatedAt), tz, 'h:mm a z')}
		</span>
	);
};
