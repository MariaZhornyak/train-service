import { IsOptional } from 'class-validator';
import { Train } from '../../train/entities/train.entity';
import { CarriageType } from '../entities/carriage-type.entity';

export class UpdateCarriageDto {
  @IsOptional()
  indexInTrain?: number;

  @IsOptional()
  type?: CarriageType;

  @IsOptional()
  train?: Train;
}
