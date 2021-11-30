import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateCarriageDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  indexInTrain?: number;

  @ApiProperty()
  @IsOptional()
  typeName?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID('4')
  trainId?: string;
}
