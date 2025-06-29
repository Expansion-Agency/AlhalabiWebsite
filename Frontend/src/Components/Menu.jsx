import React from "react";
import { useTranslation } from "react-i18next";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Menu({
  isMenuVisible,
  toggleMenuVisibility,
  selectedLanguage,
  handleLanguageChange,
}) {
  const { t } = useTranslation();

  return (
    <>
      {isMenuVisible && (
        <div
          onClick={toggleMenuVisibility}
          className="fixed inset-0 bg-black/20 z-40"
        ></div>
      )}
      <div
        className={`fixed top-0 w-full bg-white shadow-lg flex flex-col z-50 text-amber-950 py-5 ${
          isMenuVisible
            ? "translate-y-0 transition-transform duration-300 transform ease-in-out"
            : "-translate-y-full"
        }`}
      >
        <div className="flex items-center text-2xl gap-5 mt-5 mx-3">
          <IoCloseOutline
            size={40}
            onClick={toggleMenuVisibility}
            className="stroke-1 cursor-pointer"
          />
          <h2>ALHALABI</h2>
        </div>

        <hr className="border-black/20 mx-5 my-5" />
        <div className="services ms-6">
          <Link onClick={toggleMenuVisibility} to={"/products"}>
            {t("allprod")}
          </Link>
        </div>
        <hr className="border-black/20 mx-5 my-5" />

        <div className="account gap-5 flex flex-col items-center justify-center my-5">
          <Link onClick={toggleMenuVisibility} to={"/contact-us"}>
            {t("contact")}
          </Link>
          <Link onClick={toggleMenuVisibility} to={"/about-us"}>
            {t("about")}
          </Link>
          <Link onClick={toggleMenuVisibility} to={"/login"}>
            {t("account")}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Menu;
