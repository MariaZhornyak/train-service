import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTrainDto {
  @ApiProperty()
  @IsOptional()
  typeName?: string;

  @ApiProperty()
  @IsOptional()
  routeId?: string;
}
