import { Body, Controller, Post } from '@nestjs/common';
import { CreateTrainTypeDto } from '../dto/createTrainType.dto';
import { TrainType } from '../entities/train-type.entity';
import { TrainTypeService } from './train-type.service';

@Controller('train-type')
export class TrainTypeController {
  constructor(private readonly trainTypeService: TrainTypeService) {}

  @Post('/create')
  createTrainType(
    @Body() createTrainTypeDto: CreateTrainTypeDto,
  ): Promise<TrainType> {
    return this.trainTypeService.createTrainType(createTrainTypeDto);
  }
}
