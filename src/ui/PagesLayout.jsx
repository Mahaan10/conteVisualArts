import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterSection from "./FooterSection";

function PagesLayout() {
  return (
    <div className="bg-linen max-w-screen p-2 md:p-10 font-iran-marker dark:text-whitesmoke dark:bg-dark-purple transition-colors duration-300">
      <div className="bg-whitesmoke dark:bg-slate-950 dark:text-white rounded-lg transition-colors duration-300">
        <Header />
        <div className="max-w-[980px] mx-auto">
          <Outlet />
        </div>
        <FooterSection />
      </div>
    </div>
  );
}

export default PagesLayout;
