import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async create(dto: CreateCategoryDto) {
    const post = await this.categoryRepository.create({ ...dto });
    return post;
  }

  async getAllCategories() {
    const users = await this.categoryRepository.findAll({
      include: { all: true },
    });
    return users;
  }
}
