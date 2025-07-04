import { useParams } from "react-router-dom";
import useSingleCourse from "../hooks/useSingleCourse";
import { PiGraduationCapLight } from "react-icons/pi";
import Loading from "./Loading";
import { useToast } from "../context/useToastContext";
import { BsClockHistory, BsCheckAll } from "react-icons/bs";
import { TbUsers, TbClockCheck } from "react-icons/tb";
import { FaEye, FaEyeSlash, FaRegCommentDots } from "react-icons/fa6";
import { PiCalendarCheck } from "react-icons/pi";
import {
  Button,
  createTheme,
  Modal as FlowbiteModal,
  ModalBody,
  ModalHeader,
  Rating,
  RatingStar,
  ThemeProvider,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Comments from "./Comments";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import useOutsideClick from "../hooks/useOutsideClick";
import formattedDate from "../utils/formattedDate";
import { useCart } from "../context/useShoppingCardContext";
import NotFound from "./NotFound";

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

function CoursePageLayout() {
  const { addToCard } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const imageSwiperRef = useRef(null);
  const reviewSwiperRef = useRef(null);
  const descriptionRef = useRef(null);
  const { id } = useParams();
  const { showToast } = useToast();
  const { course, error, isError, isLoading } = useSingleCourse(id);
  const modalRef = useOutsideClick(() => {
    if (isPreviewOpen) setIsPreviewOpen(false);
  });

  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
    }
  }, [course?.description]);

  const handlePrev = () => {
    if (!course?.courseImages.length > 0) return;
    const newIndex =
      (previewIndex - 1 + course.courseImages.length) %
      course.courseImages.length;
    setPreviewIndex(newIndex);
    setPreview(course?.courseImages[newIndex]);
  };

  const handleNext = () => {
    if (!course?.courseImages.length > 0) return;
    const newIndex = (previewIndex + 1) % course.courseImages.length;
    setPreviewIndex(newIndex);
    setPreview(course?.courseImages[newIndex]);
  };

  const handleAddToCard = (course) => {
    addToCard(course);
    showToast("success", `${course.name} به سبد خرید اضافه شد`);
  };

  if (isLoading) return <Loading />;
  if (isError) {
    showToast("error", error?.response?.data?.message || "خطا در بارگذاری");
    return <NotFound />;
  }

  return (
    <>
      <div className="my-10 mx-4 relative">
        {/* Add to card mobile view */}
        <button
          className="fixed bottom-0 z-40 bg-almond-cookie hover:bg-golden-sand dark:hover:bg-dark-purple dark:bg-purple-plumeria w-[95%] mx-auto right-0 left-0 py-3 cursor-pointer text-sm sm:hidden"
          onClick={() => handleAddToCard(course)}
        >
          افزودن به سبد خرید
        </button>
        <div
          className="flex items-center gap-x-2 mb-10"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <PiGraduationCapLight className="md:size-7 size-5" />
          <p className="text-sm md:text-xl">{course?.name}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-14 p-3 py-6 lg:p-5 mb-10">
          <div className="col-span-1 lg:col-span-7 xl:col-span-6 order-2 md:order-1">
            <div className="flex flex-col gap-y-7 my-12 lg:justify-between lg:flex-row">
              <div
                className="flex justify-between lg:justify-start lg:gap-x-20 items-center"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                <div className="flex flex-col items-center gap-y-3">
                  <div className="bg-almond-cookie transition-colors duration-300 dark:bg-dark-cerulean p-4 rounded-2xl">
                    <BsClockHistory className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">
                    {course?.duration} جلسه
                  </span>
                </div>
                <div className="flex flex-col items-center gap-y-3">
                  <div className="bg-almond-cookie transition-colors duration-300 dark:bg-dark-cerulean p-4 rounded-2xl">
                    <TbUsers className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">
                    {course?.enrolledStudents.length} هنرجو
                  </span>
                </div>
                <div className="flex flex-col items-center gap-y-3">
                  <div className="bg-almond-cookie transition-colors duration-300 dark:bg-dark-cerulean p-4 rounded-2xl">
                    <BsCheckAll className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">
                    {course?.availableSeats} ظرفیت مانده
                  </span>
                </div>
              </div>

              <div
                className="flex items-center justify-between lg:flex-col lg:items-end gap-y-4"
                data-aos="zoom-out"
                data-aos-duration="1000"
              >
                <div className="flex items-center gap-x-1.5">
                  <span className="text-sm ">{course?.reviews.length} نظر</span>
                  <FaRegCommentDots className="w-4 h-4" />
                </div>
                {course?.ratingsQuantity > 0 ? (
                  <div className="flex flex-col items-center gap-y-1.5">
                    <Rating>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <RatingStar
                          key={star}
                          filled={star <= course?.ratingsAverage}
                        />
                      ))}
                    </Rating>
                    <p className="text-xs">
                      {course?.ratingsAverage} از {course?.ratingsQuantity} رای
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">بدون امتیاز</p>
                )}
              </div>
            </div>
            <div
              className="flex items-start gap-y-3 gap-x-6 flex-col md:flex-row md:items-center flex-wrap text-xs"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div className="flex items-center gap-x-1">
                <TbClockCheck className="w-4 h-4" />
                <div className="flex items-center text-xs gap-x-1 dark:text-whitesmoke/75 text-black/75">
                  <p>تاریخ انتشار:</p>
                  <span>{formattedDate(course?.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-x-1">
                <PiCalendarCheck className="w-4 h-4" />
                <div className="flex items-center text-xs gap-x-1 dark:text-whitesmoke/75 text-black/75">
                  <p>تاریخ شروع کلاس:</p>
                  <span>{formattedDate(course?.startDate)}</span>
                </div>
              </div>
            </div>
            <div
              className="flex items-center gap-x-6 mt-10"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <button
                className="btn py-3.5 bg-transparent border dark:border-moderate-violet justify-center gap-x-4 dark:hover:bg-purple-plumeria hover:border-transparent border-butter-caramel hover:bg-golden-sand w-48"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaRegCommentDots className="w-4 h-4" />
                <span>ثبت دیدگاه</span>
              </button>
              <button
                className="btn py-3.5 bg-transparent border dark:border-moderate-violet justify-center gap-x-4 dark:hover:bg-purple-plumeria hover:border-transparent border-butter-caramel hover:bg-golden-sand w-48 hidden sm:flex"
                onClick={() => handleAddToCard(course)}
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-5 xl:col-span-6 order-1 md:order-2 self-start">
            <div
              className="aspect-[12/9]"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <img
                src={course?.Image}
                alt={course?.name}
                className="rounded-xl w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        {/*  */}

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
                {course?.description}
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
        {course?.courseImages.length > 0 ? (
          <>
            <div className="my-10">
              <div className="flex items-center justify-between">
                <h3
                  className="text-lg font-bold justify-between"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  عکس های دوره
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
              {course?.courseImages.map((courseImage, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={courseImage}
                    loading="lazy"
                    alt="Course Images"
                    onClick={() => {
                      setPreview(courseImage);
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

        {course?.reviews?.length > 0 ? (
          <div className="my-10">
            <div className="flex items-center justify-between">
              <h3
                className="text-lg font-bold mb-4"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                نظرات هنرجویان
              </h3>
              <div
                className="flex items-center justify-center gap-x-2 mb-6"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <button
                  className="border border-almond-cookie hover:bg-almond-cookie dark:hover:bg-dark-cerulean transition-colors duration-300 dark:border-dark-cerulean/50 p-2 rounded-full cursor-pointer"
                  onClick={() => reviewSwiperRef.current?.slidePrev()}
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
                <button
                  className="border border-almond-cookie hover:bg-almond-cookie dark:hover:bg-dark-cerulean transition-colors duration-300 dark:border-dark-cerulean/50 p-2 rounded-full cursor-pointer"
                  onClick={() => reviewSwiperRef.current?.slideNext()}
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
            <Swiper
              modules={[Autoplay]}
              onSwiper={(swiper) => (reviewSwiperRef.current = swiper)}
              autoplay={{ delay: 8000, disableOnInteraction: false }}
              spaceBetween={25}
              loop
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              {course?.reviews.map((review) => (
                <SwiperSlide key={review?._id}>
                  <div className="p-4 bg-transparent rounded-lg border text-sm shadow-xl dark:shadow-black dark:border-grayish-violet/50 border-almond-cookie/50 h-64 flex flex-col">
                    <div className="flex items-center justify-between gap-x-2">
                      <span className="font-bold">
                        {review?.user?.name || "ناشناس"}
                      </span>
                      <Rating>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <RatingStar
                            key={star}
                            filled={star <= review.rating}
                          />
                        ))}
                      </Rating>
                    </div>
                    <div className="text-left mt-4 text-xs">
                      {formattedDate(review?.createdAt)}
                    </div>
                    <div className="mt-6 text-sm flex-1 overflow-y-auto">
                      {review?.review}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <p className="text-center text-sm my-10">هنوز دیدگاهی ثبت نشده است</p>
        )}
      </div>

      <ThemeProvider theme={customTheme}>
        <FlowbiteModal
          show={isPreviewOpen}
          size="6xl"
          onClose={() => setIsPreviewOpen(false)}
          ref={modalRef}
        >
          <ModalHeader>عکس های دوره</ModalHeader>
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

      {isOpen && (
        <Modal title="دیدگاه شما" onClose={() => setIsOpen(false)}>
          <Comments onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default CoursePageLayout;
