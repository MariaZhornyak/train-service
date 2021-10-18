import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Station } from '../station/entities/station.entity';
import { Train } from '../train/entities/train.entity';
import { CreateRouteDto } from './dto/createRoute.dto';
import { CreateRouteStationDto } from './dto/createRouteStation.dto';
import { UpdateRouteDto } from './dto/updateRoute.dto';
import { UpdateRouteStationDto } from './dto/updateRoutestation.dto';
import { Route } from './entities/route.entity';
import { RouteStation } from './entities/routeStation.entity';
import { RouteService } from './route.service';

@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get('get/list')
  getRoutesList(): Promise<Route[]> {
    return this.routeService.getRoutesList();
  }

  @Get('get/:id')
  getSingleTrain(@Param('id') id: string): Promise<Route> {
    return this.routeService.getSingleRoute(id);
  }

  @Post('create')
  createRoute(@Body() createRouteDto: CreateRouteDto): Promise<Route> {
    return this.routeService.createRoute(createRouteDto);
  }

  @Patch('update/:id')
  updateRoute(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ): Promise<Route> {
    return this.routeService.updateRoute(id, updateRouteDto);
  }

  @Delete('delete/:id')
  deleteRoute(@Param('id') id: string): Promise<Route> {
    return this.routeService.deleteRoute(id);
  }

  @Get('stations-on-route/get/list')
  getRouteStationsList(): Promise<RouteStation[]> {
    return this.routeService.getRouteStationsList();
  }

  @Get('stations-on-route/get/:id')
  getSingleRouteStation(@Param('id') id: string): Promise<RouteStation> {
    return this.routeService.getSingleRouteStation(id);
  }

  @Delete('stations-on-route/delete/:id')
  deleteRouteStation(@Param('id') id: string): Promise<RouteStation> {
    return this.routeService.deleteRouteStation(id);
  }

  @Post('stations-on-route/create')
  createRouteStation(
    @Body() createRouteStationDto: CreateRouteStationDto,
  ): Promise<RouteStation> {
    return this.routeService.createRouteStation(createRouteStationDto);
  }

  @Patch('stations-on-route/update/:id')
  updateRouteStation(
    @Param('id') id: string,
    @Body() updateRouteStationDto: UpdateRouteStationDto,
  ): Promise<RouteStation> {
    return this.routeService.updateRouteStation(id, updateRouteStationDto);
  }

  @Get('route/:id/stations')
  getStationsOfRoute(@Param('id') routeId: string): Promise<Station[]> {
    return this.routeService.getStationsOfRoute(routeId);
  }

  @Get('route/:id/trains')
  getTrainsOfRoute(@Param('id') routeId: string): Promise<Train[]> {
    return this.routeService.getTrainsOfRoute(routeId);
  }
}
