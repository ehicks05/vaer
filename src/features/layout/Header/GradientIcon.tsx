import type { LucideProps } from 'lucide-react';
import { cloneElement, type ReactElement, useId } from 'react';

interface GradientIconProps extends LucideProps {
	children: ReactElement<LucideProps>;
	color1?: string;
	color2?: string;
}

export function GradientIcon({
	children,
	color1 = '#ec4899',
	color2 = '#4f46e5',
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
			
			{cloneElement(children, {
				stroke: `url(#${gradientId})`,
				size: size,
			})}
		</svg>
	);
}
