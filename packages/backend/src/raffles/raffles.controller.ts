import { BadRequestException, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { RafflesService } from "./raffles.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller('raffles')
export class RafflesController {
  constructor(
    private readonly rafflesService: RafflesService
  ) {}

  @Post()
  async create(): Promise<any> {
    const date = new Date().toISOString().split('T')[0];
    try {
      return await this.rafflesService.create(date);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findByDateRange(@Request() req): Promise<any[]> {
    try {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      return await this.rafflesService.findByDateRange(startDate, endDate);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('winners')
  async findWinners(@Request() req): Promise<any> {
    try {
      return await this.rafflesService.findWinners(req.query.id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}