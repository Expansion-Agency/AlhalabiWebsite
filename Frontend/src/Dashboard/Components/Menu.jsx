import React from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import LanguageDropdown from "@/components/LanguageDropdown";

function Menu({
  isMenuVisible,
  toggleMenuVisibility,
  selectedLanguage,
  handleLanguageChange,
}) {
  const { t } = useTranslation();
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      toggleMenuVisibility();
    }
  };
  return (
    <div
      className={`fixed bg-amber-950/10 text-amber-950 p-5 w-full h-full lg:w-1/5 z-40 overflow-y-auto lg:border-2 border-amber-950/10 ${
        isMenuVisible ? "block top-0" : "hidden"
      } ${selectedLanguage === "ar" ? "left-0" : "right-0"}`}
      style={{ backgroundColor: "rgb(237, 234, 222)" }}
    >
      <hr className="lg:hidden mt-20 mb-5 border-1 border-amber-950/10" />
      <h3 className="font-bold lg:mt-20">{t("dashboardMenu")}</h3>
      <div className="flex flex-col gap-2 mt-5">
        <NavLink
          onClick={handleLinkClick}
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          {t("home")}
        </NavLink>
        <NavLink
          onClick={handleLinkClick}
          to="/dashboard/admins"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          {t("admins")}
        </NavLink>
        <NavLink
          onClick={handleLinkClick}
          to="/dashboard/users"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          {t("users")}
        </NavLink>
        <NavLink
          onClick={handleLinkClick}
          to="/dashboard/products"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          {t("products")}
        </NavLink>
        <NavLink
          onClick={handleLinkClick}
          to="/dashboard/categories"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          {t("categories")}
        </NavLink>
        <NavLink
          onClick={handleLinkClick}
          to="/dashboard/reviews"
          className={({ isActive }) =>
            `block mt-2 hover:bg-white/20 p-4 ${isActive ? "bg-white/40" : ""}`
          }
        >
          {t("reviews")}
        </NavLink>
        <hr className="my-6 opacity-30" />
      </div>
      <div className="flex flex-col items-end">
        <LanguageDropdown
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  );
}

export default Menu;
