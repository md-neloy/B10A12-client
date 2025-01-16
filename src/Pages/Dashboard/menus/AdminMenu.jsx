import { FaUsers } from "react-icons/fa";
import { MdClass, MdPendingActions } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <li>
        {" "}
        <NavLink to="/dashboard/teacherRq">
          {" "}
          <MdPendingActions />
          Teacher Request
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/dashboard/allusers">
          {" "}
          <FaUsers />
          Users
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/dashboard/allclasses">
          {" "}
          <MdClass />
          All Classes
        </NavLink>
      </li>
    </div>
  );
};

export default AdminMenu;
