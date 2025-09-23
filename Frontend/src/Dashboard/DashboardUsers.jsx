import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { useTranslation } from "../context/TranslationProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
function DashboardUsers() {
  const { t } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const totalUsers = users.length;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(rounded, "change", (v) => {
    setDisplayValue(v);
  });

  useEffect(() => {
    const controls = animate(count, totalUsers, { duration: 1 });
    return () => controls.stop();
  }, [totalUsers]);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
  });

  const [updatedUser, setUpdatedUser] = useState({
    phone: "",
  });
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Users API Response:", response.data.data); // Debugging line

      setUsers(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  // Create a new user
  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token if stored in localStorage

      const response = await axios.post(`${API_URL}/users`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Create User Response:", response.data); // Debugging line
      fetchUsers(); // Refresh the user list after creation
      setShowCreateUser(false);
      setNewUser({ email: "", password: "", username: "", phone: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  // Edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setUpdatedUser({ phone: user.phone });
  };
  // Update user
  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token if stored in localStorage

      const response = await axios.put(
        `${API_URL}/users/${editingUser.id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Update User Response:", response.data); // Debugging line
      fetchUsers(); // Refresh the user list after update
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  // Delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`${t("deleteUser")}`);
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
console.log("Users state at render:", users);
  return (
    <>
      <Card className="flex flex-col mx-3 lg:mx-10 my-10 shadow-lg hover:shadow-xl transition-shadow duration-300 lg:w-fit">
        <CardHeader className="flex justify-between items-center pb-0">
          <div className="flex flex-col">
            <CardTitle>{t("totalUsers")}</CardTitle>
            <CardDescription className="text-4xl font-bold">
              {displayValue}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex items-center flex-1 pb-0 ">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto text-sm lg:text-base">
              <thead className="shadow-md rounded-xl">
                <tr>
                  <th className="text-start p-2">{t("userId")}</th>
                  <th className="text-start p-2">{t("username")}</th>
                  <th className="text-start p-2">{t("email")}</th>
                  <th className="text-start p-2">{t("number")}</th>
                  <th className="text-start p-2">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-start p-2">{user.id}</td>
                    <td className="text-start p-2">{user.username}</td>
                    <td className="text-start p-2">{user.email}</td>
                    <td className="text-start p-2">{user.phone}</td>
                    <td className="text-start flex gap-2 p-2">
                      <button
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEditUser(user)}
                      >
                        {t("edit")}
                      </button>
                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(user.id)}
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
            Showing total Users updated for the last 24 hours
          </div>
        </CardFooter>
      </Card>
      {showCreateUser && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{t("createUser")}</h3>
          <input
            type="text"
            placeholder={t("email")}
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="password"
            placeholder={t("password")}
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder={t("username")}
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder={t("phone")}
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={handleCreateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {t("create")}
          </button>
        </div>
      )}
      {editingUser && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{t("editUser")}</h3>
          <input
            type="text"
            placeholder={t("phone")}
            value={updatedUser.phone}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, phone: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={handleUpdateUser}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            {t("update")}
          </button>
        </div>
      )}
    </>
  );
}

export default DashboardUsers;
