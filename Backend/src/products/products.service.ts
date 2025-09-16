import { Injectable } from "@nestjs/common";
import prisma from "src/shared/prisma/client";
import { createProductDto } from "./dto/createProduct.dto";
import { updateProductDto } from "./dto/updateProduct.dto";
import * as path from 'path';
import Client from 'ftp';

@Injectable()
export class ProductsService {
  private async saveImage(file: Express.Multer.File): Promise<string> {
    const ftpClient = new Client();
    const ftpConfig = {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: 21,
    };

    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.originalname}`;
    const remotePath = `/public_html/products/${fileName}`;

    await new Promise((resolve, reject) => {
      ftpClient.on('ready', () => {
        ftpClient.put(file.buffer, remotePath, (err) => {
          ftpClient.end();
          if (err) reject(err);
          else resolve(null);
        });
      });
      ftpClient.on('error', reject);
      ftpClient.connect(ftpConfig);
    });

    return `${process.env.FTP_PATH_C}${fileName}`;
  }

  async findAll() {
    return await prisma.products.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        productImages: true,
      },
    });
  }

  async findOne(id: number) {
    if (!id) {
      throw new Error("Product id is required");
    }

    const product = await prisma.products.findUnique({
      where: { id },
      include: { productImages: true },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    await prisma.products.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return product;
  }

  async create(product: createProductDto) {
    return await prisma.products.create({
      data: {
        ...product,
      },
    });
  }

  async update(id: number, product: updateProductDto) {
    return await prisma.products.update({
      data: {
        ...product,
      },
      where: {
        id: id,
      },
    });
  }

  async delete(id: number) {
    return await prisma.products.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: id,
      },
    });
  }
}
