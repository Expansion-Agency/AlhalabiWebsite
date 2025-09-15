import React, { useState, useEffect, useRef } from "react";
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

function DashboardCategories({ category, setCategory, fetchCategories }) {
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;

  const [editingCategory, setEditingCategory] = useState(null);
  const [showCreateCategory, setShowCreateCategory] = useState(false);

  const [newCategory, setNewCategory] = useState({
    nameEn: "",
    nameAr: "",
    imageFile: null,
    parentId: null,
  });

  const [newImagePreview, setNewImagePreview] = useState(null);

  const [updatedCategory, setUpdatedCategory] = useState({
    nameEn: "",
    nameAr: "",
    imageFile: null,
    parentId: null,
  });

  const [updatedImagePreview, setUpdatedImagePreview] = useState(null);

  const editModalRef = useRef(null);

  const totalCategories = category.length;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(rounded, "change", (v) => {
    setDisplayValue(v);
  });

  useEffect(() => {
    const controls = animate(count, totalCategories, { duration: 1 });
    return () => controls.stop();
  }, [totalCategories]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const getFullImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${API_URL}/${path}`;
  };

  // --- Image validation helper ---
  const validateImageFile = (file) => {
    if (!file) return true;
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSizeMB = 5;
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please select an image file (jpg, png, gif, webp).");
      return false;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File is too large. Max size is ${maxSizeMB}MB.`);
      return false;
    }
    return true;
  };

  const handleCreateCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please log in again.");
      return;
    }

    if (!validateImageFile(newCategory.imageFile)) return;

    try {
      const formData = new FormData();
      formData.append("nameEn", newCategory.nameEn);
      formData.append("nameAr", newCategory.nameAr);
      if (newCategory.imageFile) {
        formData.append("imageFile", newCategory.imageFile);
      }
      if (newCategory.parentId !== null && newCategory.parentId !== undefined) {
        formData.append("parentId", String(newCategory.parentId));
      }

      const response = await axios.post(`${API_URL}/category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setCategory((prev) => [...prev, response.data]);
      fetchCategories();

      // Clear inputs & preview after success
      setNewCategory({ nameEn: "", nameAr: "", imageFile: null, parentId: null });
      setNewImagePreview(null);
      setShowCreateCategory(false);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Unauthorized: Please log in again.");
      }
      console.error("Error creating category:", error.response?.data || error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`${t.deleteCat}`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/category/${id}`);
      setCategory((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error.response?.data || error);
    }
  };

  const handleEditClick = (cat) => {
    setEditingCategory(cat);
    setUpdatedCategory({
      nameEn: cat.nameEn,
      nameAr: cat.nameAr,
      imageFile: null,
      parentId: cat.parentId ?? null,
    });
    setUpdatedImagePreview(null);
    setTimeout(() => {
      editModalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please log in again.");
      return;
    }

    if (!validateImageFile(updatedCategory.imageFile)) return;

    try {
      const formData = new FormData();
      formData.append("nameEn", updatedCategory.nameEn);
      formData.append("nameAr", updatedCategory.nameAr);
      if (updatedCategory.imageFile) {
        formData.append("imageFile", updatedCategory.imageFile);
      }
      if (updatedCategory.parentId !== null && updatedCategory.parentId !== undefined) {
        formData.append("parentId", String(updatedCategory.parentId));
      }

      const response = await axios.put(
        `${API_URL}/category/${editingCategory.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategory((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? response.data : cat))
      );

      setEditingCategory(null);
      setUpdatedImagePreview(null);
      fetchCategories();
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Unauthorized: Please log in again.");
      }
      console.error("Error updating category:", error.response?.data || error);
    }
  };

  return (
    <>
      <Card className="flex flex-col mx-3 lg:mx-10 my-10 shadow-lg hover:shadow-xl transition-shadow duration-300 lg:w-fit">
        <CardHeader className="flex justify-between items-center pb-0">
          <div className="flex flex-col">
            <CardTitle>{t("totalCategories")}</CardTitle>
            <CardDescription className="text-4xl font-bold">{displayValue}</CardDescription>
          </div>
          <button
            onClick={() => setShowCreateCategory(!showCreateCategory)}
            className="text-black shadow-md p-3 rounded-full cursor-pointer hover:shadow-lg hover:scale-102 transition-all ease duration-200"
          >
            {t("addCategory")}
          </button>
        </CardHeader>

        <CardContent className="flex items-center flex-1 pb-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-sm lg:text-base">
              <thead className="shadow-md rounded-xl">
                <tr>
                  <th className="text-start p-2">{t("categoryId")}</th>
                  <th className="text-start p-2">{t("categoryName")}</th>
                  <th className="text-start p-2">Name in Arabic</th>
                  <th className="text-start p-2">Parent Category</th>
                  <th className="text-start p-2">{t("categoryPhoto")}</th>
                  <th className="text-start p-2">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {category.map((cat) => (
                  <tr key={cat.id}>
                    <td className="text-start p-2">{cat.id}</td>
                    <td className="text-start p-2">{cat.nameEn}</td>
                    <td className="text-start p-2">{cat.nameAr}</td>
                    <td className="text-start p-2">{cat.parent?.nameEn || "-"}</td>
                    <td className="text-start p-2">
                      {cat.imagePath ? (
                        <img
                          src={getFullImageUrl(cat.imagePath)}
                          alt={cat.nameEn}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.jpg";
                          }}
                        />
                      ) : (
                        <p>No image</p>
                      )}
                    </td>
                    <td className="text-start flex gap-2 p-2">
                      <button
                        onClick={() => handleEditClick(cat)}
                        className="text-blue-500 cursor-pointer"
                      >
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
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
          <div className="leading-none text-muted-foreground">Showing total Categories</div>
        </CardFooter>
      </Card>

      {/* Create Category Modal */}
      {showCreateCategory && (
        <div className="bg-white shadow-lg rounded-lg p-6 mx-3 my-4 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2">{t("createCategory")}</h3>
          <input
            type="text"
            placeholder={t("categoryNameEn")}
            value={newCategory.nameEn}
            onChange={(e) => setNewCategory({ ...newCategory, nameEn: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Name in Arabic"
            value={newCategory.nameAr}
            onChange={(e) => setNewCategory({ ...newCategory, nameAr: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Parent Category ID (optional)"
            value={newCategory.parentId ?? ""}
            onChange={(e) =>
              setNewCategory({
                ...newCategory,
                parentId: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && validateImageFile(file)) {
                setNewCategory({ ...newCategory, imageFile: file });
                setNewImagePreview(URL.createObjectURL(file));
              } else {
                // Invalid file reset input
                e.target.value = "";
                setNewCategory({ ...newCategory, imageFile: null });
                setNewImagePreview(null);
              }
            }}
            className="mb-2"
          />
          {newImagePreview && (
            <img
              src={newImagePreview}
              alt="Preview"
              className="mb-2 w-32 h-32 object-cover rounded"
            />
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setShowCreateCategory(false);
                setNewCategory({ nameEn: "", nameAr: "", imageFile: null, parentId: null });
                setNewImagePreview(null);
              }}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button onClick={handleCreateCategory} className="btn-primary">
              {t("create")}
            </button>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div
          ref={editModalRef}
          className="bg-white shadow-lg rounded-lg p-6 mx-3 my-4 w-full max-w-md"
        >
          <h3 className="text-lg font-semibold mb-2">{t("editCategory")}</h3>
          <input
            type="text"
            placeholder={t("categoryNameEn")}
            value={updatedCategory.nameEn}
            onChange={(e) =>
              setUpdatedCategory({ ...updatedCategory, nameEn: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Name in Arabic"
            value={updatedCategory.nameAr}
            onChange={(e) =>
              setUpdatedCategory({ ...updatedCategory, nameAr: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Parent Category ID (optional)"
            value={updatedCategory.parentId ?? ""}
            onChange={(e) =>
              setUpdatedCategory({
                ...updatedCategory,
                parentId: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && validateImageFile(file)) {
                setUpdatedCategory({ ...updatedCategory, imageFile: file });
                setUpdatedImagePreview(URL.createObjectURL(file));
              } else {
                e.target.value = "";
                setUpdatedCategory({ ...updatedCategory, imageFile: null });
                setUpdatedImagePreview(null);
              }
            }}
            className="mb-2"
          />
          {/* Show preview: new image or existing */}
          {updatedImagePreview ? (
            <img
              src={updatedImagePreview}
              alt="Preview"
              className="mb-2 w-32 h-32 object-cover rounded"
            />
          ) : editingCategory.imagePath ? (
            <img
              src={getFullImageUrl(editingCategory.imagePath)}
              alt={editingCategory.nameEn}
              className="mb-2 w-32 h-32 object-cover rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpg";
              }}
            />
          ) : (
            <p>No image available</p>
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setEditingCategory(null);
                setUpdatedCategory({ nameEn: "", nameAr: "", imageFile: null, parentId: null });
                setUpdatedImagePreview(null);
              }}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button onClick={handleUpdate} className="btn-primary">
              {t("update")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardCategories;
