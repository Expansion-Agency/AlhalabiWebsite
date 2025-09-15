import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from '../shared/prisma/client';
import { Request } from 'express';

@Injectable()
export class CategoryService {
  constructor() {}

  async handleMultipartForm(req: Request, categoryId?: number) {
    try {
      const body = req.body;

      const nameEn = body.nameEn;
      const nameAr = body.nameAr;
      const parentId = body.parentId ? Number(body.parentId) : null;
      const imagePath = body.imagePath || '';  // Expect imagePath as string URL in the body

      if (categoryId) {
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
            imagePath,
          },
        });
        return updated;
      } else {
        const created = await prisma.category.create({
          data: {
            nameEn,
            nameAr,
            parentId,
            imagePath,
          },
        });
        return created;
      }
    } catch (error) {
      throw error;
    }
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

  private formatImagePath(path: string | null): string {
    if (!path) return '';
    return path.startsWith('http')
      ? path
      : `https://alhalapi.com${path.startsWith('/') ? '' : '/'}${path}`;
  }
}
