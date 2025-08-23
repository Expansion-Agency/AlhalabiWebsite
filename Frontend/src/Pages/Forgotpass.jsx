import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

function Forgotpass() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleInput = async () => {
    setError(""); // Reset errors

    if (!email.trim()) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const requestBody = { input: email };

      const response = await axios.post(`${API_URL}/auth/forget`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          userType: "USER", // must match backend exactly
        },
      });
      console.log("response", response);
      console.log("email", email);
      localStorage.setItem("email", email);
      navigate(`/otp?input=${encodeURIComponent(email)}&from=forgot-password`);
    } catch (err) {
      let errorMessage = err.response?.data?.message || "Failed to send OTP";
      if (Array.isArray(errorMessage)) {
        errorMessage = errorMessage[0];
      }
      setError(errorMessage);
    }
  };

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
          <h2 className="text-2xl font-bold mb-4">{t("forgotpass")}</h2>
          <h2 className="text-md text-center mb-6">{t("forgotcont")}</h2>
          <form className="w-full mt-5">
            <label className="block font-bold mb-2" htmlFor="password">
              {t("email")}
            </label>
            <input
              className="bg-transparent border border-black/50 rounded-md mb-5 p-3 w-full"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleInput();
              }}
              type="submit"
              className="bg-red-950 text-white font-bold py-3 rounded-lg w-full cursor-pointer"
            >
              {t("submit")}
            </button>
          </form>
          <div className="navto w-full flex gap-4 mt-1">
            <h5>{t("haveacc")}</h5>
            <p
              className="text-red-700 hover:text-red-600 cursor-pointer font-bold"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              {t("login")}
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Design: Sign-in Form */}
      <div className="text-sm relative !mt-auto bg-white rounded-t-4xl shadow-lg !p-10 sm:p-10! !w-full !mx-auto lg:hidden">
        <h1 className="text-center text-2xl! lg:text-3xl! font-bold !mb-4">
          {t("forgotpass")}
        </h1>

        <h2 className="text-center mb-8">{t("forgotcont")}</h2>
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
          <button
            onClick={(e) => {
              e.preventDefault();
              handleInput();
            }}
            type="submit"
            className="bg-red-950 text-white font-bold py-3 rounded-lg w-full"
          >
            {t("submit")}
          </button>
        </form>
        <div className="forgotpass w-full !mt-4"></div>
        <div className="navto w-full flex gap-4 !mt-1">
          <h5>{t("haveacc")}</h5>
          <p
            className="text-red-700 hover:text-red-600 cursor-pointer font-bold"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            {t("login")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Forgotpass;
