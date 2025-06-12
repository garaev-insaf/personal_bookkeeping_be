import { Injectable } from '@nestjs/common';
import { Invite } from './invite.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Invite) private transactionRepository: typeof Invite,
  ) {}

  async createInvite(dto: CreateInviteDto) {
    const user = await this.transactionRepository.create(
      { ...dto },
      { include: { all: true } },
    );
    return user;
  }

  async getAllInvite() {
    const transactions = await this.transactionRepository.findAll({
      include: { all: true },
    });
    return transactions;
  }
}
