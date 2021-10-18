import { IsNotEmpty } from 'class-validator';
import { Station } from '../../station/entities/station.entity';
import { Train } from '../entities/train.entity';

export class CreateTrainStationDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  train: Train;

  @IsNotEmpty()
  station: Station;

  @IsNotEmpty()
  trainStandFromFirstStation: number;

  @IsNotEmpty()
  trainStandFromLastStation: number;

  @IsNotEmpty()
  wayFromFirstStation: number;

  @IsNotEmpty()
  wayFromLastStation: number;
}
