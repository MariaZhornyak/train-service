import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RouteStation } from './routeStation.entity';
import { TrainStation } from './trainAndStation.entity';

@Entity('station')
export class Station {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => TrainStation, (trainStation) => trainStation.station)
  trainStations: TrainStation[];

  @OneToMany(() => RouteStation, (routeStation) => routeStation.station)
  routeStations: RouteStation[];
}
