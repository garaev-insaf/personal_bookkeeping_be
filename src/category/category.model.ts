import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '../profile/profile.model';
import { Transaction } from '../transaction/transaction.model';

interface CategoryCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'category', createdAt: false, updatedAt: false })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Supermarket', description: 'Category of spending' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'This category applies to grocery shopping',
    description: 'Description of category',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({
    example: '2025-02-25T05:52:36.062Z',
    description: 'created date',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  created_at: string;

  @ApiProperty({
    example: '2025-02-25T05:52:36.062Z',
    description: 'date of last update',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  updated_at: string;

  @ApiProperty({ example: 1, description: 'Id of user' })
  @ForeignKey(() => Profile)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
