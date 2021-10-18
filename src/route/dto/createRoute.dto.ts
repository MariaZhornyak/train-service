import { IsNotEmpty } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  name: string;
}
