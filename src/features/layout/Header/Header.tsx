import { CloudLightning } from 'lucide-react';
import { Alert } from './AlertDialog/AlertDialog';
import Foo from './foo.svg';
import { GradientIcon } from './GradientIcon';
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

const Logo2 = () => (
	<div className="shrink-0 flex items-center gap-1">
		<GradientIcon size={36}>
			<CloudLightning className="stroke-[2.5]" />
		</GradientIcon>
		<span className="hidden sm:inline font-bold text-3xl font-logo">Vær</span>
	</div>
);

export const Header = () => (
	<div className="grid grid-cols-3 items-center justify-between h-16 max-w-7xl mx-auto px-2">
		<div>
			<Logo2 />
		</div>
		<div className="justify-self-center">
			<UpdatedAt />
		</div>
		<div className="justify-self-end flex items-center gap-2 sm:gap-4">
			<Alert />
			<SettingsDialog />
		</div>
	</div>
);
