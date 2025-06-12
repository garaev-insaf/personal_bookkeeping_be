import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
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
}
