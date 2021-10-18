import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Ticket } from '../ticket/entities/ticket.entity';
import { CarriageService } from './carriage.service';
import { CreateCarriageDto } from './dto/createCarriage.dto';
import { CreateCarriageTypeDto } from './dto/createCarriageType.dto';
import { UpdateCarriageDto } from './dto/updateCarriage.dto';
import { UpdateCarriageTypeDto } from './dto/updateCarriageType.dto';
import { CarriageType } from './entities/carriage-type.entity';
import { Carriage } from './entities/carriage.entity';
import { Sitting } from './entities/sitting.entity';

@Controller('carriages')
export class CarriageController {
  constructor(private readonly carriageService: CarriageService) {}

  @Get('get/list')
  getCarriagesList(): Promise<Carriage[]> {
    return this.carriageService.getCarriagesList();
  }

  @Get('get/single/:id')
  getSingleCarriage(@Param('id') id: string): Promise<Carriage> {
    return this.carriageService.getSingleCarriage(id);
  }

  @Post('create')
  createCarriage(
    @Body() createCarriageDto: CreateCarriageDto,
  ): Promise<Carriage> {
    return this.carriageService.createCarriage(createCarriageDto);
  }

  @Patch('update/:id')
  updateCarriage(
    @Param('id') id: string,
    @Body() updateCarriageDto: UpdateCarriageDto,
  ): Promise<Carriage> {
    return this.carriageService.updateCarriage(id, updateCarriageDto);
  }

  @Delete('delete/:id')
  deleteCarriage(@Param('id') id: string): Promise<Carriage> {
    return this.carriageService.deleteCarriage(id);
  }

  @Get('/types/get/list')
  getCarriageTypesList(): Promise<CarriageType[]> {
    return this.carriageService.getCarriageTypesList();
  }

  @Get('/types/get/:name')
  getSingleCarriageType(@Param('name') name: string): Promise<CarriageType> {
    return this.carriageService.getSingleCarriageType(name);
  }

  @Post('/types/create')
  createCarriageType(
    @Body() createTrainTypeDto: CreateCarriageTypeDto,
  ): Promise<CarriageType> {
    return this.carriageService.createCarriageType(createTrainTypeDto);
  }

  @Patch('/types/update/:name')
  updateCarriageType(
    @Param('name') name: string,
    @Body() updateTrainTypeDto: UpdateCarriageTypeDto,
  ): Promise<CarriageType> {
    return this.carriageService.updateCarriageType(name, updateTrainTypeDto);
  }

  @Delete('/types/delete/:name')
  deleteCarriageType(@Param('name') name: string): Promise<CarriageType> {
    return this.carriageService.deleteCarriageType(name);
  }

  @Get('get/sittings/:id')
  getSittingsInCarriage(@Param('id') carriageId: string): Promise<Ticket[][]> {
    return this.carriageService.getSittingsInCarriage(carriageId);
  }
}
