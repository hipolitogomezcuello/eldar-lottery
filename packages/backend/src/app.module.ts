import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {User} from "./user/user.model";
import {UserModule} from "./user/user.module";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import { TicketModule } from "./tickets/ticket.module";
import { Ticket } from "./tickets/ticket.model";
import { RaffleModule } from "./raffles/raffle.module";
import { Raffle } from "./raffles/raffle.model";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      models: [User, Ticket, Raffle],
    }),
    UserModule,
    AuthModule,
    TicketModule,
    RaffleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
