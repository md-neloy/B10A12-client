import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../../components/SectionHeader";
import useAxiosSecure from "../../../useHooks/useAxiosSecure";
import useContexHooks from "../../../useHooks/useContexHooks";
import PreLoader from "../../../components/PreLoader";
import TeacherAddClassCard from "../../../components/TeacherAddClassCard";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const MyClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContexHooks();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: classes,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ["classes", itemsPerPage, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/findClass/${user?.email}?page=${
            currentPage - 1
          }&limit=${itemsPerPage}`
        );
        console.log(res.data);
        return res.data;
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch classes."
        );
      }
    },
  });

  const numOfData = classes?.length || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage) || 1;
  const pages = [...Array(numberOfPages).keys()];

  // console.log(classes);

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
  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Helmet>
        <title>SmartLearning | My Classes</title>
      </Helmet>
      <div className="p-5 bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100 shadow-xl">
        <SectionHeader title={"My Classes"} />
        {classes?.length === 0 ? (
          <p className="text-red-600 text-xl text-center mt-4">
            You Didn&apos;t add any class Yet
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((singleclass, idx) => (
                <TeacherAddClassCard
                  refetch={refetch}
                  key={idx}
                  item={singleclass}
                />
              ))}
            </div>
            <div className="pagination py-4">
              {/* Pagination Buttons */}
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
                    if (currentPage > 1) handlePageChange(currentPage - 1);
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
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  className="btn btn-square"
                  onClick={() => {
                    if (currentPage < numberOfPages)
                      handlePageChange(currentPage + 1);
                  }}
                >
                  Next
                </button>
                {/* Items Per Page Dropdown */}
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
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyClass;
