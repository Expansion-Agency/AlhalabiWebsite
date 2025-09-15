import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import DashboardHeader from "../Dashboard/Components/Header";
import DashboardMenu from "../Dashboard/Components/Menu";
import { useTranslation } from "react-i18next";

function DashboardLayout({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [category, setCategory] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const { i18n } = useTranslation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  /* const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  }; */

  /* useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);
 */
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className={`transition-all duration-300 `}>
        <DashboardHeader
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
      </div>

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
