import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  async getTicketsList(): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.find();
    if (!tickets || tickets.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Tickets list is empty',
      });
    }
    return tickets;
  }

  async getSingleTicket(id: string): Promise<Ticket> {
    const singleTicket = await this.ticketRepository.findOne(id);
    if (!singleTicket) {
      throw new NotFoundException({
        success: false,
        message: `Ticket #${id} not found`,
      });
    }
    return singleTicket;
  }

  async deleteTicket(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne(id);

    if (!ticket) {
      throw new NotFoundException({
        success: false,
        message: `Ticket #${id} not found`,
      });
    }

    return await this.ticketRepository.remove(ticket);
  }

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      departureDateTime: createTicketDto.departureDateTime,
      sitting: createTicketDto.sitting,
    });

    if (ticket) {
      throw new BadRequestException({
        success: false,
        message: 'Ticket already exists.',
      });
    }

    const newTicket = new Ticket();

    newTicket.sitting = createTicketDto.sitting;
    newTicket.state = createTicketDto.state;
    newTicket.transactionDateTime = createTicketDto.transactionDateTime;
    newTicket.departureDateTime = createTicketDto.departureDateTime;
    // newTicket.userId = createTicketDto.userId;

    return await this.ticketRepository.save(newTicket);
  }

  async updateTicket(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne(id);

    if (!ticket) {
      throw new NotFoundException({
        success: false,
        message: `Ticket #${id} not found`,
      });
    }

    ticket.sitting = updateTicketDto.sitting;
    ticket.state = updateTicketDto.state;
    ticket.transactionDateTime = updateTicketDto.transactionDateTime;
    ticket.departureDateTime = updateTicketDto.departureDateTime;
    // ticket.userId = updateTicketDto.userId;

    return await this.ticketRepository.save(ticket);
  }
}
