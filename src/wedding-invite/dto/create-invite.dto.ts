import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateInviteDto {
  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО гостя',
  })
  @IsString({ message: 'must be a string' })
  readonly full_name: string;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО того, кого пригласили',
  })
  @IsString({ message: 'must be a string' })
  readonly lover_full_name: string;

  @ApiProperty({
    example: true,
    description: 'Идет?',
    required: true,
  })
  @IsBoolean({ message: 'must be a boolean' })
  readonly is_coming: boolean;
}
