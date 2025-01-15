import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  link = "",
  text = "Button",
  width = "fit-content",
  logo,
}) => {
  return (
    <Link
      to={link}
      href="#"
      style={{
        width: width,
      }}
      className={`bg-[#4CAF50] hover:bg-[#388E3C]  text-white px-6 py-3 rounded-lg text-lg font-medium transition-all text-center`}
    >
      <div className="flex justify-center items-center gap-3">
        {logo} {text}
      </div>
    </Link>
  );
};

export default Button;
Button.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  width: PropTypes.string,
  logo: PropTypes.any,
};
