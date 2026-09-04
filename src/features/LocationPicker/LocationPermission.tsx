import { useLocalStorage } from 'usehooks-ts';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldTitle,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useQueryPermission } from '@/hooks/usePermission';

export const useLocationPermission = () => {
	return useLocalStorage<boolean>('vaer-location-permission', false);
};

const COLORS: Record<PermissionState, string> = {
	denied: 'text-red-500',
	granted: 'text-green-500',
	prompt: 'text-yellow-500',
};

export const LocationPermissionSwitch = () => {
	const [locationPermission, setLocationPermission] = useLocationPermission();
	const { coords } = useGeolocation();
	const { state } = useQueryPermission({ name: 'geolocation' });

	return (
		<FieldGroup className="w-full overflow-hidden">
			<FieldLabel htmlFor="locationPermission">
				<Field orientation="horizontal">
					<FieldContent>
						<FieldTitle>Enable Location Requests</FieldTitle>
						<FieldDescription>
							Allow Vaer to ask for your device's location.
							<br />
							Your browser permission is currently{' '}
							<span className={COLORS[state]}>{state}</span>.{' '}
							{state === 'granted' && !coords && 'Please wait for location to load.'}
						</FieldDescription>
					</FieldContent>
					<Switch
						id="locationPermission"
						checked={locationPermission}
						onCheckedChange={(checked) => setLocationPermission(checked)}
					/>
				</Field>
			</FieldLabel>
		</FieldGroup>
	);
};
