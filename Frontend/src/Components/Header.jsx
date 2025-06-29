import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoEarth } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { IoIosContact } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

function Header({
  toggleMenuVisibility,
  selectedLanguage,
  handleLanguageChange,
}) {
  const { t } = useTranslation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showServDropdown, setShowServDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleLangDropdown = () => setShowLangDropdown((prev) => !prev);
  const toggleServDropdown = () => setShowServDropdown((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
        setShowServDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Call the passed handler with a mock event
  const selectLanguage = (lang) => {
    handleLanguageChange({ target: { value: lang } });
    setShowLangDropdown(false);
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 relative bg-amber-950/5">
      <h1
        className="cursor-pointer text-amber-950 ms-5 lg:ms-10"
        onClick={() => navigate("/")}
      >
        Alhalabi
      </h1>
      <div className="hidden lg:flex items-center gap-10 text-amber-950/90 text-lg">
        <Link
          to="/about-us"
          className="hover:text-amber-950/80 transform transition-colors duration-200"
        >
          About Alhalabi
        </Link>

        <div
          onClick={toggleServDropdown}
          className="relative flex items-center gap-1 cursor-pointer hover:text-amber-950/80 transform transition-colors duration-200"
          ref={dropdownRef}
        >
          <p>Services</p>
          {showServDropdown && (
            <div
              className="absolute mt-2 bg-white border border-gray-300 rounded shadow-md text-sm z-20 min-w-[120px]"
              style={{ insetInlineEnd: 0 }}
            >
              <div
                onClick={() => navigate("/Machines")}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 active:font-semibold active:bg-gray-100
                }`}
              >
                Machines
              </div>
              <div
                onClick={() => navigate("/spare-parts")}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 active:font-semibold active:bg-gray-100
                }`}
              >
                Spare Parts
              </div>
            </div>
          )}
        </div>
        <Link
          to="/products"
          className="hover:text-amber-950/80 transform transition-colors duration-200"
        >
          Products
        </Link>
      </div>
      <div className="flex items-center gap-4 text-2xl lg:text-xl text-amber-950/60">
        <div
          onClick={toggleLangDropdown}
          className="relative flex items-center gap-1 cursor-pointer hover:text-amber-950/80 transform transition-colors duration-200"
          ref={dropdownRef}
        >
          <IoEarth className="" />
          {showLangDropdown && (
            <div
              className="absolute mt-2 bg-white border border-gray-300 rounded shadow-md text-sm z-20 min-w-[120px]"
              style={{ insetInlineEnd: 0 }}
            >
              <div
                onClick={() => selectLanguage("en")}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedLanguage === "en" ? "font-semibold bg-gray-100" : ""
                }`}
              >
                {t("en")}
              </div>
              <div
                onClick={() => selectLanguage("ar")}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedLanguage === "ar" ? "font-semibold bg-gray-100" : ""
                }`}
              >
                {t("ar")}
              </div>
            </div>
          )}
          <p className="hidden lg:flex text-sm">Language</p>
        </div>
        <div
          onClick={() => navigate("/contact-us")}
          className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-amber-950/80 transform transition-colors duration-200"
        >
          <IoIosContact size={23} />
          <p className="text-sm">Contact</p>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-amber-950/80 transform transition-colors duration-200"
        >
          <FaUserCircle />
          <p className="text-sm">My Account</p>
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
