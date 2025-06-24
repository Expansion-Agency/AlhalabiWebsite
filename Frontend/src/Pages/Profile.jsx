import React, { act, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Profile({ selectedLanguage }) {
  const { t } = useTranslation();
  const dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  return (
    <div className="flex flex-col">
      <div className="top p-5">
        <h2>username</h2>
      </div>
      <hr className="border border-black/50" />
      <div className="bottom flex flex-col lg:flex-row">
        <div
          className={`menu flex lg:flex-col lg:w-1/5 ${
            dir === "ltr" ? "border-r-2" : "border-l-2"
          } border-black/50`}
        >
          <p
            onClick={() => setActiveTab("personal")}
            className={`rounded-b-md border-b-1 border-black/50 p-5 hover:bg-amber-950/20 transition ease-in-out cursor-pointer ${
              activeTab === "personal" ? "bg-amber-950/90 text-white" : ""
            }`}
          >
            {t("personalinfo")}
          </p>
          <p
            onClick={() => setActiveTab("address")}
            className={`rounded-b-md border-b-1 border-black/50 p-5 hover:bg-amber-950/20 transition ease-in-out cursor-pointer ${
              activeTab === "address" ? "bg-amber-950/90 text-white" : ""
            }`}
          >
            {t("address")}
          </p>
          <p
            onClick={() => setActiveTab("orders")}
            className={`rounded-b-md border-b-1 border-black/50 p-5 hover:bg-amber-950/20 transition ease-in-out cursor-pointer ${
              activeTab === "orders" ? "bg-amber-950/90 text-white" : ""
            }`}
          >
            {t("orders")}
          </p>
        </div>
        {activeTab === "personal" && (
          <div className="personalinfo flex flex-col gap-6 justify-between m-5 py-5 px-10 w-auto bg-amber-950/10 rounded-2xl shadow-md">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-40 justify-center">
              <div className="flex flex-col">
                <p className="font-bold">{t("email")}</p>
                <p className="text-center">username@gmail.com</p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{t("username")}</p>
                <p className="text-center">jkghkjrg</p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{t("password")}</p>
                <p className="text-center"> - </p>
              </div>
              <div className="flex flex-col">
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
        {activeTab === "address" && (
          <div className="address flex flex-col gap-6 justify-between m-5 py-5 px-10 w-auto bg-amber-950/10 rounded-2xl shadow-md">
            <h2 className="text-2xl text-center font-bold">{t("address")}</h2>

            <div className="flex flex-col lg:flex-row gap-5 lg:gap-40 justify-center">
              <div className="flex flex-col">
                <p className="font-bold">{t("email")}</p>
                <p className="text-center">username@gmail.com</p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{t("username")}</p>
                <p className="text-center">jkghkjrg</p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{t("password")}</p>
                <p className="text-center"> - </p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">{t("number")}</p>
                <p className="text-center">+012345678</p>
              </div>
            </div>
            <div className="flex justify-end">
              <p
                onClick={() => navigate("/forgot-password")}
                className="bg-white p-4 rounded-2xl shadow cursor-pointer text-xs hover:bg-amber-950 transition ease-in-out hover:text-white hover:shadow-lg"
              >
                Change Password
              </p>
            </div>
          </div>
        )}
        {activeTab === "orders" && (
          <div className="address flex flex-col gap-6 justify-between m-5 py-5 px-10 w-auto bg-amber-950/10 rounded-2xl shadow-md">
            <h2 className="text-2xl text-center font-bold">{t("orders")}</h2>
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-40 justify-center">
              <div className="flex flex-col">
                <p className="font-bold">Email</p>
                <p className="text-center">username@gmail.com</p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">Username</p>
                <p className="text-center">jkghkjrg</p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">Password</p>
                <p className="text-center"> - </p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">Phone number</p>
                <p className="text-center">+012345678</p>
              </div>
            </div>
            <div className="flex justify-end">
              <p
                onClick={() => navigate("/forgot-password")}
                className="bg-white p-4 rounded-2xl shadow cursor-pointer text-xs hover:bg-amber-950 transition ease-in-out hover:text-white hover:shadow-lg"
              >
                Change Password
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
