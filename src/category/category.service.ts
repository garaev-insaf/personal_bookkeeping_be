import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async create(dto: CreateCategoryDto, user_id: number) {
    const post = await this.categoryRepository.create({ ...dto, user_id });
    return post;
  }

  async getAllCategories() {
    const users = await this.categoryRepository.findAll({
      include: { all: true },
    });
    return users;
  }

  async getAllUserCategories(user_id: number) {
    const users = await this.categoryRepository.findAll({
      where: { user_id },
    });
    return users;
  }

  async updateCategory(
    userId: number,
    updateData: CreateCategoryDto,
    user_id: number,
  ) {
    const category = await this.categoryRepository.findByPk(userId);
    if (!category) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (category.user_id !== user_id) {
      throw new HttpException(
        'Обнаглел? Это не твоя категория!',
        HttpStatus.NOT_FOUND,
      );
    }

    await category.update(updateData);
    return category;
  }

  async deleteCategory(transactionId: number, user_id: number) {
    const category = await this.categoryRepository.findByPk(transactionId);

    if (!category) {
      throw new HttpException('Категория не найдена', HttpStatus.NOT_FOUND);
    }

    if (category.user_id !== user_id) {
      throw new HttpException(
        'Все нормально с совестью? Это не твоя транзакция!',
        HttpStatus.FORBIDDEN,
      );
    }

    await category.destroy();
    return { message: 'Категория успешно удалена' };
  }
}
