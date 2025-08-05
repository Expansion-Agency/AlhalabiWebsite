// export class CreateReviewDto {
//   // rating: number;
//   // comment?: string;
//   // productId?: number;  // matches model Reviews.productId
//   // userId?: number; 
//    // optional, matches model Reviews.userId which is nullable
// }
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import Joi from 'joi';

export class CreateReviewDto {
  @ApiProperty()
  rating: number;

  @ApiPropertyOptional()
  comment?: string;

  @ApiProperty()
  productId: number;

  @ApiPropertyOptional()
  userId?: number;
}
