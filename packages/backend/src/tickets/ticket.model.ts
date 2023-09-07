import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'tickets' })
export class Ticket extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column({ field: 'user_id' })
  userId: string;

  @Column
  date: Date;

  @Column(DataType.ARRAY(DataType.INTEGER))
  numbers: number[];

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;
}