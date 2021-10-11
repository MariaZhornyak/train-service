import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { State } from '../train/enums/state.enum';
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

  @Column({
    type: 'enum',
    enum: State,
    default: State.Empty,
  })
  state: State[];

  @Column()
  transactionDateTime: Date;
}
