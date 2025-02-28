import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from '../profile/profile.model';
import { Transaction } from '../transaction/transaction.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    SequelizeModule.forFeature([Profile, Transaction, Category]),
    AuthModule,
  ],
  // exports: [Category],
})
export class CategoryModule {}
