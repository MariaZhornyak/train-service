import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Station } from '../../station/entities/station.entity';
import { Train } from '../entities/train.entity';

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
