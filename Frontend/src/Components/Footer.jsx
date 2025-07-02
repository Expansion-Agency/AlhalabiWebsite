import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LiaCopyrightSolid } from "react-icons/lia";

function Footer() {
  const { t } = useTranslation();
  return (
    <div className="mt-5 p-5 shadow-md min-h-[17vh] bg-amber-950/5">
      <h1 className="text-black/50 m-5">{t("alhalabi")}</h1>
      <div className="flex lg:flex-row flex-col items-center justify-center gap-5 lg:gap-50 py-2">
        <div className="flex flex-col h-36 gap-3">
          <h2 className="font-bold text-black/80 tracking-wider">
            Quick Links
          </h2>
          <Link to="/about-us" className="text-black/50">
            {t("about")}
          </Link>
          <Link to="/contact-us" className="text-black/50">
            {t("contact")}
          </Link>
          <Link to="/products" className="text-black/50">
            {t("allprod")}
          </Link>
        </div>
        <div className="flex flex-col h-36 gap-3">
          <h2 className="font-bold text-black/80 tracking-wider">
            {t("products")}
          </h2>
          <Link className="text-black/50">{t("machines")}</Link>
          <Link className="text-black/50">{t("spareParts")}</Link>
        </div>
      </div>
      <div className="flex flex-col justify-between p-5">
        <hr className="lg:hidden border-black/30" />
        <div className="flex mx-auto py-7 lg:p-5 gap-3">
          <p className="text-black/50"></p>
          <a href="">Instagram</a>
          <a href="">Facebook</a>
          <p>X</p>
          <a href="">Tiktok</a>
          <a href="">Snapchat</a>
        </div>
        <hr className="mx-4 border-black/30" />
      </div>
      <div className="flex items-center justify-center gap-1 text-black/50">
        <LiaCopyrightSolid />
        <p>2025 ALHALABI</p>
      </div>
    </div>
  );
}

export default Footer;
