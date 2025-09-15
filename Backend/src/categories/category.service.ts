import { Injectable, NotFoundException } from '@nestjs/common';
import multer from 'multer';
import prisma from '../shared/prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { Request } from 'express';
@Injectable()
export class CategoryService {
  constructor() {}

  // Save image to disk (simulate basic multer handling)
  private async saveImage(file: Express.Multer.File): Promise<string> {
    const uploadDir = path.join(__dirname, '../../uploads/categories');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/categories/${fileName}`;
  }

  async handleMultipartForm(req: Request, categoryId?: number) {
    return new Promise<any>((resolve, reject) => {
      const storage = multer.memoryStorage();
      const upload = multer({ storage }).single('imageFile');

      upload(req, null as any, async (err:any) => {
        if (err) return reject(err);

        const body = req.body;
        const imageFile = req.file;

        const nameEn = body.nameEn;
        const nameAr = body.nameAr;
        const parentId = body.parentId ? Number(body.parentId) : null;

        let imagePath: string | undefined;

        if (imageFile) {
          imagePath = await this.saveImage(imageFile);
        }

        try {
          if (categoryId) {
            // === UPDATE ===
            const existing = await prisma.category.findUnique({
              where: { id: categoryId },
            });
            if (!existing) {
              throw new NotFoundException('Category not found');
            }

            const updated = await prisma.category.update({
              where: { id: categoryId },
              data: {
                nameEn,
                nameAr,
                parentId,
                ...(imagePath && { imagePath }),
              },
            });
            return resolve(updated);
          } else {
            // === CREATE ===
            const created = await prisma.category.create({
              data: {
                nameEn,
                nameAr,
                parentId,
                imagePath: imagePath || "",
              },
            });
            return resolve(created);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async findAll() {
    return prisma.category.findMany({
      include: {
        parent: true,
      },
    });
  }

  async findOne(id: number) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
      },
    });
  }

  async delete(id: number) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return prisma.category.delete({
      where: { id },
    });
  }
}
