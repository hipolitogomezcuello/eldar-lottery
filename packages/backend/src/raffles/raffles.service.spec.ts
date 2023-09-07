import { RafflesService } from "./raffles.service";
import { Sequelize } from "sequelize-typescript";
import { Raffle } from "./raffle.model";
import { createMemDB } from "../utils/createMemDb";
import { Ticket } from "../tickets/ticket.model";

describe('RafflesService', () => {
  let service: RafflesService
  let memDb: Sequelize

  afterAll(() => memDb.close())
  beforeAll(async () => {
    memDb = await createMemDB([Raffle, Ticket])
    service = new RafflesService(Raffle, Ticket)
  })
  afterEach(async () => {
    await memDb.truncate()
  })

  describe('create', () => {
    it('should create a raffle', async () => {
      const testDate = '2021-01-01'

      const raffle = await service.create(testDate)

      const result = await memDb.query(`SELECT * FROM "raffles" WHERE "id" = '${raffle.id}'`)
      const savedRaffle = result[0][0] as any
      expect(savedRaffle.date.toString().split(' ')[0]).toEqual(testDate)
      expect(savedRaffle.id).toBeDefined()
    })

    it('should throw an error if raffle already exists for date', async () => {
      const testDate = '2021-01-01'
      await memDb.query(`INSERT INTO "raffles" ("id", "date", "numbers") VALUES ('ab5031b7-2260-413f-9d3d-41de12c7075c', '${testDate}', '{1,2,3,4,5}')`);

      try {
        await service.create(testDate)
      } catch (err) {
        expect(err.message).toEqual('Raffle already exists for this date')
      }
    })

    it('should generate random numbers', async () => {
      const testDate = '2021-01-01'

      const raffle = await service.create(testDate)

      expect(raffle.numbers.length).toEqual(5)
      expect(raffle.numbers[0]).toBeLessThanOrEqual(100)
      expect(raffle.numbers[0]).toBeGreaterThanOrEqual(1)
    })
  })

  describe('findByDateRange', () => {
    it('should find raffles by date range', async () => {
      const testDate = '2023-01-01 00:00:00.000 +00:00'
      const startDate = new Date('2022-01-01')
      const endDate = new Date('2024-01-01')
      await memDb.query(`INSERT INTO "raffles" ("id", "date", "numbers") VALUES ('ab5031b7-2260-413f-9d3d-41de12c7075c', '${testDate}', '{1,2,3,4,5}')`);

      const raffles = await service.findByDateRange(startDate, endDate)

      expect(raffles.length).toEqual(1)
      expect(raffles[0].date.toISOString().split('T')[0]).toEqual(testDate.split(' ')[0])
    })

    it('should not find raffles outside of date range', async () => {
      const testDate = '2021-01-01'
      const startDate = new Date('2022-01-01')
      const endDate = new Date('2024-01-01')
      await memDb.query(`INSERT INTO "raffles" ("id", "date", "numbers") VALUES ('ab5031b7-2260-413f-9d3d-41de12c7075c', '${testDate}', '{1,2,3,4,5}')`);

      const raffles = await service.findByDateRange(startDate, endDate)

      expect(raffles.length).toEqual(0)
    })
  })

  describe('findWinners', () => {
    it('should find winners', async () => {
      const testDate = '2021-01-01 00:00:00.000 +00:00'
      const testRaffleId = 'ab5031b7-2260-413f-9d3d-41de12c7075c'
      await memDb.query(`INSERT INTO "raffles" ("id", "date", "numbers") VALUES ('${testRaffleId}', '${testDate}', '{1,2,3,4,5}')`);
      await memDb.query(`INSERT INTO "tickets" ("id", "user_id", "date", "numbers") VALUES ('ab5031b7-2260-413f-9d3d-41de12c7075c', 'bb5031b7-2260-413f-9d3d-41de12c7075c', '${testDate}', '{1,2,3,4,5}')`);

      const winners = await service.findWinners(testRaffleId)

      expect(winners.winners.length).toEqual(1)
      expect(winners.raffle.id).toEqual(testRaffleId)
    })

    it('should not find winners if no tickets', async () => {
      const testDate = '2021-01-01 00:00:00.000 +00:00'
      const testRaffleId = 'ab5031b7-2260-413f-9d3d-41de12c7075c'
      await memDb.query(`INSERT INTO "raffles" ("id", "date", "numbers") VALUES ('${testRaffleId}', '${testDate}', '{1,2,3,4,5}')`);

      const winners = await service.findWinners(testRaffleId)

      expect(winners.winners.length).toEqual(0)
      expect(winners.raffle.id).toEqual(testRaffleId)
    })
  })
})