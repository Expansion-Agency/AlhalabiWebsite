import React from "react";
import HomeWidget from "../Components/HomeWidget";

function Home() {
  return (
    <>
      <HomeWidget />
      <div className="text-center bg-orange-50 p-15">
        <h2 className="text-3xl font-bold">
          Your Trusted Source for Machinery
        </h2>
        <p className="max-w-3xl mx-auto text-lg mt-4">
          Your trusted source for high-quality industrial and commercial
          machinery. With years of experience and a commitment to excellence, we
          provide reliable equipment solutions tailored to meet the needs of
          businesses across various sectors. Explore our range of machines and
          discover performance, durability, and exceptional service—only at
          Alhalabi.
        </p>
      </div>
    </>
  );
}

export default Home;
