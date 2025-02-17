import React from "react";
import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between bg-white shadow-lg py-3 px-4">
      <img src={navlogo} alt="Logo" className="w-32 md:w-48" />
      <img src={navProfile} alt="Profile" className="w-10 md:w-16" />
    </div>
  );
};

export default Navbar;
