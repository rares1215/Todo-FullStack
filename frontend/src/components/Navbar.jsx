import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../constans";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() =>{
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsAuth(!token);
  },[location]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks-page/" },
    { name: "Completed Tasks", path: "/completed-tasks/" },
    ...(isAuth? [{name: "Login", path: "/login/"}]: []),
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Stânga -> Get Started */}
        <div className="flex items-center">
          {isAuth?<Link
            to="/register/"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-4 py-2 text-center dark:bg-blue-600 
                       dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get Started
          </Link>: ""}
        </div>

        {/* Centru -> Links */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-3 rounded-sm ${
                  isActive
                    ? "text-blue-700 md:text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Dreapta -> Logout */}
        <div className="flex items-center space-x-3">
          {!isAuth?<Link
            to="/logout/"
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 
                       focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                       text-sm px-4 py-2 text-center dark:bg-red-500 
                       dark:hover:bg-red-600 dark:focus:ring-red-700"
          >
            Logout
          </Link>: "" }

          {/* Buton mobil (hamburger) */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm 
                       text-gray-500 rounded-lg hover:bg-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-gray-200 
                       dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Meniu mobil */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-3 rounded ${
                      isActive
                        ? "text-blue-700 dark:text-blue-500"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

