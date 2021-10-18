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
import { TrainDeparture } from '../train/entities/trainDeparture.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station) private stationRepository: Repository<Station>,
    @InjectRepository(RouteStation)
    private routeStationRepository: Repository<RouteStation>,
    @InjectRepository(TrainStation)
    private trainStationRepository: Repository<TrainStation>,
    @InjectRepository(Train)
    private trainRepository: Repository<Train>,
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
  ): Promise<Station> {
    const station = await this.stationRepository.findOne(id);

    if (!station) {
      throw new NotFoundException({
        success: false,
        message: `Station #${id} not found`,
      });
    }

    station.name = updateStationDto.name;

    return await this.stationRepository.save(station);
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

  async scheduleOfTrainsAtStation(stationId: string): Promise<number> {
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

    const trains = trainStations.map((rs) => rs.train);

    const trainDepartureTime = trains.map((tr) => tr.trainDepartures);

    for (let i = 0; i < trainDepartureTime.length; i++) {
      return (
        trainDepartureTime[i][i].time + trainStations[i].wayFromFirstStation
      );
    }

    // const kjkhh = trainDepartureTime.map((td) =>
    //   td.map((trainTime) => trainTime.time),
    // );

    // const trainsWayFromFirstStation = trains.map((tr) =>
    //   tr.trainStations.map((ts) => ts.wayFromFirstStation),
    // );

    // for (let i = 0; i < trainDepartureTime.length; i++) {
    //   trainDepartureTime[i][i] + trainsWayFromFirstStation[i][i];
    // }

    // const trainsWayFromLastStation = trains.map((tr) =>
    //   tr.trainStations.map((ts) => ts.wayFromLastStation),
    // );

    // return { trainsWayFromFirstStation, trainsWayFromLastStation };
  }
}

// const trainsWayFromLastStation = trains.map((tr) =>
//   tr.trainStations.map(
//     (ts) => ts.wayFromLastStation + ts.departureDateTime.valueOf(),
//   ),
// );
