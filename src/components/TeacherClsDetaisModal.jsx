import PropTypes from "prop-types";

const TeacherClsDetaisModal = ({ classData, onClose }) => {
  return (
    <div>
      <dialog id="my_modal_4" className="modal" open>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">{classData._id}</h3>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button onClick={onClose} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TeacherClsDetaisModal;
TeacherClsDetaisModal.propTypes = {
  classData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
