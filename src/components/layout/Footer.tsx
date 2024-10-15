import { useResolvedLatLong } from '@/hooks';
import React from 'react';

const owmUrl = 'https://openweathermap.org';
const repoUrl = 'https://www.github.com/ehicks05/vaer/';
const siteUrl = 'https://ehicks.net';

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
			<Link href={owmUrl}>owm</Link>
			<Link href={repoUrl}>github</Link>
			<Link href={siteUrl}>ehicks</Link>
		</footer>
	);
};

export default React.memo(Footer);
