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
  const dir = selectedLanguage === "ar" ? "rtl" : "ltr";

  return (
    <>
      {isMenuVisible && (
        <div onClick={toggleMenuVisibility} className="fixed inset-0"></div>
      )}
      <div
        className={`fixed top-0 h-full bg-white shadow-lg flex flex-col z-50 w-3/4 lg:w-1/4 ${
          dir === "ltr"
            ? isMenuVisible
              ? "translate-x-0 right-0 transition-transform duration-300 transform"
              : "translate-x-full right-0"
            : isMenuVisible
            ? "translate-x-0 left-0 transition-transform duration-300 transform"
            : "-translate-x-full left-0"
        }`}
      >
        <IoCloseOutline
          size={40}
          onClick={toggleMenuVisibility}
          className="mt-10 ms-3 stroke-1 cursor-pointer"
        />
        <hr className="border-black/20 mx-5 my-5" />
        <div className="services ms-6 mt-5">
          <Link onClick={toggleMenuVisibility} to={"/products"}>
            {t("allprod")}
          </Link>
        </div>
        <hr className="border-black/20 mx-5 my-5" />

        <div className="account gap-5 flex flex-col items-center justify-center mt-10">
          <Link onClick={toggleMenuVisibility} to={"/contact-us"}>
            {t("contact")}
          </Link>
          <Link onClick={toggleMenuVisibility} to={"/about-us"}>
            {t("about")}
          </Link>
          <Link onClick={toggleMenuVisibility} to={"/login"}>
            {t("account")}
          </Link>
          <div>
            <p className=" text-black/50">{t("chngLang")}:</p>
            <select
              className="mx-auto mt-1 flex cursor-pointer"
              name="language"
              id=""
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">{t("en")}</option>
              <option value="ar">{t("ar")}</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
