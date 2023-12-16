import React from 'react';

const repoUrl = 'https://www.github.com/ehicks05/jikan/';
const siteUrl = 'https://ehicks.net';

const Footer = () => (
  <footer className="flex justify-end p-4 gap-4">
    <Link href={repoUrl}>github</Link>
    <Link href={siteUrl}>ehicks</Link>
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
