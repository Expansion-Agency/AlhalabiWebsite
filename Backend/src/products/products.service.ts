import { Injectable, NotFoundException } from "@nestjs/common";
import prisma from "src/shared/prisma/client";
import { createProductDto } from "./dto/createProduct.dto";
import { updateProductDto } from "./dto/updateProduct.dto";

@Injectable()
export class ProductsService {
  // Get all products with default image
  async findAll() {
    const products = await prisma.products.findMany({
      where: { deletedAt: null },
      include: { productImages: true },
    });

    return products.map((product) => {
      const defaultImage =
        product.productImages.find((img) => img.isDefault) ||
        product.productImages[0];
      return {
        ...product,
        imageUrl: defaultImage ? defaultImage.imagePath : "/default.png",
      };
    });
  }

  // Get single product with default image
  async findOne(id: number) {
    if (!id) throw new NotFoundException("Product id is required");

    const product = await prisma.products.findUnique({
      where: { id },
      include: { productImages: true },
    });

    if (!product) throw new NotFoundException("Product not found");

    await prisma.products.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    const defaultImage =
      product.productImages.find((img) => img.isDefault) || product.productImages[0];

    return { ...product, imageUrl: defaultImage?.imagePath || "/default.png" };
  }

  async create(product: createProductDto) {
    return await prisma.products.create({
      data: { ...product },
      include: { productImages: true },
    });
  }

  async update(id: number, product: updateProductDto) {
    return await prisma.products.update({
      where: { id },
      data: { ...product },
      include: { productImages: true },
    });
  }

  async delete(id: number) {
    return await prisma.products.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

