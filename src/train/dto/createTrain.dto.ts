import { IsNotEmpty } from 'class-validator';
import { Route } from '../../route/entities/route.entity';
import { TrainType } from '../entities/trainType.entity';

export class CreateTrainDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  type: TrainType;

  @IsNotEmpty()
  route: Route;
}
