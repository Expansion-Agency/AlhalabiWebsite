import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Body } from "@nestjs/common";
import { CategoryService } from "./category.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { Role } from "src/shared/enums/role.enum";
import { Roles } from "src/shared/decorators/roles.decorator";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { updateCategoryDto } from "./dto/updateCategory.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("category")
@ApiBearerAuth()
@Controller("category")
export class CategoryController {
  constructor(protected readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "Create Category" })
  @ApiConsumes("multipart/form-data")
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor("imageFile"))
  @ApiBody({ type: CreateCategoryDto })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() imageFile: Express.Multer.File
  ) {
    return await this.categoryService.create(createCategoryDto, imageFile);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.categoryService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @ApiParam({ name: "id", required: true })
  @ApiBody({ type: updateCategoryDto })
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor("imageFile"))
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: updateCategoryDto,
    @UploadedFile() imageFile?: Express.Multer.File
  ) {
    return await this.categoryService.update(id, body.nameEn, body.nameAr, imageFile);
  }

  @ApiParam({ name: "id", required: true })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiParam({ name: "id", required: true })
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return await this.categoryService.delete(id);
  }
}
