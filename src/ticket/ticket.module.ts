import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
// import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  // providers: [TicketService],
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
