import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";
import ProductView from "./Pages/ProductView";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Resetpass from "./Pages/Resetpass";
import Forgotpass from "./Pages/Forgotpass";
import Profile from "./Pages/Profile";
import OtpPage from "./Pages/OtpPage";

import Layout from "./Layouts/Layout";
import DashboardLayout from "./Layouts/DashboardLayout";

import DashboardHome from "./Dashboard/DashboardHome";
import DashboardAdmin from "./Dashboard/DashboardAdmin";
import DashboardProducts from "./Dashboard/DashboardProducts";
import DashboardCategories from "./Dashboard/DashboardCategories";
import DashboardReviews from "./Dashboard/DashboardReviews";
import DashboardUsers from "./Dashboard/DashboardUsers";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language || "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about-us"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <Layout>
              <ProductView />
            </Layout>
          }
        />

        {/* New OTP Route */}
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/login" element={<Login userType="USER" />} />
        <Route path="/admin-login" element={<Login userType="ADMIN" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgotpass />} />
        <Route path="/reset-password" element={<Resetpass />} />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/admins"
          element={
            <DashboardLayout>
              <DashboardAdmin />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <DashboardLayout>
              <DashboardUsers />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <DashboardLayout>
              <DashboardProducts />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/categories"
          element={
            <DashboardLayout>
              <DashboardCategories />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/reviews"
          element={
            <DashboardLayout>
              <DashboardReviews />
            </DashboardLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
