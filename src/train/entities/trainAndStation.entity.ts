import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Station } from './station.entity';
import { Train } from './train.entity';

@Entity('trainStation')
export class TrainStation {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Train, (train) => train.trainStations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  train: Train;

  @ManyToOne(() => Station, (station) => station.trainStations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  station: Station;

  @Column()
  departureDateTime: Date;

  @Column()
  trainStandFrom: number;

  @Column()
  trainStandTo: number;
}
