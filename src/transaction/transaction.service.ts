import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction } from './transaction.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateProfileDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction) private transactionRepository: typeof Transaction,
  ) {}

  async createUser(dto: CreateTransactionDto) {
    const user = await this.transactionRepository.create(dto);
    return user;
  }

  async getAllTransactionsByProfile(user_id: number) {
    const transactions = await this.transactionRepository.findAll({
      include: { all: true },
      where: { user_id },
      attributes: {
        exclude: ['category_id', 'profile_id'],
      },
    });
    return transactions;
  }

  async updateTransaction(
    userId: number,
    updateData: UpdateProfileDto,
    user_id: number,
  ) {
    const transaction = await this.transactionRepository.findByPk(userId);
    if (!transaction) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (transaction.user_id !== user_id) {
      throw new HttpException(
        'Обнаглел? Это не твоя транзакция!',
        HttpStatus.NOT_FOUND,
      );
    }

    await transaction.update(updateData);
    return transaction;
  }

  async deleteTransaction(transactionId: number, user_id: number) {
    const transaction = await this.transactionRepository.findByPk(
      transactionId,
    );

    if (!transaction) {
      throw new HttpException('Транзакция не найдена', HttpStatus.NOT_FOUND);
    }

    if (transaction.user_id !== user_id) {
      throw new HttpException(
        'Все нормально с совестью? Это не твоя транзакция!',
        HttpStatus.FORBIDDEN,
      );
    }

    await transaction.destroy();
    return { message: 'Транзакция успешно удалена' };
  }
}
