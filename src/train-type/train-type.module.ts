import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainType } from '../entities/train-type.entity';
import { Train } from '../entities/train.entity';
import { TrainTypeController } from './train-type.controller';
import { TrainTypeService } from './train-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrainType, Train])],
  controllers: [TrainTypeController],
  providers: [TrainTypeService],
})
export class TrainTypeModule {}
