import { Outlet } from "react-router-dom";
import Header from "./Header";
import FooterSection from "./FooterSection";
import GetUserProvider from "../context/useGetUserContext";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ShoppingCardProvider from "../context/useShoppingCardContext";
import FilterProvider from "../context/FilterContext";

function PagesLayout() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-in",
      once: true,
      delay: 300,
    });
  }, []);

  return (
    <div className="bg-linen max-w-screen p-2 md:p-10 font-iran-marker dark:text-whitesmoke dark:bg-dark-purple transition-colors duration-300">
      <GetUserProvider>
        <ShoppingCardProvider>
          <FilterProvider>
            <div className="bg-whitesmoke dark:bg-slate-950 dark:text-whitesmoke text-gray-900 rounded-lg transition-colors duration-300 overflow-x-hidden">
              <Header />
              <main className="max-w-[1920px] mx-auto">
                <Outlet />
              </main>
              <FooterSection />
            </div>
          </FilterProvider>
        </ShoppingCardProvider>
      </GetUserProvider>
    </div>
  );
}

export default PagesLayout;
