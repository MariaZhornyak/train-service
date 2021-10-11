import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Route } from './route.entity';
import { Station } from './station.entity';

@Entity('routeStation')
export class RouteStation {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Route, (route) => route.routeStation)
  route: Route;

  @ManyToOne(() => Station, (station) => station.routeStations)
  station: Station;

  @Column()
  stationIndexOnTheRoute: number;
}
