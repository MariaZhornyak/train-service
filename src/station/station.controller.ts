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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorator/auth.decorator';
import { Roles } from '../enum/roles.enum';
import { AuthGuard } from '../guard/auth.guard';
import { ISuccess } from '../interface/success.interface';
import { Route } from '../route/entities/route.entity';
import { Train } from '../train/entities/train.entity';
import { CreateStationDto } from './dto/createStation.dto';
import { RouteFromStatioToStationDto } from './dto/getRouteFromStationToStation.dto';
import { UpdateStationDto } from './dto/updateStation.dto';
import { Station } from './entities/station.entity';
import { StationService } from './station.service';

@Controller('stations')
@ApiBearerAuth()
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Get('get/list')
  @ApiTags('stations')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger)
  getStationsList(): Promise<Station[]> {
    return this.stationService.getStationsList();
  }

  @Get('get/:id')
  @ApiTags('stations')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger)
  getSingleStation(@Param('id') id: string): Promise<Station> {
    return this.stationService.getSingleStation(id);
  }

  @Post('create')
  @ApiTags('stations')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createStation(@Body() createStationDto: CreateStationDto): Promise<Station> {
    return this.stationService.createStation(createStationDto);
  }

  @Patch('update/:id')
  @ApiTags('stations')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  updateStation(
    @Param('id') id: string,
    @Body() updateStationDto: UpdateStationDto,
  ): Promise<ISuccess> {
    return this.stationService.updateStation(id, updateStationDto);
  }

  @Delete('delete/:id')
  @ApiTags('stations')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  deleteStation(@Param('id') id: string): Promise<Station> {
    return this.stationService.deleteStation(id);
  }

  @Get(':id/routes')
  @ApiTags('get all routes which goes through station')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger)
  getRoutesOfStation(@Param('id') stationId: string): Promise<Route[]> {
    return this.stationService.getRoutesOfStation(stationId);
  }

  @Get(':id/trains')
  @ApiTags('get all trains which goes through station')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger)
  getTrainsOfStation(@Param('id') trainId: string): Promise<Train[]> {
    return this.stationService.getTrainsOfStation(trainId);
  }

  @Get('schedule/:id/trains')
  @ApiTags('get schedule of trains those go through station')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger)
  scheduleOfTrainsAtStations(@Param('id') stationId: string) {
    return this.stationService.scheduleOfTrainsAtStation(stationId);
  }

  @Get('get/trains/between-two-stations')
  getRouteFromStationToStation(
    @Query() routeFromStationToStationDto: RouteFromStatioToStationDto,
  ) {
    return this.stationService.getRouteFromStationToStation(
      routeFromStationToStationDto,
    );
  }
}
