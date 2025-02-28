import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    example: 'scotch',
    description: 'name of user',
  })
  @IsString({ message: 'must be a string' })
  readonly name: string;

  @ApiProperty({ example: 325.68, description: 'Sum of transaction' })
  @IsNumber({}, { message: 'must be a number' })
  sum: number;

  @ApiProperty({
    example: false,
    description: 'is transaction incoming',
    required: false,
  })
  @IsBoolean({ message: 'must be a boolean' })
  readonly is_incoming: boolean;

  @ApiProperty({
    example: '2025-02-25T05:52:36.062Z',
    description: 'date of transaction',
    required: false,
  })
  @IsString({ message: 'must be a string' })
  readonly transaction_date: string;

  @ApiProperty({
    example: 'Bought fruits',
    description: 'comment of transaction',
    required: false,
  })
  @IsString({ message: 'must be a string' })
  readonly comment: string;

  @ApiProperty({ example: 1, description: 'Id of category' })
  @IsNumber({}, { message: 'must be a number' })
  readonly category_id: number;

  @ApiProperty({ example: 1, description: 'Id of user' })
  @IsNumber({}, { message: 'must be a number' })
  readonly user_id: number;
}
