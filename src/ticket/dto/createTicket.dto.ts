import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // userId: string;

  @ApiProperty()
  @IsNotEmpty()
  documentType: string;

  @ApiProperty()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  sittingId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  departureDateTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  departureStationId: string;

  @ApiProperty()
  @IsNotEmpty()
  arrivalStationId: string;
}
