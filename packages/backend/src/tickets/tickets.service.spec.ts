import { Sequelize } from "sequelize-typescript";
import { TicketsService } from "./tickets.service";
import { Ticket } from "./ticket.model";
import { createMemDB } from "../utils/createMemDb";

describe('TicketService', () => {
  let service: TicketsService;
  let memDb: Sequelize;

  afterAll(async () => memDb.close());
  beforeAll(async () => {
    memDb = await createMemDB([Ticket]);
    service = new TicketsService(Ticket);
  })
  afterEach(async () => {
    await memDb.truncate();
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a ticket', async() => {
      const testUserId = 'ab5031b7-2260-413f-9d3d-41de12c7075c'
      const testDate = '2021-01-01'

      const ticket = await service.create(testUserId, testDate, [1, 2, 3, 4, 5]);

      const result = await memDb.query(`SELECT * FROM "tickets" WHERE "id" = '${ticket.id}'`)
      const savedTicket = result[0][0] as any;
      expect(savedTicket.user_id).toEqual(testUserId);
      expect(ticket.numbers).toEqual([1, 2, 3, 4, 5]);
      expect(ticket.id).toBeDefined();
    })

    it('should throw an error if numbers are not unique', async() => {
      const testUserId = 'ab5031b7-2260-413f-9d3d-41de12c7075c'
      const testDate = '2021-01-01'

      try {
        await service.create(testUserId, testDate, [1, 1, 2, 3, 4]);
      } catch (err) {
        expect(err.message).toEqual('You must select 5 different numbers');
      }
    })

    it('should throw an error if numbers are not 5', async() => {
      const testUserId = 'ab5031b7-2260-413f-9d3d-41de12c7075c'
      const testDate = '2021-01-01'

      try {
        await service.create(testUserId, testDate, [1, 2, 3, 4]);
      } catch (err) {
        expect(err.message).toEqual('You must select 5 different numbers');
      }
    })

    it('should throw an error if user has already bought 2 tickets for the day', async() => {
      const testUserId = 'ab5031b7-2260-413f-9d3d-41de12c7075c'
      const testDate = '2021-01-01'

      await service.create(testUserId, testDate, [1, 2, 3, 4, 5]);
      await service.create(testUserId, testDate, [1, 2, 3, 4, 5]);

      try {
        await service.create(testUserId, testDate, [1, 2, 3, 4, 5]);
      } catch (err) {
        expect(err.message).toEqual('You can only buy 2 tickets per day');
      }
    })
  })

  describe('findByUserId', () => {
    it('should find tickets by user id', async() => {
      const testUserId = 'ab5031b7-2260-413f-9d3d-41de12c7075c'
      const testDate = '2021-01-01'
      await memDb.query(`INSERT INTO "tickets" ("id", "user_id", "date", "numbers") VALUES ('1', '${testUserId}', '${testDate}', '{1,2,3,4,5}')`)
      await memDb.query(`INSERT INTO "tickets" ("id", "user_id", "date", "numbers") VALUES ('2', '${testUserId}', '${testDate}', '{1,2,3,4,5}')`)

      const tickets = await service.findByUserId(testUserId);

      expect(tickets.length).toEqual(2);
      expect(tickets[0].userId).toEqual(testUserId);
      expect(tickets[1].userId).toEqual(testUserId);
    })

    it('should return empty array if no tickets found', async() => {
      const testUserId = 'ab5031b7-2260-413f-9d3d-41de12c7075c'

      const tickets = await service.findByUserId(testUserId);

      expect(tickets.length).toEqual(0);
    })
  })
})