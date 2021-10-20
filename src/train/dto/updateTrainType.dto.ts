import { IsOptional } from 'class-validator';

export class UpdateTrainTypeDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  name?: string;
}
