import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateRouteStationDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID('4')
  routeId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID('4')
  stationId?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  stationIndexOnTheRoute?: number;
}
