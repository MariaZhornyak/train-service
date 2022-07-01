import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetRouteStationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  routeId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  stationId: string;
}
