import { useState } from "react";
import PreLoader from "../../../components/PreLoader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import useContexHooks from "../../../useHooks/useContexHooks";

const AdminUsersTable = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useContexHooks();
  const {
    data: users,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/alluser-admin`);
      console.log(res.data);
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
  const onSearch = () => {};
  const onMakeAdmin = () => {};
  return (
    <div className="w-full px-4 py-6">
      {/* Search Input */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
              <tr key={data.id} className="hover:bg-gray-50">
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
                    onClick={() => onMakeAdmin(data.id)}
                    disabled={data.isAdmin}
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
    </div>
  );
};

export default AdminUsersTable;
