import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Train } from './train.entity';
import { RouteStation } from './routeStation.entity';

@Entity('route')
export class Route {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Train, (train) => train.route)
  trains: Train[];

  @OneToMany(() => RouteStation, (routeStation) => routeStation.route)
  routeStation: RouteStation[];
}
