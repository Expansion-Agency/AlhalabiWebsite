import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      console.error("No token found in URL");
      navigate("/login");
      return;
    }

    // Save token
    localStorage.setItem("token", token);

    // (optional) fetch user profile from backend using token
    // const response = await axios.get("https://api.alhalapi.com/profile", {
    //   headers: { Authorization: `Bearer ${token}` }
    // });

    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Authenticating with Google...</p>
    </div>
  );
};

export default GoogleAuthCallback;

