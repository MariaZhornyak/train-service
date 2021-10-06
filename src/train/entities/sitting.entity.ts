import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Carriage } from './carriage.entity';
import { Ticket } from './ticket.entity';

@Entity('sitting')
export class Sitting {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  indexInCarriage: number;

  @Column()
  price: number;

  @ManyToOne(() => Carriage, (carriage) => carriage.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  carriage: Carriage;

  @OneToMany(() => Ticket, (ticket) => ticket.sitting)
  tickets: Ticket[];
}
