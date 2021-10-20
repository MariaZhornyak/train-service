import { IsNotEmpty, IsOptional } from 'class-validator';
import { Station } from '../../station/entities/station.entity';
import { Train } from '../entities/train.entity';

export class UpdateTrainStationDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  train?: Train;

  @IsOptional()
  station?: Station;

  @IsOptional()
  trainStandFromFirstStation?: number;

  @IsOptional()
  trainStandFromLastStation?: number;

  @IsOptional()
  wayFromFirstStation?: number;

  @IsOptional()
  wayFromLastStation?: number;
}
