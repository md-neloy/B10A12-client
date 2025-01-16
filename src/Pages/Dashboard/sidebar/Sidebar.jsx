import { FaEnvelope, FaHome, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAdmin from "../../../privateRouts/useAdmin";
import AdminMenu from "../menus/AdminMenu";
import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";
import useTeacher from "../../../privateRouts/useTeacher";

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  return (
    <div>
      <div className="w-full md:w-64 h-full bg-[#4CAF50]">
        <ul className="menu">
          {isAdmin ? (
            <AdminMenu />
          ) : isTeacher ? (
            <TeacherMenu />
          ) : (
            <StudentMenu />
          )}
        </ul>
        {/* share common NavLink */}
        <div className="divider"></div>
        <ul className="menu">
          <li>
            <NavLink to={"/"}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/profile"}>
              <FaUser /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to={"/order/email"}>
              <FaEnvelope /> Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
