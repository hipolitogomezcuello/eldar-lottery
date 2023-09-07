import { Controller, Get, UseGuards, Request, Post, BadRequestException } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { AuthGuard } from "../auth/auth.guard";
import { parseNumbers } from "../utils/parseNumbers";

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findByUserId(@Request() req): Promise<any[]> {
    try {
      const userId = req.user.sub;
      return await this.ticketsService.findByUserId(userId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req): Promise<any> {
    try {
      const userId = req.user.sub;
      const date = req.body.date;
      const numbers = req.body.numbers;
      return await this.ticketsService.create(userId, date, numbers);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}