import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import { useTranslation } from "../context/TranslationProvider";
import axios from "axios";

function Layout({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [category, setCategory] = useState([]);
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

