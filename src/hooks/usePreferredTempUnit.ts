import { useLocalStorage } from '@uidotdev/usehooks';

export const usePreferredTempUnit = () => {
	const [preferredTempUnit, setPreferredTempUnit] = useLocalStorage<'F' | 'C'>(
		'vaer-preferred-temp-unit',
		'F',
	);

	return {
		preferredTempUnit,
		togglePreferredTempUnit: () =>
			setPreferredTempUnit((unit) => (unit === 'F' ? 'C' : 'F')),
	};
};
