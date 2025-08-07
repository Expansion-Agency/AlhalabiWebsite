// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import ProductReviews from "../Components/ProductReviews";
// import axios from "axios";

// function ProductView() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [images, setImages] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_URL = import.meta.env.VITE_API_URL;
//   const { productId } = useParams();
//   const [category, setCategory] = useState({ nameEn: "Unknown Category" });

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/products/${productId}`);
//         const data = res.data;
//         setProduct(data);
//         setImages(data.productImages || []);
//         // Fetch categories and match
//         const catRes = await axios.get(`${API_URL}/category`);
//         const matched = catRes.data.find((cat) => cat.id === data.categoryId);
//         setCategory(matched || { nameEn: "Unknown Category" });
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching product", err);
//         setLoading(false);
//       }
//     };
//     console.log("Product ID:", productId);

//     fetchProduct();
//   }, [productId]);

//   const handleAddReview = (newReview) => {
//     setReviews((prev) => [newReview, ...prev]);
//   };

//   if (loading) {
//     return (
//       <p className="text-center py-20 text-gray-600">Loading product...</p>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-gray-600">Product not found.</p>
//         <button
//           onClick={() => navigate("/products")}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Back to Products
//         </button>
//       </div>
//     );
//   }
//   console.log("Product ID:", productId);

//   return (
//     <>
//       <div className="max-w-5xl mx-auto px-4 py-12">
//         <div className="bg-white rounded shadow-md p-6">
//           {images.length > 0 && (
//             <img
//               src={images[0].url || images[0]} // adjust based on your API structure
//               alt={product.nameEn}
//               className="w-full h-100 object-contain mb-8"
//             />
//           )}
//           <h1 className="text-2xl font-bold mb-5">{product.nameEn}</h1>
//           <p className="text-sm text-gray-600 mb-2">
//             Category: <strong>{category.nameEn}</strong>
//           </p>
//           <p className="text-gray-700">{product.descriptionEn}</p>
//         </div>
//       </div>
//       <ProductReviews reviews={reviews} onAddReview={handleAddReview} />
//     </>
//   );
// }

// export default ProductView;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductReviews from "../Components/ProductReviews";
import axios from "axios";

function ProductView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState(null); // now null until fetched
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const { productId } = useParams();
  const [category, setCategory] = useState({ nameEn: "Unknown Category" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product
        const res = await axios.get(`${API_URL}/products/${productId}`);
        const data = res.data;
        setProduct(data);
        setImages(data.productImages || []);

        // Fetch category
        const catRes = await axios.get(`${API_URL}/category`);
        const matched = catRes.data.find((cat) => cat.id === data.categoryId);
        setCategory(matched || { nameEn: "Unknown Category" });

        // Fetch reviews from your DB
        const revRes = await axios.get(`${API_URL}/reviews`);
        const fetchedReviews = Array.isArray(revRes.data)
          ? revRes.data
          : revRes.data?.reviews || revRes.data?.data || [];

        setReviews(fetchedReviews);
// console.log(fetchedReviews);
        setLoading(false);
      } catch (err) {
        console.error("Error loading product or reviews", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  // Optional: Add new review to state without re-fetch
 
  const handleAddReview = async (newReviewData) => {
  try {
    await axios.post(`${API_URL}/reviews`, newReviewData);
    const updatedReviews = await axios.get(`${API_URL}/reviews`);
    setReviews(updatedReviews.data);
  } catch (err) {
    console.error("Error posting review", err);
  }
};

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-600">Loading product...</p>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Product not found.</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Products
        </button>
      </div>
    );
  }
  // console.log("Product ID:", productId);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded shadow-md p-6">
          {images.length > 0 && (
            <img
              src={images[0].imagePath || images[0]} // adjust based on your API structure
              alt={product.nameEn}
              className="w-full h-100 object-contain mb-8"
            />
          )}
          <h1 className="text-2xl font-bold mb-5">{product.nameEn}</h1>
          <p className="text-sm text-gray-600 mb-2">
            Category: <strong>{category.nameEn}</strong>
          </p>
          <p className="text-gray-700">{product.descriptionEn}</p>
        </div>
      </div>

      {/* ⬇️ Pass productId and reviews from backend */}
      <ProductReviews
        productId={productId}
        reviews={reviews }
        onAddReview={handleAddReview}
      />
    </>
  );
}

export default ProductView;
