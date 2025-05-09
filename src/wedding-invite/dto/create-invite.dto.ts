import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsBoolean, IsArray, IsString } from 'class-validator';

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
    example: 'Есть аллергия на что-то?',
    description: 'Есть аллергия на что-то?',
  })
  @IsString({ message: 'must be a string' })
  readonly additional: string;

  @ApiProperty({
    example: true,
    description: 'Идет?',
    required: true,
  })
  @IsBoolean({ message: 'must be a boolean' })
  readonly is_coming: boolean;

  @ApiProperty({ example: ['Виски', 'кола'], description: 'Какое алко буш?' })
  @IsArray()
  @IsString({ each: true }) // "each" tells class-validator to run the validation on each item of the array
  @ArrayMinSize(1)
  readonly alco?: string[];
}
