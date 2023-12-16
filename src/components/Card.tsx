import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  className?: string;
}

const Card = ({ children, className }: Props) => (
  <div
    className={`flex flex-col gap-4 items-center p-4 m-4 max-w-screen-md w-full mx-auto rounded-lg bg-gradient-to-br from-violet-800 to-indigo-900 ${className}`}
  >
    {children}
  </div>
);

export default Card;
