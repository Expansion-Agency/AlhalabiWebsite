import { ApiProperty } from "@nestjs/swagger";
import Joi from "joi";

export class updateAdminDto {
  @ApiProperty()
  email: string;
  password: string;
}

export const updateAdminSchema = Joi.object<updateAdminDto>().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});
