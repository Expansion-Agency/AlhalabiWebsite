import { Injectable } from "@nestjs/common";
import prisma from "./shared/prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.seedData();
  }

  private async seedData(): Promise<void> {
    await this.seedSuperAdmin();
  }

  private async seedSuperAdmin(): Promise<void> {
    const Admins = await prisma.admins.findFirst();
    if (!Admins) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "",
        10
      );
      await prisma.admins.create({
        data: {
          email: process.env.ADMIN_MAIL || "",
          password: hashedPassword || "",
        },
      });
    }
  }
}
