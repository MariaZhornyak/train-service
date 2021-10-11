import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { Train } from './train.entity';

@Entity('trainType')
export class TrainType {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Train, (train) => train.type)
  trains: Train[];
}
