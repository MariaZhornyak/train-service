import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { Auth } from '../decorator/auth.decorator';
import { Roles } from '../enum/roles.enum';
import { ISuccess } from '../interface/success.interface';
import { Station } from '../station/entities/station.entity';
import { Train } from '../train/entities/train.entity';
import { CreateRouteDto } from './dto/createRoute.dto';
import { CreateRouteStationDto } from './dto/createRouteStation.dto';
import { UpdateRouteDto } from './dto/updateRoute.dto';
import { UpdateRouteStationDto } from './dto/updateRoutestation.dto';
import { Route } from './entities/route.entity';
import { RouteStation } from './entities/routeStation.entity';
import { RouteService } from './route.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('routes')
@ApiBearerAuth()
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get('get/list')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger, Roles.Headmaster)
  getRoutesList(): Promise<Route[]> {
    return this.routeService.getRoutesList();
  }

  @Get('get/:id')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Passenger, Roles.Headmaster)
  getSingleRoute(@Param('id') id: string): Promise<Route> {
    return this.routeService.getSingleRoute(id);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createRoute(@Body() createRouteDto: CreateRouteDto): Promise<Route> {
    return this.routeService.createRoute(createRouteDto);
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  updateRoute(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ): Promise<ISuccess> {
    return this.routeService.updateRoute(id, updateRouteDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  deleteRoute(@Param('id') id: string): Promise<Route> {
    return this.routeService.deleteRoute(id);
  }

  // @Get('stations-on-route/get/list')
  // @UseGuards(AuthGuard)
  // @Auth(Roles.Manager)
  // getRouteStationsList(): Promise<RouteStation[]> {
  //   return this.routeService.getRouteStationsList();
  // }

  // @Get('stations-on-route/get/:id')
  // @UseGuards(AuthGuard)
  // @Auth(Roles.Manager)
  // getSingleRouteStation(@Param('id') id: string): Promise<RouteStation> {
  //   return this.routeService.getSingleRouteStation(id);
  // }

  // @Delete('stations-on-route/delete/:id')
  // @UseGuards(AuthGuard)
  // @Auth(Roles.Manager)
  // deleteRouteStation(@Param('id') id: string): Promise<RouteStation> {
  //   return this.routeService.deleteRouteStation(id);
  // }

  @Post('stations-on-route/create')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  createRouteStation(
    @Body() createRouteStationDto: CreateRouteStationDto,
  ): Promise<RouteStation> {
    return this.routeService.createRouteStation(createRouteStationDto);
  }

  @Patch('stations-on-route/update/:id')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager)
  updateRouteStation(
    @Param('id') id: string,
    @Body() updateRouteStationDto: UpdateRouteStationDto,
  ): Promise<ISuccess> {
    return this.routeService.updateRouteStation(id, updateRouteStationDto);
  }

  @Get('route/:id/stations')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Headmaster, Roles.Passenger)
  getStationsOfRoute(@Param('id') routeId: string): Promise<Station[]> {
    return this.routeService.getStationsOfRoute(routeId);
  }

  @Get('route/:id/trains')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Headmaster, Roles.Passenger)
  getTrainsOfRoute(@Param('id') routeId: string): Promise<Train[]> {
    return this.routeService.getTrainsOfRoute(routeId);
  }

  @Get('get/schedule/:id')
  @UseGuards(AuthGuard)
  @Auth(Roles.Manager, Roles.Headmaster, Roles.Passenger)
  getScheduleOfTrainsAtRoute(@Param('id') routeId: string) {
    return this.routeService.getSchduleOfTrainsAtRoute(routeId);
  }
}
