import { FaHome, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useAdmin from "../../../privateRouts/useAdmin";
import AdminMenu from "../menus/AdminMenu";
import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";
import useTeacher from "../../../privateRouts/useTeacher";
import { LuChartNoAxesCombined } from "react-icons/lu";

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  return (
    <div>
      <div className="w-full md:w-64 h-full bg-[#F66B1D]">
        <ul className="menu text-[#000000]">
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
        <ul className="menu text-[#000000]">
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
          {isAdmin && (
            <li>
              <NavLink to="/dashboard/graphchart">
                <LuChartNoAxesCombined />
                Progress Chart
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
