import React, { useState } from "react";
const allProducts = [
  {
    id: 1,
    title: "Packaging Machine",
    category: "Packaging",
    image:
      "https://www.spackmachine.com/wp-content/uploads/2022/03/Pouch-packaging-machines-1.png",
    description: "High-speed packaging solution for various products.",
  },
  {
    id: 2,
    title: "Food Processor",
    category: "Food Processing",
    image:
      "https://essemmindia.com/wp-content/uploads/2020/07/Overview-of-Food-Processing-Equipment-for-commercial-kitchens.jpeg",
    description: "Reliable machine for food cutting, mixing, and grinding.",
  },
  {
    id: 3,
    title: "Labeling System",
    category: "Labeling",
    image:
      "https://www.herma.us/fileadmin/Etikettierer/Produkte/152C/Clean_Design1.jpg",
    description: "Efficient automatic labeling for all packaging types.",
  },
  {
    id: 4,
    title: "Industrial Mixer",
    category: "Mixers",
    image: "https://m.media-amazon.com/images/I/71j06FmmWxL.jpg",
    description: "Heavy-duty mixers for industrial applications.",
  },
  {
    id: 5,
    title: "Spare Parts",
    category: "Accessories",
    image:
      "https://www.texasgulfsales.com/media/k2/items/cache/e31ace2a15a7c70645ad83df9ecd43b0_XL.jpg",
    description: "Genuine parts and accessories for all our machines.",
  },
];

const categories = [
  "All",
  "Packaging",
  "Food Processing",
  "Labeling",
  "Mixers",
  "Accessories",
];

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Our Products
      </h1>
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-red-600 border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto w-fit h-60 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-700 mb-2 px-3">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 p-3">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
