import { Alert } from './AlertDialog';
import { SettingsDialog } from './SettingsDialog';
import { UpdatedAt } from './UpdatedAt';

const Logo = () => (
	<div className="shrink-0 flex items-center">
		<div className="flex items-center gap-1">
			<img
				className="inline h-8 w-11.5"
				src="/icon-gradient-transparent.svg"
				alt="logo"
			/>
			<span className="mt-1 hidden sm:inline font-bold text-4xl font-logo">Vær</span>
		</div>
	</div>
);

export const Header = () => (
	<div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-2 w-full">
		<Logo />
		<div className="flex items-center gap-2 sm:gap-4">
			<Alert />
			<UpdatedAt />
			<SettingsDialog />
		</div>
	</div>
);
