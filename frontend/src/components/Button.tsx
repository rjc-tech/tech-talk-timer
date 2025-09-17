import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function Button({
  path,
  facilitator,
  selectedTopics,
  children
}: {
  path: string;
  facilitator?: string;
  selectedTopics?: string[];
  children: ReactNode;
}) {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path, {state: {
        facilitator: facilitator,
        selectedTopics: selectedTopics
      }})}
      className="w-full md:w-auto px-8 py-4 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
    >
      {children}
    </button>
  );
}
