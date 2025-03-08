import { Link } from "react-router-dom";

export function Logo({ to = "/", className }) {
  return (
    <Link to={to} className={" flex justify-start items-center" + className}>
      <span className="font-bold">GestFarm</span>
    </Link>
  );
}
