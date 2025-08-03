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
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    nameEn: "All",
    nameAr: "الكل",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      if (response.data && Array.isArray(response.data)) {
        const productsWithImages = response.data.map((product) => {
          const productImages = product.productImages || [];
          const defaultImage = productImages.find((image) => image.isDefault);
          const imageUrl = defaultImage
            ? `${defaultImage.imagePath}`
            : "/path/to/default/image.jpg";

          console.log("Product img:", imageUrl);

          return {
            ...product,
            imageUrl: imageUrl,
          };
        });

        console.log("Final Products with images:", productsWithImages);
        setProducts(productsWithImages);
      } else {
        console.error(
          "No products found or incorrect data format:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  // If a category was passed from the homepage, use it
  useEffect(() => {
    if (passedCategory && categories.length > 0) {
      const found = categories.find(
        (cat) => cat.nameEn === passedCategory || cat.nameAr === passedCategory
      );
      if (found) {
        setSelectedCategory(found);
      }
    }
  }, [passedCategory, categories]);

  const filteredProducts =
    selectedCategory.nameEn === "All"
      ? products
      : products.filter(
          (product) => product.categoryId === selectedCategory.id
        );

  console.log("Selected Category:", selectedCategory.id);
  filteredProducts.forEach((product) => {
    console.log("Product Category:", product.categoryId);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-800 mb-10">
        {t("ourproducts")}
      </h2>
      <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-5 lg:mb-10">
        {[{ id: 0, nameEn: "All", nameAr: "الكل" }, ...categories].map(
          (cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm lg:text-base px-2 lg:px-4 py-2 rounded-full border transition cursor-pointer ${
                selectedCategory.id === cat.id
                  ? "bg-amber-700 text-white border-amber-800"
                  : "bg-white text-gray-700 border-amber-950/10 hover:bg-orange-50/50"
              }`}
            >
              {cat.nameEn}
            </button>
          )
        )}
      </div>
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
    </div>
  );
}

export default Products;
