import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Train } from './train.entity';

@Entity('trainType')
export class TrainType {
  @PrimaryColumn()
  name: string;

  @OneToMany(() => Train, (train) => train.type)
  trains: Train[];
}
