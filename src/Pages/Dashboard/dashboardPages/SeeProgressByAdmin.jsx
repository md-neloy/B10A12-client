import PropTypes from "prop-types";
import TeacherAddClassCard from "../../../components/TeacherAddClassCard";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PreLoader from "../../../components/PreLoader";

const SeeProgressByAdmin = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    data: classData,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["classData"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/classes/${id}`);
      return result.data;
    },
  });
  if (isFetching) {
    return <PreLoader />;
  }
  console.log(classData);
  return (
    <div className="p-5">
      <TeacherAddClassCard refetch={refetch} item={classData} />
    </div>
  );
};

export default SeeProgressByAdmin;

SeeProgressByAdmin.propTypes = {
  classData: PropTypes.object.isRequired,
  refetch: PropTypes.func,
};
