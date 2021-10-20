import { IsNotEmpty, IsUUID } from 'class-validator';

export class FreeSittingsDto {
  @IsNotEmpty()
  @IsUUID('4')
  carriageId: string;

  @IsNotEmpty()
  departureDateTime: Date;
}
