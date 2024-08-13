import { MOON_PHASES, OWM_TO_ICON } from '@/constants/weather_icons';
import type { IconType } from 'react-icons';

export const Debug = () => {
	const isDebug = location.search.includes('debug');
	if (!isDebug) return null;

	const iconToCodes = Object.entries(OWM_TO_ICON).reduce(
		(agg, curr) => {
			const [code, Icon] = curr;
			const key = Icon.name;

			const codes = [...(agg[key]?.codes || []), code];
			agg[key] = { Icon, codes };

			return agg;
		},
		{} as Record<string, { Icon: IconType; codes: string[] }>,
	);

	return (
		<div className="p-2 flex flex-col gap-4">
			<h1 className="text-2xl">Debug</h1>

			<h1 className="text-xl">Weather Icon Usages</h1>
			<h1 className="">{Object.entries(iconToCodes).length} Icons</h1>
			<div className="flex flex-wrap gap-2 p-2">
				{Object.entries(iconToCodes)
					.sort(([o1], [o2]) =>
						o1
							.replace('WiNight', '')
							.replace('WiDay', '')
							.replace('Wi', '')
							.localeCompare(
								o2.replace('WiNight', '').replace('WiDay', '').replace('Wi', ''),
							),
					)
					.map(([iconName, { codes, Icon }]) => (
						<div
							key={iconName}
							className="flex flex-col items-center p-2 w-48 bg-neutral-800"
						>
							{iconName}
							<Icon size={64} />
							<div className="flex flex-col">
								{codes.map((code) => (
									<div key={code}> {code.replace('wi-owm-', '')} </div>
								))}
							</div>
						</div>
					))}
			</div>

			<h1 className="text-xl">Weather Icons</h1>
			<div className="flex flex-wrap gap-2 p-2">
				{Object.entries(OWM_TO_ICON).map(([name, Icon]) => (
					<div
						key={name}
						className="flex flex-col items-center p-2 w-40 bg-neutral-800"
					>
						{name.replace('wi-owm-', '')}
						<Icon size={64} />
						{Icon.name}
					</div>
				))}
			</div>

			<h1 className="text-xl">Moon Phase Icons</h1>
			<div className="flex flex-wrap gap-2 p-2">
				{MOON_PHASES.map(({ Icon, label }) => (
					<div
						key={Icon.toString()}
						className="flex flex-col items-center p-2 w-36 bg-neutral-800"
					>
						{label} <Icon size={64} />
					</div>
				))}
			</div>
		</div>
	);
};
