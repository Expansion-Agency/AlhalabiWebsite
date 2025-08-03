import React from "react";
import { ChartLineDotsColors } from "./Components/VisitorsChart";
import Component from "./Components/productsChart";
import TotalUsersCard from "./Components/UsersCard";
import { useTranslation } from "react-i18next";

function DashboardHome({ category, setCategory, fetchCategories }) {
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="flex flex-col p-10">
      <h2 className="text-xl font-bold mb-4">
        <b>{t("hello")}, </b>Admin
      </h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-4">
          <TotalUsersCard />
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
