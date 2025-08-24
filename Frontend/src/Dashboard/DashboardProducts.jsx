import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
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

  useMotionValueEvent(rounded, "change", (v) => {
    setDisplayValue(v);
  });

  useEffect(() => {
    const controls = animate(count, totalProducts, { duration: 1 });
    return () => controls.stop();
  }, [totalProducts]);

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
  });
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      if (response.data && Array.isArray(response.data)) {
        const productsWithImages = response.data.map((product) => {
          const productImages = product.productImages || [];
          let imageUrl = product.imageUrl; // 👈 keep API's imageUrl if available

          if (!imageUrl && productImages.length > 0) {
            const defaultImage =
              productImages.find((img) => img.isDefault) || productImages[0];
            imageUrl = `${defaultImage.imagePath}`; // prepend API_URL if needed
          }

          if (!imageUrl) {
            imageUrl = "/default.png"; // fallback
          }
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

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found! User is not authenticated.");
        return;
      }
      const productResponse = await axios.post(
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
      const createdProduct = productResponse.data;

      if (newProduct.imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("imageFile", newProduct.imageFile);
        imageFormData.append("isDefault", true);
        imageFormData.append("productId", createdProduct.id);

        await axios.post(`${API_URL}/product-images`, imageFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchProducts();
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
      console.log("Creating with categoryId:", newProduct.categoryId);
      setShowCreateProduct(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(`${translations.deleteProd}`);
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((product) => product.id !== productId));
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
      priceEgp: Number(product.priceEgp),
      priceUsd: Number(product.priceUsd),
      quantity: Number(product.quantity),
      categoryId: Number(product.categoryId) || null,
    });
    setTimeout(() => {
      editModalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const formattedUpdatedProduct = {
        nameEn: updatedProduct.nameEn,
        nameAr: updatedProduct.nameAr,
        descriptionEn: updatedProduct.descriptionEn,
        descriptionAr: updatedProduct.descriptionAr,
        priceEgp: updatedProduct.priceEgp,
        priceUsd: updatedProduct.priceUsd,
        quantity: updatedProduct.quantity,
        categoryId: updatedProduct.categoryId
          ? parseInt(updatedProduct.categoryId)
          : null,
      };
      await axios.put(
        `${API_URL}/products/${editingProduct.id}`,
        formattedUpdatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Card className="flex flex-col mx-3 lg:mx-10 my-10 shadow-lg hover:shadow-xl transition-shadow duration-300 lg:w-fit">
        <CardHeader className="flex justify-between items-center pb-0">
          <div className="flex flex-col">
            <CardTitle>{t("totalProducts")}</CardTitle>
            <CardDescription className="text-4xl font-bold">
              {displayValue}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateProduct(!showCreateProduct)}
              className="text-black shadow-md p-3 rounded-full cursor-pointer hover:shadow-lg hover:scale-102 transition-all ease duration-200"
            >
              {t("addProduct")}
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex items-center flex-1 pb-0 ">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-sm lg:text-base">
              <thead className="shadow-md rounded-xl">
                <tr>
                  <th className="text-start p-2">{t("productId")}</th>
                  <th className="text-start p-2">{t("enName")}</th>
                  <th className="text-start p-2">{t("arName")}</th>
                  <th className="text-start p-2">{t("arDesc")}</th>
                  <th className="text-start p-2">{t("enDesc")}</th>
                  <th className="text-start p-2">{t("price")} egb</th>
                  <th className="text-start p-2">{t("price")} $</th>
                  <th className="text-start p-2">{t("quantity")}</th>
                  <th className="text-start p-2">{t("img")}</th>
                  <th className="text-start p-2">{t("category")}</th>
                  <th className="text-start p-2">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((products) => (
                  <tr key={products.id}>
                    <td className="text-start p-2">{products.id}</td>
                    <td className="text-start p-2">{products.name}</td>
                    <td className="text-start p-2">{products.nameAr}</td>
                    <td className="text-start p-2">{products.descriptionAr}</td>
                    <td className="text-start p-2">{products.descriptionEn}</td>
                    <td className="text-start p-2">{products.priceEgp}</td>
                    <td className="text-start p-2">{products.priceUsd}</td>
                    <td className="text-start p-2">{products.quantity}</td>
                    <td className="text-start p-2">
                      <img
                        src={products.imageUrl}
                        alt={products.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="text-start p-2">{products.categoryId}</td>
                    <td className="text-start flex gap-2 p-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(products);
                        }}
                        className="text-blue-500 cursor-pointer"
                      >
                        {t("edit")}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(products.id);
                        }}
                        className="text-red-500 cursor-pointer"
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
            Showing total Products
          </div>
        </CardFooter>
      </Card>
      {showCreateProduct && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{t("createProduct")}</h3>
          <form onSubmit={handleCreateProduct}>
            <input
              type="text"
              placeholder={t("productName")}
              value={newProduct.nameEn}
              onChange={(e) =>
                setNewProduct({ ...newProduct, nameEn: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder={t("productNameAr")}
              value={newProduct.nameAr}
              onChange={(e) =>
                setNewProduct({ ...newProduct, nameAr: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder={t("descriptionEn")}
              value={newProduct.descriptionEn}
              onChange={(e) =>
                setNewProduct({ ...newProduct, descriptionEn: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder={t("descriptionAr")}
              value={newProduct.descriptionAr}
              onChange={(e) =>
                setNewProduct({ ...newProduct, descriptionAr: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder={t("priceEgp")}
              value={newProduct.priceEgp}
              onChange={(e) =>
                setNewProduct({ ...newProduct, priceEgp: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder={t("priceUsd")}
              value={newProduct.priceUsd}
              onChange={(e) =>
                setNewProduct({ ...newProduct, priceUsd: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder={t("quantity")}
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <select
              value={newProduct.categoryId || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryId: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            >
              <option value="">{t("selectCategory")}</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameEn} / {cat.nameAr}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageFile: e.target.files[0] })
              }
              className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
              {t("create")}
            </button>
          </form>
        </div>
      )}
      {editingProduct && (
        <div ref={editModalRef} className="p-4">
          <h3 className="text-lg font-semibold mb-2">{t("editProduct")}</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder={t("productName")}
              value={updatedProduct.nameEn}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, nameEn: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder={t("productNameAr")}
              value={updatedProduct.nameAr}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, nameAr: e.target.value })
              }
              className="border p-2 mb-2 w-full"
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
              className="border p-2 mb-2 w-full"
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
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder={t("priceEgp")}
              value={updatedProduct.priceEgp}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  priceEgp: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder={t("priceUsd")}
              value={updatedProduct.priceUsd}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  priceUsd: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder={t("quantity")}
              value={updatedProduct.quantity}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  quantity: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <select
              value={updatedProduct.categoryId || ""}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  categoryId: e.target.value,
                })
              }
              className="border p-2 mb-2 w-full"
            >
              <option value="">{t("selectCategory")}</option>
              {category.map((cat) => (
                <option className="text-black" key={cat.id} value={cat.id}>
                  {cat.nameEn} / {cat.nameAr}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  imageFile: e.target.files[0],
                })
              }
              className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
              {t("update")}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default DashboardProducts;
