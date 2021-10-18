import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Train } from '../../train/entities/train.entity';
import { RouteStation } from './routeStation.entity';

@Entity('route')
export class Route {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @Column()
  name: string;

  @OneToMany(() => Train, (train) => train.route)
  trains: Train[];

  @OneToMany(() => RouteStation, (routeStation) => routeStation.route)
  routeStations: RouteStation[];
}
