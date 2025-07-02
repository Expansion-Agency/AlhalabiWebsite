import React from "react";
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
} from "@/components/ui/card";
import { t } from "i18next";

function DashboardReviews() {
  const reviews = [
    {
      id: 1,
      user: "John Doe",
      comment: "This product is amazing and works as advertised!",
      rating: 5,
      accepted: true,
    },
    {
      id: 2,
      user: "Jane Smith",
      comment: "Good quality, but delivery was slow.",
      rating: 4,
      accepted: false,
    },
  ];
  const totalReviews = reviews.length;
  const acceptedReviews = reviews.filter((rev) => rev.accepted).length;
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, totalReviews, { duration: 1 });
    return () => controls.stop();
  }, [totalReviews]);

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

      <CardContent className="flex items-center flex-1 pb-0">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto text-sm lg:text-base">
            <thead className="shadow-md rounded-xl ">
              <tr>
                <th className="text-start p-2">{t("status")}</th>
                <th className="text-start p-2">{t("username")}</th>
                <th className="text-start p-2">{t("reviews")}</th>
                <th className="text-start p-2">{t("rate")}</th>
                <th className="text-start p-2">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
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
                  <td className="text-start p-2">{rev.user}</td>
                  <td className="text-start p-2">{rev.comment}</td>
                  <td className="text-start p-2">
                    <span className="text-yellow-500">
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </span>
                  </td>
                  <td className="text-start p-2">
                    <button className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                      {t("accept")}
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
        <div className="leading-none text-green-600 font-semibold">
          {t("acceptedReviews")}: {acceptedReviews}
        </div>
      </CardFooter>
    </Card>
  );
}

export default DashboardReviews;
