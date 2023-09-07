import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Raffle } from "./raffle.model";
import { RafflesController } from "./raffles.controller";
import { RafflesService } from "./raffles.service";
import { TicketsService } from "../tickets/tickets.service";
import { Ticket } from "../tickets/ticket.model";

@Module({
  imports: [SequelizeModule.forFeature([Raffle, Ticket])],
  controllers: [RafflesController],
  providers: [RafflesService, TicketsService],
})
export class RaffleModule {}