import { IsOptional } from 'class-validator';

export class UpdateRouteDto {
  @IsOptional()
  name?: string;
}
