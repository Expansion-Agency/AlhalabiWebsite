"use client";

import React from "react";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

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

export default function ProductsPerCategoryChart({
  category,
  setCategory,
  fetchCategories,
}) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      if (response.data && Array.isArray(response.data)) {
        const productsWithImages = response.data.map((product) => {
          const productImages = product.productImages || [];
          const defaultImage = productImages.find((image) => image.isDefault);
          const imageUrl = defaultImage
            ? `${defaultImage.imagePath}`
            : "/path/to/default/image.jpg";

          console.log("Product img:", imageUrl);

          return {
            ...product,
            imageUrl: imageUrl,
          };
        });
        console.log("Final Products with images:", productsWithImages);
        setProducts(productsWithImages);
      } else {
        console.error(
          "No products found or incorrect data format:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const productCounts = (category || [])
    .filter((cat) => cat !== "All")
    .map((cat) => {
      const count = products.filter((p) => p.categoryId === cat.id).length;
      return {
        name: cat.nameEn,
        count,
        fill: getColorForCategory(cat.nameEn),
      };
    });

  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center pb-0">
        <CardTitle>Products per Category</CardTitle>
        <CardDescription>
          Distribution of {products.length} products
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
