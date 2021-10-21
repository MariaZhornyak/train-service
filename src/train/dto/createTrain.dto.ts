import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTrainDto {
  @ApiProperty()
  @IsNotEmpty()
  typeName: string;

  @ApiProperty()
  @IsNotEmpty()
  routeId: string;
}
