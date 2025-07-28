import { Orders } from "@prisma/client";
import { orderItems } from "@prisma/client";

type Payload = {
  role: string;
  sub: number;
};
