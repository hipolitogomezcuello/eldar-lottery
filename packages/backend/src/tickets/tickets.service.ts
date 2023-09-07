import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Ticket } from "./ticket.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket)
    private ticketModel: typeof Ticket,
  ) {
  }

  async create(userId: string, date: string, numbers: number[]): Promise<Ticket> {
    if (numbers.length !== 5 || new Set(numbers).size !== 5) {
      throw new Error('You must select 5 different numbers');
    }
    const tickets = await this.ticketModel.findAll({
      where: {
        userId,
        date: new Date(date),
      }
    });
    if (tickets.length >= 2) {
      throw new Error('You can only buy 2 tickets per day');
    }
    return await this.ticketModel.create({
      id: uuidv4(),
      userId,
      date: new Date(date),
      numbers,
    });
  }

  async findByUserId(userId: string): Promise<Ticket[]> {
    return await this.ticketModel.findAll({
      where: {
        userId,
      },
    });
  }
}