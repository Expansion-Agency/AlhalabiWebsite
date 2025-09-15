// GoogleAuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // redirect to home or dashboard
    } else {
      navigate("/login"); // fallback
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
}

export default GoogleAuthCallback;
