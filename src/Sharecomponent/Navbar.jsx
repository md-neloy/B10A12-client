import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import logo3 from "../assets/3.png";
import useContexHooks from "../useHooks/useContexHooks";
import { FaBars, FaEnvelope, FaTimes, FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
const Navbar = () => {
  // const [scrollPosition, setScrollPosition] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu state
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollPosition(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  // }, [scrollPosition]);
  const list = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "!text-white hover:!text-yellow-400 font-bold !bg-[#4CAF50]"
              : "text-black md:text-white hover:text-yellow-400 font-bold"
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
              ? "!text-white hover:!text-yellow-400 font-bold !bg-[#4CAF50]"
              : "text-black md:text-white hover:text-yellow-400 font-bold"
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
              ? "!text-white hover:!text-yellow-400 font-bold !bg-[#4CAF50]"
              : "text-black md:text-white hover:text-yellow-400 font-bold"
          }
        >
          Teach on SmartLearning
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive
              ? "!text-white hover:!text-yellow-400 font-bold !bg-[#4CAF50]"
              : "text-black md:text-white hover:text-yellow-400 font-bold"
          }
        >
          About SmartLearning
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive
              ? "!text-white hover:!text-yellow-400 font-bold !bg-[#4CAF50]"
              : "text-black md:text-white hover:text-yellow-400 font-bold"
          }
        >
          <FaEnvelope /> Contact
        </NavLink>
      </li>
    </>
  );
  const { user, logOut, togol, setTogol } = useContexHooks();
  const handleChange = () => {
    setTogol(!togol);
    // localStorage.setItem("darkMode", !togol);
  };
  console.log(togol);
  return (
    <div
      className={`sticky top-0 left-0 w-full z-10 transition-all duration-300${
        isSticky ? "opacity-90 " : "static opacity-100"
      } bg-[#212529] h-fit transition-all duration-300`}
      // className={`sticky top-0 left-0 w-full z-50 opacity-90 transition-all duration-300 ${
      //   isSticky ? "bg-[#212529] shadow-lg py-2" : "bg-[#212529] py-4"
      // }`}
    >
      <Container>
        <div className="navbar  text-white justify-between ">
          <div className="navbar-start w-fit  md:w-1/2">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <FaTimes className="h-5 w-5" />
                ) : (
                  <FaBars className="h-5 w-5" />
                )}
              </label>
              {isMenuOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 gap-3 shadow text-black z-10"
                >
                  {list} {/* Your menu items */}
                </ul>
              )}
            </div>
            <Link to="/" className="btn btn-ghost text-xl p-0">
              <div className="md:w-10 hidden md:block">
                <img src={logo3} alt="logo" />
              </div>
              SmartLearning
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3">{list}</ul>
          </div>
          <div className="navbar-end w-fit md:w-1/2  gap-3 md:gap-4">
            {user ? (
              <div className="relative group">
                {/* User Profile Photo */}
                <div
                  className="w-7 h-7 md:w-10 md:h-10 bg-gray-300 rounded-full overflow-hidden cursor-pointer "
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName || "User"}
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" />
                  ) : (
                    <FaUserAlt className="text-black w-full h-full" />
                  )}
                </div>

                {/* Tooltip */}
                <div className="z-50 bg-blue-400 absolute top-[123%] -right-6  w-max rounded-md hidden group-hover:block">
                  <div className="absolute w-4 h-4 rotate-45 bg-blue-400 -top-2 right-8 "></div>
                  <div className="text-sm p-2 text-center">
                    <p className="text-xl font-bold my-2">
                      {user.displayName.split(" ").slice(0, 3).join(" ") ||
                        "Anonymous User"}
                    </p>
                    <ul className="menu menu-vertical p-0">
                      <li className="!bg-[#4CAF50] border-[1px] border-solid border-white rounded-lg">
                        <NavLink to={"/dashboard/profile"} className={"w-full"}>
                          Dashboard
                        </NavLink>
                      </li>
                    </ul>
                    <button
                      onClick={logOut}
                      className="btn btn-sm mt-2 bg-red-500 text-white w-full"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Conditional Links for Non-Logged-In Users
              <>
                <div className="flex gap-3">
                  <Link
                    to="/signIn"
                    className="btn btn-sm bg-blue-500 text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-sm bg-green-500 hidden md:flex text-white"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
            <div>
              <label className="swap swap-rotate w-7 md:w-fit">
                <input type="checkbox" onChange={handleChange} />

                <svg
                  className="swap-off h-10 w-10 fill-current"
                  style={{ color: togol ? "white" : "yellow" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                <svg
                  className="swap-on h-10 w-10 fill-current"
                  style={{ color: togol ? "white" : "yellow" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
