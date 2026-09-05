import { MapPinX } from 'lucide-react';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';
import { LocationDialog } from './LocationDialog';

export const EmptyLocation = () => {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<MapPinX />
				</EmptyMedia>
				<EmptyTitle>No location</EmptyTitle>
				<EmptyDescription>No location found. Add a location below:</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<LocationDialog />
			</EmptyContent>
		</Empty>
	);
};
