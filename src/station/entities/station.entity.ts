import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { RouteStation } from '../../route/entities/routeStation.entity';
import { TrainStation } from './trainStation.entity';

@Entity('station')
export class Station {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @Column({ unique: true })
  name: string;

  @OneToMany(() => TrainStation, (trainStation) => trainStation.station)
  trainStations: TrainStation[];

  @OneToMany(() => RouteStation, (routeStation) => routeStation.station)
  routeStations: RouteStation[];
}
