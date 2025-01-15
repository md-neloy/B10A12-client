import { useQuery } from "@tanstack/react-query";
import ComunityCard from "../../components/ComunityCard";
import PreLoader from "../../components/PreLoader";
import SectionHeader from "../../components/SectionHeader";
import Container from "../../Sharecomponent/Container";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import community from "../../assets/comunity.png";

const Community = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: counts,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/totalCount");
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
    <div className="py-10">
      <Container>
        <div>
          <SectionHeader title={"Our Community"}></SectionHeader>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
            {/* Left: Community Cards */}
            <div className="flex flex-col gap-5 w-full lg:w-1/3">
              <ComunityCard title={"Total Classes"} count={counts.allClasses} />
              <ComunityCard title={"Total Users"} count={counts.alluser} />
              <ComunityCard title={"Total Enroll"} count={counts.totalEnroll} />
            </div>

            {/* Right: Image */}
            <div className="w-full lg:flex-1">
              <img
                src={community}
                alt="smartLearning"
                className="w-full max-w-[400px] lg:max-w-full mx-auto"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Community;
