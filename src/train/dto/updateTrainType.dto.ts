import { IsNotEmpty } from 'class-validator';

export class UpdateTrainTypeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}
