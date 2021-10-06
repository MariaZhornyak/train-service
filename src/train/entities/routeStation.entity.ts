import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Route } from './route.entity';
import { Station } from './station.entity';

@Entity('routeStation')
export class RouteStation {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Route, (route) => route.routeStation, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  route: Route;

  @ManyToOne(() => Station, (station) => station.routeStations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  station: Station;

  @Column()
  stationIndexOnTheRoute: number;
}
