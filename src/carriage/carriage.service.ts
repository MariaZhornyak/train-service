import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../ticket/entities/ticket.entity';
import { CreateCarriageDto } from './dto/createCarriage.dto';
import { CreateCarriageTypeDto } from './dto/createCarriageType.dto';
import { UpdateCarriageDto } from './dto/updateCarriage.dto';
import { UpdateCarriageTypeDto } from './dto/updateCarriageType.dto';
import { CarriageType } from './entities/carriage-type.entity';
import { Carriage } from './entities/carriage.entity';
import { Sitting } from './entities/sitting.entity';

@Injectable()
export class CarriageService {
  constructor(
    @InjectRepository(Carriage)
    private carriageRepository: Repository<Carriage>,
    @InjectRepository(CarriageType)
    private carriageTypeRepository: Repository<CarriageType>,
    @InjectRepository(Sitting)
    private sittingRepository: Repository<Sitting>, // @InjectRepository(Train) // private trainRepository: Repository<Train>,
  ) {}

  async getCarriagesList(): Promise<Carriage[]> {
    const carriageList = await this.carriageRepository.find();
    if (!carriageList || carriageList.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Carriage list is empty',
      });
    }
    return carriageList;
  }

  async getSingleCarriage(id: string): Promise<Carriage> {
    const singleCarriage = await this.carriageRepository.findOne(id);
    if (!singleCarriage) {
      throw new NotFoundException({
        success: false,
        message: `Carriage #${id} not found`,
      });
    }
    return singleCarriage;
  }

  async deleteCarriage(id: string): Promise<Carriage> {
    const carriage = await this.carriageRepository.findOne(id);

    if (!carriage) {
      throw new NotFoundException({
        success: false,
        message: `Carriage #${id} not found`,
      });
    }

    return await this.carriageRepository.remove(carriage);
  }

  async createCarriage(
    createCarriageDto: CreateCarriageDto,
  ): Promise<Carriage> {
    const carriage = await this.carriageRepository.findOne({
      trainId: createCarriageDto.trainId,
      indexInTrain: createCarriageDto.indexInTrain,
    });

    if (carriage) {
      throw new BadRequestException({
        success: false,
        message: 'Carriage already exists.',
      });
    }

    const newCarriage = new Carriage();

    newCarriage.type = createCarriageDto.type;
    newCarriage.trainId = createCarriageDto.trainId;
    newCarriage.indexInTrain = createCarriageDto.indexInTrain;

    await this.carriageRepository.save(newCarriage);

    for (let i = 1; i <= createCarriageDto.sittings; i++) {
      const sitting = new Sitting();

      sitting.indexInCarriage = i;
      sitting.price = createCarriageDto.priceOfSitting;
      sitting.carriage = newCarriage;

      await this.sittingRepository.save(sitting);
    }

    return newCarriage;
  }

  async updateCarriage(
    id: string,
    updateCarriageDto: UpdateCarriageDto,
  ): Promise<Carriage> {
    const carriage = await this.carriageRepository.findOne(id);

    if (!carriage) {
      throw new NotFoundException({
        success: false,
        message: `Carriage #${id} not found`,
      });
    }

    carriage.train = updateCarriageDto.train;
    carriage.indexInTrain = updateCarriageDto.indexInTrain;
    carriage.type = updateCarriageDto.type;

    return await this.carriageRepository.save(carriage);
  }

  async getCarriageTypesList(): Promise<CarriageType[]> {
    const carriageTypesList = await this.carriageTypeRepository.find();
    if (!carriageTypesList || carriageTypesList.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Carriage types list is empty',
      });
    }
    return carriageTypesList;
  }

  async getSingleCarriageType(id: string): Promise<CarriageType> {
    const singleCarriageType = await this.carriageTypeRepository.findOne(id);
    if (!singleCarriageType) {
      throw new NotFoundException({
        success: false,
        message: `Carriage type ${id} not found`,
      });
    }
    return singleCarriageType;
  }

  async deleteCarriageType(id: string): Promise<CarriageType> {
    const carriageType = await this.carriageTypeRepository.findOne(id);

    if (!carriageType) {
      throw new NotFoundException({
        success: false,
        message: `Carriage type #${id} not found`,
      });
    }

    return await this.carriageTypeRepository.remove(carriageType);
  }

  async createCarriageType(
    createCarriageTypeDto: CreateCarriageTypeDto,
  ): Promise<CarriageType> {
    const carriageType = await this.carriageTypeRepository.findOne({
      name: createCarriageTypeDto.name,
    });

    if (carriageType) {
      throw new BadRequestException({
        success: false,
        message: 'Carriage type already exists.',
      });
    }

    const newCarriageType = new CarriageType();

    newCarriageType.name = createCarriageTypeDto.name;

    return await this.carriageTypeRepository.save(newCarriageType);
  }

  async updateCarriageType(
    name: string,
    updateCarriageTypeDto: UpdateCarriageTypeDto,
  ): Promise<CarriageType> {
    const carriageType = await this.carriageTypeRepository.findOne(name);

    if (!carriageType) {
      throw new NotFoundException({
        success: false,
        message: `Carriage type #${name} not found`,
      });
    }

    carriageType.name = updateCarriageTypeDto.name;

    return await this.carriageTypeRepository.save(carriageType);
  }

  async getSittingsInCarriage(carriageId: string): Promise<Ticket[][]> {
    const carriage = await this.carriageRepository.findOne(
      { id: carriageId },
      { relations: ['sittings'] },
    );

    if (!carriage) {
      throw new NotFoundException({
        success: false,
        message: `Carriage #${carriageId} not found`,
      });
    }

    const sittings = await this.sittingRepository.find({
      relations: ['tickets', 'carriage'],
      where: {
        carriage,
      },
    });

    const freeSittings = sittings.map((sitting) =>
      sitting.tickets.filter(
        (ticket) => ticket.state != 'booked' && ticket.state != 'bought',
      ),
    );

    console.log(freeSittings);
    return freeSittings;
  }

  // async bookSitting()
}
