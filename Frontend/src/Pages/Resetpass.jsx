import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

function Resetpass() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col h-screen text-amber-950">
      {/* Mobile Design: Background Image */}
      <div className="absolute !top-0 left-0 w-full !h-1/2 sm:h-1/2 lg:hidden">
        <img
          className="w-full h-full object-cover"
          src="\assets\industrial.jpg"
          alt=""
        />
      </div>
      <div className="hidden lg:flex">
        <div className="w-full relative z-5">
          <img
            className="w-full h-screen"
            src="\assets\industrial.jpg"
            alt=""
          />
        </div>
        <div className="absolute z-10 bg-white flex flex-col items-center justify-center w-2/5 h-screen p-20">
          <h2 className="text-2xl font-bold mb-4">{t("resetpass")}</h2>
          <h2>{t("resetcont")}</h2>
          <form className="w-full mt-10">
            <label className="block font-bold mb-2" htmlFor="password">
              {t("newpass")}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md mb-3 p-3 w-full"
              type="password"
              name="password"
              placeholder={t("newpass")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="block font-bold mb-2" htmlFor="password">
              {t("newpass")}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md mb-5 p-3 w-full"
              type="password"
              name="password"
              placeholder={t("confirmpass")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-950 text-white font-bold py-3 rounded-lg w-full cursor-pointer"
            >
              {t("submit")}
            </button>
          </form>
        </div>
      </div>
      {/* Mobile Design: Sign-in Form */}
      <div className="text-sm relative !mt-auto bg-white rounded-t-4xl shadow-lg !p-10 sm:p-10! !w-full !mx-auto lg:hidden">
        <h2 className="text-center text-2xl lg:text-3xl font-bold mb-4">
          {t("resetpass")}
        </h2>
        <h2 className="text-center mb-8">{t("resetcont")}</h2>
        <form>
          <label className="block font-bold mb-2" htmlFor="email">
            {t("newpass")}
          </label>
          <input
            className="input bg-transparent border border-black/50 rounded-md mb-3 p-3 w-full"
            type="password"
            name="password"
            value={password}
            placeholder={t("newpass")}
          />
          <label className="block font-bold mb-2" htmlFor="password">
            {t("newpass")}
          </label>
          <input
            className="input bg-transparent border border-black/50 rounded-md mb-5 p-3 w-full"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("confirmpass")}
          />

          <button
            type="submit"
            className="bg-red-950 text-white font-bold py-3 rounded-lg w-full"
          >
            {t("submit")}
          </button>
        </form>
        <div className="forgotpass w-full !mt-4"></div>
      </div>
    </div>
  );
}

export default Resetpass;
