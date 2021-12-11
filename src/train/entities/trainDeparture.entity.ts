import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Day } from '../enum/day.enum';
import { Direction } from '../enum/direction.enum';
import { Train } from './train.entity';

@Entity('train_departure')
export class TrainDeparture {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @Column()
  time: number;

  @ManyToOne(() => Train, (train) => train.trainDepartures, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trainId' })
  train: Train;

  @Column()
  trainId: string;

  @Column({
    type: 'enum',
    enum: Direction,
  })
  direction: Direction;
}
