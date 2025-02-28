import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileService } from './profile.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Profile } from './profile.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthProfile } from './profile.decorator';
import { JwtAuthGuards } from 'src/auth/jwt-auth.guards';

@ApiTags('Profile Api')
@ApiBearerAuth() // Указываем, что тут нужна авторизация
@Controller('profile')
export class UsersController {
  constructor(private profileService: ProfileService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: 200, type: Profile })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuards)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.profileService.createUser(userDto);
  }

  @ApiOperation({ summary: 'get all users from DB' })
  @ApiResponse({ status: 200, type: [Profile] })
  @UseGuards(JwtAuthGuards)
  @Get()
  getProfile(@AuthProfile() profile) {
    return this.profileService.getProfile(profile.id);
  }

  @ApiOperation({ summary: 'update profile' })
  @ApiResponse({ status: 200, type: [Profile] })
  @Patch(':id')
  @UseGuards(JwtAuthGuards)
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateProfileDto,
    @AuthProfile() profile,
  ) {
    return this.profileService.updateProfile(id, updateData, profile.id);
  }
}
