import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carriage } from './carriage.entity';

@Entity('carriageType')
export class CarriageType {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @OneToMany(() => Carriage, (carriage) => carriage.type)
  carriages: Carriage[];
}
