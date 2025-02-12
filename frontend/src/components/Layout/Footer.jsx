import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-2 border-t border-gray-200">
      <div className="w-[95%] mx-auto">
        {/* logo  */}
        <p className="flex items-center">
          &copy;
          <Link to={"/"} className="font-semibold tracking-wide">
            Edgistify.
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
