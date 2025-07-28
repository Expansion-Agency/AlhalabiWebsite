import { Orders } from "@prisma/client";
import { orderItems } from "@prisma/client";

type Payload = {
  role: string;
  sub: number;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: Payload;
  }
}
