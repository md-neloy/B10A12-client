import PropTypes from "prop-types";

const SectionHeader = ({ title }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
    </div>
  );
};

export default SectionHeader;
SectionHeader.propTypes = {
  title: PropTypes.string,
};
