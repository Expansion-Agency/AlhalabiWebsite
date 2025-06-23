import { useEffect, useState } from "react";
import Header from "./Components/Header";
import HomeWidget from "./Components/HomeWidget";
import Footer from "./Components/Footer";
import Menu from "./Components/Menu";
import Home from "./Pages/Home";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";
import ProductView from "./Pages/ProductView";
import { useTranslation } from "react-i18next";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Resetpass from "./Pages/Resetpass";
import Forgotpass from "./Pages/Forgotpass";
import Profile from "./Pages/Profile";

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
          path="/product/:id"
          element={
            <Layout>
              <ProductView />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
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
      </Routes>
    </>
  );
}

export default App;
