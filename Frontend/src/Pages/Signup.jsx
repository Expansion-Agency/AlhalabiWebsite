import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

function Signup({ userType }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.activeElement.blur();
    setLoading(true);
    setError("");

    try {
      localStorage.setItem("signupData", JSON.stringify(formData));

      if (
        !formData.email ||
        !formData.password ||
        !formData.username ||
        !formData.phone
      ) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      await axios.post(
        `${API_URL}/auth/sendotp`,
        { input: formData.email },
        {
          headers: {
            "Content-Type": "application/json",
            userType: "USER",
          },
        }
      );

      // Navigate to OTP verification page with email
      navigate(`/otp?input=${encodeURIComponent(formData.email)}&from=signup`);
    } catch (err) {
      console.error("OTP send error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
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
          <h2 className="text-3xl font-bold mb-10">{t("register")}</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <label className="block font-bold !mb-2" htmlFor="username">
              {t("username")}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="text"
              name="username"
              value={formData.username}
              placeholder={t("username")}
              onChange={handleChange}
            />
            <label className="block font-bold !mb-2" htmlFor="email">
              {t("email")}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="email"
              name="email"
              value={formData.email}
              placeholder="email@example.com"
              onChange={handleChange}
            />
            <label className="block font-bold !mb-2" htmlFor="password">
              {t("password")}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="password"
              name="password"
              value={formData.password}
              placeholder={t("passplaceholder")}
              onChange={handleChange}
            />
            <label className="block font-bold !mb-2" htmlFor="phone">
              {t("number")}
            </label>
            <input
              className="bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="(e.g. 0123456789)"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-red-950 text-white font-bold py-3 rounded-lg w-full cursor-pointer"
            >
              {t("register")}
            </button>
          </form>
          <div className="text-center !mt-4">
            <p className="text-sm">
              {t("haveacc")}{" "}
              <span
                className="text-red-700 hover:text-red-600 cursor-pointer font-bold"
                onClick={() => navigate("/login")}
              >
                {t("login")}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Design: Sign-in Form */}
      <div className="relative text-sm !mt-auto bg-white rounded-t-4xl shadow-lg !p-10 sm:p-10! !w-full !mx-auto lg:hidden">
        <h2 className="text-center text-2xl lg:text-3xl font-bold mb-8">
          {t("register")}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block font-bold !mb-2" htmlFor="email">
            {t("username")}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
            type="text"
            name="username"
            value={formData.username}
            placeholder={t("username")}
            onChange={handleChange}
          />
          <label className="block font-bold !mb-2" htmlFor="email">
            {t("email")}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-5 !p-3 w-full"
            type="email"
            name="email"
            value={formData.email}
            placeholder="email@example.com"
            onChange={handleChange}
          />
          <label className="block font-bold !mb-2" htmlFor="password">
            {t("password")}
          </label>
          <input
            className="input bg-transparent !border !border-black/50 rounded-md !mb-1 !p-3 w-full"
            type="password"
            name="password"
            value={formData.password}
            placeholder={t("passplaceholder")}
            onChange={handleChange}
          />
          <label className="block font-bold !mb-2" htmlFor="email">
            {t("number")}
          </label>
          <input
            className="input bg-transparent border !border-black/50 rounded-md !mb-5 !p-3 w-full"
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="(e.g. 0123456789)"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-red-950 text-white font-bold py-3 rounded-lg w-full"
          >
            {t("register")}
          </button>
        </form>
        <div className="forgotpass w-full mt-4"></div>
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
  );
}

export default Signup;
