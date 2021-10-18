import { Entity, Column, OneToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Carriage } from '../../carriage/entities/carriage.entity';
import { Route } from '../../route/entities/route.entity';
import { TrainType } from './trainType.entity';
import { TrainStation } from '../../station/entities/trainStation.entity';
import { TrainDeparture } from './trainDeparture.entity';

@Entity('train')
export class Train {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @ManyToOne(() => TrainType, (trainType) => trainType.trains, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  type: TrainType;

  @ManyToOne(() => Route, (route) => route.trains, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  route: Route;

  @OneToMany(() => Carriage, (carriage) => carriage.train)
  carriages: Carriage[];

  @OneToMany(() => TrainStation, (trainStation) => trainStation.train)
  trainStations: TrainStation[];

  @OneToMany(() => TrainDeparture, (trainDepatrure) => trainDepatrure.train)
  trainDepartures: TrainDeparture[];
}
