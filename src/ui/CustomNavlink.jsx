import { NavLink } from "react-router-dom";

function CustomNavlink({ children, to }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "" : "")}>
      {children}
    </NavLink>
  );
}

export default CustomNavlink;
