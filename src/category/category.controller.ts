import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './category.model';

@ApiTags('Categories Api')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'get all categories from DB' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }

  @Post()
  createPost(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }
}
