import React from "react";
import { Link, NavLink } from "react-router-dom";

function Menu({
  isMenuVisible,
  toggleMenuVisibility,
  selectedLanguage,
  handleLanguageChange,
}) {
  return (
    <div
      className={`fixed right-0 bg-amber-950/10 text-amber-950 p-5 w-full h-full lg:w-1/5 z-40 overflow-y-auto lg:border-2 border-amber-950/10 ${
        isMenuVisible ? "block top-0" : "hidden"
      }`}
      style={{ backgroundColor: "rgb(237, 234, 222)" }}
    >
      <hr className="lg:hidden mt-20 mb-5 border-1 border-amber-950/10" />
      <h3 className="font-bold lg:mt-20">Dashboard Menu</h3>
      <div className="flex flex-col gap-2 mt-5">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard/admins"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          Admins
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/categories"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/dashboard/reviews"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          Reviews
        </NavLink>
        <hr className="my-6 opacity-30" />
      </div>
      <div className="flex flex-col items-end">
        <button onClick={toggleMenuVisibility} className="mt-2">
          Language
        </button>
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="mt-2"
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      </div>
    </div>
  );
}

export default Menu;
