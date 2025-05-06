import { NavLink } from "react-router-dom";

function CustomNavlink({ children, to }) {
  const navlinkClass = "p-2 transition-colors duration-300";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${navlinkClass} bg-almond-cookie dark:bg-dark-cerulean rounded-lg`
          : `${navlinkClass} text-black dark:text-whitesmoke`
      }
    >
      {children}
    </NavLink>
  );
}

export default CustomNavlink;
