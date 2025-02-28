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

  async getAllTransactions() {
    const transactions = await this.transactionRepository.findAll({
      include: { all: true },
      attributes: {
        exclude: ['category_id', 'profile_id'],
      },
    });
    return transactions;
  }

  async updateProfile(userId: number, updateData: UpdateProfileDto) {
    const user = await this.transactionRepository.findByPk(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await user.update(updateData);
    return user;
  }

  async getUserByEmail(category_id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { category_id },
      include: { all: true },
    });
    return transaction;
  }
}
