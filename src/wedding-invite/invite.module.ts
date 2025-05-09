import { Module } from '@nestjs/common';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invite } from './invite.model';

@Module({
  controllers: [InviteController],
  providers: [InviteService],
  imports: [SequelizeModule.forFeature([Invite])],
})
export class InviteModule {}
