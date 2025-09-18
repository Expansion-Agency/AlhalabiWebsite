
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationProvider";
import ReactStars from "react-stars";

function Reviews() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6 p-6 lg:mx-20">
      {" "}
      <h2 className="text-3xl tracking-wide text-amber-950 text-center font-bold mb-2 col-span-full">
        {t("reviews")}{" "}
      </h2>{" "}
      {reviews.map((review) => (
        <div
          key={review.id}
          className="shadow-lg p-2 lg:p-4 rounded-lg bg-white flex flex-col gap-1 hover:shadow-xl transition"
        >
          <h3 className="font-semibold lg:text-lg">{review.user}</h3>
          <p className="text-gray-700 text-sm lg:text-base">{review.comment}</p>{" "}
          <ReactStars
            count={5}
            value={review.rating}
            edit={false}
            size={24}
            color2={"#ffd700"}
          />
        </div>
      ))}
    </div>
  );
}

export default Reviews;
