import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarriageTypeDto } from '../dto/createCarriageType.dto';
import { CarriageType } from '../entities/carriage-type.entity';

@Injectable()
export class CarriageTypeService {
  constructor(
    @InjectRepository(CarriageType)
    private carriageTypeRepository: Repository<CarriageType>,
  ) {}

  async createCarriageType(
    createCarriageTypeDto: CreateCarriageTypeDto,
  ): Promise<CarriageType> {
    const carriageType = this.carriageTypeRepository.findOne({
      id: createCarriageTypeDto.id,
    });

    if (carriageType) {
      throw new BadRequestException({
        success: false,
        message: 'Carriage type already exists.',
      });
    }

    const newCarriageType = new CarriageType();
    newCarriageType.name = createCarriageTypeDto.name;

    return this.carriageTypeRepository.save(newCarriageType);
    // return;
  }
}
