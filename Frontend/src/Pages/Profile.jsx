import React, { act, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

function Profile({ selectedLanguage }) {
  const { t } = useTranslation();
  const dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="flex flex-col">
      <div className="top p-5">
        <h2 className="text-2xl text-amber-950/70">
          <b className="text-amber-950/90">{t("hello")},</b> Username
        </h2>
      </div>
      <hr className="border border-black/10" />
      <div className="bottom flex flex-col lg:flex-row">
        <div
          className={`menu flex justify-between lg:justify-start lg:flex-col lg:w-1/5 ${
            dir === "ltr" ? "border-r-2" : "border-l-2"
          } border-black/10`}
        >
          <p
            onClick={() => setActiveTab("personal")}
            className={`p-5 hover:bg-amber-950/20 transition ease-in-out cursor-pointer ${
              activeTab === "personal" ? "bg-amber-950/90 text-white" : ""
            }`}
          >
            {t("personalinfo")}
          </p>
          <p
            onClick={() => navigate("/login")}
            className={`flex items-center gap-5 p-5 hover:bg-amber-950/20 transition ease-in-out cursor-pointer 
              active:bg-amber-950/90 hover:text-white
            `}
          >
            {t("logout")} <IoIosLogOut size={20} />
          </p>
        </div>
        {activeTab === "personal" && (
          <div className="personalinfo flex flex-col gap-6 justify-between m-5 py-5 px-10 w-auto bg-amber-950/10 rounded-2xl shadow-md">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-40 justify-center">
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("email")}</p>
                <p className="text-center">username@gmail.com</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("username")}</p>
                <p className="text-center">Alhalabi</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("password")}</p>
                <p className="text-center"> - </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold">{t("number")}</p>
                <p className="text-center">+012345678</p>
              </div>
            </div>
            <div className="flex justify-end">
              <p
                onClick={() => navigate("/forgot-password")}
                className="bg-white p-4 rounded-2xl shadow cursor-pointer text-xs hover:bg-amber-950 transition ease-in-out hover:text-white hover:shadow-lg"
              >
                {t("chngpass")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
