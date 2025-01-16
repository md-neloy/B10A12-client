import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaChalkboardTeacher, FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import { useEffect } from "react";
import useContexHooks from "../../useHooks/useContexHooks";
import PreLoader from "../../components/PreLoader";

const Details = () => {
  const { id } = useParams();
  const { setEnrollPrice } = useContexHooks();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch class details
  const {
    data: classDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  // Handle payment redirection
  const handlePayment = () => {
    navigate(`/payment/${id}`); // Navigate to the payment page
  };

  useEffect(() => {
    setEnrollPrice(classDetails?.price);
  }, [setEnrollPrice, classDetails]);

  if (isLoading) {
    return <PreLoader />;
  }

  if (error) {
    toast.error("Failed to load class details.");
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading class details.
      </div>
    );
  }

  const { title, name, price, image, description, schedule } = classDetails;

  return (
    <div className="bg-base-200 py-8">
      <Helmet>
        <title>{title} | Class Details</title>
      </Helmet>
      <div className="container mx-auto px-4">
        {/* Class Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Class Image */}
            <div className="w-full lg:w-1/3">
              <img
                src={image}
                alt={title}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            {/* Class Info */}
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              <p className="text-gray-700 mb-2">
                <FaChalkboardTeacher className="inline mr-2 text-blue-500" />
                Taught by: <span className="font-semibold">{name}</span>
              </p>
              <p className="text-gray-700 mb-2">
                <FaDollarSign className="inline mr-2 text-green-500" />
                Price: <span className="font-semibold">${price}</span>
              </p>
              <p className="text-gray-700 mb-4">{description}</p>
              {schedule && (
                <div className="mb-4">
                  <h3 className="text-lg font-bold">Schedule:</h3>
                  <ul className="list-disc list-inside">
                    {schedule.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Payment Button */}
              <Link
                to={`/payment/${id}`}
                onClick={handlePayment}
                className="bg-[#4CAF50] hover:bg-[#388E3C]  text-white px-6 py-3 rounded-lg text-lg font-medium transition-all text-center"
              >
                Pay & Enroll
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
