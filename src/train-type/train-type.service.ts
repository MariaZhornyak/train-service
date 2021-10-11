import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainTypeDto } from '../dto/createTrainType.dto';
import { TrainType } from '../entities/train-type.entity';

@Injectable()
export class TrainTypeService {
  constructor(
    @InjectRepository(TrainType) private trainRepository: Repository<TrainType>,
  ) {}

  async createTrainType(
    createTrainTypeDto: CreateTrainTypeDto,
  ): Promise<TrainType> {
    const trainType = await this.trainRepository.findOne({
      name: createTrainTypeDto.name,
    });

    if (trainType) {
      throw new BadRequestException({
        success: false,
        message: 'User already exists.',
      });
    }

    const newTrainType = new TrainType();
    newTrainType.name = createTrainTypeDto.name;

    return await this.trainRepository.save(newTrainType);
  }
}
