import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import LanguageDropdown from "../Components/LanguageDropdown";
import axios from "axios";

function Login({ userType }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const { i18n } = useTranslation();

  /*
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  };
  */

  /*
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);
  */

  const handleGoogleLogin = () => {
    // Redirect user to backend Google login endpoint
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Sending to API:", { email, password, userType });

      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            userType: userType,
          },
        }
      );

      console.log("Access Token:", response.data.data.accessToken);

      const token = response.data.data.accessToken;
      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("userType", userType);

      if (userType !== "ADMIN") {
        const profileResponse = await axios.get(`${API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userId = profileResponse.data.data.id;
        localStorage.setItem("userId", userId);
      }

      if (userType === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else if (err.request) {
        setError("No response from server. Check your connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    // Check for token in URL (after Google login)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("Google token from URL:", token); // <-- Add this line
    if (token) {
      localStorage.setItem("token", token);
      // Optionally remove token from URL
      window.history.replaceState({}, document.title, "/");
      navigate("/dashboard");
    }
  }, [navigate]);

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
          <img className="w-full h-screen" src="\assets\industrial.jpg" alt="" />
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
              className="block text-xs mb-5 text-right hover:text-red-700"
            >
              {t("forgotpass")}
            </Link>
            <button
              onClick={handleLogin}
              type="submit"
              className="bg-red-950 text-white font-bold py-3 rounded-lg w-full cursor-pointer"
            >
              {t("login")}
            </button>
          </form>
          <div className="navto w-full flex gap-4 mt-1">
            <h5>{t("noacc")}</h5>
            <p
              className="text-red-700 hover:text-red-600 cursor-pointer font-bold"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              {t("register")}
            </p>
          </div>
          <hr />
          <button
            onClick={handleGoogleLogin}
            className="bg-red-950 text-white font-bold py-3 rounded-lg w-full cursor-pointer"
          >
            Login with Google
          </button>
          <div className="mt-10 w-full flex justify-end">
            <LanguageDropdown selectedLanguage={selectedLanguage} />
          </div>
        </div>
      </div>

      {/* Mobile Design: Sign-in Form */}
      <div className="text-sm text-amber-950 relative mt-auto bg-white rounded-t-4xl shadow-lg p-10 sm:p-10 w-full mx-auto lg:hidden">
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
            className="block text-xs !mb-5 text-right hover:text-red-600"
          >
            {t("forgotpass")}
          </Link>
          <button
            onClick={handleLogin}
            type="submit"
            className="bg-red-950 text-white font-bold !py-3 rounded-lg w-full"
          >
            {t("login")}
          </button>
        </form>
        <div className="forgotpass w-full !mt-4"></div>
        <div className="navto w-full flex gap-4 !mt-1">
          <h5>{t("noacc")}</h5>
          <p
            className="text-red-700 hover:text-red-600 cursor-pointer font-bold"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            {t("register")}
          </p>
        </div>
        <hr />
        <button
          onClick={handleGoogleLogin}
          className="bg-red-950 text-white font-bold py-3 rounded-lg w-full cursor-pointer"
        >
          Login with Google
        </button>
        <div className="mt-6 w-full flex justify-end">
          <LanguageDropdown selectedLanguage={selectedLanguage} />
        </div>
      </div>
    </div>
  );
}

export default Login;
