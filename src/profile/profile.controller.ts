import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileService } from './profile.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from './profile.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Profile Api')
@Controller('profile')
export class UsersController {
  constructor(private profileService: ProfileService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: 200, type: Profile })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.profileService.createUser(userDto);
  }

  @ApiOperation({ summary: 'get all users from DB' })
  @ApiResponse({ status: 200, type: [Profile] })
  @Get()
  getAll() {
    return this.profileService.getAllUsers();
  }

  @ApiOperation({ summary: 'update profile' })
  @ApiResponse({ status: 200, type: [Profile] })
  @Patch(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(id, updateData);
  }
}
