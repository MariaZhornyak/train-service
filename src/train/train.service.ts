import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainDto } from './dto/createTrain.dto';
import { CreateTrainStationDto } from './dto/createTrainStation.dto';
import { CreateTrainTypeDto } from './dto/createTrainType.dto';
import { UpdateTrainDto } from './dto/updateTrain.dto';
import { UpdateTrainStationDto } from './dto/updateTrainStation.dto';
import { UpdateTrainTypeDto } from './dto/updateTrainType.dto';
import { TrainType } from './entities/trainType.entity';
import { Train } from './entities/train.entity';
import { TrainStation } from '../station/entities/trainStation.entity';
import { TrainDeparture } from './entities/trainDeparture.entity';
import { CreateTrainDepartureDto } from './dto/createTrainDeparture.dto';
import { ISuccess } from '../interface/success.interface';
import { Route } from '../route/entities/route.entity';
import { Station } from '../station/entities/station.entity';

@Injectable()
export class TrainService {
  constructor(
    @InjectRepository(Train) private trainRepository: Repository<Train>,
    @InjectRepository(TrainType)
    private trainTypeRepository: Repository<TrainType>,
    @InjectRepository(TrainStation)
    private trainStationRepository: Repository<TrainStation>,
    @InjectRepository(TrainDeparture)
    private trainDepartureRepository: Repository<TrainDeparture>,
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async getTrainsList(): Promise<Train[]> {
    const trainList = await this.trainRepository.find();
    if (!trainList || trainList.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Train list is empty',
      });
    }
    return trainList;
  }

  async getSingleTrain(id: string): Promise<Train> {
    const singleTrain = await this.trainRepository.findOne(id);
    if (!singleTrain) {
      throw new NotFoundException({
        success: false,
        message: `Train #${id} not found`,
      });
    }
    return singleTrain;
  }

  async deleteTrain(id: string): Promise<Train> {
    const train = await this.trainRepository.findOne(id);

    if (!train) {
      throw new NotFoundException({
        success: false,
        message: `Train #${id} not found`,
      });
    }

    return await this.trainRepository.remove(train);
  }

  async createTrain(createTrainDto: CreateTrainDto): Promise<Train> {
    const trainType = await this.trainTypeRepository.findOne({
      name: createTrainDto.typeName,
    });

    if (!trainType) {
      throw new BadRequestException({
        success: false,
        message: 'Such train type does not exist',
      });
    }

    const route = await this.routeRepository.findOne({
      id: createTrainDto.routeId,
    });

    if (!route) {
      throw new BadRequestException({
        success: false,
        message: 'Such route does not exist',
      });
    }

    const newTrain = new Train();

    newTrain.typeName = createTrainDto.typeName;
    newTrain.name = createTrainDto.name;
    newTrain.routeId = createTrainDto.routeId;

    return await this.trainRepository.save(newTrain);
  }

  async updateTrain(id: string, updateTrainDto: UpdateTrainDto) {
    const train = await this.trainRepository.findOne(id);

    if (!train) {
      throw new NotFoundException({
        success: false,
        message: `Train #${id} not found`,
      });
    }

    const trainType = await this.trainTypeRepository.findOne({
      name: updateTrainDto.typeName,
    });

    if (!trainType) {
      throw new BadRequestException({
        success: false,
        message: 'Such train type does not exist',
      });
    }

    const route = await this.routeRepository.findOne({
      id: updateTrainDto.routeId,
    });

    if (!route) {
      throw new BadRequestException({
        success: false,
        message: 'Such route does not exist',
      });
    }

    const newObj = {};

    for (const key in updateTrainDto) {
      if (updateTrainDto[key] != undefined) {
        newObj[key] = updateTrainDto[key];
      }
    }

    await this.trainRepository.update({ id }, newObj);
    return { success: true };
  }

  async getTrainTypesList(): Promise<TrainType[]> {
    const trainTypesList = await this.trainTypeRepository.find();
    if (!trainTypesList || trainTypesList.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Train types list is empty',
      });
    }
    return trainTypesList;
  }

  async getSingleTrainType(name: string): Promise<TrainType> {
    const singleTrainType = await this.trainTypeRepository.findOne(name);
    if (!singleTrainType) {
      throw new NotFoundException({
        success: false,
        message: `Train type '${name}' not found`,
      });
    }
    return singleTrainType;
  }

  async deleteTrainType(name: string): Promise<TrainType> {
    const trainType = await this.trainTypeRepository.findOne(name);

    if (!trainType) {
      throw new NotFoundException({
        success: false,
        message: `Train type '${name}' not found`,
      });
    }

    return await this.trainTypeRepository.remove(trainType);
  }

  async createTrainType(
    createTrainTypeDto: CreateTrainTypeDto,
  ): Promise<TrainType> {
    const trainType = await this.trainRepository.findOne({
      typeName: createTrainTypeDto.name,
    });

    if (trainType) {
      throw new BadRequestException({
        success: false,
        message: 'Train already exists.',
      });
    }

    const newTrainType = new TrainType();

    newTrainType.name = createTrainTypeDto.name;

    return await this.trainTypeRepository.save(newTrainType);
  }

  async updateTrainType(
    name: string,
    updateTrainTypeDto: UpdateTrainTypeDto,
  ): Promise<ISuccess> {
    const trainType = await this.trainTypeRepository.findOne(name);

    if (!trainType) {
      throw new NotFoundException({
        success: false,
        message: `Train type #${name} not found`,
      });
    }

    await this.trainTypeRepository.update(
      { name },
      { name: updateTrainTypeDto.name },
    );
    return { success: true };
  }

  async createTrainStation(
    createTrainStationDto: CreateTrainStationDto,
  ): Promise<TrainStation> {
    const station = await this.stationRepository.findOne({
      id: createTrainStationDto.stationId,
    });

    if (!station) {
      throw new BadRequestException({
        success: false,
        message: 'Such station does not exist',
      });
    }

    const train = await this.trainRepository.findOne({
      id: createTrainStationDto.trainId,
    });

    if (!train) {
      throw new BadRequestException({
        success: false,
        message: 'Such train does not exist',
      });
    }

    const trainStation = await this.trainStationRepository.findOne({
      trainId: createTrainStationDto.trainId,
      stationId: createTrainStationDto.stationId,
    });

    if (trainStation) {
      throw new BadRequestException({
        success: false,
        message: 'Such train, which is passing by this station, already exists',
      });
    }

    const newTrainStation = new TrainStation();

    newTrainStation.trainId = createTrainStationDto.trainId;
    newTrainStation.stationId = createTrainStationDto.stationId;
    newTrainStation.trainStandFromFirstStation =
      createTrainStationDto.trainStandFromFirstStation;
    newTrainStation.trainStandFromLastStation =
      createTrainStationDto.trainStandFromLastStation;
    newTrainStation.wayFromFirstStation =
      createTrainStationDto.wayFromFirstStation;
    newTrainStation.wayFromLastStation =
      createTrainStationDto.wayFromLastStation;

    return await this.trainStationRepository.save(newTrainStation);
  }

  // async getTrainStationsList(): Promise<TrainStation[]> {
  //   const trainStationsList = await this.trainStationRepository.find();
  //   if (!trainStationsList || trainStationsList.length === 0) {
  //     throw new NotFoundException({
  //       success: false,
  //       message: 'Train and stations list is empty',
  //     });
  //   }
  //   return trainStationsList;
  // }

  // async getSingleTrainStation(id: string): Promise<TrainStation> {
  //   const singleTrainAtStation = await this.trainStationRepository.findOne(id);
  //   if (!singleTrainAtStation) {
  //     throw new NotFoundException({
  //       success: false,
  //       message: `Train and station '${id}' not found`,
  //     });
  //   }
  //   return singleTrainAtStation;
  // }

  // async deleteTrainStation(id: string): Promise<TrainStation> {
  //   const trainStation = await this.trainStationRepository.findOne(id);

  //   if (!trainStation) {
  //     throw new NotFoundException({
  //       success: false,
  //       message: `Train and station '${id}' not found`,
  //     });
  //   }

  //   return await this.trainStationRepository.remove(trainStation);
  // }

  async updateTrainStation(
    id: string,
    updateTrainStationDto: UpdateTrainStationDto,
  ): Promise<ISuccess> {
    const trainStation = await this.trainStationRepository.findOne(id);

    if (!trainStation) {
      throw new NotFoundException({
        success: false,
        message: `Train and station #${id} not found`,
      });
    }

    const newObj = {};

    for (const key in updateTrainStationDto) {
      if (updateTrainStationDto[key] != undefined) {
        newObj[key] = updateTrainStationDto[key];
      }
    }

    await this.trainStationRepository.update({ id }, newObj);
    return { success: true };
  }

  async createTrainDeparture(
    createTrainDepartureDto: CreateTrainDepartureDto,
  ): Promise<TrainDeparture> {
    const trainDeparture = await this.trainDepartureRepository.findOne(
      {
        trainId: createTrainDepartureDto.trainId,
        time: createTrainDepartureDto.time,
      },
      { relations: ['train'] },
    );

    if (trainDeparture) {
      throw new BadRequestException({
        success: false,
        message: 'Train with such id already has such departure time.',
      });
    }

    const newTrainDeparture = new TrainDeparture();

    newTrainDeparture.trainId = createTrainDepartureDto.trainId;
    newTrainDeparture.time = createTrainDepartureDto.time;
    newTrainDeparture.direction = createTrainDepartureDto.direction;

    return await this.trainDepartureRepository.save(newTrainDeparture);
  }

  async deleteTrainDeparture(id: string): Promise<ISuccess> {
    const result = await this.trainDepartureRepository.delete(id);
    return {
      success: result.affected === 1,
    };
  }

  async getScheduleOfTrainById(trainId: string) {
    const train = await this.trainRepository.findOne(trainId);

    if (!train) {
      throw new NotFoundException({
        success: false,
        message: `Train #${trainId} not found`,
      });
    }

    return await this.trainDepartureRepository.find({ trainId });
  }

  async getWaysBetweenTwoStations(fromStationId: string, toStationId: string) {
    const trains = await this.trainRepository.find({
      relations: ['route', 'trainStations'],
    });

    const ways: {
      trains: Train[];
      stationIds: string[];
    }[] = [];
    const func = (
      train: Train,
      currentStationId: string,
      stationsPath: string[],
      usedTrains: Train[],
      usedStationsIds: string[],
    ) => {
      if (
        usedTrains.find(
          (train1) =>
            train1.route.id === train.route.id && train1.id !== train.id,
        )
      ) {
        return;
      }

      usedTrains = usedTrains.concat([train]);
      stationsPath = stationsPath.concat([currentStationId]);

      if (
        train.trainStations.find(
          (trainStation) => trainStation.stationId === toStationId,
        )
      ) {
        stationsPath = stationsPath.concat([toStationId]);
        ways.push({ trains: usedTrains, stationIds: stationsPath });
        return;
      } else {
        const encounteredTrains: Train[] = [].concat(usedTrains);
        for (const { stationId } of train.trainStations) {
          if (usedStationsIds.includes(stationId)) {
            continue;
          }

          for (const train1 of trains.filter((train2) =>
            train2.trainStations.find(
              (trainStation) => trainStation.stationId === stationId,
            ),
          )) {
            if (encounteredTrains.find((train2) => train2.id === train1.id)) {
              continue;
            }

            encounteredTrains.push(train1);

            func(
              train1,
              stationId,
              stationsPath,
              usedTrains,
              usedStationsIds.concat(
                train.trainStations.map(
                  (trainStation) => trainStation.stationId,
                ),
              ),
            );
          }
        }
      }
    };

    for (const train of trains.filter((train) =>
      train.trainStations.find(
        (trainStation) => trainStation.stationId === fromStationId,
      ),
    )) {
      func(train, fromStationId, [], [], [fromStationId]);
    }

    const stations = await this.stationRepository.find();
    const result: {
      trains: Train[];
      stations: Station[];
      length: number;
    }[] = [];
    for (const way of ways) {
      let length = 0;
      let currentStationId = fromStationId;
      for (let i = 0; i < way.trains.length; i++) {
        let isFrom: boolean;
        let isCounting = false;
        for (const trainStation of way.trains[i].trainStations) {
          if (isCounting) {
            length += isFrom
              ? trainStation.wayFromFirstStation +
                trainStation.trainStandFromFirstStation
              : trainStation.wayFromLastStation +
                trainStation.trainStandFromLastStation;
          }

          if (trainStation.stationId === currentStationId) {
            isFrom = true;
            isCounting = !isCounting;
          }
          if (trainStation.stationId === way.stationIds[i + 1]) {
            isFrom = false;
            isCounting = !isCounting;
          }
        }
      }

      result.push({
        trains: way.trains,
        stations: way.stationIds.map((stationId) =>
          stations.find((station) => station.id === stationId),
        ),
        length,
      });
    }

    return result;
  }
}
