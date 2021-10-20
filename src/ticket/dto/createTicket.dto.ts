import { IsNotEmpty } from 'class-validator';
import { Sitting } from '../../carriage/entities/sitting.entity';

export class CreateTicketDto {
  // @IsNotEmpty()
  // userId: string;

  @IsNotEmpty()
  sitting: Sitting;

  @IsNotEmpty()
  departureDateTime: Date;
}
