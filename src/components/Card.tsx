import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  className?: string;
}

const Card = ({ children, className }: Props) => (
  <div
    className={`flex flex-col gap-4 items-center px-4 py-16 m-4 max-w-screen-md w-full mx-auto rounded ${className}`}
  >
    {children}
  </div>
);

export default Card;
