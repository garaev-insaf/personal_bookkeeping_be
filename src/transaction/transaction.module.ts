import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';
import { Category } from '../category/category.model';
import { Profile } from '../profile/profile.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    SequelizeModule.forFeature([Transaction, Profile, Category]),
    AuthModule,
  ],
  // exports: [TransactionService],
})
export class TransactionModule {}
