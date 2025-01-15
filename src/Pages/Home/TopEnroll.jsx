import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../components/SectionHeader";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import PreLoader from "../../components/PreLoader";
import Container from "../../Sharecomponent/Container";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import AllClassesCard from "../AllClasses/AllClassesCard";

const TopEnroll = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: classes,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/classes");
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch classes."
        );
      }
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }
  if (error) {
    return (
      <p className="text-2xl text-red-500">
        {error || "An unknown error occurred."}
      </p>
    );
  }

  return (
    <div className="pt-10">
      <Container>
        <div>
          <SectionHeader title={"Top Enrolled"} />
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            modules={[FreeMode, Navigation, Thumbs]}
            spaceBetween={20}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper2 "
          >
            {classes.map((item) => (
              <SwiperSlide key={item._id} className="h-auto">
                <AllClassesCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default TopEnroll;
