import { LINKS } from '@/constants/app';
import { useResolvedLatLong } from '@/hooks';
import React from 'react';

interface LinkProps {
	href: string;
	children: React.ReactNode;
}
const Link = ({ href, children }: LinkProps) => (
	<a
		href={href}
		className="text-blue-500 hover:underline hover:text-blue-400"
		target="_blank"
		rel="noreferrer"
	>
		{children}
	</a>
);

const Footer = () => {
	const { lat, long } = useResolvedLatLong();
	return (
		<footer className="flex items-center justify-end p-4 gap-4">
			<span className="text-sm text-neutral-500">{`${lat},${long}`}</span>
			{LINKS.map((link) => (
				<Link key={link.url} href={link.url}>
					{link.label}
				</Link>
			))}
		</footer>
	);
};

export default React.memo(Footer);
