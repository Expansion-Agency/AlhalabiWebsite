import React from "react";
import HomeWidget from "../Components/HomeWidget";
import HomeCategories from "../Components/HomeCategories";
import { useTranslation } from "../context/TranslationProvider";
import ParallaxText from "../Components/ParallaxText";
import Reviews from "../Components/Reviews";

function Home({ category, setCategory, fetchCategories }) {
  const { t, setLang, lang } = useTranslation();
  console.log("HomeIntro:", t("HomeIntro"));
  console.log("IntroCont:", t("IntroCont"));
  return (
    <>
      <HomeWidget />
      <div className="w-screen overflow-hidden my-5">
        <ParallaxText baseVelocity={-5}>{t("HomeTitle")}</ParallaxText>
      </div>
      <div className="text-center bg-amber-950/10 p-15">
        <h2 className="text-xl lg:text-3xl font-bold">{t("HomeIntro")}</h2>
        <p className="max-w-3xl mx-auto text-sm lg:text-lg mt-4">
          {t("IntroCont")}
        </p>
      </div>
      <HomeCategories
        category={category}
        setCategory={setCategory}
        fetchCategories={fetchCategories}
      />
      <Reviews />
    </>
  );
}

export default Home;
