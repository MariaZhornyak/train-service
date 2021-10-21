import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarriageTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
