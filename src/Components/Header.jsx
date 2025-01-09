import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-center items-center p-6">
      <div className="absolute m-auto w-[800px] h-[150px] blur-[120px] bg-[--blue] font-medium"></div>
      <nav className="z-10 flex justify-center items-center gap-7 text-[#8ea6bb]">
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-[--white]" : "text-[#8ea6bb] duration-300 transition-all")}>
          Signup
        </NavLink>
        <NavLink to="/podcasts" className={({ isActive }) => (isActive ? "text-[--white]" : "text-[#8ea6bb] duration-300 transition-all")}>
          Podcasts
        </NavLink>
        <NavLink to="/create-podcast" className={({ isActive }) => (isActive ? "text-[--white]" : "text-[#8ea6bb] duration-300 transition-all")}>
          Start A Podcast
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "text-[--white]" : "text-[#8ea6bb] duration-300 transition-all")}>
          Profile
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
