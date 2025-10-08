import { BsFire, BsPen } from "react-icons/bs";
import useSingleNews from "../hooks/useSingleNews";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "./Loading";
import NotFound from "./NotFound";
import formattedDate from "../utils/formattedDate";
import { TbClockCheck } from "react-icons/tb";
import { PiCalendarCheck } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useOutsideClick from "../hooks/useOutsideClick";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import {
  createTheme,
  ThemeProvider,
  Modal as FlowbiteModal,
  ModalHeader,
  ModalBody,
} from "flowbite-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const customTheme = createTheme({
  modal: {
    content: {
      inner: "bg-gray-200 dark:bg-slate-950",
    },
    header: {
      base: "border-gray-400/80",
      title:
        "dark:text-whitesmoke text-black font-bold font-iranian-sans text-xs/6 line-clamp-2 sm:text-lg",
      close: {
        base: "ml-0 cursor-pointer text-gray-600 hover:bg-gray-400 dark:text-gray-300 transition-colors duration-300",
      },
    },
  },
});

function NewsPageLayout() {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const descriptionRef = useRef();
  const { id } = useParams();
  const { news, error, isError, isLoading } = useSingleNews(id);
  const imageSwiperRef = useRef(null);
  const modalRef = useOutsideClick(() => {
    if (isPreviewOpen) setIsPreviewOpen(false);
  });

  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [news?.description]);

  const handlePrev = () => {
    if (!news?.newsImages.length > 0) return;
    const newIndex =
      (previewIndex - 1 + news?.newsImages.length) % news?.newsImages.length;
    setPreviewIndex(newIndex);
    setPreview(news?.newsImages[newIndex]);
  };

  const handleNext = () => {
    if (!news?.newsImages.length > 0) return;
    const newIndex = (previewIndex + 1) % news?.newsImages.length;
    setPreviewIndex(newIndex);
    setPreview(news?.newsImages[newIndex]);
  };

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error(error?.response?.data?.message || "خطا در بارگذاری");
    return <NotFound />;
  }
  return (
    <>
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
                  <p>تاریخ شروع:</p>
                  <span>{formattedDate(news?.startDate)}</span>
                </div>
              </div>
              <div className="flex items-center gap-x-1">
                <PiCalendarCheck className="w-4 h-4" />
                <div className="flex items-center text-xs gap-x-1 dark:text-whitesmoke/75 text-black/75">
                  <p>تاریخ بروزرسانی:</p>
                  <span>{formattedDate(news?.updatedAt)}</span>
                </div>
              </div>
              {news?.badge && (
                <div className="flex items-center gap-x-1">
                  <div className="flex items-center text-xs gap-x-1 text-whitesmoke/75">
                    <span className="bg-red-800 p-2 flex items-center gap-x-1 rounded-sm">
                      {news?.badge === "new" ? "جدید" : ""}
                      <BsFire className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              )}
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
              className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-lg"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <img
                src={news?.Image}
                alt={news?.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        {news?.newsImages.length > 0 ? (
          <>
            <div className="my-10">
              <div className="flex items-center justify-between">
                <h3
                  className="text-lg font-bold justify-between"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  عکس های رویداد
                </h3>
                <div
                  className="flex items-center justify-center gap-x-2"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <button
                    className="border border-almond-cookie hover:bg-almond-cookie dark:hover:bg-dark-cerulean transition-colors duration-300 dark:border-dark-cerulean/50 p-2 rounded-full cursor-pointer"
                    onClick={() => imageSwiperRef.current?.slidePrev()}
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    className="border border-almond-cookie hover:bg-almond-cookie dark:hover:bg-dark-cerulean transition-colors duration-300 dark:border-dark-cerulean/50 p-2 rounded-full cursor-pointer"
                    onClick={() => imageSwiperRef.current?.slideNext()}
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <Swiper
              modules={[Autoplay]}
              onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
              autoplay={{ delay: 8000, disableOnInteraction: false }}
              spaceBetween={25}
              loop
              breakpoints={{
                0: { slidesPerView: 1 },
                400: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1000: { slidesPerView: 5 },
                1180: { slidesPerView: 6 },
              }}
            >
              {news?.newsImages.map((newsImage, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={newsImage}
                    loading="lazy"
                    alt="news Images"
                    onClick={() => {
                      setPreview(newsImage);
                      setPreviewIndex(index);
                      setIsPreviewOpen(true);
                    }}
                    className="w-40 h-40 mx-auto object-cover rounded-md cursor-pointer hover:opacity-90 transition"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          ""
        )}
      </div>

      <ThemeProvider theme={customTheme}>
        <FlowbiteModal
          show={isPreviewOpen}
          size="6xl"
          onClose={() => setIsPreviewOpen(false)}
          ref={modalRef}
        >
          <ModalHeader>عکس های رویداد</ModalHeader>
          <ModalBody>
            <Zoom>
              <img
                src={preview}
                alt="Preview"
                loading="lazy"
                className="w-full sm:h-auto h-96 object-cover  rounded-lg"
              />
            </Zoom>
            <button
              onClick={handleNext}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg bg-gray-700 dark:bg-whitesmoke"
            >
              <FiChevronLeft className="w-5 h-5 text-whitesmoke dark:text-gray-700" />
            </button>
            <button
              onClick={handlePrev}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg bg-gray-700 dark:bg-whitesmoke"
            >
              <FiChevronRight className="w-5 h-5 text-whitesmoke dark:text-gray-700" />
            </button>
          </ModalBody>
        </FlowbiteModal>
      </ThemeProvider>
    </>
  );
}

export default NewsPageLayout;
