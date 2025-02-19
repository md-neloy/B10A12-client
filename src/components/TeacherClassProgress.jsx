import PropTypes from "prop-types";
import { useState } from "react";
import { FaUserGraduate, FaClipboardList, FaFileUpload } from "react-icons/fa";
import { MdLibraryAdd, MdVideoCameraFront } from "react-icons/md";
import TeacherCreateAsignModal from "./TeacherCreateAsignModal";
import { Helmet } from "react-helmet-async";

const TeacherClassProgress = ({ classData }) => {
  const [openModal, setOpenModal] = useState(null);
  const handleOpenModal = (classId) => {
    console.log(classId);
    setOpenModal(classId);
  };
  const closeModal = () => {
    setOpenModal(null);
  };
  return (
    <div>
      <Helmet>
        <title>SmartLearning | Class Progress</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-center ">Class Progress</h2>
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleOpenModal(classData._id)}
          className="bg-[#4CAF50] hover:bg-[#388E3C]  text-white px-6 py-3 my-3 rounded-lg  font-medium transition-all text-center "
        >
          <MdLibraryAdd className="text-2xl" />
        </button>
        <button className="bg-[#4CAF50] hover:bg-[#388E3C]  text-white px-6 py-3 my-3 rounded-lg  font-medium transition-all text-center ">
          <MdVideoCameraFront className="text-2xl" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Enrollment Card */}
        <div className="card bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-xl hover:scale-105 transition-transform">
          <div className="card-body flex items-center">
            <FaUserGraduate className="text-5xl mr-4" />
            <div>
              <h3 className="text-xl font-bold">Total Enrollment</h3>
              <p className="text-3xl text-center">{classData.enroll}</p>
            </div>
          </div>
        </div>

        {/* Total Assignments Card */}
        <div className="card bg-gradient-to-r from-green-500 to-green-700 text-white shadow-xl hover:scale-105 transition-transform">
          <div className="card-body flex items-center">
            <FaClipboardList className="text-5xl mr-4" />
            <div>
              <h3 className="text-xl font-bold">Total Assignments</h3>
              <p className="text-3xl text-center">{classData.assignments}</p>
            </div>
          </div>
        </div>

        {/* Total Submissions Card */}
        <div className="card bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-xl hover:scale-105 transition-transform">
          <div className="card-body flex items-center">
            <FaFileUpload className="text-5xl mr-4" />
            <div>
              <h3 className="text-xl font-bold">Total Submissions</h3>
              <p className="text-3xl text-center">
                {classData.submitedAssignments}
              </p>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <TeacherCreateAsignModal classId={openModal} closeModal={closeModal} />
      )}
    </div>
  );
};

export default TeacherClassProgress;
TeacherClassProgress.propTypes = {
  classData: PropTypes.object,
};
