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
import { useEffect } from "react";
import axios from "axios";
function DashboardAdmin() {
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
  });

  const [updatedAdmin, setUpdatedAdmin] = useState({
    email: "",
  });
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      const response = await axios.get(`${API_URL}/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Admins API Response:", response.data); // Debugging line

      setAdmins(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };
  // Create a new user
  const handleCreateAdmin = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token if stored in localStorage

      const response = await axios.post(`${API_URL}/admins`, newAdmin, {
        headers: {
          Authorization: `Bearer ${token}`, // Include authentication token
          "Content-Type": "application/json",
        },
      });

      setAdmins([...admins, response.data.data || response.data]); // Ensure correct response format

      setNewAdmin({
        email: "",
        password: "",
      });

      setShowCreateAdmin(false);
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  // Delete admin
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`delete admin with id ${id}?`);
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      await axios.delete(`${API_URL}/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include authentication token
        },
      });

      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  // Open edit modal
  const handleEditClick = (admin) => {
    setEditingAdmin(admin);
    setUpdatedAdmin({ email: admin.email });
  };

  // Update admin
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const response = await axios.put(
        `${API_URL}/admins/${editingAdmin.id}`,
        updatedAdmin,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include authentication token
            "Content-Type": "application/json",
          },
        }
      );

      setAdmins(
        admins.map((admin) =>
          admin.id === editingAdmin.id ? { ...admin, ...updatedAdmin } : admin
        )
      );

      setEditingAdmin(null);
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <>
      <Card className="flex flex-col mx-3 lg:mx-10 my-10 shadow-lg hover:shadow-xl transition-shadow duration-300 lg:w-fit">
        <CardHeader className="flex justify-between items-center pb-0">
          <div className="flex flex-col">
            <CardTitle>{t("totalAdmins")}</CardTitle>
            <CardDescription className="text-4xl font-bold">
              {admins.length}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateAdmin((prev) => !prev)}
              className="text-black shadow-md p-3 rounded-full cursor-pointer hover:shadow-lg hover:scale-102 transition-all ease duration-200"
            >
              {t("addAdmin")}
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex items-center flex-1 pb-0 ">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-sm lg:text-base">
              <thead className="shadow-md rounded-xl">
                <tr>
                  <th className="text-start p-2">{t("adminId")}</th>
                  <th className="text-start p-2">{t("adminName")}</th>
                  <th className="text-start p-2">{t("email")}</th>
                  <th className="text-start p-2">{t("role")}</th>
                  <th className="text-start p-2">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr key={admin.id}>
                    <td className="text-start p-2">{index + 1}</td>
                    <td className="text-start p-2">
                      {admin.name || `Admin ${index + 1}`}
                    </td>
                    <td className="text-start p-2">{admin.email}</td>
                    <td className="text-start p-2">{admin.role || "Admin"}</td>
                    <td className="text-start flex gap-2 p-2">
                      <button
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          if (editingAdmin?.id === admin.id) {
                            setEditingAdmin(null);
                          } else {
                            handleEditClick(admin);
                          }
                        }}
                      >
                        {t("edit")}
                      </button>
                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(admin.id)}
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
            Showing total Admins
          </div>
        </CardFooter>
      </Card>
      {showCreateAdmin && (
        <div className="bg-white shadow-lg rounded-lg p-6 mx-3 my-4 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">{t("addAdmin")}</h2>
          <input
            type="email"
            placeholder={t("email")}
            className="w-full border p-2 mb-3 rounded"
            value={newAdmin.email}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder={t("password")}
            className="w-full border p-2 mb-3 rounded"
            value={newAdmin.password}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, password: e.target.value })
            }
          />
          <div className="flex justify-between">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleCreateAdmin}
            >
              {t("create")}
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setShowCreateAdmin(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
      {editingAdmin && (
        <div className="bg-white shadow-lg rounded-lg p-6 mx-3 my-4 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">{t("editAdmin")}</h2>
          <input
            type="email"
            className="w-full border p-2 mb-3 rounded"
            value={updatedAdmin.email}
            onChange={(e) =>
              setUpdatedAdmin({ ...updatedAdmin, email: e.target.value })
            }
          />
          <div className="flex justify-between">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleUpdate}
            >
              {t("update")}
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setEditingAdmin(null)}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardAdmin;
