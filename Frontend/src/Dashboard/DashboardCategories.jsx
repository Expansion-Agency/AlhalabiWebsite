const handleCreateCategory = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found. User might not be logged in.");
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setCategory([...category, response.data]);

    setNewCategory({
      nameEn: "",
      nameAr: "",
      imageFile: null,
    });

    setShowCreateCategory(false); // Optional: close the form
    fetchCategories();
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized - Invalid or expired token");
      alert("Session expired. Please log in again.");
      // Optionally redirect to login
    } else {
      console.error("Error creating category:", error.response?.data || error);
    }
  }
};
