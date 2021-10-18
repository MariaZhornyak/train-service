import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Day } from '../enum/day.enum';
import { Direction } from '../enum/direction.enum';
import { Train } from './train.entity';

@Entity('trainDeparture')
export class TrainDeparture {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @Column({
    type: 'enum',
    enum: Day,
  })
  day: Day;

  @Column()
  time: number;

  @ManyToOne(() => Train, (train) => train.trainDepartures, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  // @JoinColumn({ name: 'trainId' })
  train: Train;

  @Column({
    type: 'enum',
    enum: Direction,
  })
  direction: Direction;
}
