import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import prisma from 'src/shared/prisma/client';
import Client from 'ftp';
import { Request } from 'express';
import Busboy from 'busboy';

@Injectable()
export class CategoryService {
  private ftpConfig = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    port: 21,
  };

  /**
   * Uploads a buffer to FTP server
   */
  private async uploadToFTP(buffer: Buffer, filename: string): Promise<string> {
    const ftpClient = new Client();
    const remoteFilePath = `/public_html/category/${filename}`;

    await new Promise<void>((resolve, reject) => {
      ftpClient.on('ready', () => {
        ftpClient.put(buffer, remoteFilePath, (err) => {
          ftpClient.end();
          if (err) reject(err);
          else resolve();
        });
      });

      ftpClient.on('error', reject);
      ftpClient.connect(this.ftpConfig);
    });

    return `${process.env.FTP_PATH_C}${filename}`;
  }

  /**
   * Handles multipart/form-data manually using Busboy
   * If `id` is provided, it performs an update. Otherwise, it creates a new category.
   */
  async handleMultipartForm(req: Request, id?: number) {
    return new Promise((resolve, reject) => {
      const busboy = Busboy({ headers: req.headers });

      let nameEn = '';
      let nameAr = '';
      let parentId: number | null = null;

      let imageBuffer: Buffer | null = null;
      let imageFilename = '';
      const bufferChunks: Buffer[] = [];

      busboy.on('file', (fieldname:string, file:NodeJS.ReadableStream, filename:string) => { imageFilename = filename;

        file.on('data', (data:Buffer) => {
          bufferChunks.push(data);
        });

        file.on('end', () => {
          imageBuffer = Buffer.concat(bufferChunks);
        });
      });

      busboy.on('field', (fieldname:string, val:string) => {
        switch (fieldname) {
          case 'nameEn':
            nameEn = val;
            break;
          case 'nameAr':
            nameAr = val;
            break;
          case 'parentId':
            parentId = val ? parseInt(val) : null;
            break;
        }
      });

      busboy.on('finish', async () => {
        try {
          // Check required fields
          if (!nameEn || !nameAr) {
            throw new BadRequestException('Missing nameEn or nameAr');
          }

          // Validate parentId existence if provided
          if (parentId) {
            const parentExists = await prisma.category.findUnique({ where: { id: parentId } });
            if (!parentExists) {
              throw new BadRequestException(`Parent category with ID ${parentId} does not exist`);
            }
          }

          // Upload image if provided
          let imagePath: string | undefined;
          if (imageBuffer && imageFilename) {
            imagePath = await this.uploadToFTP(imageBuffer, imageFilename);
          } else if (!id) {
            throw new BadRequestException('Image file is required for category creation');
          }

          if (id) {
            // Update
            const updated = await prisma.category.update({
              where: { id },
              data: {
                nameEn,
                nameAr,
                parentId,
                ...(imagePath ? { imagePath } : {}),
              },
            });

            return resolve(updated);
          } else {
            // Create
            const created = await prisma.category.create({
              data: {
                nameEn,
                nameAr,
                parentId,
                imagePath: imagePath!,
              },
            });

            return resolve(created);
          }
        } catch (error) {
          return reject(error);
        }
      });

      req.pipe(busboy);
    });
  }

  async findAll() {
    return await prisma.category.findMany({
      where: { deletedAt: null },
      include: {
        products: true,
        children: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
        children: true,
        parent: true, // Optional: include parent for breadcrumb-style UI
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async delete(id: number) {
    const category = await prisma.category.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
