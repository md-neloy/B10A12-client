import { MdAssignmentAdd } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { NavLink } from "react-router-dom";

const TeacherMenu = () => {
  return (
    <div>
      <li>
        {" "}
        <NavLink to="/dashboard/addclass">
          {" "}
          <MdAssignmentAdd />
          Add Class
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/dashboard/myclass">
          {" "}
          <SiGoogleclassroom />
          My Class
        </NavLink>
      </li>
    </div>
  );
};

export default TeacherMenu;
