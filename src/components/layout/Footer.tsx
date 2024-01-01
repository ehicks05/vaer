import React from 'react';

const repoUrl = 'https://www.github.com/ehicks05/vaer/';
const siteUrl = 'https://ehicks.net';

const Footer = () => (
	<footer className="flex items-center justify-end p-4 gap-4">
		<Link href={repoUrl}>github</Link>
		<Link href={siteUrl}>ehicks</Link>
		{/* <Link href={'https://openweathermap.org'}>
			<img
				className="h-8"
				alt="Openweathermap logo"
				src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
			/>
		</Link> */}
		{/* <Link href={'https://openweathermap.org'}>
			<img
				className="h-8 text-white"
				alt="Openweathermap logo"
				src="/openweather.svg"
			/>
		</Link> */}
	</footer>
);

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
