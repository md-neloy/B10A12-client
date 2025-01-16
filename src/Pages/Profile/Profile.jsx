import Lottie from "lottie-react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import userAnimation from "./profile.json";
import PreLoader from "../../components/PreLoader";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useContexHooks from "../../useHooks/useContexHooks";

const Profile = () => {
  const { user, logOut } = useContexHooks();

  const axiosSecure = useAxiosSecure();
  const {
    data: profile,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/user/profile/${user?.email}`);
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

  const { name, role, email } = profile;

  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6 h-full flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden bg-white">
        {/* Animation */}
        <div className="w-full md:w-1/2 bg-gradient-to-t from-blue-200 via-blue-50 to-blue-100 p-6">
          <Lottie animationData={userAnimation} loop={true} />
        </div>

        {/* Profile Card Section */}
        <div className="w-full md:w-1/2 p-8">
          {/* User Image */}
          <div className="flex justify-center">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User"
              className="rounded-full w-36 h-36 object-cover shadow-lg border-4 border-blue-500 hover:scale-105 transform transition-transform duration-300"
            />
          </div>

          {/* User Details */}
          <div className="text-center mt-6">
            {/* Name */}
            <h2 className="text-3xl font-semibold text-blue-600 flex items-center justify-center gap-2">
              <FaUser className="text-blue-400" /> {name || "Anonymous User"}
            </h2>

            {/* Role */}
            <p className="text-lg text-gray-500 mt-2">
              {role || "No Role Assigned"}
            </p>

            <div className="border-t border-gray-300 my-4"></div>

            {/* Email */}
            <div className="mt-4 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500 text-lg" />
                <a
                  href={`mailto:${email || ""}`}
                  className="text-blue-600 hover:underline text-base"
                >
                  {email || "No Email Provided"}
                </a>
              </div>

              {/* Interactive Buttons */}
              <div className="flex gap-4 mt-4">
                {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg transition-all">
                  Edit Profile
                </button> */}
                <button
                  onClick={logOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 hover:shadow-lg transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
