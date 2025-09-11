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
import { useTranslation } from "react-i18next";
import axios from "axios";

function DashboardReviews() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const totalReviews = reviews.length;
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, totalReviews, { duration: 1 });
    return () => controls.stop();
  }, [totalReviews]);
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

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm(`${t.deleteRev}`);
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting product:", error);
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
                  <td>
                    {rev.accepted && (
                      <FaCheckCircle
                        className="text-green-500 text-xl"
                        title="Accepted"
                      />
                    )}
                  </td>
                  <td className="text-start p-2">{rev.user || "anoymous"}</td>
                  <td className="text-start p-2">{rev.comment}</td>
                  <td className="text-start p-2">
                    <span className="text-yellow-500">
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </span>
                  </td>
                  <td className="text-start p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(rev.id);
                      }}
                      className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Delete
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
