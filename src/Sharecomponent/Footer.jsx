import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
// import logo from "../assets/logo3.png";
import { NavLink } from "react-router-dom";
import Container from "./Container";
const Footer = () => {
  return (
    <div>
      <div className="bg-[#212529] opacity-90 text-white py-4">
        <Container>
          <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and About Section */}
            <div>
              <h2 className="text-3xl font-bold text-yellow-400">
                <span className="text-[#4CAF50]">Smart</span>Learning
              </h2>
              <p className="mt-4 text-gray-300">
                Empowering learners with knowledge and skills through a modern,
                intuitive platform for smart education.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col justify-center items-center">
              <ul className="flex flex-col gap-2">
                <li className="text-lg font-semibold mb-4">Quick Links</li>
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "hover:!text-yellow-400 font-bold !text-[#4CAF50]"
                        : "text-gray-300 hover:text-yellow-400"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allclasses"
                    className={({ isActive }) =>
                      isActive
                        ? "hover:!text-yellow-400 font-bold !text-[#4CAF50] "
                        : "text-gray-300 hover:text-yellow-400"
                    }
                  >
                    All Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/techon"
                    className={({ isActive }) =>
                      isActive
                        ? " hover:!text-yellow-400 font-bold !text-[#4CAF50] "
                        : "text-gray-300 hover:text-yellow-400"
                    }
                  >
                    Teach on SmartLearning
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "!text-white hover:!text-yellow-400 font-bold !bg-[#4CAF50] p-2 rounded"
                        : "text-gray-300 hover:text-yellow-400"
                    }
                  >
                    <FaEnvelope className="inline mr-2" /> Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center items-center">
              <ul className="flex flex-col gap-3 justify-center w-full">
                <li className="text-lg font-semibold mb-4">Contact Us</li>
                <li className="flex items-center gap-2 w-fit">
                  <FaPhone className="text-yellow-400" /> +123 456 789
                </li>
                <li className="flex items-center gap-2 w-fit">
                  <FaEnvelope className="text-yellow-400" />{" "}
                  <a href="https://mail.google.com" target="_blank">
                    mhneloy708@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            {/* social */}
            <div>
              <div className="flex flex-col gap-3 justify-center w-full">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-white"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-white"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-white"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-white"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </Container>
      </div>
      <div className="bg-[#212529]">
        <Container>
          <footer className="footer footer-center text-white  p-4">
            <aside>
              <p>
                Copyright © {new Date().getFullYear()} - All right reserved by
                SmartLearning
              </p>
            </aside>
          </footer>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
