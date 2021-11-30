import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
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
import { ISuccess } from '../interface/success.interface';
import { AuthGuard } from '../guard/auth.guard';
import { Roles } from '../enum/roles.enum';
import { Auth } from '../decorator/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('trains')
@ApiBearerAuth()
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get('/get/list')
  @ApiTags('trains')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger, Roles.Headmaster)
  getTrainsList(): Promise<Train[]> {
    return this.trainService.getTrainsList();
  }

  @Get('get/:id')
  @ApiTags('trains')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger, Roles.Headmaster)
  getSingleTrain(@Param('id') id: string): Promise<Train> {
    return this.trainService.getSingleTrain(id);
  }

  @Post('/create')
  @ApiTags('trains')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createTrain(@Body() createTrainDto: CreateTrainDto): Promise<Train> {
    return this.trainService.createTrain(createTrainDto);
  }

  @Patch('update/:id')
  @ApiTags('trains')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  updateTrain(
    @Param('id') id: string,
    @Body() updateTrainDto: UpdateTrainDto,
  ): Promise<ISuccess> {
    return this.trainService.updateTrain(id, updateTrainDto);
  }

  @Delete('delete/:id')
  @ApiTags('trains')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  deleteTrain(@Param('id') id: string): Promise<Train> {
    return this.trainService.deleteTrain(id);
  }

  @Get('/types/get/list')
  @ApiTags('train types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  getTrainsTypesList(): Promise<TrainType[]> {
    return this.trainService.getTrainTypesList();
  }

  @Get('/types/get/:name')
  @ApiTags('train types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  getSingleTrainType(@Param('name') name: string): Promise<TrainType> {
    return this.trainService.getSingleTrainType(name);
  }
  @Post('/types/create')
  @ApiTags('train types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createTrainType(
    @Body() createTrainTypeDto: CreateTrainTypeDto,
  ): Promise<TrainType> {
    return this.trainService.createTrainType(createTrainTypeDto);
  }

  @Put('/types/update/:name')
  @ApiTags('train types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  updateTrainType(
    @Param('name') name: string,
    @Body() updateTrainTypeDto: UpdateTrainTypeDto,
  ): Promise<ISuccess> {
    return this.trainService.updateTrainType(name, updateTrainTypeDto);
  }

  @Delete('/types/delete/:name')
  @ApiTags('train types')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  deleteTrainType(@Param('name') name: string): Promise<TrainType> {
    return this.trainService.deleteTrainType(name);
  }

  // @Get('at-station/get/list')
  // @UseGuards(AuthGuard)
  // @Auth(Roles.Manager)
  // getTrainStationsList(): Promise<TrainStation[]> {
  //   return this.trainService.getTrainStationsList();
  // }

  // @Get('at-station/get/:id')
  // @UseGuards(AuthGuard)
  // @Auth(Roles.Manager)
  // getSingleTrainStation(@Param('id') id: string): Promise<TrainStation> {
  //   return this.trainService.getSingleTrainStation(id);
  // }

  // @Delete('at-station/delete/:id')
  // @UseGuards(AuthGuard)
  // @Auth(Roles.Manager)
  // deleteTrainStation(@Param('id') id: string): Promise<TrainStation> {
  //   return this.trainService.deleteTrainStation(id);
  // }

  @Post('at-station/create')
  @ApiTags('add train to station')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createTrainStation(
    @Body() createTrainStationDto: CreateTrainStationDto,
  ): Promise<TrainStation> {
    return this.trainService.createTrainStation(createTrainStationDto);
  }

  @Patch('at-station/update/:id')
  @ApiTags('update info about train and station')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  updateTrainStation(
    @Param('id') id: string,
    @Body() updateTrainStationDto: UpdateTrainStationDto,
  ): Promise<ISuccess> {
    return this.trainService.updateTrainStation(id, updateTrainStationDto);
  }

  @Post('departure-date/create')
  @ApiTags('departure date')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createTrainDeparture(
    @Body() createTrainDepartureDto: CreateTrainDepartureDto,
  ): Promise<TrainDeparture> {
    return this.trainService.createTrainDeparture(createTrainDepartureDto);
  }

  @Get('get/schedule/:id')
  @ApiTags('get train`s schedule')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Headmaster, Roles.Passenger)
  getScheduleOfTrainsById(@Param('id') trainId: string) {
    return this.trainService.getScheduleOfTrainsById(trainId);
  }
}
