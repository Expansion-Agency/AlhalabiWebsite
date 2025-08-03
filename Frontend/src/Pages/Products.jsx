// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { allProducts, categories } from "../productsData";
// import { useTranslation } from "react-i18next";

// function Products() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const Location = useLocation();
//   const passedCategory = Location.state?.category;
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   // If a category was passed from the homepage, use it
//   useEffect(() => {
//     if (passedCategory && categories.includes(passedCategory)) {
//       setSelectedCategory(passedCategory);
//     }
//   }, [passedCategory]);

//   const filteredProducts =
//     selectedCategory === "All"
//       ? allProducts
//       : allProducts.filter((p) => p.category === selectedCategory);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-800 mb-10">
//         {t("ourproducts")}
//       </h2>
//       {/* Category Buttons */}
//       <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-5 lg:mb-10">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`text-sm lg:text-base px-2 lg:px-4 py-2 rounded-full border transition cursor-pointer ${
//               selectedCategory === cat
//                 ? "bg-amber-800 text-white border-amber-800"
//                 : "bg-white text-gray-700 border-amber-950/10 hover:bg-orange-50/50"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
//         {filteredProducts.map((product) => (
//           <div
//             className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
//             key={product.id}
//             onClick={() =>
//               navigate(`/product/${product.id}`, { state: { product } })
//             } // Navigate to product view
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="mx-auto w-fit h-30 lg:h-60 object-cover"
//             />
//             <h3 className="lg:text-lg font-semibold text-gray-700 mt-2 mb-2 px-3">
//               {product.title}
//             </h3>
//             <p className="text-xs lg:text-sm text-gray-600 p-3">{product.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useTranslation } from "react-i18next";

function Products() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const passedCategory = location.state?.category;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]); // To store categories fetched from API
  const [products, setProducts] = useState([]); // To store products fetched from API
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch categories and products from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories and products from the API
        const categoryResponse = await axios.get("/api/categories"); // Update this to your actual API
        const productResponse = await axios.get("/api/products"); // Update this to your actual API

        setCategories(categoryResponse.data);
        setProducts(productResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // If a category was passed from the homepage, use it
  useEffect(() => {
    if (passedCategory && categories.includes(passedCategory)) {
      setSelectedCategory(passedCategory);
    }
  }, [passedCategory, categories]);

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl lg:text-4xl font-bold text-center text-gray-800 mb-10">
        {t("ourproducts")}
      </h2>
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-5 lg:mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id} // Assuming `id` is the unique identifier
            onClick={() => setSelectedCategory(cat.nameEn)}
            className={`text-sm lg:text-base px-2 lg:px-4 py-2 rounded-full border transition cursor-pointer ${
              selectedCategory === cat.nameEn
                ? "bg-amber-800 text-white border-amber-800"
                : "bg-white text-gray-700 border-amber-950/10 hover:bg-orange-50/50"
            }`}
          >
            {cat.nameEn}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
        {filteredProducts.map((product) => (
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
            key={product.id}
            onClick={() =>
              navigate(`/product/${product.id}`, { state: { product } })
            }
          >
            <img
              src={product.imagePath} // Assuming your product data has `imagePath` for the image
              alt={product.nameEn}
              className="mx-auto w-fit h-30 lg:h-60 object-cover"
            />
            <h3 className="lg:text-lg font-semibold text-gray-700 mt-2 mb-2 px-3">
              {product.nameEn}
            </h3>
            <p className="text-xs lg:text-sm text-gray-600 p-3">
              {product.descriptionEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
