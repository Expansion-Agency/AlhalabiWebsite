// ProductReviews.jsx

import React, { useState } from "react";
import ReactStars from "react-stars";

function ProductReviews({ reviews, onAddReview }) {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() && newRating > 0) {
      onAddReview({
        id: Date.now(),
        user: "Anonymous", // Replace with logged-in user name if you have auth
        comment: newReview,
        rating: newRating,
      });
      setNewReview("");
      setNewRating(0);
    }
  };

  return (
    <div className="reviews-section mt-8 mx-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      {/* Existing Reviews */}
      {reviews.length === 0 && <p>No reviews yet.</p>}
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
            value={rating}
            onChange={setRating}
            size={24}
            color2={"#ffd700"}
          />
        </div>
      ))}

      {/* New Review Form */}
      <form onSubmit={handleSubmit} className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
        <textarea
          className="lg:w-1/2 w-full p-2 border border-gray-300 rounded mb-3"
          rows={4}
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Share your thoughts..."
        />
        <div className="mb-3">
          <span className="mr-2">Your Rating:</span>
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
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ProductReviews;
