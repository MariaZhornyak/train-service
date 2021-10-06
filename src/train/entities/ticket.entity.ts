import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sitting } from './sitting.entity';

@Entity('ticket')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => Sitting, (sitting) => sitting.tickets)
  sitting: Sitting;

  @Column()
  departureDateTime: Date;

  // TODO: change field type to enum
  @Column()
  state: string;

  @Column()
  transactionDateTime: Date;
}
