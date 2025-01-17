import PropTypes from "prop-types";
import TeacherAddClassCard from "../../../components/TeacherAddClassCard";

const SeeProgressByAdmin = ({ classData, onClose }) => {
  if (!classData) return null; // Ensure the modal only renders if data exists.

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <dialog className="modal open" open>
        <div className="modal-box w-11/12 max-w-5xl">
          <TeacherAddClassCard item={classData} />
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SeeProgressByAdmin;

SeeProgressByAdmin.propTypes = {
  classData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
