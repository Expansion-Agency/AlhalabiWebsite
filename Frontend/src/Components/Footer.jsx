import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();
  return (
    <div className="mt-5 p-5 shadow-md min-h-[17vh] bg-amber-950/5">
      <h1 className="text-black/50 m-5">Alhalabi</h1>
      <div className="flex lg:flex-row flex-col justify-center gap-5 lg:gap-40 py-5">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="font-bold text-black/80">Quick Links</h2>
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
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="font-bold text-black/80">Service</h2>
          <Link to="/machines" className="text-black/50">
            Machines
          </Link>
          <Link to="/spare-parts" className="text-black/50">
            Spare Parts
          </Link>
        </div>
      </div>

      <div className="bottom flex flex-col lg:flex-row-reverse lg:items-center justify-between p-5">
        <hr className="lg:hidden border-black/30" />
        <div className="flex mx-auto py-7 lg:p-5 gap-2 gupter-medium">
          <p className="text-black/50"></p>
          <a href="">Instagram</a>
          <a href="">Facebook</a>
          <p>X</p>
          <a href="">Tiktok</a>
          <a href="">Snapchat</a>
        </div>
        <hr className="lg:hidden mx-4 border-black/30" />
      </div>
    </div>
  );
}

export default Footer;
