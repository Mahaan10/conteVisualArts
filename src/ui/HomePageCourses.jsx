import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef } from "react";
import { FiArrowUpLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";

function HomePageCourses({ courses }) {
  const swiperRef = useRef(null);
  const filteredCourses = courses?.filter((c) => c.isActive) || [];

  if (courses.length === 0 || !courses) {
    return <div className="text-center mt-4">دوره‌ای یافت نشد</div>;
  }

  return (
    <div className="overflow-hidden max-w-full">
      <div className="flex items-center justify-between mb-4">
        <h1
          className="text-sm sm:text-base md:text-lg"
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          دوره‌های محبوب
        </h1>
        <div
          className="flex items-center gap-2"
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          <Link
            to="/courses"
            className="text-xs flex items-center gap-x-1 hover:text-butter-caramel dark:hover:text-moderate-violet transition-colors duration-300"
          >
            <span>همه دوره‌ها</span>
            <FiArrowUpLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div
        className="flex items-center justify-end gap-x-2 mt-2 mb-4"
        data-aos="fade-down"
        data-aos-duration="2000"
      >
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="cursor-pointer p-1 sm:p-2 md:p-3 rounded-full border border-almond-cookie dark:border-moderate-violet hover:bg-almond-cookie dark:hover:bg-moderate-violet transition-colors duration-300"
        >
          <FiChevronRight className="md:size-5 size-4" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="cursor-pointer p-1 sm:p-2 md:p-3 rounded-full border border-almond-cookie dark:border-moderate-violet hover:bg-almond-cookie dark:hover:bg-moderate-violet transition-colors duration-300"
        >
          <FiChevronLeft className="md:size-5 size-4" />
        </button>
      </div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
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
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {filteredCourses.map((course) => (
          <SwiperSlide key={course?._id}>
            <Link
              to={`/courses/${course?._id}`}
              className="flex flex-col gap-y-2 items-center w-full"
            >
              <div className="w-40 h-40">
                <img
                  src={course?.Image}
                  alt={course?.name}
                  loading="lazy"
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
              <h1 className="text-sm text-nowrap w-40 text-right">
                {course?.name}
              </h1>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomePageCourses;
