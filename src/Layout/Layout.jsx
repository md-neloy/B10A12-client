import { Outlet } from "react-router-dom";
import Navbar from "../Sharecomponent/Navbar";
import Footer from "../Sharecomponent/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import useContexHooks from "../useHooks/useContexHooks";

const Layout = () => {
  AOS.init();
  const { togol } = useContexHooks();
  return (
    <div className={`bg-${togol ? "transparent" : "[#111827]"}`}>
      <Navbar />
      <div className="min-h-[calc(100vh-360px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
