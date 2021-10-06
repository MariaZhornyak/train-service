import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Train } from './train.entity';

@Entity('trainType')
export class TrainType {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Train, (train) => train.type)
  trains: Train[];
}
