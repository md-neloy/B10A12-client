import { FaCalendar, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const TeacherMenu = () => {
  return (
    <div>
      <li>
        {" "}
        <NavLink to="/dashboard/userHome">
          {" "}
          <FaHome />
          User Home
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/dashboard/reservation">
          {" "}
          <FaCalendar />
          Reservation
        </NavLink>
      </li>
    </div>
  );
};

export default TeacherMenu;
