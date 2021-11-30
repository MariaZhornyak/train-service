import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRouteDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}
