// import React, { useEffect, useRef, useState } from "react";
// import logo from "../logo.png";
// import "./OtpPage.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useTranslation } from "../TranslationContext";

// function OtpPage() {
//   const API_BASE_URL = process.env.REACT_APP_API_URL;
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const email = searchParams.get("input");
//   const from = searchParams.get("from"); // Capture source (verification or forgot-password)
//   const { translations } = useTranslation();
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState(new Array(6).fill("")); // Store OTP as an array
//   const inputsRef = useRef(new Array(6).fill(null));

//   useEffect(() => {
//     inputsRef.current[0]?.focus();
//   }, []);

//   const handleResendOtp = async (e) => {
//     e.preventDefault(); // Prevent default anchor behavior
//     try {
//       await axios.post(`${API_BASE_URL}/auth/sendotp`, {
//         input: email,
//         userType: "USER",
//       });
//       alert("OTP has been resent!");
//     } catch (error) {
//       alert("Failed to resend OTP. Please try again.");
//     }
//   };

//   // Handle Input Change
//   const handleChange = (e, index) => {
//     const value = e.target.value;

//     if (/^\d$/.test(value)) {
//       // Ensure only numbers
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (index < 5) {
//         inputsRef.current[index + 1].focus(); // Move to the next input
//       }
//     }
//   };

//   // Handle Backspace Key
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       const newOtp = [...otp];
//       newOtp[index] = ""; // Clear input
//       setOtp(newOtp);

//       if (index > 0) {
//         inputsRef.current[index - 1].focus(); // Move to previous input
//       }
//     }
//   };

//   // Verify OTP
//   const handleVerifyOtp = async () => {
//     if (otp.includes("")) {
//       alert("Please enter the complete OTP.");
//       return;
//     }
//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/verifyotp`, {
//         input: email,
//         otp: otp.join(""), // Convert array to string
//         userType: "USER", // Required header
//       });

//       sessionStorage.setItem("otp", otp.join("")); // ✅ Store OTP in sessionStorage

//       // Assuming the response contains user data and a token
//       const { user, token } = response.data;

//       // Store user info in localStorage
//       localStorage.setItem("user", JSON.stringify(user)); // Save user details
//       localStorage.setItem("token", token); // Save authentication token

//       alert("OTP Verified Successfully!");
//       const storedData = JSON.parse(localStorage.getItem("signupData"));
//       if (storedData && from === "signup") {
//         try {
//           // Final signup request to create the user in the database
//           const signupResponse = await axios.post(
//             `${API_BASE_URL}/auth/signUp`,
//             storedData,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 accept: "*/*",
//                 userType: "USER",
//               },
//             }
//           );

//           console.log("User Created:", signupResponse.data);

//           // Clear stored data
//           localStorage.removeItem("signupData");
//           alert("User created successfully! Please log in.");
//           navigate("/user-login");
//         } catch (signupError) {
//           // ✅ If user already exists, just redirect to login
//           if (
//             signupError.response?.data?.message.includes("Email already exists")
//           ) {
//             console.log("User already exists, skipping signup.");
//             localStorage.removeItem("signupData");
//             navigate("/user-login");
//           } else {
//             alert(
//               signupError.response?.data?.message ||
//                 "Signup failed. Please try again."
//             );
//           }
//         }
//       } else if (from === "forgot-password") {
//         navigate(`/reset-password?email=${encodeURIComponent(email)}`);
//       }
//     } catch (err) {
//       setOtp(new Array(6).fill(""));
//       console.error("Error verifying OTP:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="loginContainer">
//       <div className="logintop">
//         <img className="noaclogo" src={logo} alt="Logo" />
//         <h1>{translations.verifyemail}</h1>
//         <p>
//           {translations.code} {email}
//         </p>
//         <p>{translations.junk}</p>
//       </div>
//       <div className="inputs">
//         <div className="codeRow">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               inputMode="numeric"
//               pattern="\d*"
//               maxLength="1"
//               value={digit}
//               ref={(el) => (inputsRef.current[index] = el)}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className="otpInput"
//             />
//           ))}
//         </div>

//         <div className="navigateto">
//           <button onClick={handleResendOtp} className="resendOtpButton">
//             Send Again
//           </button>
//         </div>

//         <div className="loginbutton">
//           <button className="logbutton" onClick={handleVerifyOtp}>
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OtpPage;
// src/Pages/OtpPage.jsx
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OtpPage() {
  const [searchParams] = useSearchParams();
  const input = searchParams.get("input");
  const from = searchParams.get("from");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // 1. Verify OTP
      await axios.post(
        "http://168.231.76.141:3002/auth/verifyotp",
        { input, otp },
        {
          headers: {
            "Content-Type": "application/json",
            userType: "USER",
          },
        }
      );

      // 2. Register user after OTP is verified
      const signupData = JSON.parse(localStorage.getItem("signupData"));
      await axios.post(
        "http://168.231.76.141:3002/auth/signUp",
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
            userType: "USER",
          },
        }
      );

      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid OTP or registration failed."
      );
    }
  };

  const sendOtp = async (email) => {
    try {
      await axios.post(
        "http://168.231.76.141:3002/auth/sendotp",
        { input: email },
        {
          headers: {
            "Content-Type": "application/json",
            userType: "USER",
          },
        }
      );
      alert("OTP has been sent to your email!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>OTP Verification</h2>
      <p>
        Please enter the OTP sent to: <strong>{input}</strong>
      </p>
      <p>
        Request from: <em>{from}</em>
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "100%",
            marginBottom: "1rem",
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem" }}
        >
          Verify OTP
        </button>
      </form>

      <button
        type="button"
        style={{ marginTop: "1rem" }}
        onClick={() => sendOtp(input)}
      >
        Resend OTP
      </button>
    </div>
  );
}

export default OtpPage;

// Call this when the user submits their email during signup
