import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsUUID } from 'class-validator';

export class RouteFromStatioToStationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  firstStationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  secondStationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  departureDate: string;
}
