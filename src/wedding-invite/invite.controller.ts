import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteService } from './invite.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Invite } from './invite.model';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Invite Api')
@ApiBearerAuth() // Указываем, что тут нужна авторизация
@Controller('invite')
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @ApiOperation({ summary: 'invite creation' })
  @ApiResponse({ status: 200, type: Invite })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() inviteDto: CreateInviteDto) {
    return this.inviteService.createInvite(inviteDto);
  }

  @ApiOperation({ summary: 'get all invites from DB' })
  @ApiResponse({ status: 200, type: [Invite] })
  @Get()
  getAll() {
    return this.inviteService.getAllInvite();
  }
}
