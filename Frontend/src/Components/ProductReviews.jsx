import React, { useState } from "react";
import { useTranslation } from "../context/TranslationProvider";
import ReactStars from "react-stars";

function ProductReviews({ reviews = [], onAddReview = () => {}, productId, onEditReview }) {
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(5);

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Failed to parse user from localStorage:", e);
    user = null;
  }
  const username = user?.name || "Anonymous";

  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const handleEdit = (review) => {
    setEditingReviewId(review.id);
    setEditedComment(typeof review.comment === "string" ? review.comment : "");
    setEditedRating(typeof review.rating === "number" ? review.rating : 5);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditedComment("");
    setEditedRating(5);
  };

  const handleSaveEdit = async () => {
    if (!onEditReview) {
      console.warn("onEditReview prop not provided");
      return;
    }

    try {
      await onEditReview(editingReviewId, {
        comment: editedComment,
        rating: editedRating,
      });
    } catch (err) {
      console.error("Error saving edited review:", err);
    } finally {
      setEditingReviewId(null);
      setEditedComment("");
      setEditedRating(5);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() || newRating > 0) {
      // call onAddReview safely
      onAddReview({
        id: Date.now(),
        user: username,
        comment: newComment,
        rating: newRating,
        productId: productId,
      });
      setNewComment("");
      setNewRating(0);
    }
  };

  return (
    <div className="reviews-section mt-8 mx-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{t("reviews")}</h2>

      {safeReviews.length === 0 && <p>{t("noReviews")}</p>}

      {safeReviews.map((rev) => {
        // rev.user may be object or string
        const revUserName =
          typeof rev.user === "string"
            ? rev.user
            : rev.user?.name || rev.user?.username || "Anonymous";

        return (
          <div
            key={rev.id}
            className="border-b border-gray-200 py-2 mb-2 flex justify-between"
          >
            <div className="w-full">
              <p className="font-semibold">{revUserName}</p>

              {editingReviewId === rev.id ? (
                <>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    rows={3}
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <ReactStars
                    count={5}
                    value={editedRating}
                    onChange={setEditedRating}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <p>{rev.comment}</p>
                    <ReactStars
                      count={5}
                      value={rev.rating}
                      edit={false}
                      size={24}
                      color2={"#ffd700"}
                    />
                  </div>

                  {revUserName === username && (
                    <button
                      onClick={() => handleEdit(rev)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* New Review Form */}
      <form onSubmit={handleSubmit} className="mt-6">
        <h3 className="text-lg font-semibold mb-2">{t("writeReview")}</h3>
        <textarea
          className="lg:w-1/2 w-full p-2 border border-gray-300 rounded mb-3"
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
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

