import { IsNotEmpty } from 'class-validator';

export class UpdateCarriageTypeDto {
  @IsNotEmpty()
  name: string;
}
