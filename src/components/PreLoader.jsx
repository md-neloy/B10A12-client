import PropTypes from "prop-types";
import { ScaleLoader } from "react-spinners";

const PreLoader = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ScaleLoader size={100} color="lime" />
    </div>
  );
};

PreLoader.propTypes = {
  smallHeight: PropTypes.bool,
};

export default PreLoader;
