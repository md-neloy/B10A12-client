import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import banner4 from "../../assets/banner/banner4.png";
import banner5 from "../../assets/banner/banner5.png";
import banner6 from "../../assets/banner/banner6.png";
import banner7 from "../../assets/banner/banner7.png";
import banner8 from "../../assets/banner/banner8.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

const Banner = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 md:h-[400px]"
      >
        {[
          banner1,
          banner2,
          banner3,
          banner4,
          banner5,
          banner6,
          banner7,
          banner8,
        ].map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-[250px] sm:h-[400px] md:h-[400px]  object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <div className="flex justify-center items-center mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper h-16"
        >
          {[
            banner1,
            banner2,
            banner3,
            banner4,
            banner5,
            banner6,
            banner7,
            banner8,
          ].map((img, index) => (
            <SwiperSlide
              key={index}
              className="!w-fit cursor-pointer transition-transform hover:scale-110"
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 sm:w-20 h-full object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
