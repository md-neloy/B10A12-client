import Lottie from "lottie-react";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import userAnimation from "./profile.json";
const Profile = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="w-60 md:w-80">
            <Lottie animationData={userAnimation} loop={true} />
          </div>
          <div className="card w-full lg:w-96 bg-base-100 shadow-xl mx-auto">
            <figure>
              <img src="" alt="User" className="rounded-full w-32 h-32 mt-4" />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title text-xl font-bold flex items-center justify-center gap-2">
                <FaUser /> {/* name */}
              </h2>
              <p className="text-sm text-gray-500">{/* role */}</p>
              <div className="mt-4">
                <div className="flex items-center justify-center gap-2">
                  <FaEnvelope className="text-primary" />
                  <a
                    // href={`mailto:${/* email */}`}
                    className="text-blue-600 hover:underline"
                  >
                    {/* email */}
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <FaPhone className="text-primary" />
                  <a
                    // href={`tel:${/* phone */}`}
                    className="text-blue-600 hover:underline"
                  >
                    {/* phone */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
