import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteStation } from '../route/entities/routeStation.entity';
import { TrainStation } from './entities/trainStation.entity';
import { Station } from './entities/station.entity';
import { StationController } from './station.controller';
import { StationService } from './station.service';
import { Train } from '../train/entities/train.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Station, RouteStation, TrainStation, Train]),
  ],
  controllers: [StationController],
  providers: [StationService],
})
export class StationModule {}
