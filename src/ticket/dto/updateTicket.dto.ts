import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  isDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Sitting } from '../../carriage/entities/sitting.entity';
import { State } from '../enums/state.enum';

export class UpdateTicketDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID('4')
  userId?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID('4')
  sittingId?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  departureDateTime?: Date;

  // @ApiProperty()
  // @IsOptional()
  // @IsEnum(State)
  // state?: State;
}
