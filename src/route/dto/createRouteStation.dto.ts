import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateRouteStationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  routeId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  stationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stationIndexOnTheRoute: number;
}
