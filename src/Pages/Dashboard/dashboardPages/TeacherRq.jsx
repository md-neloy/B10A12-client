import { useQuery } from "@tanstack/react-query";
import PreLoader from "../../../components/PreLoader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useState } from "react";

const TeacherRq = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: counts } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/techerRqCount`);
      return res.data;
    },
  });

  const numOfData = counts?.result || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // fetch data by pagination
  const {
    data: requests,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["requests", itemsPerPage, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/rqTeacher?page=${currentPage - 1}&limit=${itemsPerPage}`
        );
        console.log(res.data);
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch classes."
        );
      }
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
  const onApprove = () => {};
  const onReject = () => {};
  // for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-gray-700">Image</th>
              <th className="px-4 py-3 text-left text-gray-700">Experience</th>
              <th className="px-4 py-3 text-left text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-gray-700">Category</th>
              <th className="px-4 py-3 text-center text-gray-700">Status</th>
              <th className="px-4 py-3 text-center text-gray-700">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                {/* Name */}
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {request.name}
                </td>

                {/* Image */}
                <td className="px-4 py-3">
                  <img
                    src={request.image}
                    alt={request.name}
                    className="w-16 h-16 object-cover rounded-full border border-gray-300"
                  />
                </td>

                {/* Experience */}
                <td className="px-4 py-3 text-gray-600">
                  {request.experience} years
                </td>

                {/* Title */}
                <td className="px-4 py-3 text-gray-600">{request.title}</td>

                {/* Category */}
                <td className="px-4 py-3 text-gray-600">{request.category}</td>

                {/* Status */}
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      request.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : request.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-center">
                  <button
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded-md"
                    onClick={() => onApprove(request.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded-md ml-2"
                    onClick={() => onReject(request.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
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
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
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
              onClick={() => {
                handlePageChange(page + 1);
              }}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="btn btn-square"
            onClick={() => {
              if (currentPage < numberOfPages) {
                handlePageChange(currentPage + 1);
              }
            }}
          >
            Next
          </button>
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
              <option value="6">5</option>
              <option value="10">9</option>
              <option value="20">21</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRq;
