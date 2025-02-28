import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../category/category.model';
import { Transaction } from '../transaction/transaction.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'profile', createdAt: false, updatedAt: false })
export class Profile extends Model<Profile, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@mail.com', description: 'unique email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'scotch', description: 'name of user' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: '2025-02-25T05:52:36.062Z',
    description: 'created date',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  created_at: string;

  @ApiProperty({
    example: '2025-02-25T05:52:36.062Z',
    description: 'updated date',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  updated_at: string;

  @ApiProperty({ example: 60000, description: 'money spending limit' })
  @Column({ type: DataType.REAL, allowNull: null })
  spending_limit: number;

  @HasMany(() => Category)
  categories: Category[];

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
