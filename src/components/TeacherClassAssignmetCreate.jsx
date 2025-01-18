import PropTypes from "prop-types";
import PreLoader from "./PreLoader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";

const TeacherClassAssignmentCreate = ({ classId }) => {
  const AxiosSecure = useAxiosSecure();
  const {
    data: classAssignments = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classAssignments", classId],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/classes/${classId}`);
      return res.data.assignments; // Assuming assignments are inside `res.data.assignments`
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }

  if (error) {
    return (
      <p className="text-2xl text-red-500">
        {error.message || "An unknown error occurred."}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="table table-zebra w-full">
        {/* Table Header */}
        <thead>
          <tr>
            <th className="text-left">#</th>
            <th className="text-left">Assignment Title</th>
            <th className="text-left">Assignment Description</th>
            <th className="text-left">Marks</th>
            <th className="text-left">Submissions</th>
            <th className="text-left">Deadline</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {classAssignments.map((assignment, index) => (
            <tr key={assignment.id || index}>
              <th>{index + 1}</th>
              <td>{assignment.title || "N/A"}</td>
              <td>{assignment.description || "N/A"}</td>
              <td>{assignment.mark || "N/A"}</td>
              <td>{assignment.submits || 0}</td>
              <td>{assignment.lastDate || "N/A"}</td>
              <td className="text-center">
                <button className="btn btn-success btn-sm">Check</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TeacherClassAssignmentCreate.propTypes = {
  classId: PropTypes.string.isRequired,
};

export default TeacherClassAssignmentCreate;
