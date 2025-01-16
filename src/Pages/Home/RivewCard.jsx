import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import StarRatings from "react-star-ratings";
import SectionHeader from "../../components/SectionHeader";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import PreLoader from "../../components/PreLoader";
import { useQuery } from "@tanstack/react-query";
import { EffectCoverflow, Pagination } from "swiper/modules";
import Container from "../../Sharecomponent/Container";

const RivewCard = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: feedbacks,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedback");
      return res.data;
    },
  });
  // console.log(feedbacks);

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
          <SectionHeader title={"Student Review"}></SectionHeader>

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 30,
              stretch: 2,
              depth: 100,
              modifier: 2,
              slideShadows: true,
            }}
            pagination={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {feedbacks?.map((feedback) => (
              <SwiperSlide key={feedback._id} className="h-auto">
                <div className="card bg-gradient-to-r h-full bg-[#E9ECEF] p-5 rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
                  {/* title */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg sm:text-2xl text-[#4CAF50] font-semibold">
                      {feedback.title}
                    </h3>
                  </div>
                  {/* Image */}
                  <figure className="flex justify-center mb-4">
                    <img
                      src={feedback.photo}
                      alt={feedback.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-white shadow-xl"
                    />
                  </figure>

                  {/* Content */}
                  <div className="card-body text-white flex flex-col flex-grow justify-between p-2 md:p-auto">
                    <h2 className="font-medium text-base text-[#4CAF50] sm:text-lg text-center">
                      {feedback.name}
                    </h2>
                    <div className="flex justify-center items-center space-x-2">
                      <p className=" text-sm sm:text-lg italic text-gray-700">{`"${feedback.description}"`}</p>
                    </div>

                    {/* Rating */}
                    <div className="card-actions mt-2 flex justify-center">
                      <StarRatings
                        starDimension="25px "
                        starRatedColor="#f5d442"
                        numberOfStars={5}
                        rating={feedback.rating}
                        name="rating"
                      />
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

export default RivewCard;
