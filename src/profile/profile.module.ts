import { Module } from '@nestjs/common';
import { UsersController } from './profile.controller';
import { ProfileService } from './profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { Category } from '../category/category.model';
import { Transaction } from '../transaction/transaction.model';

@Module({
  controllers: [UsersController],
  providers: [ProfileService],
  imports: [SequelizeModule.forFeature([Profile, Transaction, Category])],
  exports: [ProfileService],
})
export class ProfileModule {}
