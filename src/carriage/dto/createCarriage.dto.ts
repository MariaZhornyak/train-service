import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

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
  @IsNumber({ maxDecimalPlaces: 2 })
  priceOfSitting: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  trainId: string;
}
