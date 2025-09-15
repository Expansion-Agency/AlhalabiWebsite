import { Injectable, NotFoundException } from '@nestjs/common';
import multer from 'multer';
import prisma from '../shared/prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { Request } from 'express';

@Injectable()
export class CategoryService {
  constructor() {}

  // Save image to disk
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

      upload(req, null as any, async (err: any) => {
        if (err) return reject(err);

        // Now req.body should be populated by multer
        const body = req.body;

        if (!body) {
          return reject(new Error('Request body is missing'));
        }

        const nameEn = body.nameEn;
        const nameAr = body.nameAr;
        const parentId = body.parentId ? Number(body.parentId) : null;

        let imagePath: string | undefined;

        if (req.file) {
          imagePath = await this.saveImage(req.file);
        }

        try {
          if (categoryId) {
            // Update existing category
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
            resolve(updated);
          } else {
            // Create new category
            const created = await prisma.category.create({
              data: {
                nameEn,
                nameAr,
                parentId,
                imagePath: imagePath || '',
              },
            });
            resolve(created);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async findAll() {
    const categories = await prisma.category.findMany({
      include: { parent: true },
    });

    return categories.map((cat) => ({
      ...cat,
      imagePath: this.formatImagePath(cat.imagePath),
      parent: cat.parent
        ? {
            ...cat.parent,
            imagePath: this.formatImagePath(cat.parent.imagePath),
          }
        : null,
    }));
  }

  async findOne(id: number) {
    const cat = await prisma.category.findUnique({
      where: { id },
      include: { parent: true },
    });

    if (!cat) return null;

    return {
      ...cat,
      imagePath: this.formatImagePath(cat.imagePath),
      parent: cat.parent
        ? {
            ...cat.parent,
            imagePath: this.formatImagePath(cat.parent.imagePath),
          }
        : null,
    };
  }

  async delete(id: number) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return prisma.category.delete({ where: { id } });
  }

  private formatImagePath(path: string | null): string {
    if (!path) return '';
    return path.startsWith('http')
      ? path
      : `https://alhalapi.com${path.startsWith('/') ? '' : '/'}${path}`;
  }
}
