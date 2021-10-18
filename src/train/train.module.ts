import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainType } from './entities/trainType.entity';
import { Train } from './entities/train.entity';
import { TrainStation } from '../station/entities/trainStation.entity';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';
import { TrainDeparture } from './entities/trainDeparture.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Train, TrainType, TrainStation, TrainDeparture]),
  ],
  controllers: [TrainController],
  providers: [TrainService],
})
export class TrainModule {}
