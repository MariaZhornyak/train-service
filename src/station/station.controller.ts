import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ISuccess } from '../interface/success.interface';
import { Route } from '../route/entities/route.entity';
import { Train } from '../train/entities/train.entity';
import { CreateStationDto } from './dto/createStation.dto';
import { UpdateStationDto } from './dto/updateStation.dto';
import { Station } from './entities/station.entity';
import { StationService } from './station.service';

@Controller('stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Get('get/list')
  getStationsList(): Promise<Station[]> {
    return this.stationService.getStationsList();
  }
  @Get('get/:id')
  getSingleStation(@Param('id') id: string): Promise<Station> {
    return this.stationService.getSingleStation(id);
  }
  @Post('create')
  createStation(@Body() createStationDto: CreateStationDto): Promise<Station> {
    return this.stationService.createStation(createStationDto);
  }

  @Patch('update/:id')
  updateStation(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
  ): Promise<ISuccess> {
    return this.stationService.updateStation(id, updateStationDto);
  }

  @Delete('delete/:id')
  deleteStation(@Param('id') id: string): Promise<Station> {
    return this.stationService.deleteStation(id);
  }

  @Get(':id/routes')
  getRoutesOfStation(@Param('id') stationId: string): Promise<Route[]> {
    return this.stationService.getRoutesOfStation(stationId);
  }

  @Get(':id/trains')
  getTrainsOfstation(@Param('id') trainId: string): Promise<Train[]> {
    return this.stationService.getTrainsOfStation(trainId);
  }

  @Get('/schedule/:id/trains')
  scheduleOfTrainsAtStations(@Param('id') stationId: string) {
    return this.stationService.scheduleOfTrainsAtStation(stationId);
  }
}
