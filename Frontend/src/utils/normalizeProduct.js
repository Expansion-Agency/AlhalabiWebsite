// src/utils/normalizeProduct.js

export function normalizeProduct(product) {
  if (!product) return product;

  const basePath = process.env.FTP_PATH || "";

  return {
    ...product,
    imageUrl: product.image
      ? `${basePath.replace(/\/$/, "")}/${product.image.replace(/^\//, "")}`
      : null,
  };
}
