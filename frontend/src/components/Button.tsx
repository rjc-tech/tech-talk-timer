import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function Button({
  path,
  children
}: {
  path: string;
  children: ReactNode;
}) {
  return (
    <Link to={path} className="w-full md:w-auto px-8 py-4 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
      {children}
    </Link>
  );
}
