import Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

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
}


export const updateProductSchema = Joi.object<updateCategoryDto>({
  nameEn: Joi.string().required(),
  nameAr: Joi.string().required(),
});
