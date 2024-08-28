import { LocationDialog } from '@/app/LocationDialog';
import { PreferredTempToggle } from '@/app/PreferredTemperature';

const Logo = () => (
	<div className="flex-shrink-0 flex items-center">
		<div className="flex items-center gap-4">
			<img
				className="inline h-8 w-auto"
				src="/android-chrome-192x192.png"
				alt="logo"
			/>
			<span className="mt-1 hidden sm:inline font-bold text-5xl font-logo text-white">
				Vær
			</span>
			{/* <img className="hidden sm:inline h-8 w-auto" src="/text.svg" alt="logo" /> */}
		</div>
	</div>
);

export default function Header() {
	return (
		<div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-2 w-full">
			<Logo />
			<div className="flex items-center gap-4">
				<PreferredTempToggle />
				<LocationDialog />
			</div>
		</div>
	);
}
