import PropTypes from "prop-types";
import PreLoader from "./PreLoader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContexHooks from "../useHooks/useContexHooks";
import { useState } from "react";
import AssignmentCheckModal from "./AssignmentCheckModal";

const TeacherClassAssignmentList = ({ classId }) => {
  const AxiosSecure = useAxiosSecure();
  const { user } = useContexHooks();
  const [openmodal, setOpenModal] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: classAssignments = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classAssignments", classId, itemsPerPage, currentPage],
    queryFn: async () => {
      const res = await AxiosSecure.get(
        `/find-assignment/${classId}?email=${user?.email}&page=${
          currentPage - 1
        }&limit=${itemsPerPage}`
      );
      return res.data; // Assuming assignments are inside `res.data.assignments`
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

  const numOfData = classAssignments?.length || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage) || 1;
  const pages = [...Array(numberOfPages).keys()];

  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const checkAssignmetSubmission = (assignmentId) => {
    // console.log(assignmentId);
    setOpenModal(assignmentId);
  };
  const closeModal = () => {
    setOpenModal(null);
  };

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
            <tr key={assignment._id || index}>
              <th>{index + 1}</th>
              <td>{assignment.title || "N/A"}</td>
              <td>{assignment.description || "N/A"}</td>
              <td>{assignment.mark || "N/A"}</td>
              <td>{assignment.submits || 0}</td>
              <td>{assignment.deadline || "N/A"}</td>
              <td className="text-center">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => checkAssignmetSubmission(assignment._id)}
                >
                  Check
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination py-4">
        {/* Pagination Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            className="btn btn-square"
            onClick={() => {
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={
                currentPage === page + 1
                  ? `bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-lg text-lg font-medium transition-all text-center`
                  : "btn btn-outline"
              }
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="btn btn-square"
            onClick={() => {
              if (currentPage < numberOfPages)
                handlePageChange(currentPage + 1);
            }}
          >
            Next
          </button>
          {/* Items Per Page Dropdown */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              name="itemsPerPage"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
      </div>
      {openmodal && (
        <AssignmentCheckModal
          assignmentId={openmodal}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

TeacherClassAssignmentList.propTypes = {
  classId: PropTypes.string.isRequired,
};

export default TeacherClassAssignmentList;
