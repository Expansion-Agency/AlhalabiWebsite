import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoEarth } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { IoIosContact } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import LanguageDropdown from "./LanguageDropdown";

function Header({
  toggleMenuVisibility,
  selectedLanguage,
  handleLanguageChange,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 relative bg-amber-950/5">
      <h1
        className="cursor-pointer text-amber-950 ms-5 lg:ms-10"
        onClick={() => navigate("/")}
      >
        {t("alhalabi")}
      </h1>
      <div className="hidden lg:flex items-center gap-10 text-amber-950/90 text-lg">
        <Link
          to="/about-us"
          className="hover:text-amber-950/80 transform transition-colors duration-200"
        >
          {t("aboutalhalabi")}
        </Link>

        {/*  <div
          onClick={toggleServDropdown}
          className="relative flex items-center gap-1 cursor-pointer hover:text-amber-950/80 transform transition-colors duration-200"
          ref={servDropdownRef}
        >
          <p>Services</p>
          {showServDropdown && (
            <div
              className="absolute mt-2 bg-white border border-gray-300 rounded shadow-md text-sm z-20 min-w-[120px]"
              style={{ insetInlineEnd: 0 }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/Machines");
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 active:font-semibold active:bg-gray-100
                }`}
              >
                Machines
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/spare-parts");
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 active:font-semibold active:bg-gray-100
                }`}
              >
                Spare Parts
              </div>
            </div>
          )}
        </div> */}
        <Link
          to="/products"
          className="hover:text-amber-950/80 transform transition-colors duration-200"
        >
          {t("products")}
        </Link>
      </div>
      <div className="flex items-center gap-4 text-sm text-amber-950/60">
        <button onClick={() => navigate("/dashboard")}>لوحة التحكم</button>
        <LanguageDropdown
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
        />
        <div
          onClick={() => navigate("/contact-us")}
          className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-amber-950/80 transform transition-colors duration-200"
        >
          <IoIosContact size={23} />
          <p className="text-sm">{t("contact")}</p>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-amber-950/80 transform transition-colors duration-200"
        >
          <FaUserCircle size={18} />
          <p className="text-sm">{t("account")}</p>
        </div>
        <LuMenu
          onClick={toggleMenuVisibility}
          className="lg:hidden cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Header;
