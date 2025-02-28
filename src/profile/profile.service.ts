import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Profile } from './profile.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile) private userRepository: typeof Profile) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return users;
  }

  async updateProfile(userId: number, updateData: UpdateProfileDto) {
    console.log(updateData);
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await user.update(updateData);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
