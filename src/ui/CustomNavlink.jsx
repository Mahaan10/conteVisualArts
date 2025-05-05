import { NavLink } from "react-router-dom";

function CustomNavlink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "bg-fuchsia-600" : "")}
    >
      {children}
    </NavLink>
  );
}

export default CustomNavlink;
