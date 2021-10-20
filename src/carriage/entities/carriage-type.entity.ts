import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Carriage } from './carriage.entity';

@Entity('carriage_type')
export class CarriageType {
  @PrimaryColumn()
  name: string;

  @OneToMany(() => Carriage, (carriage) => carriage.type)
  carriages: Carriage[];
}
