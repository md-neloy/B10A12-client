import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TeacherClassProgress from "../../../components/TeacherClassProgress";
import TeacherClassAssignmentCreate from "../../../components/TeacherClassAssignmetCreate";
import PreLoader from "../../../components/PreLoader";

const TeacherSeeDetails = () => {
  const { id } = useParams();
  const AxiosSecure = useAxiosSecure();
  const {
    data: classData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classData"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/classes/${id}`);
      return res.data;
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
    <div className="p-5">
      <h2>Teacher See details</h2>
      <h3>{id}</h3>
      <TeacherClassProgress classData={classData} />
      {/* <div>
        <TeacherClassAssignmentCreate classId={id} />
      </div> */}
    </div>
  );
};

export default TeacherSeeDetails;
