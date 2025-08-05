export class CreateReviewDto {
  rating: number;
  comment?: string;
  productId: number;  // matches model Reviews.productId
  userId?: number;    // optional, matches model Reviews.userId which is nullable
}
