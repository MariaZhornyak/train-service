import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTrainTypeDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}
