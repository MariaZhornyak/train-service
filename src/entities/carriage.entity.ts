import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CarriageType } from './carriage-type.entity';
import { Sitting } from './sitting.entity';
import { Train } from './train.entity';

@Entity('carriage')
export class Carriage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  indexInTrain: number;

  @ManyToOne(() => CarriageType, (carriageType) => carriageType.carriages)
  type: CarriageType;

  @OneToMany(() => Sitting, (sitting) => sitting.carriage)
  sittings: Sitting[];

  @ManyToOne(() => Train, (train) => train.carriages)
  train: Train;
}
