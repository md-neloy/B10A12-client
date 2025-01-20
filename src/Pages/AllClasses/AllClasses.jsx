import { useQuery } from "@tanstack/react-query";
import Container from "../../Sharecomponent/Container";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import PreLoader from "../../components/PreLoader";
import { useState } from "react";
import AllClassesCard from "./AllClassesCard";
import SectionHeader from "../../components/SectionHeader";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch total count of classes
  const {
    data: counts,
    isFetching: isFetchingCounts,
    error: countsError,
  } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/totalCount");
      console.log(res);
      return res.data;
    },
  });
  const numOfData = counts?.allClasses || 0; // allclasses.length = 100
  const numberOfPages = Math.ceil(numOfData / itemsPerPage) || 1; // 100/10 = 10
  const pages = [...Array(numberOfPages).keys()]; //[1,2,3,4,5,6...]

  // Fetch paginated class data
  const {
    data: allClasses,
    isFetching: isFetchingClasses,
    error: classesError,
  } = useQuery({
    queryKey: ["allclasses", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/allclasses?page=${currentPage - 1}&limit=${itemsPerPage}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

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

  if (isFetchingCounts || isFetchingClasses) {
    return <PreLoader />;
  }

  if (countsError || classesError) {
    return (
      <p className="text-2xl text-red-500">
        {countsError?.message ||
          classesError?.message ||
          "An unknown error occurred."}
      </p>
    );
  }

  return (
    <section className="py-10">
      <Helmet>
        <title>SmartLearning | All Classes</title>
      </Helmet>
      <Container>
        <div>
          <SectionHeader title={"All Classes"} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {allClasses?.map((classes) => (
              <AllClassesCard key={classes._id} item={classes} />
            ))}
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
                if (currentPage < numberOfPages)
                  handlePageChange(currentPage + 1);
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
      </Container>
    </section>
  );
};

export default AllClasses;
