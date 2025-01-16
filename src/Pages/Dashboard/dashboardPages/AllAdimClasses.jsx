import { useQuery } from "@tanstack/react-query";
import PreLoader from "../../../components/PreLoader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useState } from "react";

const AllAdminClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: classCount } = useQuery({
    queryKey: ["classCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminClassPagination`);
      console.log(res);
      return res.data;
    },
  });

  const numOfData = classCount?.result || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  console.log(currentPage);
  const {
    data: classes,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classes", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/getClasses-forAdmin?page=${currentPage - 1}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  console.log(classes?.length);

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

  const onReject = () => {};
  const onApprove = () => {};
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
        <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          {/* Table Header */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Progress</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem.id} className="hover:bg-gray-50">
                {/* Title */}
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {classItem.title}
                </td>

                {/* Image */}
                <td className="px-4 py-3">
                  <img
                    src={classItem.image}
                    alt={classItem.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-gray-600">{classItem.email}</td>

                {/* Description */}
                <td className="px-4 py-3 text-gray-600 truncate max-w-xs">
                  {classItem.description}
                </td>

                {/* Progress */}
                <td className="px-4 py-3 text-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        classItem.status === "approved"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                      style={{
                        width: classItem.status === "approved" ? "100%" : "50%", // Example progress: adjust as needed
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {classItem.status === "approved"
                      ? "100% Approved"
                      : "50% Pending"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-center">
                  <button
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded-md"
                    onClick={() => onApprove(classItem.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded-md ml-2"
                    onClick={() => onReject(classItem.id)}
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
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="10">9</option>
              <option value="20">21</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAdminClasses;
