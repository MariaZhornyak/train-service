import { IsNotEmpty } from 'class-validator';
import { CarriageType } from '../entities/carriage-type.entity';

export class CreateCarriageDto {
  @IsNotEmpty()
  indexInTrain: number;

  @IsNotEmpty()
  type: CarriageType;

  @IsNotEmpty()
  sittings: number;

  @IsNotEmpty()
  priceOfSitting: number;

  @IsNotEmpty()
  trainId: string;
}
