import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Carriage } from './carriage.entity';

@Entity('carriageType')
export class CarriageType {
  @PrimaryColumn()
  carriageTypeName: string;

  @OneToMany(() => Carriage, (carriage) => carriage.type)
  carriage: Carriage[];
}
