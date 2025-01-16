import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../../components/SectionHeader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import useContexHooks from "../../../useHooks/useContexHooks";
import PreLoader from "../../../components/PreLoader";
import TeacherAddClassCard from "../../../components/TeacherAddClassCard";

const MyClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContexHooks();

  const {
    data: classes,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/findClass/${user?.email}`);
        console.log(res.data);
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch classes."
        );
      }
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
  return (
    <div>
      <div className="p-5">
        <SectionHeader title={"Your Enroll Classes"} />
        {classes?.length === 0 ? (
          <p className="text-red-600 text-xl text-center mt-4">
            You Didn&apos;t add any class Yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((singleclass, idx) => (
              <TeacherAddClassCard key={idx} item={singleclass} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClass;
