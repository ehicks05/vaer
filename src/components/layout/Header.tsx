import { LocationPicker } from '@/app/LocationPicker';
import { UnitSystemToggle } from '@/components/UnitSystemToggle';

const Logo = () => (
	<div className="flex-shrink-0 flex items-center">
		<div className="flex items-center gap-1">
			<img
				className="inline h-8 w-auto"
				src="/icon-gradient-transparent.svg"
				alt="logo"
			/>
			<span className="mt-1 hidden sm:inline font-bold text-5xl font-logo text-white">
				Vær
			</span>
		</div>
	</div>
);

export default function Header() {
	return (
		<div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-2 w-full">
			<Logo />
			<div className="flex items-center gap-4">
				<UnitSystemToggle />
				<LocationPicker />
			</div>
		</div>
	);
}
