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

  // Setup Axios global token header (once)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const [editingCategory, setEditingCategory] = useState(null);
  const [showCreateCategory, setShowCreateCategory] = useState(false);

  const [newCategory, setNewCategory] = useState({
    nameEn: "",
    nameAr: "",
    imageFile: null,
  });

  const [updatedCategory, setUpdatedCategory] = useState({
    nameEn: "",
    nameAr: "",
    imageFile: null,
  });

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

  // Create a new category
  const handleCreateCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please log in again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nameEn", newCategory.nameEn);
      formData.append("nameAr", newCategory.nameAr);
      if (newCategory.imageFile) {
        formData.append("imageFile", newCategory.imageFile);
      }

      const response = await axios.post(`${API_URL}/category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCategory([...category, response.data]);
      setNewCategory({ nameEn: "", nameAr: "", imageFile: null });
      setShowCreateCategory(false);
      fetchCategories();
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Unauthorized: Please log in again.");
      }
      console.error("Error creating category:", error.response?.data || error);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`${t.deleteCat}`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/category/${id}`);
      setCategory(category.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error.response?.data || error);
    }
  };

  // Open edit modal
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setUpdatedCategory({
      nameEn: category.nameEn,
      nameAr: category.nameAr,
      imageFile: null,
    });
    setTimeout(() => {
      editModalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // Update category
  const handleUpdate = async () => {
    if (!editingCategory) return;
    try {
      const formData = new FormData();
      formData.append("nameEn", updatedCategory.nameEn);
      formData.append("nameAr", updatedCategory.nameAr);
      if (updatedCategory.imageFile) {
        formData.append("imageFile", updatedCategory.imageFile);
      }

      const response = await axios.put(
        `${API_URL}/category/${editingCategory.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`, // 
          },
        }
      );

      setCategory(
        category.map((cat) =>
          cat.id === editingCategory.id ? response.data : cat
        )
      );
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error.response?.data || error);
    }
  };

  return (
    <>
      <Card className="flex flex-col mx-3 lg:mx-10 my-10 shadow-lg hover:shadow-xl transition-shadow duration-300 lg:w-fit">
        <CardHeader className="flex justify-between items-center pb-0">
          <div className="flex flex-col">
            <CardTitle>{t("totalCategories")}</CardTitle>
            <CardDescription className="text-4xl font-bold">
              {displayValue}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateCategory(!showCreateCategory)}
              className="text-black shadow-md p-3 rounded-full cursor-pointer hover:shadow-lg hover:scale-102 transition-all ease duration-200"
            >
              {t("addCategory")}
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex items-center flex-1 pb-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-sm lg:text-base">
              <thead className="shadow-md rounded-xl">
                <tr>
                  <th className="text-start p-2">{t("categoryId")}</th>
                  <th className="text-start p-2">{t("categoryName")}</th>
                  <th className="text-start p-2">Name in Arabic</th>
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
                    <td className="text-start p-2">
                      {cat.imagePath ? (
                        <img
                          src={cat.imagePath}
                          alt={cat.name}
                          style={{ width: "50px", height: "50px" }}
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
          <div className="leading-none text-muted-foreground">
            Showing total Categories
          </div>
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
            onChange={(e) =>
              setNewCategory({ ...newCategory, nameEn: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder={t("categoryNameAr")}
            value={newCategory.nameAr}
            onChange={(e) =>
              setNewCategory({ ...newCategory, nameAr: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewCategory({ ...newCategory, imageFile: e.target.files[0] })
            }
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={handleCreateCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {t("createCategory")}
          </button>
          <button
            onClick={() => setShowCreateCategory(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            {t("cancel")}
          </button>
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
            placeholder={t("categoryNameAr")}
            value={updatedCategory.nameAr}
            onChange={(e) =>
              setUpdatedCategory({ ...updatedCategory, nameAr: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setUpdatedCategory({
                ...updatedCategory,
                imageFile: e.target.files[0],
              })
            }
            className="border p-2 mb-2 w-full"
          />

          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            {t("updateCategory")}
          </button>
          <button
            onClick={() => setEditingCategory(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            {t("cancel")}
          </button>
        </div>
      )}
    </>
  );
}

export default DashboardCategories;
