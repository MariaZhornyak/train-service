import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTrainStationDto {
  @ApiProperty()
  @IsOptional()
  trainId?: string;

  @ApiProperty()
  @IsOptional()
  stationId?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  trainStandFromFirstStation?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  trainStandFromLastStation?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  wayFromFirstStation?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  wayFromLastStation?: number;
}
