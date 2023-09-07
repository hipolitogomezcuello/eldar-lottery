import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'raffles' })
export class Raffle extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  date: Date;

  @Column(DataType.ARRAY(DataType.INTEGER))
  numbers: number[];

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;
}