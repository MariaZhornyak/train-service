import { IsOptional } from 'class-validator';
import { Route } from '../../route/entities/route.entity';
import { TrainType } from '../entities/trainType.entity';

export class UpdateTrainDto {
  @IsOptional()
  type?: TrainType;

  @IsOptional()
  route?: Route;
}
