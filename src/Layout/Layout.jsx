import { Outlet } from "react-router-dom";
import Navbar from "../Sharecomponent/Navbar";
import Footer from "../Sharecomponent/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-360px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
