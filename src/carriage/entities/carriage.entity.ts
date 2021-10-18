import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CarriageType } from './carriage-type.entity';
import { Sitting } from './sitting.entity';
import { Train } from '../../train/entities/train.entity';

@Entity('carriage')
export class Carriage {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @Column()
  indexInTrain: number;

  @ManyToOne(() => CarriageType, (carriageType) => carriageType.carriages, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  type: CarriageType;

  @OneToMany(() => Sitting, (sitting) => sitting.carriage)
  sittings: Sitting[];

  @ManyToOne(() => Train, (train) => train.carriages, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trainId' })
  train: Train;

  @Column()
  trainId: string;
}
