import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardHeader from "../Dashboard/Components/Header";
import DashboardMenu from "../Dashboard/Components/Menu";
import { useTranslation } from "../context/TranslationProvider";

function DashboardLayout({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [categories, setCategories] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // useTranslation from your custom provider — it should give you `lang` and `setLang`
  const { lang, setLang } = useTranslation();

  // Keep a local selectedLanguage state for components that expect it
  const [selectedLanguage, setSelectedLanguage] = useState(
    () => lang || localStorage.getItem("language") || "en"
  );

  // Keep local selectedLanguage in sync with provider's lang
  useEffect(() => {
    if (lang && lang !== selectedLanguage) {
      setSelectedLanguage(lang);
    }
  }, [lang]);

  // Change language via the provider (no react-i18next here)
  const handleLanguageChange = (newLanguage) => {
    // update provider
    setLang(newLanguage);
    // keep local state in sync for children that expect selectedLanguage prop
    setSelectedLanguage(newLanguage);
    // backward compatibility: some code used "language" key in localStorage
    try {
      localStorage.setItem("language", newLanguage);
    } catch (e) {
      /* ignore storage errors */
    }
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/category`);
      console.log("Fetched categories:", data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboardHeader
        toggleMenuVisibility={toggleMenuVisibility}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
      />

      <main className="flex-grow">
        {React.cloneElement(children, {
          categories,
          setCategories,
          fetchCategories,
        })}
      </main>

      <DashboardMenu
        isMenuVisible={isMenuVisible}
        toggleMenuVisibility={toggleMenuVisibility}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
      />
    </div>
  );
}

export default DashboardLayout;
