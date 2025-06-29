import { NavLink } from "react-router-dom";

function CustomNavlink({ children, to, onClose }) {
  const navlinkClass =
    "py-2.5 px-2 transition-colors duration-300 flex items-center justify-start gap-x-2 rounded-lg";
  return (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        isActive
          ? `${navlinkClass} bg-almond-cookie dark:bg-dark-cerulean rounded-lg`
          : `${navlinkClass} hover:bg-golden-sand dark:hover:bg-purple-plumeria`
      }
    >
      {children}
    </NavLink>
  );
}

export default CustomNavlink;
