import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarriageType } from '../entities/carriage-type.entity';
import { Carriage } from '../entities/carriage.entity';
import { CarriageTypeController } from './carriage-type.controller';
import { CarriageTypeService } from './carriage-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarriageType, Carriage])],
  controllers: [CarriageTypeController],
  providers: [CarriageTypeService],
})
export class CarriageTypeModule {}
