import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FreeSittingsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  carriageId: string;

  @ApiProperty()
  @IsNotEmpty()
  departureDateTime: Date;
}
