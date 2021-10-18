import { IsOptional } from 'class-validator';
import { Station } from '../../station/entities/station.entity';
import { Route } from '../entities/route.entity';

export class UpdateRouteStationDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  route?: Route;

  @IsOptional()
  station?: Station;

  @IsOptional()
  stationIndexOnTheRoute?: number;
}
