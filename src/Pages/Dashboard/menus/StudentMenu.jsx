import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const StudentMenu = () => {
  return (
    <div>
      <li>
        {" "}
        <NavLink to="/dashboard/enrollclass">
          {" "}
          <FaHome />
          My Enroll Classes
        </NavLink>
      </li>
    </div>
  );
};

export default StudentMenu;
