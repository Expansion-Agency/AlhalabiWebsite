import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
<<<<<<< HEAD
import { useTranslation } from "../context/TranslationProvider";
=======
import { useTranslation } from "./context/TranslationProvider";
>>>>>>> 95c688a4c45aac076e575ace756da42058e4b160
import axios from "axios";

function Layout({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [category, setCategory] = useState([]);
<<<<<<< HEAD
=======
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });
  const { t } = useTranslation();
>>>>>>> 95c688a4c45aac076e575ace756da42058e4b160
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { lang, setLang } = useTranslation();

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
        <Header toggleMenuVisibility={toggleMenuVisibility} />

        <main className="flex-grow">
          {React.cloneElement(children, {
            category,
            setCategory,
            fetchCategories,
          })}
        </main>

        <Footer />
      </div>

      <Menu
        isMenuVisible={isMenuVisible}
        toggleMenuVisibility={toggleMenuVisibility}
      />
    </div>
  );
}

export default Layout;

