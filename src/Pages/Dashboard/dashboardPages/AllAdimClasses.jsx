import { useQuery } from "@tanstack/react-query";
import PreLoader from "../../../components/PreLoader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AllAdminClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: classCount } = useQuery({
    queryKey: ["classCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminClassPagination`);
      return res.data;
    },
  });

  const numOfData = classCount?.result || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: classes,
    isFetching,
    refetch,
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

  const onReject = (id) => {
    axiosSecure
      .patch(`/approved-reject-class/${id}?message=reject`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Successfully rejected the class");
        }
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const onApprove = (id) => {
    axiosSecure
      .patch(`/approved-reject-class/${id}?message=approved`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Successfully approved the class");
        }
        refetch();
      })
      .catch((err) => console.log(err));
  };

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
        <title>SmartLearning | All Classes</title>
      </Helmet>
      {/* Table */}
      <div className="overflow-x-auto max-w-full">
        <table className="table-auto w-full border-collapse bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 shadow-xl border-2 border-green-600">
          <thead className="bg-[#4CAF50] text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Progress</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {classItem.title}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={classItem.image}
                    alt={classItem.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-3 text-gray-600">{classItem.email}</td>
                <td className="px-4 py-3 text-gray-600 truncate max-w-xs">
                  {classItem.description}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    to={`/dashboard/seeprogress/${classItem._id}`}
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded-md"
                  >
                    See Progress
                  </Link>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded-md"
                    onClick={() => onApprove(classItem._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded-md ml-2"
                    onClick={() => onReject(classItem._id)}
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

export default AllAdminClasses;
