import { IsNotEmpty } from 'class-validator';

export class CreateTrainTypeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}
