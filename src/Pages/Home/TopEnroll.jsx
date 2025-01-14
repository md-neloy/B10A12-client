import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../components/SectionHeader";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import PreLoader from "../../components/PreLoader";
import Container from "../../Sharecomponent/Container";
import Button from "../../Sharecomponent/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const TopEnroll = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: classes,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes");
      return res.data;
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }
  if (error) {
    return <p className="text-2xl text-red-500">{error}</p>;
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
                <div className="card card-compact bg-[#E9ECEF] w-full h-full shadow-xl">
                  <figure>
                    <img
                      src={item.image}
                      alt="Class"
                      className="w-full lg:h-[350px] object-cover"
                    />
                  </figure>
                  <div className="flex flex-col p-3 justify-between shadow-xl">
                    {/* Card Content */}
                    <div className="flex-1">
                      {/* Title */}
                      <div className="flex">
                        <h2 className="w-1/4">Title</h2>
                        <h2 className="flex-1">: {item.title}</h2>
                      </div>
                      {/* Name */}
                      <div className="flex">
                        <h2 className="w-1/4">Name</h2>
                        <h2 className="flex-1">: {item.name}</h2>
                      </div>
                      {/* Price */}
                      <div className="flex">
                        <h2 className="w-1/4">Price</h2>
                        <h2 className="flex-1">: {item.price}</h2>
                      </div>
                      {/* Description */}
                      <div className="flex">
                        <h2 className="w-1/4">Description</h2>
                        <h2 className="flex-1">: {item.description}</h2>
                      </div>
                      {/* Card Actions */}
                      <div className="card-actions mt-auto p-3 ">
                        <Button text="Enroll" width="100%" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default TopEnroll;
