import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EnrollmentSubmitionModal from "./EnrollmentSubmitionModal";
import useContexHooks from "../useHooks/useContexHooks";
import { format, parseISO } from "date-fns";
import SectionHeader from "./SectionHeader";

const EnrollAssignmentTable = () => {
  const { id } = useParams(); //classid
  const { user } = useContexHooks();
  const AxiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(null);
  const handleOpenModal = (assignmentId) => {
    setOpenModal(assignmentId);
  };
  const closeModal = () => {
    setOpenModal(null);
  };

  // Fetch assignments for the given class
  const {
    data: assignments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const response = await AxiosSecure.get(
        `/find-assignment/${id}?email=${user?.email}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <p>Loading assignments...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }
  const currentDate = format(new Date(), "yyyy-MM-dd");
  console.log(currentDate);

  return (
    <div className="overflow-x-auto mt-6">
      <SectionHeader title={"Class Assignment"} />
      <button className="bg-[#4CAF50] hover:bg-[#388E3C]  text-white px-6 py-3 rounded-lg text-lg font-medium transition-all text-center">
        FeedBack
      </button>
      {assignments.length > 0 ? (
        <>
          <table className="table table-zebra w-full">
            {/* Table Header */}
            <thead>
              <tr>
                <th className="text-left">#</th>
                <th className="text-left">Title</th>
                <th className="text-left">Description</th>
                <th className="text-left">Deadline</th>
                <th className="text-center">Submission</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {assignments.map((assignment, index) => {
                const deadlineDate = format(
                  parseISO(assignment.deadline),
                  "yyyy-MM-dd"
                );
                const isPastDeadline = currentDate > deadlineDate;
                return (
                  <tr key={assignment._id}>
                    <th>{index + 1}</th>
                    <td>{assignment.title}</td>
                    <td>{assignment.description}</td>
                    <td
                      style={{
                        color: isPastDeadline ? "red" : "green",
                      }}
                    >
                      {assignment.deadline}
                    </td>
                    <td className="flex items-center space-x-2 justify-center">
                      {/* Submit Button */}
                      <button
                        disabled={isPastDeadline}
                        className="btn btn-primary btn-sm"
                        onClick={() => handleOpenModal(assignment._id)}
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p className="text-red-600 font-bold text-center">
            NO Assignment Added Yet
          </p>
        </>
      )}

      {openModal && (
        <EnrollmentSubmitionModal
          refetch={refetch}
          classId={id}
          assignmentId={openModal}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default EnrollAssignmentTable;
