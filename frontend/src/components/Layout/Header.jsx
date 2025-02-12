import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();

  // deleting the token and user info
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    return window.alert("Logout Successfull");
  };

  return (
    <header className="w-full py-2 border-b border-gray-200">
      <div className="w-[95%] mx-auto flex items-center justify-between">
        {/* logo  */}
        <Link
          to={"/"}
          className="uppercase font-extrabold tracking-wide text-xl lg:text-2xl"
        >
          Edgistify
        </Link>
        {/* cart & login/signup button  */}
        <div className="flex items-center gap-2">
          {/* cart  */}
          <button
            className="border px-1.5 py-1 rounded-md border-gray-200 hover:cursor-pointer hover:border-gray-400 relative"
            onClick={() => navigate("/cart")}
            title="cart"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 lg:size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="20.5" r="1" />
              <circle cx="18" cy="20.5" r="1" />
              <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
            </svg>
          </button>
          {/* login  */}
          {user?.token ? (
            <button
              className="px-2 py-1 rounded hover:cursor-pointer hover:border-gray-400 relative uppercase bg-indigo-600 text-white hover:bg-indigo-500"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          ) : (
            <button
              className="px-2 py-1 rounded hover:cursor-pointer hover:border-gray-400 relative uppercase bg-indigo-600 text-white hover:bg-indigo-500"
              onClick={() => navigate("/login")}
              title="cart"
              type="button"
            >
              login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
