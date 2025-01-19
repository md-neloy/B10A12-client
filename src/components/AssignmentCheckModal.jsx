import PropTypes from "prop-types";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContexHooks from "../useHooks/useContexHooks";
import { useQuery } from "@tanstack/react-query";
import PreLoader from "./PreLoader";

const AssignmentCheckModal = ({ assignmentId, closeModal }) => {
  const { user } = useContexHooks();
  const AxiosSecure = useAxiosSecure();

  const {
    data: submissionList = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ["submissionList", assignmentId],
    queryFn: async () => {
      const res = await AxiosSecure.get(
        `/checkAssignment/${assignmentId}?email=${user?.email}`
      );
      return res.data; // Assuming this is an array of submission objects
    },
  });

  if (error) {
    return <p className="text-red-600">{error.message}</p>;
  }

  return (
    <div>
      <dialog id="my_modal_4" className="modal" open>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">
            Submission Assignment Student List
          </h3>
          {isFetching ? (
            <PreLoader />
          ) : (
            <>
              {/* Dynamic Table */}
              <div className="overflow-x-auto mt-4">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>Class ID</th>
                      <th>Assignment URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionList.length > 0 ? (
                      submissionList.map((submission, index) => (
                        <tr key={submission.email || index}>
                          <td>{index + 1}</td>
                          <td>{submission.email || "N/A"}</td>
                          <td>{submission.classId || "N/A"}</td>
                          <td>
                            {submission.assignment_url ? (
                              <a
                                href={submission.assignment_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                View Assignment
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-gray-500">
                          No submissions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* Close button */}
                  <button className="btn" onClick={closeModal}>
                    Close
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default AssignmentCheckModal;

AssignmentCheckModal.propTypes = {
  assignmentId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
