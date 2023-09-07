import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Raffle } from "./raffle.model";
import { InjectModel } from "@nestjs/sequelize";
import { Ticket } from "../tickets/ticket.model";

@Injectable()
export class RafflesService {
  constructor(
    @InjectModel(Raffle)
    private raffleModel: typeof Raffle,
    @InjectModel(Ticket)
    private ticketModel: typeof Ticket,
  ) {}

  private generateRandomNumbers(): number[] {
    const numbers = [];
    while (numbers.length < 5) {
      const number = Math.floor(Math.random() * 100) + 1;
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return numbers;
  }

  async create(date: string): Promise<Raffle> {
    const existingRaffle = await this.raffleModel.findOne({
      where: {
        date: new Date(date),
      }
    });
    if (existingRaffle) {
      throw new Error('Raffle already exists for this date');
    }
    const numbers = this.generateRandomNumbers();
    return await this.raffleModel.create({
      id: uuidv4(),
      date: new Date(date),
      numbers,
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Raffle[]> {
    const raffles = await this.raffleModel.findAll();
    return raffles.filter(raffle => {
      return raffle.date >= startDate && raffle.date <= endDate;
    });
  }

  async findWinners(id: string): Promise<any> {
    const raffle: Raffle = await this.raffleModel.findOne({
      where: {
        id,
      },
    });
    const tickets: Ticket[] = await this.ticketModel.findAll({
      where: {
        date: new Date(raffle.date),
      },
    });
    const winners = [];
    for (const ticket of tickets) {
      let count = 0;
      for (let i = 0; i < 5; i++) {
        if (ticket.numbers[i] === raffle.numbers[i]) {
          console.log(ticket.numbers[i], raffle.numbers[i])
          count++;
        }
      }
      if (count >= 2) {
        winners.push(ticket);
      }
    }
    return {
      raffle,
      winners,
    }
  }
}