import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Carriage } from './carriage.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity('sitting')
export class Sitting {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @Column()
  indexInCarriage: number;

  @Column({ type: 'decimal', precision: 2 })
  price: number;

  @ManyToOne(() => Carriage, (carriage) => carriage.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'carriageId' })
  carriage: Carriage;

  @Column()
  carriageId: string;

  @OneToMany(() => Ticket, (ticket) => ticket.sitting)
  tickets: Ticket[];
}
