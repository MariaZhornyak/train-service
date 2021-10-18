import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from '../station/entities/station.entity';
import { Route } from './entities/route.entity';
import { RouteStation } from './entities/routeStation.entity';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RouteStation, Station])],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
