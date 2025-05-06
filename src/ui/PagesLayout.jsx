import { Outlet } from "react-router-dom";
import Header from "./Header";

function PagesLayout() {
  return (
    <div className="bg-linen max-w-screen p-5 font-iranian-sans dark:text-whitesmoke dark:bg-dark-purple transition-colors duration-300">
      <div className="bg-whitesmoke dark:bg-slate-950 dark:text-white rounded-lg transition-colors duration-300">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default PagesLayout;
