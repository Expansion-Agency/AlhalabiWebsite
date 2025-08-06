import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { t } from "i18next";
import axios from "axios";

function DashboardReviews() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [reviews, setReviews] = useState([]);
  const totalReviews = reviews.length;
  const acceptedReviews = reviews.filter((rev) => rev.accepted).length;
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, totalReviews, { duration: 1 });
    return () => controls.stop();
  }, [totalReviews]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews`);
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Invalid reviews data format", response.data);
        return null;
      }
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`${API_URL}/reviews/${reviewId}`);
      setReviews((prevReviews) =>
        prevReviews.filter((rev) => rev.id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <Card className="flex flex-col mx-3 lg:mx-10 my-10 shadow-lg hover:shadow-xl transition-shadow duration-300 lg:w-fit">
      <CardHeader className="flex justify-between items-center pb-0">
        <div className="flex flex-col">
          <CardTitle>{t("totalReviews")}</CardTitle>
          <CardDescription className="text-4xl font-bold">
            <motion.span>{rounded}</motion.span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-centers flex-1 pb-0">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto text-sm lg:text-base">
            <thead className="shadow-md rounded-xl ">
              <tr>
                <th className="text-start p-2">product id</th>
                <th className="text-start p-2">{t("username")}</th>
                <th className="text-start p-2">{t("Comments")}</th>
                <th className="text-start p-2">{t("rate")}</th>
                <th className="text-start p-2">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reviews.map((rev) => (
                <tr key={rev.id}>
                  <td className="text-start p-2">{rev.productId}</td>
                  <td className="text-start p-2">{rev.user?.name || ""}</td>
                  <td className="text-start p-2">{rev.comment}</td>
                  <td className="text-start p-2">
                    <span className="text-yellow-500">
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </span>
                  </td>
                  <td className="text-start p-2">
                    <button
                      className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ml-2"
                      onClick={() => deleteReview(rev.id)}
                    >
                      {t("delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xs lg:text-sm">
        <div className="leading-none text-muted-foreground">
          {t("totalReviews")}: {totalReviews}
        </div>
      </CardFooter>
    </Card>
  );
}

export default DashboardReviews;
