import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Footer from "../../Sharecomponent/Footer";

const Dashboard = () => {
  return (
    <div>
      <div className="relative min-h-[calc(100vh-292px)] md:flex bg-white">
        {/* Left Side: Sidebar Component */}
        <Sidebar />
        {/* Right Side: Dashboard Dynamic Content */}
        <div className="flex-1  md:ml-64">
          <div className="p-5">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
