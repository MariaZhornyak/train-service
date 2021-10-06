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

  @ManyToOne(() => CarriageType, (carriageType) => carriageType.carriage, {
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
  train: Train;
}
