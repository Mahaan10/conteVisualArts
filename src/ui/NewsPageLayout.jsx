import { BsPen } from "react-icons/bs";
import useSingleNews from "../hooks/useSingleNews";
import { useParams } from "react-router-dom";
import { useToast } from "../context/useToastContext";
import Loading from "./Loading";
import NotFound from "./NotFound";
import formattedDate from "../utils/formattedDate";
import { TbClockCheck } from "react-icons/tb";
import { PiCalendarCheck } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function NewsPageLayout() {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef();
  const { id } = useParams();
  const { news, error, isError, isLoading } = useSingleNews(id);
  const { showToast } = useToast();

  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [news?.description]);

  if (isLoading) return <Loading />;
  if (isError) {
    showToast("error", error?.response?.data?.message || "خطا در بارگذاری");
    return <NotFound />;
  }
  return (
    <div className="my-10 mx-4">
      <div
        className="flex items-center gap-x-2"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <BsPen className="md:size-7 size-5" />
        <p className="text-sm md:text-xl">{news?.title}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-14 p-3 py-6 lg:p-5 mb-10">
        <div className="col-span-1 lg:col-span-7 xl:col-span-6 order-2 md:order-1">
          <div
            className="flex items-start gap-x-6 gap-y-3 md:items-center flex-wrap text-xs md:mt-10"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="flex items-center gap-x-1">
              <TbClockCheck className="w-4 h-4" />
              <div className="flex items-center text-xs gap-x-1 dark:text-whitesmoke/75 text-black/75">
                <p>تاریخ انتشار:</p>
                <span>{formattedDate(news?.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <PiCalendarCheck className="w-4 h-4" />
              <div className="flex items-center text-xs gap-x-1 dark:text-whitesmoke/75 text-black/75">
                <p>تاریخ بروزرسانی:</p>
                <span>{formattedDate(news?.updatedAt)}</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <div className="rounded-xl p-3 lg:p-6">
              <div
                className={`overflow-hidden transition-all duration-500 mb-8 ${
                  isDescriptionExpanded ? "max-h-[3000px]" : "max-h-30"
                }`}
              >
                <p
                  ref={descriptionRef}
                  className={`leading-7 md:leading-8 mb-7 text-xs md:text-sm text-justify font-bold ${
                    !isDescriptionExpanded ? "line-clamp-4" : ""
                  }`}
                >
                  {news?.description}
                </p>
              </div>
            </div>
            {isOverflowing && (
              <div className="flex items-end justify-center absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-whitesmoke dark:from-slate-950">
                <button
                  className="cursor-pointer flex items-center gap-x-2 rounded-md text-xs py-2 px-3 bg-transparent border border-almond-cookie dark:border-gray-900 hover:bg-almond-cookie dark:hover:bg-gray-900 transition-all duration-300"
                  onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                >
                  {!isDescriptionExpanded ? (
                    <>
                      <span>ادامه مطلب</span>
                      <FaEye className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>بستن</span>
                      <FaEyeSlash className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-5 xl:col-span-6 order-1 md:order-2 self-start">
          <div
            className="aspect-[12/9]"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <img
              src={news?.Image}
              alt={news?.title}
              className="rounded-xl w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPageLayout;
