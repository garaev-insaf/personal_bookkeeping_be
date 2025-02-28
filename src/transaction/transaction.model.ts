import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../category/category.model';
import { Profile } from '../profile/profile.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';

interface TransacionCreationAttrs extends CreateTransactionDto {
  user_id: number;
}

@Table({ tableName: 'transaction', createdAt: false, updatedAt: false })
export class Transaction extends Model<Transaction, TransacionCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'scotch', description: 'name of user' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 325.68, description: 'Sum of transaction' })
  @Column({ type: DataType.REAL, allowNull: false })
  sum: number;

  @ApiProperty({ example: false, description: 'is transaction incoming' })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_incoming: boolean;

  @ApiProperty({
    example: '2025-02-25T05:52:36.062Z',
    description: 'date of transaction',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  transaction_date: string;

  @ApiProperty({
    example: 'Bought fruits',
    description: 'comment of transaction',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  comment: string;

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

  @ApiProperty({ example: 1, description: 'Id of category' })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  category_id: number;

  @ApiProperty({ example: 1, description: 'Id of user' })
  @ForeignKey(() => Profile)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @BelongsTo(() => Category) // Связь
  category: Category;
}
