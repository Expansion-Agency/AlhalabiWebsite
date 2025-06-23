import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { allProducts, categories } from "../productsData";
import { useTranslation } from "react-i18next";

function Products() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const Location = useLocation();
  const passedCategory = Location.state?.category;
  const [selectedCategory, setSelectedCategory] = useState("All");

  // If a category was passed from the homepage, use it
  useEffect(() => {
    if (passedCategory && categories.includes(passedCategory)) {
      setSelectedCategory(passedCategory);
    }
  }, [passedCategory]);

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        {t("ourproducts")}
      </h1>
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-red-600 border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
            key={product.id}
            onClick={() =>
              navigate(`/product/${product.id}`, { state: { product } })
            } // Navigate to product view
          >
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto w-fit h-60 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-700 mb-2 px-3">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 p-3">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
