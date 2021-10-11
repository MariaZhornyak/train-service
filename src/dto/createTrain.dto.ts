import { IsNotEmpty } from 'class-validator';
import { Route } from '../entities/route.entity';
import { TrainType } from '../entities/train-type.entity';

export class CreateTrainDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  type: TrainType;

  @IsNotEmpty()
  route: Route;

  @IsNotEmpty()
  frequency: number;
}
