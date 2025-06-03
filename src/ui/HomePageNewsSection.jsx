import { FiChevronRight, FiChevronLeft, FiArrowUpLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import NewsCards from "./NewsCards";

function HomePageNewsSection({ news }) {
  const swiperRef = useRef(null);

  if (!news || news.length === 0) {
    return <div className="text-center mt-4">هیچ رویدادی یافت نشد</div>;
  }

  return (
    <div className="overflow-hidden max-w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg" data-aos="fade-right" data-aos-duration="2000">
          اخبار و رویدادها
        </h1>
        <div
          className="flex items-center gap-2"
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          <Link
            to="/news"
            className="text-xs flex items-center gap-x-1 hover:text-butter-caramel dark:hover:text-moderate-violet transition-colors duration-300"
          >
            <span>همه رویدادها</span>
            <FiArrowUpLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div
        className="flex items-center justify-end gap-x-2 mt-2"
        data-aos="fade-down"
        data-aos-duration="2000"
      >
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="cursor-pointer p-3 rounded-full border border-almond-cookie dark:border-moderate-violet hover:bg-almond-cookie dark:hover:bg-moderate-violet transition-colors duration-300"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="cursor-pointer p-3 rounded-full border border-almond-cookie dark:border-moderate-violet hover:bg-almond-cookie dark:hover:bg-moderate-violet transition-colors duration-300"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={25}
        loop
        breakpoints={{
          0: { slidesPerView: 1 },
          400: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {news.map((item) => (
          <SwiperSlide key={item._id}>
            <NewsCards array={[item]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomePageNewsSection;
