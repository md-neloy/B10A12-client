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
          spaceBetween={20} // Adjust spacing between slides
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            // Configuration for different screen sizes
            640: {
              slidesPerView: 1, // For small screens (e.g., mobile)
            },
            768: {
              slidesPerView: 2, // For medium screens (e.g., tablets)
            },
            1024: {
              slidesPerView: 3, // For large screens (e.g., desktops)
            },
          }}
          className="mySwiper2 "
        >
          {classes.map((item) => (
            <SwiperSlide key={item._id} className="h-auto">
              <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
                <figure>
                  <img
                    src={item.image}
                    alt="Class"
                    className="w-full lg:h-[350px] object-cover"
                  />
                </figure>
                <div className="card-body flex flex-col flex-1 justify-between">
                  {/* Card Content */}
                  <div className="flex flex-col flex-grow">
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
                  </div>

                  {/* Card Actions */}
                  <div className="card-actions mt-auto">
                    <Button text="Enroll" width="100%" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default TopEnroll;
