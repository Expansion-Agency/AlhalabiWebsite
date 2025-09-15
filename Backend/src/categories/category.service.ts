import { Injectable, NotFoundException } from '@nestjs/common';
import multer from 'multer';
import prisma from '../shared/prisma/client';
import { Request } from 'express';

@Injectable()
export class CategoryService {
  constructor() {}

  // ✅ Use body-only (no files), and imagePath comes as a URL
  async handleMultipartForm(req: Request, categoryId?: number) {
    return new Promise<any>((resolve, reject) => {
      const storage = multer.memoryStorage();
      const upload = multer({ storage }).none(); // ⛔️ No file field

      upload(req, null as any, async (err: any) => {
        if (err) return reject(err);

        const { nameEn, nameAr, parentId, imagePath } = req.body;

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
                parentId: parentId ? Number(parentId) : null,
                imagePath: imagePath || existing.imagePath,
              },
            });
            return resolve(updated);
          } else {
            // === CREATE ===
            const created = await prisma.category.create({
              data: {
                nameEn,
                nameAr,
                parentId: parentId ? Number(parentId) : null,
                imagePath: imagePath || '',
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
    const categories = await prisma.category.findMany({
      include: {
        parent: true,
      },
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
      include: {
        parent: true,
      },
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

    return prisma.category.delete({
      where: { id },
    });
  }

  // ✅ Convert old relative paths to full URLs
  private formatImagePath(path: string | null): string {
    if (!path) return '';
    return path.startsWith('http')
      ? path
      : `https://alhalapi.com${path.startsWith('/') ? '' : '/'}${path}`;
  }
}
