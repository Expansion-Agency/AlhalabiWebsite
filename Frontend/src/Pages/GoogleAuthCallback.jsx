import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract query params from redirect URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          console.error("No code found in URL");
          navigate("/login");
          return;
        }

        // Call backend to exchange code for token
        const response = await axios.get(
          `https://api.alhalapi.com/auth/google/redirect?code=${code}`,
          { withCredentials: true }
        );

        const { token, user } = response.data.data;

        // Store token in localStorage (or cookies if you prefer)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to dashboard or homepage
        navigate("/dashboard");
      } catch (err) {
        console.error("Google auth failed:", err);
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Authenticating with Google...</p>
    </div>
  );
};

export default GoogleAuthCallback;
