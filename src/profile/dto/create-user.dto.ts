import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';
import { Column } from 'sequelize-typescript';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'unique email' })
  @IsString({ message: 'must be a string' })
  @Column({ unique: true })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({ example: '1234', description: 'password' })
  @IsString({ message: 'must be a string' })
  @Length(4, 16, { message: 'must be between 4 and 16' })
  readonly password: string;

  @ApiProperty({ example: 'Garaev Insaf', description: 'user name' })
  @IsString({ message: 'must be a string' })
  readonly name: string;

  @ApiProperty({ example: 10000, description: 'money spending limit' })
  @IsNumber({}, { message: 'must be a number' })
  readonly spending_limit: number;
}
