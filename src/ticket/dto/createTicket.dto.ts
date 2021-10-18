import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Sitting } from '../../carriage/entities/sitting.entity';
import { State } from '../enums/state.enum';

export class CreateTicketDto {
  // @IsNotEmpty()
  // userId: string;

  @IsNotEmpty()
  sitting: Sitting;

  @IsNotEmpty()
  departureDateTime: Date;

  @IsNotEmpty()
  @IsEnum(State)
  state: State;

  @IsOptional()
  transactionDateTime?: Date;
}
