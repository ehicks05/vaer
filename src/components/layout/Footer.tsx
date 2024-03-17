import { useCachedGeolocation } from '@/hooks/useCachedGeolocation';
import React from 'react';

const repoUrl = 'https://www.github.com/ehicks05/vaer/';
const siteUrl = 'https://ehicks.net';

const Footer = () => {
	const { latitude, longitude } = useCachedGeolocation();
	return (
		<footer className="flex items-center justify-end p-4 gap-4">
			<span className="text-sm text-neutral-500">{`${longitude}, ${latitude}`}</span>
			<Link href={'https://openweathermap.org'}>owm</Link>
			<Link href={repoUrl}>github</Link>
			<Link href={siteUrl}>ehicks</Link>
		</footer>
	);
};

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

export default React.memo(Footer);
