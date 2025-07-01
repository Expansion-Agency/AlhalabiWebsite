import React from "react";
import { useTranslation } from "react-i18next";
import { LuMenu } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

function Header({ toggleMenuVisibility }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundColor: "rgb(237, 234, 222)" }}
      className="flex bg-amber-950/10 p-4 items-center justify-between z-50 relative"
    >
      <h2 className="font-bold text-xl">{t("dashAlhalabi")}</h2>
      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm hover:underline">
          {t("backtowebsite")}
        </Link>
        <button
          onClick={() => navigate("/login")}
          className="bg-amber-950 text-white text-sm px-4 py-2 rounded cursor-pointer hover:bg-amber-950/30 transition-colors duration-200"
        >
          {t("logout")}
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
