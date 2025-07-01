// src/components/LanguageDropdown.jsx

import React, { useState, useRef, useEffect } from "react";
import { IoEarth } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const LanguageDropdown = ({ selectedLanguage, handleLanguageChange }) => {
  const { t } = useTranslation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langDropdownRef = useRef(null);

  const toggleLangDropdown = () => setShowLangDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLanguage = (lang) => {
    handleLanguageChange({ target: { value: lang } });
    setShowLangDropdown(false);
  };

  return (
    <div
      onClick={toggleLangDropdown}
      className="relative flex items-center gap-1 cursor-pointer hover:text-amber-950/80 transform transition-colors duration-200"
      ref={langDropdownRef}
    >
      <IoEarth className="text-lg" />
      {showLangDropdown && (
        <div
          className="absolute mt-2 bg-white border border-gray-300 rounded shadow-md z-20 min-w-[120px]"
          style={{ insetInlineEnd: 0 }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              selectLanguage("en");
            }}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
              selectedLanguage === "en" ? "font-semibold bg-gray-100" : ""
            }`}
          >
            {t("en")}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              selectLanguage("ar");
            }}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
              selectedLanguage === "ar" ? "font-semibold bg-gray-100" : ""
            }`}
          >
            {t("ar")}
          </div>
        </div>
      )}
      <p className="hidden lg:flex">{t("language")}</p>
    </div>
  );
};

export default LanguageDropdown;
