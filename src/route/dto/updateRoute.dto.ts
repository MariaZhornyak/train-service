import { IsNotEmpty } from 'class-validator';

export class UpdateRouteDto {
  @IsNotEmpty()
  name: string;
}
