import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrainStationDto {
  @ApiProperty()
  @IsNotEmpty()
  trainId: string;

  @ApiProperty()
  @IsNotEmpty()
  stationId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  trainStandFromFirstStation: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  trainStandFromLastStation: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  wayFromFirstStation: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  wayFromLastStation: number;
}
