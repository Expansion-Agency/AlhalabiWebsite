import React, { useState, useRef, useEffect } from "react";
import { IoEarth } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

function Header({
  toggleMenuVisibility,
  selectedLanguage,
  handleLanguageChange,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Call the passed handler with a mock event
  const selectLanguage = (lang) => {
    handleLanguageChange({ target: { value: lang } });
    setShowDropdown(false);
  };

  return (
    <div className="flex justify-between items-center p-4 relative">
      <h1>Alhalabi</h1>
      <div className="flex items-center gap-4 text-2xl">
        <div className="relative" ref={dropdownRef}>
          <IoEarth onClick={toggleDropdown} className="cursor-pointer" />
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md text-sm z-20 min-w-[120px]">
              <div
                onClick={() => selectLanguage("en")}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedLanguage === "en" ? "font-semibold bg-gray-100" : ""
                }`}
              >
                English
              </div>
              <div
                onClick={() => selectLanguage("ar")}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedLanguage === "ar" ? "font-semibold bg-gray-100" : ""
                }`}
              >
                Arabic
              </div>
            </div>
          )}
        </div>
        <LuMenu onClick={toggleMenuVisibility} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default Header;
