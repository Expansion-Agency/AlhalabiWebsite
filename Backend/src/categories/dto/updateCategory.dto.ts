import Joi from 'joi';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class updateCategoryDto {
  @ApiProperty({ description: 'Category name in English' })
  nameEn: string;

  @ApiProperty({ description: 'Category name in Arabic' })
  nameAr: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Optional category image',
  })
  imageFile?: any;

  @ApiPropertyOptional({
    description: 'Optional parent category ID for subcategories',
    type: Number,
  })
  parentId?: number;
}
export const updateCategorySchema = Joi.object<updateCategoryDto>({
  nameEn: Joi.string().required(),
  nameAr: Joi.string().required(),
  parentId: Joi.number().optional().allow(null),
});
