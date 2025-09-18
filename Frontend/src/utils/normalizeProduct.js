// src/utils/normalizeProduct.js
export function normalizeProduct(product) {
  if (!product) return product;

  // If backend already provides full imageUrl, use it directly
  if (product.imageUrl) {
    return { ...product, imageUrl: product.imageUrl };
  }

  // Otherwise, fallback to build it from "image"
  const basePath = import.meta.env.VITE_IMAGE_PATH || "";
  return {
    ...product,
    imageUrl: product.image
      ? `${basePath.replace(/\/$/, "")}/${product.image.replace(/^\//, "")}`
      : null,
  };
}
