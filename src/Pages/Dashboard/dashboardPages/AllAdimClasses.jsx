import { useQuery } from "@tanstack/react-query";
import PreLoader from "../../../components/PreLoader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import SeeProgressByAdmin from "./SeeProgressByAdmin";

const AllAdminClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState(null);

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

  const openModal = (classItem) => {
    setSelectedClass(classItem);
  };

  const closeModal = () => {
    setSelectedClass(null);
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
                  <button
                    disabled={classItem.status !== "approved"}
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 px-3 py-1 rounded-md"
                    onClick={() => openModal(classItem)}
                  >
                    See Progress
                  </button>
                </td>

                {/* Actions */}
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

      {/* Modal */}
      {selectedClass && (
        <SeeProgressByAdmin
          classData={selectedClass} // Pass the selected class data
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AllAdminClasses;
