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
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './transaction.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateProfileDto } from './dto/update-transaction.dto';

@ApiTags('Transaction Api')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiOperation({ summary: 'transaction creation' })
  @ApiResponse({ status: 200, type: Transaction })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateTransactionDto) {
    return this.transactionService.createUser(userDto);
  }

  @ApiOperation({ summary: 'get all users from DB' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @Get()
  getAll() {
    return this.transactionService.getAllTransactions();
  }

  @ApiOperation({ summary: 'update profile' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @Patch(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateProfileDto,
  ) {
    return this.transactionService.updateProfile(id, updateData);
  }
}
