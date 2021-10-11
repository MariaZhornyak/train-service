import { Body, Controller, Post } from '@nestjs/common';
import { CreateCarriageTypeDto } from '../dto/createCarriageType.dto';
import { CarriageType } from '../entities/carriage-type.entity';
import { CarriageTypeService } from './carriage-type.service';

@Controller('carriage-type')
export class CarriageTypeController {
  constructor(private readonly carriageTypeService: CarriageTypeService) {}

  @Post('/add')
  addUser(
    @Body() createCarriageTypeDto: CreateCarriageTypeDto,
  ): Promise<CarriageType> {
    return this.carriageTypeService.createCarriageType(createCarriageTypeDto);
  }
}
