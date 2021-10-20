import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Sitting } from '../../carriage/entities/sitting.entity';
import { State } from '../enums/state.enum';

export class UpdateTicketDto {
  @IsOptional()
  userId?: string;

  @IsOptional()
  sitting?: Sitting;

  @IsOptional()
  departureDateTime?: Date;

  @IsOptional()
  @IsEnum(State)
  state?: State;
}
