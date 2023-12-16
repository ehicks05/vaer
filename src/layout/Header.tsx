import { Disclosure } from "@headlessui/react";
import { HiOutlineBell, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, NavLink, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Clock", href: "/" },
  { name: "Timer", href: "/timer" },
  { name: "Stopwatch", href: "/stopwatch" },
];

const MobileMenuButton = ({ open }: { open: boolean }) => (
  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
    <span className="sr-only">Open main menu</span>
    {open ? (
      <HiOutlineX className="block h-6 w-6" aria-hidden="true" />
    ) : (
      <HiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
    )}
  </Disclosure.Button>
);

const Logo = () => (
  <div className="flex-shrink-0 flex items-center">
    <Link to="/">
      <img className="inline h-8 w-auto" src="/icon-color.svg" alt="logo" />
      <img className="hidden sm:inline h-8 w-auto" src="/text.svg" alt="logo" />
    </Link>
  </div>
);

const NonMobileLinks = () => {
  const location = useLocation();

  return (
    <div className="hidden sm:ml-6 sm:flex space-x-4">
      {NAV_LINKS.map((item) => {
        const isActive = location.pathname === item.href;
        const isActiveClasses = isActive
          ? "bg-sky-800 text-white"
          : "text-neutral-300 hover:bg-sky-800 hover:text-white";
        const classes = `px-3 py-2 rounded-md text-sm font-medium ${isActiveClasses}`;
        return (
          <NavLink key={item.name} to={item.href} className={classes}>
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default function Header() {
  const location = useLocation();

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <MobileMenuButton open={open} />
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Logo />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
                <NonMobileLinks />

                {/* <button className="dark:bg-neutral-800 p-1 rounded-full text-neutral-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <HiOutlineBell className="h-6 w-6" aria-hidden="true" />
                </button> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAV_LINKS.map((item) => (
                <NavLink
                  end
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium
                  ${location.pathname !== item.href ? "text-neutral-300" : ""}
                  `}
                  aria-current={
                    location.pathname === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
