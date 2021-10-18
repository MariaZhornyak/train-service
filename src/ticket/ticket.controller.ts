import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('get/list')
  getTicketsList(): Promise<Ticket[]> {
    return this.ticketService.getTicketsList();
  }

  @Get('get/:id')
  getSingleTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.getSingleTicket(id);
  }

  @Delete('delete/:id')
  deleteTicket(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.deleteTicket(id);
  }

  @Post('create')
  createTicket(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.createTicket(createTicketDto);
  }

  @Patch('update/:id')
  updateTicket(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketService.updateTicket(id, updateTicketDto);
  }
}
