import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { Profile } from './profile/profile.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { Transaction } from './transaction/transaction.model';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { InviteModule } from './wedding-invite/invite.module';
import { Invite } from './wedding-invite/invite.model';

@Module({
  controllers: [],
  imports: [
    // другие модули...
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true, // чтобы доступен был везде без повторного импорта
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Category, Profile, Transaction, Invite],
      // autoLoadModels: true,
    }),
    AuthModule,
    TransactionModule,
    CategoryModule,
    FilesModule,
    InviteModule,
  ],
})
export class AppModule {}
