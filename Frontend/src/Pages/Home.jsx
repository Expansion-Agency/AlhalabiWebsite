import React from "react";
import HomeWidget from "../Components/HomeWidget";
import HomeCategories from "../Components/HomeCategories";
import { useTranslation } from "react-i18next";

function Home() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <HomeWidget />
      <div className="text-center bg-amber-950/10 p-15">
        <h2 className="text-xl lg:text-3xl font-bold">{t("HomeIntro")}</h2>
        <p className="max-w-3xl mx-auto text-sm lg:text-lg mt-4">{t("Introcont")}</p>
      </div>
      <HomeCategories />
    </>
  );
}

export default Home;
