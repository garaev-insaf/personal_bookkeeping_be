import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Supermarket', description: 'Category of spending' })
  @IsString({ message: 'must be a string' })
  readonly name: string;

  @ApiProperty({
    example: 'This category applies to grocery shopping',
    description: 'Description of category',
  })
  @IsString({ message: 'must be a string' })
  readonly description: string;

  @ApiProperty({ example: 1, description: 'Id of user' })
  @IsNumber({}, { message: 'must be a number' })
  readonly user_id: number;
}
