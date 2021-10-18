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
    const train = await this.trainRepository.findOne({
      id: createTrainDto.id,
    });

    if (train) {
      throw new BadRequestException({
        success: false,
        message: 'Train already exists.',
      });
    }

    const newTrain = new Train();

    newTrain.type = createTrainDto.type;
    newTrain.route = createTrainDto.route;

    return await this.trainRepository.save(newTrain);
  }

  async updateTrain(
    id: string,
    updateTrainDto: UpdateTrainDto,
  ): Promise<Train> {
    const train = await this.trainRepository.findOne(id);

    if (!train) {
      throw new NotFoundException({
        success: false,
        message: `Train #${id} not found`,
      });
    }

    train.type = updateTrainDto.type;
    train.route = updateTrainDto.route;

    return await this.trainRepository.save(train);
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
      id: createTrainTypeDto.id,
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
  ): Promise<TrainType> {
    const trainType = await this.trainTypeRepository.findOne(name);

    if (!trainType) {
      throw new NotFoundException({
        success: false,
        message: `Train type #${name} not found`,
      });
    }

    trainType.name = updateTrainTypeDto.name;

    return await this.trainTypeRepository.save(trainType);
  }

  async createTrainStation(
    createTrainStationDto: CreateTrainStationDto,
  ): Promise<TrainStation> {
    const trainStation = await this.trainStationRepository.findOne({
      id: createTrainStationDto.id,
    });

    if (trainStation) {
      throw new BadRequestException({
        success: false,
        message: 'Route with such stations already exists.',
      });
    }

    const newTrainStation = new TrainStation();

    newTrainStation.train = createTrainStationDto.train;
    newTrainStation.station = createTrainStationDto.station;
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

  async getTrainStationsList(): Promise<TrainStation[]> {
    const trainStationsList = await this.trainStationRepository.find();
    if (!trainStationsList || trainStationsList.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Train and stations list is empty',
      });
    }
    return trainStationsList;
  }

  async getSingleTrainStation(id: string): Promise<TrainStation> {
    const singleTrainAtStation = await this.trainStationRepository.findOne(id);
    if (!singleTrainAtStation) {
      throw new NotFoundException({
        success: false,
        message: `Train and station '${id}' not found`,
      });
    }
    return singleTrainAtStation;
  }

  async deleteTrainStation(id: string): Promise<TrainStation> {
    const trainStation = await this.trainStationRepository.findOne(id);

    if (!trainStation) {
      throw new NotFoundException({
        success: false,
        message: `Train and station '${id}' not found`,
      });
    }

    return await this.trainStationRepository.remove(trainStation);
  }

  async updateTrainStation(
    id: string,
    updateTrainStationDto: UpdateTrainStationDto,
  ): Promise<TrainStation> {
    const trainStation = await this.trainStationRepository.findOne(id);

    if (!trainStation) {
      throw new NotFoundException({
        success: false,
        message: `Train and station #${id} not found`,
      });
    }

    trainStation.train = updateTrainStationDto.train;
    trainStation.station = updateTrainStationDto.station;
    trainStation.trainStandFromFirstStation =
      updateTrainStationDto.trainStandFromFirstStation;
    trainStation.trainStandFromLastStation =
      updateTrainStationDto.trainStandFromLastStation;
    trainStation.wayFromFirstStation =
      updateTrainStationDto.wayFromFirstStation;
    trainStation.wayFromLastStation = updateTrainStationDto.wayFromLastStation;

    return await this.trainStationRepository.save(trainStation);
  }

  async createTrainDeparture(
    createTrainDepartureDto: CreateTrainDepartureDto,
  ): Promise<TrainDeparture> {
    const trainDeparture = await this.trainDepartureRepository.findOne(
      {
        train: createTrainDepartureDto.train,
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

    newTrainDeparture.train = createTrainDepartureDto.train;
    newTrainDeparture.time = createTrainDepartureDto.time;
    newTrainDeparture.direction = createTrainDepartureDto.direction;
    newTrainDeparture.day = createTrainDepartureDto.day;

    return await this.trainStationRepository.save(newTrainDeparture);
  }
}
