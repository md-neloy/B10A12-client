import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EnrollmentSubmitionModal from "./EnrollmentSubmitionModal";
import useContexHooks from "../useHooks/useContexHooks";
import { format, parseISO } from "date-fns";
import SectionHeader from "./SectionHeader";
import FeedbackModal from "./FeedbackModal";
import PreLoader from "./PreLoader";

const EnrollAssignmentTable = () => {
  const { id } = useParams(); //classid
  const { user } = useContexHooks();
  const AxiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(null);
  const [modalFeedback, setmodalFeedback] = useState(false);
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
    return <PreLoader />;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const feedbackModal = () => {
    setmodalFeedback(true);
  };
  const closeFeedbackModal = () => {
    setmodalFeedback(false);
  };

  return (
    <div className="overflow-x-auto p-5">
      <SectionHeader title={"Class Assignment"} />
      <button
        onClick={feedbackModal}
        className="bg-[#4CAF50] hover:bg-[#388E3C]  text-white px-6 py-3 mb-3 rounded-lg text-lg font-bold transition-all text-center"
      >
        FeedBack
      </button>
      {assignments.length > 0 ? (
        <>
          <table className="table table-zebra w-full border border-[#4CAF50]">
            {/* Table Header */}
            <thead className="bg-[#4CAF50] text-white">
              <tr>
                <th className="text-left">#</th>
                <th className="text-left">Title</th>
                <th className="text-left">Description</th>
                <th className="text-left">Deadline</th>
                <th className="text-center">Submission</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="border">
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
                        className="btn btn-primary btn-sm bg-[#4CAF50] border-[#4CAF50] hover:bg-green-700 font-bold hover:border-green-700"
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
      {modalFeedback && (
        <FeedbackModal classId={id} closeFeedbackModal={closeFeedbackModal} />
      )}
    </div>
  );
};

export default EnrollAssignmentTable;
