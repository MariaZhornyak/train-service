import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainType } from './entities/trainType.entity';
import { Train } from './entities/train.entity';
import { TrainStation } from '../station/entities/trainStation.entity';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';
import { TrainDeparture } from './entities/trainDeparture.entity';
import { Route } from '../route/entities/route.entity';
import { Station } from '../station/entities/station.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Train,
      TrainType,
      TrainStation,
      TrainDeparture,
      Route,
      Station,
    ]),
  ],
  controllers: [TrainController],
  providers: [TrainService],
})
export class TrainModule {}
