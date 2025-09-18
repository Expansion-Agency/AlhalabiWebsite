import React from "react";
import { useTranslation } from "../context/TranslationProvider";

function About() {
  const { t } = useTranslation();
  return (
    <>
      <img
        className="w-full h-70 lg:h-130"
        src="/assets/industrial.jpg"
        alt=""
      />
      <div className="flex flex-col lg:my-10 mx-5 lg:mx-20 text-amber-950">
        <h2 className="mt-10 font-bold mb-5 text-2xl lg:text-3xl">{t("about")}</h2>
        <div className="flex flex-col mt-10 lg:w-3/4 shadow-md p-5 rounded-md">
          <h2 className="font-bold mb-5 text-2xl lg:text-3xl">{t("whowe")}</h2>
          <p className="text-amber-950/80">{t("whowecont")}</p>
        </div>
        <div className="flex flex-col mt-10 lg:w-3/4 shadow-md p-5 rounded-md">
          <h2 className="font-bold mb-5 text-2xl lg:text-3xl">{t("offer")}</h2>
          <p className="text-amber-950/80">{t("offercont")}</p>
        </div>
        <div className="flex flex-col mt-10 lg:w-3/4 shadow-md p-5 rounded-md">
          <h2 className="font-bold mb-5 text-2xl lg:text-3xl">
            {t("mission")}
          </h2>
          <p className="text-amber-950/80">{t("missioncont")}</p>
        </div>
        <div className="flex flex-col mt-10 lg:w-3/4 shadow-md p-5 rounded-md">
          <h2 className="font-bold mb-5 text-2xl lg:text-3xl">{t("vision")}</h2>
          <p className="text-amber-950/80">{t("visioncont")}</p>
        </div>
        <p className="my-20 lg:mx-50 font-bold text-center text-shadow-md text-shadow-amber-950/5">
          {t("aboutend")}
        </p>
      </div>
    </>
  );
}

export default About;
