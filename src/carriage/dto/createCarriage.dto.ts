import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateCarriageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  indexInTrain: number;

  @ApiProperty()
  @IsNotEmpty()
  typeName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sittings: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  priceOfSitting: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  trainId: string;
}
