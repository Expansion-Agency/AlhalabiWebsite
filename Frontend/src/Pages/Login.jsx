import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

function Login({ userType }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-col h-screen">
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
          <h2 className="text-3xl font-bold mb-10">{t("login")}</h2>
          <form className="w-full">
            <label className="block font-bold !mb-2" htmlFor="email">
              {t("email")}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block font-bold !mb-2" htmlFor="password">
              {t("password")}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-1 !p-3 w-full"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to={"/forgot-password"}
              className="block text-xs !mb-5 text-right hover:text-red-500"
            >
              {t("forgotpass")}
            </Link>
            <button
              type="submit"
              className="!bg-red-700 text-white font-bold !py-3 rounded-lg w-full cursor-pointer"
            >
              {t("login")}
            </button>
          </form>
          <div className="navto w-full flex gap-4 !mt-1">
            <h5>{t("noacc")}</h5>
            <p
              className="!text-red-500 cursor-pointer font-bold"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              {t("register")}
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Design: Sign-in Form */}
      <div className="relative mt-auto bg-white rounded-t-4xl shadow-lg p-10 sm:p-10 w-full mx-auto lg:hidden">
        <h2 className="text-center text-2xl lg:text-3xl font-bold mb-8 mt-2">
          {t("login")}
        </h2>
        <form>
          <label className="block font-bold !mb-2" htmlFor="email">
            {t("email")}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block font-bold !mb-2" htmlFor="password">
            {t("password")}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-1 !p-3 w-full"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            to={"/forgot-password"}
            className="block text-xs !mb-5 text-right hover:text-red-500"
          >
            {t("forgotpass")}
          </Link>
          <button
            type="submit"
            className="bg-red-700! text-white font-bold !py-3 rounded-lg w-full"
          >
            {t("login")}
          </button>
        </form>
        <div className="forgotpass w-full !mt-4"></div>
        <div className="navto w-full flex gap-4 !mt-1">
          <h5>{t("noacc")}</h5>
          <p
            className="!text-red-500 cursor-pointer font-bold"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            {t("register")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
