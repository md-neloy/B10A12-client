import { FaBook, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <li>
        {" "}
        <NavLink to="/dashboard/adminHome">
          {" "}
          <FaHome />
          Admin Home
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/dashboard/addItems">
          {" "}
          <FaUtensils />
          Add Items
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/dashboard/manageItems">
          {" "}
          <FaList />
          Manage Items
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/dashboard/bookings">
          {" "}
          <FaBook />
          Manage Bookings
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/dashboard/allUsers">
          {" "}
          <FaUsers />
          All Users
        </NavLink>
      </li>
    </div>
  );
};

export default AdminMenu;
