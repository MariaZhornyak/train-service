import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}
