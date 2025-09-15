import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Products() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const Location = useLocation();

  const passedCategory = Location.state?.category;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        const processed = response.data.map((product) => {
          const defaultImage = product.productImages?.find((img) => img.isDefault);
          return {
            ...product,
            imageUrl: defaultImage?.imagePath || "/path/to/default/image.jpg",
          };
        });
        setProducts(processed);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Set selectedCategory if passed from home
  useEffect(() => {
    if (passedCategory && categories.length > 0) {
      const found = categories.find(
        (cat) => cat.nameEn === passedCategory || cat.nameAr === passedCategory
      );
      if (found) setSelectedCategory(found);
    }
  }, [passedCategory, categories]);

  const getChildCategories = (categoryId) => {
    return categories.filter((cat) => cat.parentId === categoryId);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory.id)
    : products;

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
  };

  const rootCategories = categories.filter((cat) => !cat.parentId);

  const categoriesToShow =
    selectedCategory === null
      ? rootCategories
      : getChildCategories(selectedCategory.id);

  const showProductsInstead =
    selectedCategory !== null && categoriesToShow.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-800 mb-10">
        {t("ourproducts")}
      </h2>

      {/* CATEGORY BUTTONS */}
      <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-5 lg:mb-10">
        {/* "All Products" Button */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`text-sm lg:text-base px-2 lg:px-4 py-2 rounded-full border transition ${
            selectedCategory === null
              ? "bg-amber-700 text-white border-amber-800"
              : "bg-white text-gray-700 border-amber-950/10 hover:bg-orange-50/50"
          }`}
        >
          {t("allProducts") || "All Products"}
        </button>

        {/* Back button when inside subcategory */}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm lg:text-base px-2 lg:px-4 py-2 rounded-full border border-red-300 bg-white text-red-600 hover:bg-red-100 transition"
          >
            ← {t("back")}
          </button>
        )}

        {/* Category buttons */}
        {categoriesToShow.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="text-sm lg:text-base px-2 lg:px-4 py-2 rounded-full border bg-white text-gray-700 border-amber-950/10 hover:bg-orange-50/50 transition"
          >
            {cat.nameEn}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      {(showProductsInstead || selectedCategory === null) && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
              key={product.id}
              onClick={() =>
                navigate(`/product/${product.id}`, {
                  state: {
                    product,
                    category: categories.find(
                      (cat) => cat.id === product.categoryId
                    ),
                  },
                })
              }
            >
              <img
                src={product.imageUrl}
                alt={product.nameEn}
                className="mx-auto w-fit h-30 lg:h-60 object-cover"
              />
              <h3 className="lg:text-lg font-semibold text-gray-700 mt-2 mb-2 px-3">
                {product.nameEn}
              </h3>
              <p className="text-xs lg:text-sm text-gray-600 p-3">
                {product.descriptionEn || product.descriptionAr}
              </p>
            </div>
          ))}
        </div>
      )}

      {!showProductsInstead &&
        selectedCategory !== null &&
        categoriesToShow.length === 0 &&
        filteredProducts.length === 0 && (
          <div className="text-center text-gray-500">
            {t("noProductsFound")}
          </div>
        )}
    </div>
  );
}

export default Products;
