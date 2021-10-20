import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Train } from './train.entity';

@Entity('train_type')
export class TrainType {
  @PrimaryColumn()
  name: string;

  @OneToMany(() => Train, (train) => train.type)
  trains: Train[];
}
