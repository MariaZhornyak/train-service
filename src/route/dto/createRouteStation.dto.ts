import { IsNotEmpty } from 'class-validator';

export class CreateRouteStationDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  routeId: string;

  @IsNotEmpty()
  stationId: string;

  @IsNotEmpty()
  stationIndexOnTheRoute: number;
}
