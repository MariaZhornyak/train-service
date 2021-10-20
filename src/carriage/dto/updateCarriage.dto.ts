import { IsOptional } from 'class-validator';
import { CarriageType } from '../entities/carriage-type.entity';

export class UpdateCarriageDto {
  @IsOptional()
  indexInTrain?: number;

  @IsOptional()
  type?: CarriageType;

  @IsOptional()
  trainId?: string;
}
