"use client";

import React from "react";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";

import { allProducts, categories } from "../../productsData";

function getColorForCategory(category) {
  const colorMap = {
    Packaging: "#4ade80", // green
    "Food Processing": "#60a5fa", // blue
    Labeling: "#fbbf24", // yellow
    Mixers: "#f472b6", // pink
    Accessories: "#a78bfa", // purple
  };

  return colorMap[category] || "#cbd5e1";
}

const productCounts = categories
  .filter((category) => category !== "All")
  .map((category) => {
    const count = allProducts.filter((p) => p.category === category).length;
    return {
      category,
      count,
      fill: getColorForCategory(category),
    };
  });

export default function ProductsPerCategoryChart() {
  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center pb-0">
        <CardTitle>Products per Category</CardTitle>
        <CardDescription>
          Distribution of {allProducts.length} products
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center text-sm">
        <PieChart width={250} height={220}>
          <Pie
            data={productCounts}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="45%"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={3}
          >
            {productCounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Chart shows products grouped by category
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
