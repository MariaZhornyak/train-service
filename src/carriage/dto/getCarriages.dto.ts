import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetCarriagesDto {
  @ApiPropertyOptional()
  trainId?: string;
}
