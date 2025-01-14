import { Outlet } from "react-router-dom";
import Navbar from "../Sharecomponent/Navbar";
import Footer from "../Sharecomponent/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
