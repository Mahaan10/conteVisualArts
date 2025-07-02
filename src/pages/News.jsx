import { BsPen } from "react-icons/bs";
import NewsCards from "../ui/NewsCards";
import useNews from "../hooks/useNews";
import { useToast } from "../context/useToastContext";
import Loading from "../ui/Loading";
import { Button, createTheme, ThemeProvider } from "flowbite-react";
import { FaSort } from "react-icons/fa6";
import NewsSidebar from "../ui/NewsSidebar";
import { Outlet, useLocation } from "react-router-dom";
import NotFound from "../ui/NotFound";

const customTheme = createTheme({
  button: {
    base: "gap-x-3 w-40",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke cursor-pointer transition-colors duration-300 text-xs",
    },
  },
});

function News() {
  const { news, error, isError, isLoading } = useNews();
  const { showToast } = useToast();
  const location = useLocation();

  const isNewsDetailPage = location.pathname !== "/news";

  if (isLoading) return <Loading />;
  if (isError) {
    showToast(
      "error",
      error?.response?.data?.message || "بارگذاری با خطا مواجه شد"
    );
    return <NotFound />;
  }

  return (
    <div className="container">
      {isNewsDetailPage ? (
        <Outlet />
      ) : (
        <>
          <div className="my-10 flex items-center justify-between mx-4">
            <div
              className="flex items-center gap-x-2"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <BsPen className="w-7 h-7" />
              <p className="text-xl">اخبار و رویدادها</p>
            </div>
          </div>
          {/* ... */}
          <div
            className="flex items-center justify-center gap-x-4 md:hidden mb-8"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <ThemeProvider theme={customTheme}>
              <Button color="dark" pill outline>
                <FaSort className="w-5 h-5" />
                <span>مرتب سازی</span>
              </Button>
            </ThemeProvider>
          </div>
          <div className="grid grid-cols-12 gap-5 mx-4">
            {/* Sidebar */}
            <aside className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-3 order-2 lg:order-2 lg:pl-8">
              <NewsSidebar />
            </aside>
            <div className="col-span-12 lg:col-span-8 xl:col-span-9 order-1 lg:order-2 mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-y-8 sm:gap-x-8 bg-gray-100 dark:bg-gray-950 rounded-lg p-4">
                {news.length === 0 ? (
                  <p className="text-center text-sm col-span-12">
                    هیچ خبری ثبت نشده است
                  </p>
                ) : (
                  <NewsCards array={news} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default News;
