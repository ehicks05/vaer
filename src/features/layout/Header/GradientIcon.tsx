import type { LucideProps } from 'lucide-react';
import { cloneElement, type ReactElement, useId } from 'react';

interface GradientIconProps extends LucideProps {
	children: ReactElement<LucideProps>;
	color1?: string;
	color2?: string;
}

export function GradientIcon({
	children,
	color1 = 'oklch(55.2% 0.232 292.759)',
	color2 = 'oklch(50.9% 0.144 278.697)',
	size = 24,
	...rest
}: GradientIconProps) {
	const gradientId = useId();

	return (
		<svg width={size} height={size} {...rest}>
			<title>logo</title>
			<defs>
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor={color1} />
					<stop offset="100%" stopColor={color2} />
				</linearGradient>
			</defs>
			<rect width="100%" height="100%" fill={`url(#${gradientId})`} rx="10" />

			{cloneElement(children, {
				stroke: 'white',
				size: size,
				width: '66%',
				height: '66%',
				x: 6,
				y: 6,
			})}
		</svg>
	);
}
