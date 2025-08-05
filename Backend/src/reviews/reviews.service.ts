import { Injectable } from "@nestjs/common";
import prisma from "src/shared/prisma/client";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Injectable()
export class ReviewsService {
  async findAll() {
    return await prisma.reviews.findMany({
      include: {
        user: true,
        product: true,
      },
    });
  }

  async findOne(id: number) {
    return await prisma.reviews.findUnique({
      where: { id },
      include: {
        user: true,
        product: true,
      },
    });
  }

async create(review: CreateReviewDto) {
  await prisma.reviews.create({
 data: {
    comment: review.comment,
    rating: review.rating,
    productId:review.productId,
  }
});

}

async update(id: number, review: UpdateReviewDto) {
  return await prisma.reviews.update({
    where: { id },
     data: {
...review,  },
});
}


  async delete(id: number) {
    return await prisma.reviews.delete({
      where: { id },
    });
  }
}
