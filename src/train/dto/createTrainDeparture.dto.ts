import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Direction } from '../enum/direction.enum';
import { Day } from '../enum/day.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainDepartureDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @ApiProperty()
  @IsNotEmpty()
  trainId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Direction)
  direction: Direction;
}
