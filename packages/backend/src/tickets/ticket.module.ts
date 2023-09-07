import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Ticket } from "./ticket.model";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

@Module({
  imports: [SequelizeModule.forFeature([Ticket])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketModule {}