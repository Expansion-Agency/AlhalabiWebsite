import React from "react";
import { ChartLineDotsColors } from "./Components/VisitorsChart";
import Component from "./Components/productsChart";
import TotalUsersCard from "./Components/UsersCard";

function DashboardHome() {
  return (
    <div className="flex flex-col p-10 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">
        <b>Welcome, </b>Admin
      </h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-4">
          <TotalUsersCard />
          <Component />
        </div>
        <ChartLineDotsColors />
      </div>
    </div>
  );
}

export default DashboardHome;
