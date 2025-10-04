import { useEffect, useState } from 'react';

export const useOnInteraction = () => {
	const [interacted, setInteracted] = useState(false);

	useEffect(() => {
		const handleInteraction = () => {
			setInteracted(true);
			// Clean up event listeners after the first interaction
			window.removeEventListener('keydown', handleInteraction);
			window.removeEventListener('mousedown', handleInteraction);
			window.removeEventListener('touchstart', handleInteraction);
		};

		if (!interacted) {
			window.addEventListener('keydown', handleInteraction);
			window.addEventListener('mousedown', handleInteraction);
			window.addEventListener('touchstart', handleInteraction);
		}

		return () => {
			// Cleanup on component unmount if no interaction occurred yet
			window.removeEventListener('keydown', handleInteraction);
			window.removeEventListener('mousedown', handleInteraction);
			window.removeEventListener('touchstart', handleInteraction);
		};
	}, [interacted]); // Re-run effect if 'interacted' changes (though it only changes once)

	return interacted;
};
