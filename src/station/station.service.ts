import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../route/entities/route.entity';
import { RouteStation } from '../route/entities/routeStation.entity';
import { Train } from '../train/entities/train.entity';
import { TrainStation } from './entities/trainStation.entity';
import { CreateStationDto } from './dto/createStation.dto';
import { UpdateStationDto } from './dto/updateStation.dto';
import { Station } from './entities/station.entity';
import { ISuccess } from '../interface/success.interface';
import { RouteFromStatioToStationDto } from './dto/getRouteFromStationToStation.dto';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station) private stationRepository: Repository<Station>,
    @InjectRepository(RouteStation)
    private routeStationRepository: Repository<RouteStation>,
    @InjectRepository(TrainStation)
    private trainStationRepository: Repository<TrainStation>,
  ) {}

  async deleteStation(id: string): Promise<Station> {
    const station = await this.stationRepository.findOne(id);

    if (!station) {
      throw new NotFoundException({
        success: false,
        message: `Station #${id} not found`,
      });
    }

    return await this.stationRepository.remove(station);
  }

  async getStationsList(): Promise<Station[]> {
    const stationsList = await this.stationRepository.find();
    if (!stationsList || stationsList.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Station list is empty',
      });
    }
    return stationsList;
  }

  async getSingleStation(id: string): Promise<Station> {
    const singleStation = await this.stationRepository.findOne(id);
    if (!singleStation) {
      throw new NotFoundException({
        success: false,
        message: `Station #${singleStation} not found`,
      });
    }
    return singleStation;
  }

  async createStation(createStationDto: CreateStationDto): Promise<Station> {
    const station = await this.stationRepository.findOne({
      name: createStationDto.name,
    });

    if (station) {
      throw new BadRequestException({
        success: false,
        message: 'station already exists.',
      });
    }

    const newStation = new Station();

    newStation.name = createStationDto.name;

    return await this.stationRepository.save(newStation);
  }

  async updateStation(
    id: string,
    updateStationDto: UpdateStationDto,
  ): Promise<ISuccess> {
    const station = await this.stationRepository.findOne(id);

    if (!station) {
      throw new NotFoundException({
        success: false,
        message: `Station #${id} not found`,
      });
    }

    await this.stationRepository.update(
      { id },
      { name: updateStationDto.name },
    );
    return { success: true };
  }

  async getRoutesOfStation(stationId: string): Promise<Route[]> {
    const station = await this.stationRepository.findOne({
      id: stationId,
    });

    if (!station) {
      throw new NotFoundException({
        success: false,
        message: `Station #${stationId} does not exist`,
      });
    }

    const routeStations = await this.routeStationRepository.find({
      relations: ['route'],
      where: {
        stationId,
      },
    });

    return routeStations.map((rs) => rs.route);
  }

  async getTrainsOfStation(stationId: string): Promise<Train[]> {
    const station = await this.stationRepository.findOne({
      id: stationId,
    });

    if (!station) {
      throw new NotFoundException({
        success: false,
        message: `Station #${stationId} does not exist`,
      });
    }

    const trainStations = await this.trainStationRepository.find({
      relations: ['train'],
      where: {
        station,
      },
    });

    return trainStations.map((rs) => rs.train);
  }

  async scheduleOfTrainsAtStation(stationId: string) {
    const station = await this.stationRepository.findOne({
      id: stationId,
    });

    if (!station) {
      throw new NotFoundException({
        success: false,
        message: `Station #${stationId} does not exist`,
      });
    }

    const schedule = await this.stationRepository.query(`
      SELECT train.id, route.name, train_departure.direction,
        CASE WHEN train_departure.direction = 'fromStart'
          THEN train_departure.time + train_station."wayFromFirstStation"
          ELSE train_departure.time + train_station."wayFromLastStation"
          END
          as departure_time_at_station
      FROM station
      INNER JOIN train_station ON station.id = train_station."stationId"
      INNER JOIN train ON train.id = train_station."trainId"
      INNER JOIN train_departure ON train.id = train_departure."trainId"
      INNER JOIN route ON route.id = train."routeId"
      WHERE station.id = '${stationId}'
    `);
    return schedule;
  }

  async getRouteFromStationToStation(
    routeFromStationToStationDto: RouteFromStatioToStationDto,
  ) {
    const firstStation = await this.stationRepository.findOne(
      routeFromStationToStationDto.firstStationId,
    );
    if (!firstStation) {
      throw new BadRequestException({
        success: false,
        message: `Station №${routeFromStationToStationDto.firstStationId} does not exist`,
      });
    }

    const secondStation = await this.stationRepository.findOne(
      routeFromStationToStationDto.secondStationId,
    );
    if (!secondStation) {
      throw new BadRequestException({
        success: false,
        message: `Station №${routeFromStationToStationDto.secondStationId} does not exist`,
      });
    }

    const queryForFirstStation = await this.stationRepository.query(`
      SELECT route.name, train.id FROM station
      INNER JOIN route_station ON station.id = route_station."stationId"
      INNER JOIN route ON route_station."routeId" = route.id
      INNER JOIN train ON route.id = train."routeId"
      WHERE station.id = '${routeFromStationToStationDto.firstStationId}'
    `);

    const queryForSecondStation = await this.stationRepository.query(`
      SELECT route.name, train.id FROM station
      INNER JOIN route_station ON station.id = route_station."stationId"
      INNER JOIN route ON route_station."routeId" = route.id
      INNER JOIN train ON route.id = train."routeId"
      WHERE station.id = '${routeFromStationToStationDto.secondStationId}'
    `);

    const queryResult = [];
    for (const item of queryForFirstStation) {
      if (queryForSecondStation.some((item2) => item2.name == item.name)) {
        queryResult.push(item);
      }
    }

    if (queryResult.length === 0) {
      throw new BadRequestException({
        success: false,
        message: `Such route does not exist`,
      });
    }

    return queryResult;
  }
}
