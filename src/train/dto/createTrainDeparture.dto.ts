import { IsEnum, IsNotEmpty } from 'class-validator';
import { Direction } from '../enum/direction.enum';
import { Day } from '../enum/day.enum';
import { Train } from '../entities/train.entity';

export class CreateTrainDepartureDto {
  @IsNotEmpty()
  @IsEnum(Day)
  day: Day;

  @IsNotEmpty()
  time: number;

  @IsNotEmpty()
  train: Train;

  @IsNotEmpty()
  @IsEnum(Direction)
  direction: Direction;
}
