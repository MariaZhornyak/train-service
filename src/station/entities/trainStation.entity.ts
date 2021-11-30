import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Station } from './station.entity';
import { Train } from '../../train/entities/train.entity';

@Entity('train_station')
export class TrainStation {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @ManyToOne(() => Train, (train) => train.trainStations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trainId' })
  train: Train;

  @Column()
  trainId: string;

  @ManyToOne(() => Station, (station) => station.trainStations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'stationId' })
  station: Station;

  @Column()
  stationId: string;

  @Column()
  trainStandFromFirstStation: number;

  @Column()
  trainStandFromLastStation: number;

  @Column()
  wayFromFirstStation: number;

  @Column()
  wayFromLastStation: number;
}
