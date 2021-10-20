import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { State } from '../enums/state.enum';
import { Sitting } from '../../carriage/entities/sitting.entity';

@Entity('ticket')
@Index(['sitting', 'departureDateTime'])
export class Ticket {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  // @Column()
  // userId: string;

  @ManyToOne(() => Sitting, (sitting) => sitting.tickets, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  sitting: Sitting;

  @Column({ type: 'timestamptz' })
  departureDateTime: Date;

  @Column({
    type: 'enum',
    enum: State,
    default: State.Booked,
  })
  state: State;

  @CreateDateColumn({ type: 'timestamptz' })
  transactionDateTime: Date;
}
