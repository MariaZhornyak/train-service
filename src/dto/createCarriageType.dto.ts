import { IsNotEmpty } from 'class-validator';

export class CreateCarriageTypeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}
