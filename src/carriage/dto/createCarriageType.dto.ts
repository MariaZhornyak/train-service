import { IsNotEmpty } from 'class-validator';

export class CreateCarriageTypeDto {
  @IsNotEmpty()
  name: string;
}
