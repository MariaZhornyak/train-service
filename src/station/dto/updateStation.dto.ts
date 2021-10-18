import { IsNotEmpty } from 'class-validator';

export class UpdateStationDto {
  @IsNotEmpty()
  name: string;
}
