import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { State } from '../enums/state.enum';
import { Sitting } from '../../carriage/entities/sitting.entity';

@Entity('ticket')
@Index(['sitting', 'departureDateTime'])
export class Ticket {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @Column()
  userId: string;

  // @Column()
  // name: string;

  // @Column()
  // surname: string;

  @Column()
  documentType: string;

  @Column()
  documentNumber: string;

  @ManyToOne(() => Sitting, (sitting) => sitting.tickets, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sittingId' })
  sitting: Sitting;

  @Column()
  sittingId: string;

  @Column({ type: 'timestamptz' })
  departureDateTime: Date;

  @Column()
  departureStationId: string;

  @Column()
  arrivalStationId: string;

  @Column({
    type: 'enum',
    enum: State,
    default: State.Booked,
  })
  state: State;

  @CreateDateColumn({ type: 'timestamptz' })
  transactionDateTime: Date;
}
