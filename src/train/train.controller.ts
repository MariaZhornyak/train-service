import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrainDto } from './dto/createTrain.dto';
import { CreateTrainStationDto } from './dto/createTrainStation.dto';
import { CreateTrainTypeDto } from './dto/createTrainType.dto';
import { UpdateTrainDto } from './dto/updateTrain.dto';
import { UpdateTrainStationDto } from './dto/updateTrainStation.dto';
import { UpdateTrainTypeDto } from './dto/updateTrainType.dto';
import { TrainType } from './entities/trainType.entity';
import { Train } from './entities/train.entity';
import { TrainStation } from '../station/entities/trainStation.entity';
import { TrainService } from './train.service';
import { CreateTrainDepartureDto } from './dto/createTrainDeparture.dto';
import { TrainDeparture } from './entities/trainDeparture.entity';

@Controller('trains')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get('/get/list')
  getTrainsList(): Promise<Train[]> {
    return this.trainService.getTrainsList();
  }
  @Get('get/:id')
  getSingleTrain(@Param('id') id: string): Promise<Train> {
    return this.trainService.getSingleTrain(id);
  }
  @Post('/create')
  createTrain(@Body() createTrainDto: CreateTrainDto): Promise<Train> {
    return this.trainService.createTrain(createTrainDto);
  }

  @Patch('update/:id')
  updateTrain(
    @Param('id') id: string,
    @Body() updateTrainDto: UpdateTrainDto,
  ): Promise<Train> {
    return this.trainService.updateTrain(id, updateTrainDto);
  }

  @Delete('delete/:id')
  deleteTrain(@Param('id') id: string): Promise<Train> {
    return this.trainService.deleteTrain(id);
  }

  @Get('/types/get/list')
  getTrainsTypesList(): Promise<TrainType[]> {
    return this.trainService.getTrainTypesList();
  }
  @Get('/types/get/:name')
  getSingleTrainType(@Param('name') name: string): Promise<TrainType> {
    return this.trainService.getSingleTrainType(name);
  }
  @Post('/types/create')
  createTrainType(
    @Body() createTrainTypeDto: CreateTrainTypeDto,
  ): Promise<TrainType> {
    return this.trainService.createTrainType(createTrainTypeDto);
  }

  @Put('/types/update/:name')
  updateTrainType(
    @Param('name') name: string,
    @Body() updateTrainTypeDto: UpdateTrainTypeDto,
  ): Promise<TrainType> {
    return this.trainService.updateTrainType(name, updateTrainTypeDto);
  }

  @Delete('/types/delete/:name')
  deleteTrainType(@Param('name') name: string): Promise<TrainType> {
    return this.trainService.deleteTrainType(name);
  }

  @Get('at-station/get/list')
  getTrainStationsList(): Promise<TrainStation[]> {
    return this.trainService.getTrainStationsList();
  }

  @Get('at-station/get/:id')
  getSingleTrainStation(@Param('id') id: string): Promise<TrainStation> {
    return this.trainService.getSingleTrainStation(id);
  }

  @Delete('at-station/delete/:id')
  deleteTrainStation(@Param('id') id: string): Promise<TrainStation> {
    return this.trainService.deleteTrainStation(id);
  }

  @Post('at-station/create')
  createTrainStation(
    @Body() createTrainStationDto: CreateTrainStationDto,
  ): Promise<TrainStation> {
    return this.trainService.createTrainStation(createTrainStationDto);
  }

  @Patch('at-station/update/:id')
  updateTrainStation(
    @Param('id') id: string,
    @Body() updateTrainStationDto: UpdateTrainStationDto,
  ): Promise<TrainStation> {
    return this.trainService.updateTrainStation(id, updateTrainStationDto);
  }

  @Post('departure-date/create')
  createTrainDeparture(
    @Body() createTrainDepartureDto: CreateTrainDepartureDto,
  ): Promise<TrainDeparture> {
    return this.trainService.createTrainDeparture(createTrainDepartureDto);
  }
}
