import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './category.model';
import { JwtAuthGuards } from 'src/auth/jwt-auth.guards';
import { AuthProfile } from 'src/profile/profile.decorator';

@ApiTags('Categories Api')
@ApiBearerAuth() // Указываем, что тут нужна авторизация
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'get all categories by profile' })
  @ApiResponse({ status: 200, type: [Category] })
  @UseGuards(JwtAuthGuards)
  @Get()
  getAll(@AuthProfile() profile) {
    return this.categoryService.getAllUserCategories(profile.id);
  }

  @Post()
  @UseGuards(JwtAuthGuards)
  createPost(@Body() dto: CreateCategoryDto, @AuthProfile() profile) {
    return this.categoryService.create(dto, profile.id);
  }

  @ApiOperation({ summary: 'update category' })
  @ApiResponse({ status: 200, type: [Category] })
  @UseGuards(JwtAuthGuards)
  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: CreateCategoryDto,
    @AuthProfile() profile,
  ) {
    return this.categoryService.updateCategory(id, updateData, profile.id);
  }

  @ApiOperation({ summary: 'delete category' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuards)
  @Delete(':id')
  deleteTransaction(
    @Param('id', ParseIntPipe) id: number,
    @AuthProfile() profile,
  ) {
    return this.categoryService.deleteCategory(id, profile.id);
  }
}
