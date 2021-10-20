import { IsOptional } from 'class-validator';

export class UpdateStationDto {
  @IsOptional()
  name?: string;
}
