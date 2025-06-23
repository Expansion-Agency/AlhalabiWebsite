import React from "react";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col m-15 h-screen">
      <h1>{t("contact")}</h1>
      <div className="mt-10">
        <h2 className="font-bold text-xl mb-3">{t("ourlocation")}</h2>
        <div className="bg-gray-50 w-1/2 p-8 text-lg">
          Alhalabi Cairo/Egypt Phone: +
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-bold text-xl mb-3">{t("needhelp")}</h2>
        <div className="bg-gray-50 w-1/2 p-8 text-lg">
          <p>{t("help")}</p>
          <p>+</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
