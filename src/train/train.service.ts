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
import { ICurrentUser } from '../interface/current-user.interface';
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
        day: createTrainDepartureDto.day,
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
    newTrainDeparture.day = createTrainDepartureDto.day;

    return await this.trainDepartureRepository.save(newTrainDeparture);
  }

  async getScheduleOfTrainsById(trainId: string) {
    const train = await this.trainRepository.findOne(trainId);

    if (!train) {
      throw new NotFoundException({
        success: false,
        message: `Train #${trainId} not found`,
      });
    }

    const schedule = await this.trainRepository.query(`
    SELECT train.id, route.name, train_departure.day, train_departure.time 
    FROM train 
    INNER JOIN train_departure ON train.id = train_departure."trainId"
    INNER JOIN route ON train."routeId" = route.id
      WHERE train.id = '${trainId}'
    `);
    return schedule;
  }
}
