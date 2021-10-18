import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarriageController } from './carriage.controller';
import { CarriageService } from './carriage.service';
import { CarriageType } from './entities/carriage-type.entity';
import { Carriage } from './entities/carriage.entity';
import { Sitting } from './entities/sitting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carriage, CarriageType, Sitting])],
  controllers: [CarriageController],
  providers: [CarriageService],
})
export class CarriageModule {}
