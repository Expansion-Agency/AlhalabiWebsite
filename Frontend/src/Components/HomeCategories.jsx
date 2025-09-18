import React from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useTranslation } from "../context/TranslationProvider";
=======
<<<<<<< HEAD
import { useTranslation } from "../context/TranslationProvider";
=======
import { useTranslation } from "./context/TranslationProvider";
>>>>>>> 95c688a4c45aac076e575ace756da42058e4b160
>>>>>>> 6a2de40f00b0ad3a37a31f83fad8e1407ee1d927
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function HomeCategories({ category, setCategory, fetchCategories }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [categoryCards, setCategoryCards] = useState([]);

  useEffect(() => {
    setCategoryCards(category);
  }, [category]);

  const isOdd = categoryCards.length % 2 !== 0;

  console.log("category in HomeCategories:", category);

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
                navigate("/products", {
                  state: { category: cat.nameEn, categoryId: cat.id },
                })
              }
            >
              <img
                className="w-full lg:h-90 object-cover transition-transform duration-300 group-hover:scale-105"
                src={cat.imagePath}
                alt={cat.nameEn}
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />
              <p className="absolute top-3/4 left-1/4 transform -translate-x-1/3 translate-y-1/3 lg:-translate-x-1/2 lg:translate-y-1/4 text-white lg:text-xl z-10">
                {cat.nameEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeCategories;
