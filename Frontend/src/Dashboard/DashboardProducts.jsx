import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";

function DashboardProducts({ category, fetchCategories }) {
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const editModalRef = useRef(null);

  const totalProducts = products.length;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  const [newProduct, setNewProduct] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    priceEgp: "",
    priceUsd: "",
    quantity: "",
    categoryId: "",
    imageFile: null,
  });

  const [updatedProduct, setUpdatedProduct] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    priceEgp: "",
    priceUsd: "",
    quantity: "",
    categoryId: "",
    imageFile: null,
  });

  useMotionValueEvent(rounded, "change", (v) => setDisplayValue(v));

  useEffect(() => {
    const controls = animate(count, totalProducts, { duration: 1 });
    return () => controls.stop();
  }, [totalProducts]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      console.log("Fetched products:", response.data);
      if (response.data && Array.isArray(response.data)) {
        const processed = response.data.map((product) => {
          const productImages = product.productImages || [];
          let imageUrl = product.imageUrl;
          if (!imageUrl && productImages.length > 0) {
            const defaultImage =
              productImages.find((img) => img.isDefault) || productImages[0];
            imageUrl = defaultImage.imagePath;
          }
          return {
            ...product,
            imageUrl: imageUrl || "/default.png",
          };
        });
        setProducts(processed);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token stored");
        return;
      }

      const response = await axios.post(
        `${API_URL}/products`,
        {
          nameEn: newProduct.nameEn,
          nameAr: newProduct.nameAr,
          descriptionEn: newProduct.descriptionEn,
          descriptionAr: newProduct.descriptionAr,
          priceEgp: Number(newProduct.priceEgp),
          priceUsd: Number(newProduct.priceUsd),
          quantity: Number(newProduct.quantity),
          categoryId: Number(newProduct.categoryId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Create product response:", response.data);

      if (newProduct.imageFile) {
        const formData = new FormData();
        formData.append("imageFile", newProduct.imageFile);
        formData.append("isDefault", true);
        formData.append("productId", response.data.id);

        const uploadRes = await axios.post(
          `${API_URL}/product-images`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image upload after create:", uploadRes.data);
      }

      await fetchProducts();
      setNewProduct({
        nameEn: "",
        nameAr: "",
        descriptionEn: "",
        descriptionAr: "",
        priceEgp: "",
        priceUsd: "",
        quantity: "",
        categoryId: "",
        imageFile: null,
      });
      setShowCreateProduct(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm(`${t("deleteProd")}`)) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setUpdatedProduct({
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      descriptionEn: product.descriptionEn,
      descriptionAr: product.descriptionAr,
      priceEgp: product.priceEgp,
      priceUsd: product.priceUsd,
      quantity: product.quantity,
      categoryId: product.categoryId,
      imageFile: null,
    });
    setTimeout(() => {
      editModalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token stored");
      return;
    }

    const updatedData = {
      nameEn: updatedProduct.nameEn,
      nameAr: updatedProduct.nameAr,
      descriptionEn: updatedProduct.descriptionEn,
      descriptionAr: updatedProduct.descriptionAr,
      priceEgp: Number(updatedProduct.priceEgp),
      priceUsd: Number(updatedProduct.priceUsd),
      quantity: Number(updatedProduct.quantity),
      categoryId: Number(updatedProduct.categoryId),
    };

    // Update product details
    await axios.put(`${API_URL}/products/${editingProduct.id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (updatedProduct.imageFile) {
      // Upload new image
      const formData = new FormData();
      formData.append("imageFile", updatedProduct.imageFile);
      formData.append("isDefault", true);
      formData.append("productId", editingProduct.id);

      await axios.post(`${API_URL}/product-images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update product image in state with blob URL for instant UI feedback
      const updatedProductWithImage = {
        ...editingProduct,
        ...updatedData,
        imageUrl: URL.createObjectURL(updatedProduct.imageFile),
      };

      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? updatedProductWithImage : p))
      );
    } else {
      // Just update product data in state
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...updatedData } : p))
      );
    }

    setEditingProduct(null);
  } catch (error) {
    console.error("Error updating product:", error.response || error);
  }
};



  return (
    <>
      {/* Summary */}
      <Card className="mx-3 lg:mx-10 my-10 shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>{t("totalProducts")}</CardTitle>
            <CardDescription className="text-4xl font-bold">{displayValue}</CardDescription>
          </div>
          <button
            onClick={() => setShowCreateProduct(!showCreateProduct)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {t("addProduct")}
          </button>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>{t("productId")}</th>
                <th>{t("enName")}</th>
                <th>{t("arName")}</th>
                <th>{t("enDesc")}</th>
                <th>{t("arDesc")}</th>
                <th>{t("price")} EGP</th>
                <th>{t("price")} $</th>
                <th>{t("quantity")}</th>
                <th>{t("img")}</th>
                <th>{t("category")}</th>
                <th>{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nameEn}</td>
                  <td>{product.nameAr}</td>
                  <td>{product.descriptionEn}</td>
                  <td>{product.descriptionAr}</td>
                  <td>{product.priceEgp}</td>
                  <td>{product.priceUsd}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.nameEn}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td>{product.categoryId}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-blue-600"
                    >
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600"
                    >
                      {t("delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">Showing total products</p>
        </CardFooter>
      </Card>

      {showCreateProduct && (
        <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-4">{t("createProduct")}</h3>
          <form onSubmit={handleCreateProduct} className="space-y-3">
            <input
              type="text"
              placeholder={t("productName")}
              value={newProduct.nameEn}
              onChange={(e) =>
                setNewProduct({ ...newProduct, nameEn: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              placeholder={t("productNameAr")}
              value={newProduct.nameAr}
              onChange={(e) =>
                setNewProduct({ ...newProduct, nameAr: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
            <textarea
              placeholder={t("descriptionEn")}
              value={newProduct.descriptionEn}
              onChange={(e) =>
                setNewProduct({ ...newProduct, descriptionEn: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
            <textarea
              placeholder={t("descriptionAr")}
              value={newProduct.descriptionAr}
              onChange={(e) =>
                setNewProduct({ ...newProduct, descriptionAr: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
            <input
              type="number"
              placeholder={t("priceEgp")}
              value={newProduct.priceEgp}
              onChange={(e) =>
                setNewProduct({ ...newProduct, priceEgp: e.target.value })
              }
              className="border p-2 w-full"
              required
              min="0"
              step="0.01"
            />
            <input
              type="number"
              placeholder={t("priceUsd")}
              value={newProduct.priceUsd}
              onChange={(e) =>
                setNewProduct({ ...newProduct, priceUsd: e.target.value })
              }
              className="border p-2 w-full"
              required
              min="0"
              step="0.01"
            />
            <input
              type="number"
              placeholder={t("quantity")}
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
              className="border p-2 w-full"
              required
              min="0"
            />
            <select
              value={newProduct.categoryId || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryId: e.target.value })
              }
              className="border p-2 w-full"
              required
            >
              <option value="" disabled>
                {t("selectCategory")}
              </option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameEn}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  imageFile: e.target.files[0] || null,
                })
              }
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {t("create")}
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 rounded border"
              onClick={() => setShowCreateProduct(false)}
            >
              {t("cancel")}
            </button>
          </form>
        </div>
      )}

      {editingProduct && (
        <div
          ref={editModalRef}
          className="p-4 max-w-xl mx-auto bg-white rounded shadow mt-10"
        >
          <h3 className="text-lg font-semibold mb-4">{t("editProduct")}</h3>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              placeholder={t("productName")}
              value={updatedProduct.nameEn}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, nameEn: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              placeholder={t("productNameAr")}
              value={updatedProduct.nameAr}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, nameAr: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
            <textarea
              placeholder={t("descriptionEn")}
              value={updatedProduct.descriptionEn}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  descriptionEn: e.target.value,
                })
              }
              className="border p-2 w-full"
              required
            />
            <textarea
              placeholder={t("descriptionAr")}
              value={updatedProduct.descriptionAr}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  descriptionAr: e.target.value,
                })
              }
              className="border p-2 w-full"
              required
            />
            <input
              type="number"
              placeholder={t("priceEgp")}
              value={updatedProduct.priceEgp}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, priceEgp: e.target.value })
              }
              className="border p-2 w-full"
              required
              min="0"
              step="0.01"
            />
            <input
              type="number"
              placeholder={t("priceUsd")}
              value={updatedProduct.priceUsd}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, priceUsd: e.target.value })
              }
              className="border p-2 w-full"
              required
              min="0"
              step="0.01"
            />
            <input
              type="number"
              placeholder={t("quantity")}
              value={updatedProduct.quantity}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, quantity: e.target.value })
              }
              className="border p-2 w-full"
              required
              min="0"
            />
            <select
              value={updatedProduct.categoryId || ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, categoryId: e.target.value })
              }
              className="border p-2 w-full"
              required
            >
              <option value="" disabled>
                {t("selectCategory")}
              </option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameEn}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  imageFile: e.target.files[0] || null,
                })
              }
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {t("update")}
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 rounded border"
              onClick={() => setEditingProduct(null)}
            >
              {t("cancel")}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default DashboardProducts;
