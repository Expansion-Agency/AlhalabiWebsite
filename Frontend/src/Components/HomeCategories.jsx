import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function HomeCategories() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [categoryCards, setCategoryCards] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/category`)
      .then((res) => {
        setCategoryCards(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, [API_URL]);

  const isOdd = categoryCards.length % 2 !== 0;

  return (
    <div className="w-full items-center justify-center flex flex-col my-7">
      <h2 className="text-xl lg:text-4xl font-bold p-5">{t("ourproducts")}</h2>
      <div className="grid grid-cols-2 gap-2 lg:mt-3 p-3">
        {categoryCards.map((cat, idx) => {
          const isLastItem = isOdd && idx === categoryCards.length - 1;
          return (
            <div
              key={idx}
              className={`relative cursor-pointer group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ${
                isLastItem ? "col-span-2 justify-self-center w-1/2" : ""
              }`}
              onClick={() =>
                navigate("/products", { state: { category: cat.name } })
              }
            >
              <img
                className="w-full lg:h-90 object-cover transition-transform duration-300 group-hover:scale-105"
                src={cat.image}
                alt={cat.name}
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />
              <p className="absolute top-3/4 left-1/4 transform -translate-x-1/3 translate-y-1/3 lg:-translate-x-1/2 lg:translate-y-1/4 text-white lg:text-xl z-10">
                {cat.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeCategories;
