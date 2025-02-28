import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Transaction } from './transaction.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateProfileDto } from './dto/update-transaction.dto';
import { JwtAuthGuards } from 'src/auth/jwt-auth.guards';
import { AuthProfile } from 'src/profile/profile.decorator';

@ApiTags('Transaction Api')
@ApiBearerAuth() // Указываем, что тут нужна авторизация
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiOperation({ summary: 'transaction creation' })
  @ApiResponse({ status: 200, type: Transaction })
  @UseGuards(JwtAuthGuards)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateTransactionDto, @AuthProfile() profile) {
    return this.transactionService.createTransaction(userDto, profile.id);
  }

  @ApiOperation({ summary: 'get all transactions from DB' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @UseGuards(JwtAuthGuards)
  @Get()
  getAll(@AuthProfile() profile) {
    return this.transactionService.getAllTransactionsByProfile(profile.id);
  }

  @ApiOperation({ summary: 'update transaction' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @UseGuards(JwtAuthGuards)
  @Patch(':id')
  updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateProfileDto,
    @AuthProfile() profile,
  ) {
    return this.transactionService.updateTransaction(
      id,
      updateData,
      profile.id,
    );
  }

  @ApiOperation({ summary: 'delete transaction' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @UseGuards(JwtAuthGuards)
  @Delete(':id')
  deleteTransaction(
    @Param('id', ParseIntPipe) id: number,
    @AuthProfile() profile,
  ) {
    return this.transactionService.deleteTransaction(id, profile.id);
  }
}
