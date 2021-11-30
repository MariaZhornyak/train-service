import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainModule } from './train/train.module';
import { config } from './config';
import { CarriageModule } from './carriage/carriage.module';
import { RouteModule } from './route/route.module';
import { StationModule } from './station/station.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.dbURL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TrainModule,
    CarriageModule,
    RouteModule,
    StationModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
