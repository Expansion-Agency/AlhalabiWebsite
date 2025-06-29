import React from "react";
import { Link } from "react-router-dom";

function Menu({
  isMenuVisible,
  toggleMenuVisibility,
  selectedLanguage,
  handleLanguageChange,
}) {
  return (
    <div
      className={`fixed right-0 top-18 h-full bg-amber-950/10 text-amber-950 border-t border-amber-950/10 p-5 w-1/5 z-40 ${
        isMenuVisible ? "block" : "hidden"
      }`}
    >
      <h3 className="font-bold">Dashboard Menu</h3>
      <div className="flex flex-col gap-2 mt-5">
        <Link to="/dashboard" className="block mt-2 hover:bg-white/20 p-4">
          Home
        </Link>
        <Link
          to="/dashboard/admins"
          className="block mt-2 hover:bg-white/20 p-4"
        >
          Admins
        </Link>
        <Link
          to="/dashboard/products"
          className="block mt-2 hover:bg-white/20 p-4"
        >
          Products
        </Link>
        <Link
          to="/dashboard/categories"
          className="block mt-2 hover:bg-white/20 p-4"
        >
          Categories
        </Link>
        <Link to="/login" className="block mt-2 hover:bg-white/20 p-4">
          Log Out
        </Link>
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
