import { useQuery } from "@tanstack/react-query";
import PreLoader from "../../../components/PreLoader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";

const TeacherRq = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/rqTeacher`);
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
  return (
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
  );
};

export default TeacherRq;
