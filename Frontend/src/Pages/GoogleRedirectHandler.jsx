import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Example: parse token from URL and redirect
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      // Handle error or redirect to login
      navigate("/login");
    }
  }, [navigate]);

  return <div>Processing Google login...</div>;
}

export default GoogleRedirectHandler;