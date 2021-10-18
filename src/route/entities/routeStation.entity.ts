import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Route } from './route.entity';
import { Station } from '../../station/entities/station.entity';

@Entity('routeStation')
@Index(['route', 'station'])
export class RouteStation {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @ManyToOne(() => Route, (route) => route.routeStations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'routeId' })
  route: Route;

  @Column()
  routeId: string;

  @ManyToOne(() => Station, (station) => station.routeStations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'stationId' })
  station: Station;

  @Column()
  stationId: string;

  @Column()
  stationIndexOnTheRoute: number;
}
