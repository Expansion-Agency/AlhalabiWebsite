import React from "react";
import { useTranslation } from "../context/TranslationProvider";
import { FaSquareFacebook } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { AiFillTikTok } from "react-icons/ai";

function Contact() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col m-8 lg:m-15 h-screen">
      <h2 className="font-bold text-3xl lg:text-4xl">{t("contact")}</h2>
      <div className="flex gap-4 mt-5 lg:mt-8 text-2xl lg:text-3xl items-center">
        <span className="text-blue-800 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
          <FaSquareFacebook />
        </span>
        <span className="text-red-800 hover:text-red-600 transition-colors duration-300 cursor-pointer">
          <GrInstagram />
        </span>
        <span className="text-purple-800 hover:text-purple-600 transition-colors duration-300 cursor-pointer">
          <AiFillTikTok size={32} />
        </span>
      </div>
      <div className="mt-5 lg:mt-10">
        <h2 className="font-bold lg:text-xl mb-3">{t("ourlocation")}</h2>
        <div className="bg-amber-950/5 rounded-md lg:w-1/2 p-8 lg:text-lg">
          Alhalabi Cairo/Egypt Phone: +
        </div>
      </div>
      <div className="mt-5 lg:mt-10">
        <h2 className="font-bold lg:text-xl mb-3">{t("needhelp")}</h2>
        <div className="bg-amber-950/5 rounded-md lg:w-1/2 p-8 lg:text-lg">
          <p>{t("help")}</p>
          <p>+</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
