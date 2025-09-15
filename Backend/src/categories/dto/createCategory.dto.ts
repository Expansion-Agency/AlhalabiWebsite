import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import Joi from 'joi';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name in English' })
  nameEn: string;

  @ApiProperty({ description: 'Category name in Arabic' })
  nameAr: string;

  @ApiProperty({ type: 'string', format: 'binary' }) 
  imageFile: any;

  @ApiPropertyOptional({ description: 'Optional parent category ID (for subcategories)' })
  parentId?: number;
}
