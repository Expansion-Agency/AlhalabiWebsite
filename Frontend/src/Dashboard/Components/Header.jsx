import React from "react";
import { LuMenu } from "react-icons/lu";

function Header({ toggleMenuVisibility }) {
  return (
    <div className="flex bg-amber-950/10 p-4 items-center justify-between z-50 relative">
      <h2 className="font-bold">Dashboard Header</h2>
      <div className="flex items-center gap-4 ml-auto">
        <button className="bg-amber-950 text-white px-4 py-2 rounded cursor-pointer">
          Logout
        </button>
        <LuMenu
          size={25}
          onClick={toggleMenuVisibility}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Header;
