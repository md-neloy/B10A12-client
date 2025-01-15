import { Outlet } from "react-router-dom";
import Navbar from "../Sharecomponent/Navbar";
import Footer from "../Sharecomponent/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const Layout = () => {
  AOS.init();
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
