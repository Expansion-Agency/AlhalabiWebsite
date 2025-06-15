import { useState } from "react";
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

function App() {
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
      </Routes>
    </>
  );
}

export default App;
