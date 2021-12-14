import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainDeparture } from '../train/entities/trainDeparture.entity';
import { Ticket } from './entities/ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, TrainDeparture])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
