import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductReviews from "../Components/ProductReviews";

function ProductView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  if (!state?.product) {
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

  const { product } = state;

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded shadow-md p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-100 object-contain mb-8"
          />
          <h1 className="text-2xl font-bold mb-5">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-2">
            Category: <strong>{product.category}</strong>
          </p>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
      <ProductReviews reviews={reviews} onAddReview={handleAddReview} />
    </>
  );
}

export default ProductView;
