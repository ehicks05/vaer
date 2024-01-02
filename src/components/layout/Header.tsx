import { SearchButton } from '@/app/LocationModal';
import { PreferredTempToggle } from '@/app/PreferredTemperature';

const Logo = () => (
	<div className="flex-shrink-0 flex items-center">
		<div>
			<img className="inline h-8 w-auto" src="/icon-color.svg" alt="logo" />
			<img className="hidden sm:inline h-8 w-auto" src="/text.svg" alt="logo" />
		</div>
	</div>
);

export default function Header() {
	return (
		<div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-2 w-full">
			<Logo />
			<div className="flex items-center gap-4">
				<PreferredTempToggle />
				<SearchButton />
			</div>
		</div>
	);
}
