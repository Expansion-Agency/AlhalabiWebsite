// ProductReviews.jsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactStars from "react-stars";

function ProductReviews({ reviews, onAddReview,productId }) {
  const { t } = useTranslation();
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() || newRating > 0) {
      onAddReview({
        id: Date.now(),
        user: "Anonymous", // Replace with logged-in user name if you have auth
        comment: newReview,
        rating: newRating,
        productId:36,
      });
      setNewReview("");
      setNewRating(0);
    }
  };

  return (
    <div className="reviews-section mt-8 mx-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{t("reviews")}</h2>
      {/* Existing Reviews */}
      {reviews.length === 0 && <p>{t("noReviews")}</p>}
      {reviews.map((rev) => (
        <div
          key={rev.id}
          className="border-b border-gray-200 py-2 mb-2 flex justify-between"
        >
          <div>
            <p className="font-semibold">{rev.user}</p>
            <p>{rev.comment}</p>
          </div>
          <ReactStars
            count={5}
            value={rev.rating}
            edit={false}
            size={24}
            color2={"#ffd700"}
          />
        </div>
      ))}

      {/* New Review Form */}
      <form onSubmit={handleSubmit} className="mt-6">
        <h3 className="text-lg font-semibold mb-2">{t("writeReview")}</h3>
        <textarea
          className="lg:w-1/2 w-full p-2 border border-gray-300 rounded mb-3"
          rows={4}
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder={t("sharethoughts")}
        />
        <div className="mb-3">
          <span className="mr-2">{t("yourRating")}:</span>
          <ReactStars
            count={5}
            value={newRating}
            onChange={setNewRating}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <button
          type="submit"
          className="bg-red-600/80 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
        >
          {t("submitReview")}
        </button>
      </form>
    </div>
  );
}

export default ProductReviews;
