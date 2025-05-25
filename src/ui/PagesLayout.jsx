import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterSection from "./FooterSection";
import GetUserProvider from "../context/useGetUserContext";

function PagesLayout() {
  return (
    <div className="bg-linen max-w-screen p-2 md:p-10 font-iran-marker dark:text-whitesmoke dark:bg-dark-purple transition-colors duration-300">
      <GetUserProvider>
        <div className="bg-whitesmoke dark:bg-slate-950 dark:text-white rounded-lg transition-colors duration-300">
          <Header />
          <div className="max-w-[1920px] mx-auto">
            <Outlet />
          </div>
          <FooterSection />
        </div>
      </GetUserProvider>
    </div>
  );
}

export default PagesLayout;
