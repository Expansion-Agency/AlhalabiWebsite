import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChartLineDotsColors } from "./Components/VisitorsChart";
import Component from "./Components/productsChart";
import TotalUsersCard from "./Components/UsersCard";
import { useTranslation } from "../context/TranslationProvider";

function DashboardHome({ category, setCategory, fetchCategories }) {
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    axios
      .get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.data) {
          setUserCount(res.data.data.length);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, [API_URL]);


  return (
    <div className="flex flex-col p-10">
      <h2 className="text-xl font-bold mb-4">
        <b>{t("hello")}, </b>Admin
      </h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-4">
          <TotalUsersCard count={userCount} />
          <Component
            category={category}
            setCategory={setCategory}
            fetchCategories={fetchCategories}
          />
        </div>
        <ChartLineDotsColors />
      </div>
    </div>
  );
}

export default DashboardHome;
