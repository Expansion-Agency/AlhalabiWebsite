import React from "react";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Layout({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [category, setCategory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });
  const { i18n } = useTranslation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage); // Make sure it's applied on mount
  }, [i18n, selectedLanguage]);

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prev) => !prev);
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/category`);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`transition-all duration-300 ${
          isMenuVisible
            ? "blur-xs brightness-65 pointer-events-none select-none"
            : ""
        }`}
      >
        <Header
          toggleMenuVisibility={toggleMenuVisibility}
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
        />
        <main className="flex-grow">
          {React.cloneElement(children, {
            category,
            setCategory,
            fetchCategories,
          })}
        </main>
        <Footer
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
        />
      </div>

      <Menu
        isMenuVisible={isMenuVisible}
        toggleMenuVisibility={toggleMenuVisibility}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
      />
    </div>
  );
}

export default Layout;
