import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "../context/TranslationProvider";
import LanguageDropdown from "../Components/LanguageDropdown";

function OtpPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("input");
  const from = searchParams.get("from");
  const { t, lang, setLang } = useTranslation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef(new Array(6).fill(null));

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  // sync selected language
  useEffect(() => {
    if (selectedLanguage) setLang(selectedLanguage);
  }, [selectedLanguage, setLang]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleResendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/sendotp`, {
        input: email,
        userType: "USER",
      });
      alert("OTP has been resent!");
    } catch (error) {
      alert("Failed to resend OTP. Please try again.");
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.includes("")) {
      alert("Please enter the complete OTP.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/auth/verifyotp`, {
        input: email,
        otp: otp.join(""),
        userType: "USER",
      });

      sessionStorage.setItem("otp", otp.join(""));

      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      alert("OTP Verified Successfully!");

      const storedData = JSON.parse(localStorage.getItem("signupData"));
      if (storedData && from === "signup") {
        try {
          await axios.post(`${API_URL}/auth/signUp`, storedData, {
            headers: {
              "Content-Type": "application/json",
              accept: "*/*",
              userType: "USER",
            },
          });
          localStorage.removeItem("signupData");
          navigate("/login");
        } catch (signupError) {
          if (
            signupError.response?.data?.message.includes("Email already exists")
          ) {
            localStorage.removeItem("signupData");
            navigate("/login");
          } else {
            alert(
              signupError.response?.data?.message ||
                "Signup failed. Please try again."
            );
          }
        }
      } else if (from === "forgot-password") {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setOtp(new Array(6).fill(""));
      alert(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col h-screen text-amber-950">
      {/* Background for mobile */}
      <div className="absolute top-0 left-0 w-full h-1/2 lg:hidden">
        <img
          className="w-full h-full object-cover"
          src="\assets\industrial.jpg"
          alt=""
        />
      </div>

      {/* Desktop split layout */}
      <div className="hidden lg:flex">
        <div className="w-full relative">
          <img
            className="w-full h-screen"
            src="\assets\industrial.jpg"
            alt=""
          />
        </div>
        <div className="absolute z-10 bg-white flex flex-col items-center justify-center w-2/5 h-screen p-20">
          <h2 className="text-3xl font-bold mb-4">{t("verifyemail")}</h2>
          <p className="mb-6">
            {t("code")} <span className="font-bold">{email}</span>
          </p>
          <div className="flex gap-2 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                inputMode="numeric"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                dir="ltr"
                className="w-12 h-12 border border-black/50 text-center text-lg rounded-md"
              />
            ))}
          </div>
          <button
            onClick={handleVerifyOtp}
            className="bg-red-950 text-white font-bold py-3 rounded-lg w-full mb-3"
          >
            {t("continue")}
          </button>
          <button
            onClick={handleResendOtp}
            className="text-red-700 hover:text-red-600 font-bold"
          >
            {t("resend")}
          </button>
          <div className="mt-10 w-full flex justify-end">
            <LanguageDropdown selectedLanguage={selectedLanguage} />
          </div>
        </div>
      </div>

      {/* Mobile form */}
      <div className="relative mt-auto bg-white rounded-t-4xl shadow-lg p-10 lg:hidden">
        <h2 className="text-center text-2xl font-bold mb-6">
          {t("verifyemail")}
        </h2>
        <p className="text-center mb-4">
          {t("code")} <span className="font-bold">{email}</span>
        </p>
        <div className="flex gap-2 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              inputMode="numeric"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              dir="ltr"
              style={{ textAlign: "center" }}
              className="w-12 h-12 border border-black/50 text-center text-lg rounded-md"
            />
          ))}
        </div>
        <button
          onClick={handleVerifyOtp}
          className="bg-red-950 text-white font-bold py-3 rounded-lg w-full mb-3"
        >
          {t("continue")}
        </button>
        <button
          onClick={handleResendOtp}
          className="text-red-700 hover:text-red-600 font-bold w-full"
        >
          {t("resend")}
        </button>
        <div className="mt-6 w-full flex justify-end">
          <LanguageDropdown selectedLanguage={selectedLanguage} />
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
