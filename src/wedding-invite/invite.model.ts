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
import { CreateInviteDto } from './dto/create-invite.dto';

type TransacionCreationAttrs = CreateInviteDto;

@Table({ tableName: 'rspv_state', createdAt: false, updatedAt: false })
export class Invite extends Model<Invite, TransacionCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО гостя' })
  @Column({ type: DataType.STRING, allowNull: false })
  full_name: string;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО того, кого пригласили',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  lover_full_name: number;

  @ApiProperty({
    example: 'Есть аллергия на что-то?',
    description: 'Есть аллергия на что-то?',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  additional: boolean;

  @ApiProperty({
    example: '2025-02-25T05:52:36.062Z',
    description: 'date of create',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  created_at: string;

  @ApiProperty({
    example: true,
    description: 'Идет?',
    required: true,
  })
  @Column({ type: DataType.REAL, allowNull: false })
  is_coming: boolean;

  @ApiProperty({
    example: ['Виски', 'кола'],
    description: 'Какое алко буш?',
  })
  @Column(DataType.ARRAY(DataType.STRING))
  alco?: string[];
}
