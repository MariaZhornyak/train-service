import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RouteFromStatioToStationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  firstStationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  secondStationId: string;
}
