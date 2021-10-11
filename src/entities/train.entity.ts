import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Carriage } from './carriage.entity';
import { Route } from './route.entity';
import { TrainType } from './train-type.entity';
import { TrainStation } from './trainAndStation.entity';

@Entity('train')
export class Train {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => TrainType, (trainType) => trainType.trains)
  type: TrainType;

  @ManyToOne(() => Route, (route) => route.trains)
  route: Route;

  @Column()
  frequency: number;

  @OneToMany(() => Carriage, (carriage) => carriage.train)
  carriages: Carriage[];

  @OneToMany(() => TrainStation, (trainStation) => trainStation.train)
  trainStations: TrainStation[];
}
