import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { Auth } from '../decorator/auth.decorator';
import { Roles } from '../enum/roles.enum';
import { ISuccess } from '../interface/success.interface';
import { CarriageService } from './carriage.service';
import { CreateCarriageDto } from './dto/createCarriage.dto';
import { CreateCarriageTypeDto } from './dto/createCarriageType.dto';
import { FreeSittingsDto } from './dto/freeSittings.dto';
import { UpdateCarriageDto } from './dto/updateCarriage.dto';
import { UpdateCarriageTypeDto } from './dto/updateCarriageType.dto';
import { CarriageType } from './entities/carriage-type.entity';
import { Carriage } from './entities/carriage.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('carriages')
@ApiBearerAuth()
export class CarriageController {
  constructor(private readonly carriageService: CarriageService) {}

  @Get('get/list')
  @ApiTags('carriages')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger, Roles.Headmaster)
  getCarriagesList(): Promise<Carriage[]> {
    return this.carriageService.getCarriagesList();
  }

  @Get('get/single/:id')
  @ApiTags('carriages')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger, Roles.Headmaster)
  getSingleCarriage(@Param('id') id: string): Promise<Carriage> {
    return this.carriageService.getSingleCarriage(id);
  }

  @Post('create')
  @ApiTags('carriages')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createCarriage(
    @Body() createCarriageDto: CreateCarriageDto,
  ): Promise<Carriage> {
    return this.carriageService.createCarriage(createCarriageDto);
  }

  @Patch('update/:id')
  @ApiTags('carriages')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  updateCarriage(
    @Param('id') id: string,
    @Body() updateCarriageDto: UpdateCarriageDto,
  ): Promise<ISuccess> {
    return this.carriageService.updateCarriage(id, updateCarriageDto);
  }

  @Delete('delete/:id')
  @ApiTags('carriages')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  deleteCarriage(@Param('id') id: string): Promise<Carriage> {
    return this.carriageService.deleteCarriage(id);
  }

  @Get('/types/get/list')
  @ApiTags('carriage types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  getCarriageTypesList(): Promise<CarriageType[]> {
    return this.carriageService.getCarriageTypesList();
  }

  @Get('/types/get/:name')
  @ApiTags('carriage types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  getSingleCarriageType(@Param('name') name: string): Promise<CarriageType> {
    return this.carriageService.getSingleCarriageType(name);
  }

  @Post('/types/create')
  @ApiTags('carriage types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createCarriageType(
    @Body() createTrainTypeDto: CreateCarriageTypeDto,
  ): Promise<CarriageType> {
    return this.carriageService.createCarriageType(createTrainTypeDto);
  }

  @Patch('/types/update/:name')
  @ApiTags('carriage types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  updateCarriageType(
    @Param('name') name: string,
    @Body() updateTrainTypeDto: UpdateCarriageTypeDto,
  ): Promise<ISuccess> {
    return this.carriageService.updateCarriageType(name, updateTrainTypeDto);
  }

  @Delete('/types/delete/:name')
  @ApiTags('carriage types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  deleteCarriageType(@Param('name') name: string): Promise<CarriageType> {
    return this.carriageService.deleteCarriageType(name);
  }

  @Get('get/sittings')
  @ApiTags('free sittings in carriage')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Headmaster, Roles.Passenger)
  getFreeSittingsInCarriage(@Query() freeSittingsDto: FreeSittingsDto) {
    return this.carriageService.getFreeSittingsInCarriage(freeSittingsDto);
  }
}
