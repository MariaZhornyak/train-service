import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../station/entities/station.entity';
import { Train } from '../train/entities/train.entity';
import { CreateRouteDto } from './dto/createRoute.dto';
import { CreateRouteStationDto } from './dto/createRouteStation.dto';
import { UpdateRouteDto } from './dto/updateRoute.dto';
import { UpdateRouteStationDto } from './dto/updateRoutestation.dto';
import { Route } from './entities/route.entity';
import { RouteStation } from './entities/routeStation.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route) private routeRepository: Repository<Route>,
    @InjectRepository(RouteStation)
    private routeStationRepository: Repository<RouteStation>,
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async getRoutesList(): Promise<Route[]> {
    const routeList = await this.routeRepository.find();
    if (!routeList || routeList.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Route list is empty',
      });
    }
    return routeList;
  }

  async getSingleRoute(id: string): Promise<Route> {
    const singleRoute = await this.routeRepository.findOne(id);
    if (!singleRoute) {
      throw new NotFoundException({
        success: false,
        message: `Route #${id} not found`,
      });
    }
    return singleRoute;
  }

  async deleteRoute(id: string): Promise<Route> {
    const route = await this.routeRepository.findOne(id);

    if (!route) {
      throw new NotFoundException({
        success: false,
        message: `Route #${id} not found`,
      });
    }

    return await this.routeRepository.remove(route);
  }

  async createRoute(createRouteDto: CreateRouteDto): Promise<Route> {
    const route = await this.routeRepository.findOne({
      name: createRouteDto.name,
    });

    if (route) {
      throw new BadRequestException({
        success: false,
        message: 'Route already exists.',
      });
    }

    const newRoute = new Route();

    newRoute.name = createRouteDto.name;

    return await this.routeRepository.save(newRoute);
  }

  async updateRoute(
    id: string,
    updateRouteDto: UpdateRouteDto,
  ): Promise<Route> {
    const route = await this.routeRepository.findOne(id);

    if (!route) {
      throw new NotFoundException({
        success: false,
        message: `Route #${id} not found`,
      });
    }

    route.name = updateRouteDto.name;

    return await this.routeRepository.save(route);
  }

  async createRouteStation(
    createRouteStationDto: CreateRouteStationDto,
  ): Promise<RouteStation> {
    const route = await this.routeRepository.findOne(
      {
        id: createRouteStationDto.routeId,
      },
      { relations: ['routeStations'] },
    );

    if (!route) {
      throw new BadRequestException({
        success: false,
        message: 'Such route does not exist',
      });
    }

    const station = await this.stationRepository.findOne({
      id: createRouteStationDto.stationId,
    });

    if (!station) {
      throw new BadRequestException({
        success: false,
        message: 'Such station does not exist',
      });
    }

    const routeStation = await this.routeStationRepository.findOne({
      routeId: createRouteStationDto.routeId,
      stationId: createRouteStationDto.stationId,
    });

    if (routeStation) {
      throw new BadRequestException({
        success: false,
        message: 'Station is already in this route',
      });
    }

    const stationsOfRoute = route.routeStations;

    if (
      stationsOfRoute.some(
        (rs) =>
          rs.stationIndexOnTheRoute ===
          createRouteStationDto.stationIndexOnTheRoute,
      )
    ) {
      stationsOfRoute
        .filter(
          (rs) =>
            rs.stationIndexOnTheRoute >=
            createRouteStationDto.stationIndexOnTheRoute,
        )
        .forEach((rs) =>
          this.updateRouteStation(rs.id, {
            stationIndexOnTheRoute: rs.stationIndexOnTheRoute + 1,
          }),
        );
    }

    const newRouteStation = new RouteStation();

    newRouteStation.routeId = createRouteStationDto.routeId;
    newRouteStation.stationIndexOnTheRoute =
      createRouteStationDto.stationIndexOnTheRoute;
    newRouteStation.stationId = createRouteStationDto.stationId;

    return await this.routeStationRepository.save(newRouteStation);
  }

  async getRouteStationsList(): Promise<RouteStation[]> {
    const trainStationsList = await this.routeStationRepository.find();
    if (!trainStationsList || trainStationsList.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Train and stations list is empty',
      });
    }
    return trainStationsList;
  }

  async getSingleRouteStation(id: string): Promise<RouteStation> {
    const singleRouteAndStation = await this.routeStationRepository.findOne(id);
    if (!singleRouteAndStation) {
      throw new NotFoundException({
        success: false,
        message: `Train and station '${id}' not found`,
      });
    }
    return singleRouteAndStation;
  }

  async deleteRouteStation(id: string): Promise<RouteStation> {
    const routeStation = await this.routeStationRepository.findOne(id);

    if (!routeStation) {
      throw new NotFoundException({
        success: false,
        message: `Train and station '${id}' not found`,
      });
    }

    return await this.routeStationRepository.remove(routeStation);
  }

  async updateRouteStation(
    id: string,
    updateRouteStationDto: UpdateRouteStationDto,
  ): Promise<RouteStation> {
    const routeStation = await this.routeStationRepository.findOne(id);

    if (!routeStation) {
      throw new NotFoundException({
        success: false,
        message: `Train and station #${id} not found`,
      });
    }

    routeStation.route = updateRouteStationDto.route;
    routeStation.station = updateRouteStationDto.station;
    routeStation.stationIndexOnTheRoute =
      updateRouteStationDto.stationIndexOnTheRoute;

    return await this.routeStationRepository.save(routeStation);
  }

  async getStationsOfRoute(routeId: string): Promise<Station[]> {
    const route = await this.routeRepository.findOne({
      id: routeId,
    });

    if (!route) {
      throw new NotFoundException({
        success: false,
        message: `Route #${routeId} does not exist`,
      });
    }

    const routeStations = await this.routeStationRepository.find({
      relations: ['station'],
      where: {
        routeId,
      },
    });

    return routeStations.map((rs) => rs.station);
  }

  async getTrainsOfRoute(routeId: string): Promise<Train[]> {
    const route = await this.routeRepository.findOne(
      {
        id: routeId,
      },
      {
        relations: ['trains'],
      },
    );

    if (!route) {
      throw new NotFoundException({
        success: false,
        message: `Route #${routeId} does not exist`,
      });
    }
    return route.trains;
  }
}
