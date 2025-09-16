import { Injectable, NotFoundException } from '@nestjs/common';
import multer from 'multer';
import prisma from '../shared/prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { Request } from 'express';
import Client from 'ftp';

@Injectable()
export class CategoryService {
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
    const remotePath = `/public_html/category/${fileName}`;

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
  return path || '';
  }
}
