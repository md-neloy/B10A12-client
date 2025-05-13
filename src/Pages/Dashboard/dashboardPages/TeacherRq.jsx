import { useQuery } from "@tanstack/react-query";
import PreLoader from "../../../components/PreLoader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const TeacherRq = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
    refetch,
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
  const onApprove = (id) => {
    axiosSecure
      .patch(`/class-request/${id}?message=approved`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("successfully upgradet as Teacher");
        }
        refetch();
      })
      .catch((err) => console.log(err));
  };
  const onReject = (id) => {
    axiosSecure
      .patch(`/class-request/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.error("Rejected as a Teacher");
        }
        refetch();
      })
      .catch((err) => console.log(err));
  };
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
      <Helmet>
        <title>SmartLearning | Teacher Rq</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 shadow-xl border-2 border-yellow-500">
          {/* Table Header */}
          <thead className="bg-[#F66B1D]">
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
              <tr key={request._id} className="hover:bg-gray-50">
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
                    disabled={request.status === "reject"}
                    onClick={() => onApprove(request._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded-md ml-2"
                    disabled={request.status === "reject"}
                    onClick={() => onReject(request._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-wrap gap-2 justify-center py-3">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => {
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${
              currentPage === page + 1
                ? "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                : "btn-outline"
            }`}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button
          className="btn btn-outline btn-sm"
          onClick={() => {
            if (currentPage < numberOfPages) handlePageChange(currentPage + 1);
          }}
        >
          Next
        </button>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  );
};

export default TeacherRq;
