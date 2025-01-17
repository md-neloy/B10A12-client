import { useState } from "react";
import PreLoader from "../../../components/PreLoader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import { toast } from "react-toastify";

const AdminUsersTable = () => {
  const [searchOn, setSearchOn] = useState("");
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: useCounts } = useQuery({
    queryKey: ["useCounts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/alluser-admin-count`);
      return res.data;
    },
  });
  const numOfData = useCounts?.result || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const {
    data: users,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ["users", currentPage, itemsPerPage, searchOn],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/alluser-admin?page=${
          currentPage - 1
        }&limit=${itemsPerPage}&search=${searchOn}`
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
  const onSearch = () => {
    const value = document.querySelector("input[name='search']");
    setSearchOn(value.value);
  };
  const onMakeAdmin = (id) => {
    axiosSecure
      .patch(`/users/makeAdmin/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Successfully Make Admin");
          refetch();
        }
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
    <div className="w-full px-4 py-6">
      {/* Search Input */}
      <div className="flex justify-start mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-sm"
        />
        <button onClick={onSearch} className="btn btn-primary ml-2">
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700">User Name</th>
              <th className="px-4 py-3 text-left text-gray-700">User Email</th>
              <th className="px-4 py-3 text-left text-gray-700">User Image</th>
              <th className="px-4 py-3 text-center text-gray-700">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((data) => (
              <tr key={data._id} className="hover:bg-gray-50">
                {/* User Name */}
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {data.name}
                </td>

                {/* User Email */}
                <td className="px-4 py-3 text-gray-600">{data.email}</td>

                {/* User Image */}
                <td className="px-4 py-3">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-12 h-12 object-cover rounded-full border border-gray-300"
                  />
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onMakeAdmin(data._id)}
                    disabled={data.role === "admin"}
                    className={`btn btn-sm ${
                      data.isAdmin
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    } px-4 py-1 rounded-md`}
                  >
                    {data.isAdmin ? "Admin" : "Make Admin"}
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

export default AdminUsersTable;
