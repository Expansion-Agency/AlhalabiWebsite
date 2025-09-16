import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      // If no token, redirect to login or show error
      navigate("/login");
    }
  }, [navigate]);

  return <div>Processing Google login...</div>;
}

export default GoogleRedirectHandler;